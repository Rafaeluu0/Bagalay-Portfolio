import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const LINKS = [
    ['home', 'Home'],
    ['about', 'About'],
    ['skills', 'Skills'],
    ['projects', 'Projects'],
    ['education', 'Education'],
    ['contact', 'Contact'],
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState('home');

    // Highlight the link of the section in the middle of the viewport
    useEffect(() => {
        if (!('IntersectionObserver' in window)) return;
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
            { rootMargin: '-40% 0px -55% 0px' },
        );
        LINKS.forEach(([id]) => {
            const el = document.getElementById(id);
            if (el) io.observe(el);
        });
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    return (
        <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
                <a href="#home" className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-md border border-line bg-card font-mono text-acc" aria-hidden="true">R</span>
                    <span className="font-head text-sm font-bold leading-tight">
                        Rafael U. Bagalay
                        <span className="block font-mono text-[10px] font-normal uppercase tracking-widest text-mute">Layout Artist &amp; Pentesting</span>
                    </span>
                </a>

                <nav aria-label="Main">
                    <ul
                        id="menu"
                        className={`absolute left-0 right-0 top-full flex-col gap-4 border-b border-line bg-bg p-5 text-sm text-mute md:static md:flex md:flex-row md:gap-7 md:border-0 md:bg-transparent md:p-0 ${open ? 'flex' : 'hidden'}`}
                    >
                        {LINKS.map(([id, label]) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    onClick={() => setOpen(false)}
                                    aria-current={current === id ? 'page' : undefined}
                                    className="hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-acc"
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <a href="#contact" className="hidden rounded-full bg-acc px-4 py-2 text-sm font-medium text-bg sm:inline-block">Get in touch</a>
                    <button
                        type="button"
                        aria-expanded={open}
                        aria-controls="menu"
                        aria-label="Toggle menu"
                        onClick={() => setOpen((o) => !o)}
                        className="grid size-9 place-items-center rounded-full border border-line bg-card md:hidden"
                    >
                        ☰
                    </button>
                </div>
            </div>
        </header>
    );
}
