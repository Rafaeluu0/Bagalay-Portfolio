<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /** GET /projects - list with search and pagination. */
    public function index(Request $request): Response
    {
        $projects = Project::query()
            ->when($request->query('search'), fn ($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->orderByDesc('completed_at')
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'filters'  => $request->only('search'),
        ]);
    }

    /** GET /projects/create */
    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    /** POST /projects - validate, store the image, save, redirect with a flash message. */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate($this->rules(), $this->messages());
        $data['image'] = $request->file('image')->store('projects', 'public');

        Project::create($data);

        return $this->done($request, 'Project added successfully.');
    }

    /** GET /projects/{project}/edit */
    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Edit', ['project' => $project]);
    }

    /** PUT /projects/{project} - same rules; unique ignores this row, image is optional. */
    public function update(Request $request, Project $project): RedirectResponse
    {
        $data = $request->validate($this->rules($project), $this->messages());

        if ($request->hasFile('image')) {
            // Replace: remove the old file, store the new one
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $data['image'] = $request->file('image')->store('projects', 'public');
        } else {
            unset($data['image']); // keep the current image
        }

        $project->update($data);

        return $this->done($request, 'Project updated successfully.');
    }

    /** DELETE /projects/{project} */
    public function destroy(Request $request, Project $project): RedirectResponse
    {
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }
        $project->delete();

        return $this->done($request, 'Project deleted.');
    }

    /**
     * Where to go after a successful write. Requests sent from the public portfolio's
     * inline editor carry `inline=1` and return there; the admin pages return to the list.
     */
    private function done(Request $request, string $message): RedirectResponse
    {
        $target = $request->boolean('inline') ? route('home') : route('projects.index');

        return redirect($target)->with('success', $message);
    }

    /**
     * Rules shared by store() and update(). Passing the current project makes the
     * unique rule ignore its own row, and makes the image optional (keep the old one).
     */
    private function rules(?Project $project = null): array
    {
        return [
            'title'          => ['required', 'string', 'min:3', 'max:100',
                                 Rule::unique('projects', 'title')->ignore($project?->id)],
            'description'    => ['required', 'string', 'min:20', 'max:500'],
            'tech_stack'     => ['required', 'string', 'max:150'],
            'project_url'    => ['nullable', 'url:http,https', 'max:255'],
            'repository_url' => ['nullable', 'url:http,https', 'max:255'],
            'completed_at'   => ['required', 'date', 'before_or_equal:today'],
            'image'          => [$project ? 'nullable' : 'required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:20480'],
        ];
    }

    private function messages(): array
    {
        return [
            'title.unique'                 => 'You already have a project with this title.',
            'description.min'              => 'Describe the project in at least :min characters.',
            'project_url.url'              => 'Enter a full link, e.g. https://example.com',
            'repository_url.url'           => 'Enter a full link, e.g. https://github.com/you/repo',
            'completed_at.date'            => 'Enter a valid date.',
            'completed_at.before_or_equal' => 'The completion date cannot be in the future.',
            'image.required'               => 'Please upload a project image.',
            'image.image'                  => 'The file must be an image (JPG, PNG or WebP).',
            'image.mimes'                  => 'Only JPG, PNG or WebP images are allowed.',
            'image.max'                    => 'The image must be 20 MB or smaller.',
            'image.uploaded'               => 'The image failed to upload. Keep it under 20 MB (check upload_max_filesize in php.ini).',
        ];
    }
}
