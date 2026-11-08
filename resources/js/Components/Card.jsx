/** Bordered card. Pass `hover` for the glow/lift effect. */
export default function Card({ as: Tag = 'article', hover = false, className = '', children, ...props }) {
    return (
        <Tag className={`card ${hover ? 'card-hover' : ''} ${className}`} {...props}>
            {children}
        </Tag>
    );
}
