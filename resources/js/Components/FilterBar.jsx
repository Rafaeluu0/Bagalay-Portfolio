/** Category pills (optional) + search box + screen-reader result count (shared by Skills and Projects). */
export default function FilterBar({ id, groupLabel, options, active, onFilter, query, onQuery, placeholder, shown, children }) {
    return (
        <>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                {options && (
                    <div className="flex flex-wrap gap-2" role="group" aria-label={groupLabel}>
                        {options.map(([value, label]) => (
                            <button
                                key={value}
                                type="button"
                                className="pill"
                                aria-pressed={active === value}
                                onClick={() => onFilter(value)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                )}
                <div className="ml-auto">
                    <label htmlFor={`${id}-search`} className="sr-only">Search</label>
                    <input
                        id={`${id}-search`}
                        type="search"
                        value={query}
                        onChange={(e) => onQuery(e.target.value)}
                        placeholder={placeholder}
                        className="field w-60"
                    />
                </div>
            </div>
            <p className="sr-only" aria-live="polite">{shown} result{shown === 1 ? '' : 's'} shown</p>
            {children}
        </>
    );
}

/** Same matching rule as the original script: category AND text search. */
export function matches(item, active, query, text) {
    const cats = String(item.category ?? '').split(/\s+/);
    return (active === 'all' || cats.includes(active)) && text.toLowerCase().includes(query.trim().toLowerCase());
}
