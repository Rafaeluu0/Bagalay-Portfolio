import useTheme from '../hooks/useTheme';

export default function ThemeToggle() {
    const [dark, toggle] = useTheme();

    return (
        <button
            type="button"
            onClick={toggle}
            aria-pressed={dark}
            aria-label="Dark mode"
            className="grid size-9 place-items-center rounded-full border border-line bg-card"
        >
            <img src="/images/sun.png" alt="" aria-hidden="true" className="size-6 dark:hidden" />
            <img src="/images/moon.png" alt="" aria-hidden="true" className="hidden size-6 dark:inline" />
        </button>
    );
}
