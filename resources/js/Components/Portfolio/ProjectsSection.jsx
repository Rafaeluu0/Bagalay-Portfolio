import { router } from '@inertiajs/react';
import { useState } from 'react';
import ConfirmDialog from '../Admin/ConfirmDialog';
import FlashMessage from '../Admin/FlashMessage';
import ProjectModal from '../Admin/ProjectModal';
import FilterBar, { matches } from '../FilterBar';
import ProjectCard from '../ProjectCard';
import SectionTitle from '../SectionTitle';

/**
 * `projects` comes from the database via PortfolioController.
 * Add / Edit / Delete are open to everyone (no login), as requested.
 */
export default function ProjectsSection({ projects }) {
    const [query, setQuery] = useState('');
    const [editing, setEditing] = useState(null);   // null | 'new' | project record
    const [target, setTarget] = useState(null);     // project awaiting delete confirmation
    const [deleting, setDeleting] = useState(false);

    const visible = projects.filter((p) =>
        matches(p, 'all', query, `${p.title} ${p.description} ${p.tech_stack}`),
    );

    const confirmDelete = () => {
        setDeleting(true);
        router.delete(`/projects/${target.id}`, {
            data: { inline: true },
            preserveScroll: true,
            onFinish: () => { setDeleting(false); setTarget(null); },
        });
    };

    return (
        <section id="projects">
            <div className="mx-auto max-w-6xl px-5">
                <SectionTitle tag="Projects" title="Security Labs & Editorial Case Studies" />

                <div className="mt-6">
                    <FlashMessage />
                    <div className="flex flex-wrap items-center gap-3">
                        <button type="button" onClick={() => setEditing('new')}
                            className="rounded-full bg-acc px-4 py-2 text-sm font-medium text-bg">
                            + Add project
                        </button>
                        <a href="/projects" className="text-sm text-mute hover:text-ink">Manage all projects →</a>
                    </div>
                </div>

                <FilterBar
                    id="project"
                    groupLabel="Filter projects"
                    query={query}
                    onQuery={setQuery}
                    placeholder="Search projects..."
                    shown={visible.length}
                />

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                    {visible.map((p) => (
                        <ProjectCard
                            key={p.id}
                            project={p}
                            onEdit={() => setEditing(p)}
                            onDelete={() => setTarget(p)}
                        />
                    ))}
                </div>
                {visible.length === 0 && (
                    <p className="mt-6 text-mute">
                        {projects.length === 0 ? 'No projects have been added yet.' : 'No projects match your search.'}
                    </p>
                )}
            </div>

            {editing && (
                <ProjectModal
                    key={editing === 'new' ? 'new' : editing.id}
                    project={editing === 'new' ? null : editing}
                    onClose={() => setEditing(null)}
                />
            )}
            <ConfirmDialog noun="project" target={target?.title} processing={deleting} onConfirm={confirmDelete} onCancel={() => setTarget(null)} />
        </section>
    );
}
