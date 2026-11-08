<?php

namespace Tests\Feature;

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

/** Automated version of the Part 4 validation test table (needs the PHP GD extension for fake images). */
class ProjectValidationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    private function valid(array $override = []): array
    {
        return array_merge([
            'title'          => 'Campus Portal Redesign',
            'description'    => 'A redesigned student portal with a new design system and prototypes.',
            'tech_stack'     => 'Figma, Photoshop',
            'project_url'    => 'https://example.com/portal',
            'repository_url' => 'https://github.com/example/portal',
            'completed_at'   => '2026-10-01',
            'image'          => UploadedFile::fake()->image('cover.jpg', 800, 450),
        ], $override);
    }

    private function make(array $override = []): Project
    {
        return Project::create(array_merge($this->valid(['image' => null]), $override));
    }

    public function test_projects_pages_open_without_login(): void
    {
        $this->get('/projects')->assertOk();
        $this->get('/projects/create')->assertOk();
    }

    public function test_empty_form_shows_required_errors(): void
    {
        $this->post('/projects', [])->assertSessionHasErrors(['title', 'description', 'tech_stack', 'completed_at', 'image']);
    }

    public function test_title_longer_than_100_chars_fails(): void
    {
        $this->post('/projects', $this->valid(['title' => str_repeat('a', 101)]))->assertSessionHasErrors('title');
    }

    public function test_invalid_urls_fail_with_custom_messages(): void
    {
        $this->post('/projects', $this->valid(['project_url' => 'not a url', 'repository_url' => 'github.com/x']))
            ->assertSessionHasErrors([
                'project_url'    => 'Enter a full link, e.g. https://example.com',
                'repository_url' => 'Enter a full link, e.g. https://github.com/you/repo',
            ]);
    }

    public function test_invalid_and_future_dates_fail(): void
    {
        $this->post('/projects', $this->valid(['completed_at' => 'not-a-date']))->assertSessionHasErrors('completed_at');
        $this->post('/projects', $this->valid(['completed_at' => now()->addDay()->toDateString()]))
            ->assertSessionHasErrors(['completed_at' => 'The completion date cannot be in the future.']);
    }

    public function test_short_description_fails_with_custom_message(): void
    {
        $this->post('/projects', $this->valid(['description' => 'too short']))
            ->assertSessionHasErrors(['description' => 'Describe the project in at least 20 characters.']);
    }

    public function test_non_image_file_is_rejected(): void
    {
        $this->post('/projects', $this->valid(['image' => UploadedFile::fake()->create('notes.pdf', 50, 'application/pdf')]))
            ->assertSessionHasErrors('image');
    }

    public function test_image_over_2mb_is_rejected(): void
    {
        $this->post('/projects', $this->valid(['image' => UploadedFile::fake()->create('big.jpg', 3000, 'image/jpeg')]))
            ->assertSessionHasErrors(['image' => 'The image must be 2 MB or smaller.']);
    }

    public function test_duplicate_title_fails_with_custom_message(): void
    {
        $this->make();
        $this->post('/projects', $this->valid())
            ->assertSessionHasErrors(['title' => 'You already have a project with this title.']);
    }

    public function test_update_without_changing_title_or_image_still_saves(): void
    {
        $project = $this->make();

        $this->put("/projects/{$project->id}", $this->valid(['image' => null, 'tech_stack' => 'Figma']))
            ->assertSessionHasNoErrors()
            ->assertRedirect('/projects')
            ->assertSessionHas('success');

        $this->assertSame('Figma', $project->fresh()->tech_stack);
    }

    public function test_create_stores_image_and_delete_removes_it(): void
    {
        $this->post('/projects', $this->valid())->assertRedirect('/projects')->assertSessionHas('success');

        $project = Project::first();
        Storage::disk('public')->assertExists($project->image);

        $this->delete("/projects/{$project->id}")->assertRedirect('/projects')->assertSessionHas('success');
        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
        Storage::disk('public')->assertMissing($project->image);
    }

    public function test_inline_requests_from_portfolio_redirect_home(): void
    {
        $this->post('/projects', $this->valid() + ['inline' => true])->assertRedirect('/');
        $project = Project::first();
        $this->put("/projects/{$project->id}", $this->valid(['image' => null]) + ['inline' => true])->assertRedirect('/');
        $this->delete("/projects/{$project->id}", ['inline' => true])->assertRedirect('/');
    }

    public function test_public_page_lists_database_projects(): void
    {
        $this->make();
        $this->get('/')->assertOk()->assertInertia(fn ($page) => $page->component('Portfolio')->has('projects', 1));
    }
}
