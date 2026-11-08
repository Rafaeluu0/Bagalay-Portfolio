import { useForm } from '@inertiajs/react';
import AdminLayout from '../../Components/Admin/AdminLayout';
import ProjectForm from '../../Components/Admin/ProjectForm';

export default function Edit({ project }) {
    const form = useForm({
        title: project.title,
        description: project.description,
        tech_stack: project.tech_stack,
        project_url: project.project_url ?? '',
        repository_url: project.repository_url ?? '',
        completed_at: project.completed_at,
        image: null, // stays null unless a new file is chosen (old image is kept)
    });

    // Browsers/PHP can't read a multipart PUT, so send POST with _method=put
    // and Laravel routes it to ProjectController@update.
    const submit = (e) => {
        e.preventDefault();
        form.transform((d) => ({ ...d, _method: 'put' }));
        form.post(`/projects/${project.id}`, { forceFormData: true });
    };

    return (
        <AdminLayout title={`Edit ${project.title}`}>
            <h1 className="mb-6 font-head text-2xl font-bold">Edit project</h1>
            <ProjectForm form={form} currentImageUrl={project.image_url} submitLabel="Save changes" onSubmit={submit} />
        </AdminLayout>
    );
}
