import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../Components/Admin/AdminLayout';
import ConfirmDialog from '../../Components/Admin/ConfirmDialog';

const pageLabel = (html) => html.replace('&laquo; ', '← ').replace(' &raquo;', ' →');

export default function Index({ projects, filters }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [target, setTarget] = useState(null); // project awaiting delete confirmation
    const [deleting, setDeleting] = useState(false);

    const confirmDelete = () => {
        setDeleting(true);
        router.delete(`/projects/${target.id}`, {
            preserveScroll: true,
            onFinish: () => { setDeleting(false); setTarget(null); },
        });
    };

    return (
        <AdminLayout title="Projects">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="font-head text-2xl font-bold">Projects <span className="font-mono text-sm font-normal text-mute">({projects.total})</span></h1>
                <Link href="/projects/create" className="rounded-full bg-acc px-4 py-2 text-sm font-medium text-bg">+ Add project</Link>
            </div>

            {/* GET /projects?search=... handled by ProjectController@index */}
            <form className="mt-6 flex flex-wrap gap-3"
                onSubmit={(e) => { e.preventDefault(); router.get('/projects', { search }, { preserveState: true, replace: true }); }}>
                <label htmlFor="q" className="sr-only">Search projects</label>
                <input id="q" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title..." className="field w-60" />
                <button type="submit" className="pill">Search</button>
            </form>

            <div className="card mt-6 overflow-x-auto !p-0">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-line font-mono text-[11px] uppercase tracking-widest text-mute">
                        <tr>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Project</th>
                            <th className="px-4 py-3">Completed</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.data.map((p) => (
                            <tr key={p.id} className="border-b border-line last:border-0">
                                <td className="px-4 py-3">
                                    {p.image_url
                                        ? <img src={p.image_url} alt="" className="h-12 w-20 rounded object-cover" />
                                        : <div className="grid h-12 w-20 place-items-center rounded bg-line font-mono text-[10px] text-mute">none</div>}
                                </td>
                                <td className="px-4 py-3">
                                    <p className="font-medium">{p.title}</p>
                                    <p className="text-xs text-mute">{p.tech_stack}</p>
                                </td>
                                <td className="px-4 py-3 font-mono text-xs text-mute">{p.completed_at}</td>
                                <td className="px-4 py-3 text-right">
                                    <Link href={`/projects/${p.id}/edit`} className="text-acc hover:underline">Edit</Link>
                                    <button type="button" onClick={() => setTarget(p)} className="ml-4 text-red-600 hover:underline dark:text-red-400">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {projects.data.length === 0 && (
                            <tr><td colSpan={4} className="px-4 py-8 text-center text-mute">No projects found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {projects.last_page > 1 && (
                <nav className="mt-6 flex flex-wrap gap-2" aria-label="Pagination">
                    {projects.links.map((l, i) => (
                        l.url
                            ? <Link key={i} href={l.url} preserveScroll className="pill" aria-pressed={l.active}>{pageLabel(l.label)}</Link>
                            : <span key={i} className="pill opacity-50">{pageLabel(l.label)}</span>
                    ))}
                </nav>
            )}

            <ConfirmDialog noun="project" target={target?.title} processing={deleting} onConfirm={confirmDelete} onCancel={() => setTarget(null)} />
        </AdminLayout>
    );
}
