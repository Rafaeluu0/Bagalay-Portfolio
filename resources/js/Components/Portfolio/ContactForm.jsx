import { useState } from 'react';
import Card from '../Card';

const RULES = {
    name: [(v) => v.length >= 2, 'Please enter your name.'],
    email: [(v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Enter a valid email address.'],
    message: [(v) => v.length >= 10, 'Message must be at least 10 characters.'],
};
const EMPTY = { name: '', email: '', inquiry: 'Design & Branding Project (Adobe Suite)', message: '' };

/** Demo form: validated in the browser only, nothing is sent (same as the original). */
export default function ContactForm() {
    const [data, setData] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [ok, setOk] = useState(false);

    const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

    const submit = (e) => {
        e.preventDefault();
        const found = {};
        Object.entries(RULES).forEach(([k, [test, msg]]) => { if (!test(data[k].trim())) found[k] = msg; });
        setErrors(found);
        setOk(Object.keys(found).length === 0);
        if (Object.keys(found).length === 0) setData(EMPTY);
        else document.getElementById(Object.keys(found)[0])?.focus();
    };

    const err = (k) => <p id={`${k}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400">{errors[k]}</p>;

    return (
        <Card as="form" noValidate onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className="text-sm text-mute">Your name *</label>
                    <input id="name" name="name" type="text" autoComplete="name" placeholder="Juan Dela Cruz" className="field mt-1"
                        value={data.name} onChange={set('name')} aria-invalid={Boolean(errors.name)} aria-describedby="name-error" />
                    {err('name')}
                </div>
                <div>
                    <label htmlFor="email" className="text-sm text-mute">Email *</label>
                    <input id="email" name="email" type="email" autoComplete="email" placeholder="juan@organization.org" className="field mt-1"
                        value={data.email} onChange={set('email')} aria-invalid={Boolean(errors.email)} aria-describedby="email-error" />
                    {err('email')}
                </div>
            </div>
            <div>
                <label htmlFor="inquiry" className="text-sm text-mute">Inquiry type</label>
                <select id="inquiry" name="inquiry" className="field mt-1" value={data.inquiry} onChange={set('inquiry')}>
                    <option>Design &amp; Branding Project (Adobe Suite)</option>
                    <option>Cybersecurity Internship</option>
                    <option>Lab Collaboration</option>
                    <option>Other</option>
                </select>
            </div>
            <div>
                <label htmlFor="message" className="text-sm text-mute">Message / scope description *</label>
                <textarea id="message" name="message" rows={5} className="field mt-1"
                    placeholder="Describe your design needs, internship opportunity, or proposed collaboration..."
                    value={data.message} onChange={set('message')} aria-invalid={Boolean(errors.message)} aria-describedby="message-error" />
                {err('message')}
            </div>
            <button type="submit" className="w-full rounded-lg bg-acc py-3 text-sm font-medium text-bg">Send Message</button>
            {ok && (
                <p role="status" className="rounded-lg border border-acc/40 bg-acc/10 p-3 text-sm text-acc">
                    Thanks! Your message was validated. (This demo form does not send data.)
                </p>
            )}
        </Card>
    );
}
