/** Small tag + big heading (+ optional description) used at the top of each section. */
export default function SectionTitle({ tag, title, children }) {
    return (
        <>
            <p className="tag">{tag}</p>
            <h2 className="h2">{title}</h2>
            {children && <p className="mt-2 max-w-xl text-sm text-mute">{children}</p>}
        </>
    );
}
