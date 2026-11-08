import { Head, Link, router, usePage } from '@inertiajs/react';
import ThemeToggle from '../ThemeToggle';
import FlashMessage from './FlashMessage';

/** Shared shell for the management pages: header, flash message, content. */
export default function AdminLayout({ title, children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen">
            <Head title={`${title} | Manage`} />
            <header className="border-b border-line bg-bg/85">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3">
                    <div className="flex items-center gap-5">
                        <Link href="/projects" className="font-head text-sm font-bold">Manage Portfolio</Link>
                        <a href="/" className="text-sm text-mute hover:text-ink">View site ↗</a>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-mute">
                        <span className="hidden sm:inline">{auth?.user?.name}</span>
                        {auth?.user && <button type="button" className="pill" onClick={() => router.post('/logout')}>Log out</button>}
                        <ThemeToggle />
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-5xl px-5 py-10">
                <FlashMessage />
                {children}
            </main>
        </div>
    );
}
