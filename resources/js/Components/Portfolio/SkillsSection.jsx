import { useState } from 'react';
import { SKILLS } from '../../data/content';
import FilterBar, { matches } from '../FilterBar';
import SectionTitle from '../SectionTitle';
import SkillCard from '../SkillCard';

const FILTERS = [
    ['all', 'All Skills'],
    ['design', 'Design & Editing (Adobe)'],
    ['security', 'Cybersecurity & Pentest'],
];

export default function SkillsSection() {
    const [active, setActive] = useState('all');
    const [query, setQuery] = useState('');

    const visible = SKILLS.filter((s) =>
        matches(s, active, query, `${s.name} ${s.tag} ${s.description} ${s.proficiency}%`),
    );

    return (
        <section id="skills">
            <div className="mx-auto max-w-6xl px-5">
                <SectionTitle tag="Skills" title="Design Suite & Security Toolchain">
                    Filter by domain or search. Bars are my own confidence rating, not exam scores.
                </SectionTitle>

                <FilterBar
                    id="skill"
                    groupLabel="Filter skills"
                    options={FILTERS}
                    active={active}
                    onFilter={setActive}
                    query={query}
                    onQuery={setQuery}
                    placeholder="Search Photoshop, Nmap..."
                    shown={visible.length}
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {visible.map((s) => <SkillCard key={s.id} skill={s} />)}
                </div>
                {visible.length === 0 && <p className="mt-6 text-mute">No skills match your search.</p>}
            </div>
        </section>
    );
}
