const SOCIAL = [
    ['GitHub', 'https://github.com/'],
    ['LinkedIn', 'https://www.linkedin.com/'],
    ['TryHackMe', 'https://tryhackme.com/'],
];

export default function Footer() {
    return (
        <footer className="border-t border-line py-8">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 text-sm text-mute">
                <div>
                    <p className="font-head font-bold text-ink">Rafael Bagalay</p>
                    <p className="text-xs">Open for security internships and creative freelance inquiries.</p>
                </div>
                <ul className="flex gap-5">
                    {SOCIAL.map(([label, href]) => (
                        <li key={label}><a href={href} rel="noopener noreferrer" className="hover:text-ink">{label}</a></li>
                    ))}
                    <li><a href="#home" className="hover:text-ink">↑ Back to top</a></li>
                    <li><a href="/login" className="hover:text-ink">Admin</a></li>
                </ul>
                <p className="w-full font-mono text-[11px]">© 2026 Rafael Bagalay · Fonts: Google Fonts · Photo: own work · Built with Laravel, Inertia, React &amp; Tailwind CSS</p>
            </div>
        </footer>
    );
}
