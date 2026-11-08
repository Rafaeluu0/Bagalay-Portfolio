import { useState } from 'react';
import { CERTS, EDUCATION } from '../../data/content';
import Card from '../Card';
import SectionTitle from '../SectionTitle';

const TABS = [
    ['edu', 'Education & Studies'],
    ['cert', 'Security Certs & Freelance'],
];

export default function EducationSection() {
    const [tab, setTab] = useState('edu');
    const items = tab === 'edu' ? EDUCATION : CERTS;

    // Arrow keys move between tabs (ARIA tabs pattern)
    const onKey = (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const next = tab === 'edu' ? 'cert' : 'edu';
        setTab(next);
        document.getElementById(`tab-${next}`)?.focus();
    };

    return (
        <section id="education">
            <div className="mx-auto max-w-6xl px-5">
                <p className="tag">Education &amp; certifications</p>
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <h2 className="h2">Academic Track &amp; Experience</h2>
                    <div className="flex gap-2" role="tablist" aria-label="Education or experience" onKeyDown={onKey}>
                        {TABS.map(([id, label]) => (
                            <button
                                key={id}
                                type="button"
                                role="tab"
                                id={`tab-${id}`}
                                className="pill"
                                aria-selected={tab === id}
                                aria-controls={`panel-${id}`}
                                tabIndex={tab === id ? 0 : -1}
                                onClick={() => setTab(id)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-6 space-y-4">
                    {items.map((it) => (
                        <Card key={it.title}>
                            <p className="font-mono text-xs text-acc">{it.meta}</p>
                            <h3 className="mt-2 font-head text-lg font-bold">{it.title}</h3>
                            <p className="mt-1 text-sm text-mute">{it.text}</p>
                            {it.chips && (
                                <div className="mt-3 flex gap-2">
                                    {it.chips.map((c) => <span key={c} className="chip">{c}</span>)}
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
