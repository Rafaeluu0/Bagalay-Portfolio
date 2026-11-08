import { Link } from '@inertiajs/react';
import { useMemo } from 'react';
import FormField from './FormField';

/**
 * One form for both Create and Edit. The page owns the Inertia `form` object (useForm),
 * so typed values survive a failed submit and each server error shows by its field.
 * `currentImageUrl` is the saved image when editing.
 */
export default function ProjectForm({ form, currentImageUrl, submitLabel, onSubmit, onCancel }) {
    const { data, setData, errors, processing } = form;
    const bind = (key) => ({
        value: data[key] ?? '',
        onChange: (e) => setData(key, e.target.value),
        error: errors[key],
    });

    // Preview of the newly chosen file, falling back to the saved image
    const preview = useMemo(
        () => (data.image instanceof File ? URL.createObjectURL(data.image) : currentImageUrl),
        [data.image, currentImageUrl],
    );

    return (
        <form onSubmit={onSubmit} noValidate className="card space-y-4">
            <FormField id="title" label="Title *" placeholder="Digital Brand Identity & Editorial System" {...bind('title')} />

            <FormField id="description" label="Description *" as="textarea" rows={4}
                hint="20 to 500 characters" placeholder="What the project is about..." {...bind('description')} />

            <FormField id="tech_stack" label="Tech stack *" placeholder="Illustrator, InDesign, Photoshop"
                hint="Separate with commas" {...bind('tech_stack')} />

            <div className="grid gap-4 sm:grid-cols-2">
                <FormField id="project_url" label="Project URL" type="text" inputMode="url" placeholder="https://example.com"
                    hint="Optional" {...bind('project_url')} />
                <FormField id="repository_url" label="Repository URL" type="text" inputMode="url" placeholder="https://github.com/you/repo"
                    hint="Optional" {...bind('repository_url')} />
            </div>

            <FormField id="completed_at" label="Date completed *" type="date" {...bind('completed_at')} />

            <div>
                <FormField id="image" label={currentImageUrl ? 'Replace image' : 'Image *'} type="file" accept="image/*"
                    hint="JPG, PNG or WebP, max 20 MB" error={errors.image}
                    onChange={(e) => setData('image', e.target.files[0] ?? null)} />
                {preview && <img src={preview} alt="Image preview" className="mt-2 aspect-video w-full max-w-xs rounded-lg border border-line object-cover" />}
            </div>

            <div className="flex items-center gap-3">
                <button type="submit" disabled={processing} className="rounded-lg bg-acc px-5 py-2.5 text-sm font-medium text-bg disabled:opacity-60">
                    {processing ? 'Saving...' : submitLabel}
                </button>
                {onCancel
                    ? <button type="button" onClick={onCancel} className="text-sm text-mute hover:text-ink">Cancel</button>
                    : <Link href="/projects" className="text-sm text-mute hover:text-ink">Cancel</Link>}
            </div>
        </form>
    );
}
