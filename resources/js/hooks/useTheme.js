import { useEffect, useState } from 'react';

/** Light/dark mode. The <head> script sets the first paint; this keeps React in sync. */
export default function useTheme() {
    const [dark, setDark] = useState(true);

    useEffect(() => {
        setDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle('dark', next);
        try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch { /* storage blocked */ }
    };

    return [dark, toggle];
}
