import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import ProjectForm from './ProjectForm';

/**
 * Add/Edit form in a dialog, opened from the public Projects section.
 * `project` = record to edit, or null to add. Mount it only while open (with a key)
 * so the form state resets each time.
 */
export default function ProjectModal({ project, onClose }) {
    const ref = useRef(null);
    const editing = Boolean(project);

    const form = useForm({
        title: project?.title ?? '',
        description: project?.description ?? '',
        tech_stack: project?.tech_stack ?? '',
        project_url: project?.project_url ?? '',
        repository_url: project?.repository_url ?? '',
        completed_at: project?.completed_at ?? '',
        image: null,
    });

    useEffect(() => { ref.current?.showModal(); }, []);

    const submit = (e) => {
        e.preventDefault();
        // `inline` makes ProjectController redirect back to the portfolio, not /projects.
        // Files can't be sent with a real PUT, so edits are POSTs with _method=put.
        form.transform((d) => ({ ...d, inline: true, ...(editing ? { _method: 'put' } : {}) }));
        form.post(editing ? `/projects/${project.id}` : '/projects', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: onClose,
        });
    };

    return (
        <dialog
            ref={ref}
            onClose={onClose}
            aria-labelledby="project-modal-title"
            className="m-auto w-[min(94vw,38rem)] rounded-xl border border-line bg-card p-0 text-ink backdrop:bg-black/60"
        >
            <div className="max-h-[90vh] overflow-y-auto p-6">
                <h3 id="project-modal-title" className="mb-4 font-head text-xl font-bold">
                    {editing ? `Edit ${project.title}` : 'Add a project'}
                </h3>
                {/* Strip the form's own card border inside the dialog */}
                <div className="[&_.card]:border-0 [&_.card]:p-0">
                    <ProjectForm
                        form={form}
                        currentImageUrl={project?.image_url}
                        submitLabel={editing ? 'Save changes' : 'Add project'}
                        onSubmit={submit}
                        onCancel={onClose}
                    />
                </div>
            </div>
        </dialog>
    );
}
