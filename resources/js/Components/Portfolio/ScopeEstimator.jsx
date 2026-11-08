import { useState } from 'react';
import Card from '../Card';

const TYPES = [
    [750, 'Brand & Logo Suite'],
    [600, 'Editorial & Report Design'],
    [350, 'Photo Retouching'],
    [900, 'Security Internship'],
];
const TIMES = [
    [1, '1-2 Weeks'],
    [1.3, '3-4 Weeks'],
    [2.2, 'Semester'],
];

function Group({ id, label, options, value, onPick, cols }) {
    return (
        <>
            <p className="mt-4 text-sm" id={id}>{label}</p>
            <div className={`mt-2 grid gap-2 ${cols}`} role="group" aria-labelledby={id}>
                {options.map(([v, text]) => (
                    <button key={v} type="button" className="pill rounded-lg" aria-pressed={value === v} onClick={() => onPick(v)}>
                        {text}
                    </button>
                ))}
            </div>
        </>
    );
}

export default function ScopeEstimator() {
    const [base, setBase] = useState(750);
    const [mult, setMult] = useState(1.3);

    return (
        <Card as="div" id="estimator">
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-mute">Interactive scope estimator</h3>
            <Group id="est-l1" label="1. Project / engagement type" options={TYPES} value={base} onPick={setBase} cols="grid-cols-2" />
            <Group id="est-l2" label="2. Target timeline" options={TIMES} value={mult} onPick={setMult} cols="grid-cols-3" />
            <div className="mt-5 flex items-end justify-between rounded-lg border border-line bg-bg p-4">
                <div>
                    <p className="font-mono text-[10px] uppercase text-mute">Estimated scope</p>
                    <p className="font-head text-2xl font-bold text-acc" aria-live="polite">${Math.round(base * mult)} USD</p>
                </div>
                <div className="text-right">
                    <p className="font-mono text-[10px] uppercase text-mute">Earliest availability</p>
                    <p className="text-sm">Immediate / Flexible</p>
                </div>
            </div>
        </Card>
    );
}
