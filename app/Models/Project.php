<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    // Mass-assignment whitelist: only these columns can be set through create()/update().
    // Without it Laravel throws MassAssignmentException.
    protected $fillable = [
        'title',
        'description',
        'tech_stack',
        'project_url',
        'repository_url',
        'image',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'date:Y-m-d',
    ];

    // Extra fields added to the JSON sent to React
    protected $appends = ['image_url', 'tech_list'];

    /** Relative URL so it works on any host/port (needs `php artisan storage:link`). */
    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? '/storage/' . $this->image : null;
    }

    /** "Illustrator, InDesign" => ['Illustrator', 'InDesign'] */
    public function getTechListAttribute(): array
    {
        return array_values(array_filter(array_map('trim', explode(',', (string) $this->tech_stack))));
    }
}
