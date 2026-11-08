import Card from './Card';

export default function SkillCard({ skill }) {
    return (
        <Card>
            <div className="flex items-start justify-between gap-2">
                <h3 className="font-head font-bold">{skill.name}</h3>
                <span className="chip uppercase">{skill.tag}</span>
            </div>
            <p className="mt-2 text-sm text-mute">{skill.description}</p>
            <div className="mt-4 flex justify-between font-mono text-[11px] text-mute">
                <span>Proficiency level</span>
                <span className="text-acc">{skill.proficiency}%</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded bg-line">
                <div className="h-full rounded bg-acc" style={{ width: `${skill.proficiency}%` }} />
            </div>
        </Card>
    );
}
