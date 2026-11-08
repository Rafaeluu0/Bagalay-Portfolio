import { useForm } from '@inertiajs/react';
import AdminLayout from '../../Components/Admin/AdminLayout';
import ProjectForm from '../../Components/Admin/ProjectForm';

export default function Create() {
    const form = useForm({
        title: '',
        description: '',
        tech_stack: '',
        project_url: '',
        repository_url: '',
        completed_at: '',
        image: null,
    });

    // POST /projects -> ProjectController@store (multipart because of the image).
    // On validation failure Laravel redirects back; Inertia fills form.errors and keeps form.data.
    const submit = (e) => {
        e.preventDefault();
        form.post('/projects', { forceFormData: true });
    };

    return (
        <AdminLayout title="Add project">
            <h1 className="mb-6 font-head text-2xl font-bold">Add a project</h1>
            <ProjectForm form={form} submitLabel="Add project" onSubmit={submit} />
        </AdminLayout>
    );
}
