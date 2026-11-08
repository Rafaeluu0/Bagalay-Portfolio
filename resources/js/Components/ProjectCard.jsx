import Card from './Card';

const formatDate = (iso) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

/** `onEdit` / `onDelete` are passed only for a logged-in admin; visitors see a plain card. */
export default function ProjectCard({ project, onEdit, onDelete }) {
    const p = project;

    return (
        <Card hover className="flex flex-col overflow-hidden !p-0">
            {p.image_url ? (
                <img src={p.image_url} alt={p.title} loading="lazy" className="aspect-video w-full object-cover" />
            ) : (
                <div className="grid aspect-video w-full place-items-center bg-line font-mono text-xs uppercase tracking-widest text-mute">
                    No image yet
                </div>
            )}

            <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-acc">
                    Completed <time dateTime={p.completed_at}>{formatDate(p.completed_at)}</time>
                </p>
                <h3 className="mt-2 font-head text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-mute">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech_list.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>

                {(p.project_url || p.repository_url) && (
                    <div className="mt-5 flex gap-5 text-sm">
                        {p.project_url && (
                            <a href={p.project_url} target="_blank" rel="noopener noreferrer" className="text-acc underline-offset-4 hover:underline">View project ↗</a>
                        )}
                        {p.repository_url && (
                            <a href={p.repository_url} target="_blank" rel="noopener noreferrer" className="text-acc underline-offset-4 hover:underline">Source code ↗</a>
                        )}
                    </div>
                )}

                {(onEdit || onDelete) && (
                    <div className="mt-auto pt-5">
                        <div className="flex gap-4 border-t border-line pt-3 text-sm">
                            <button type="button" onClick={onEdit} className="text-acc hover:underline">Edit</button>
                            <button type="button" onClick={onDelete} className="text-red-600 hover:underline dark:text-red-400">Delete</button>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}
