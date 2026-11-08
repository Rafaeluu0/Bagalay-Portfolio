import { useEffect, useRef } from 'react';

/** Delete confirmation. Open it by passing the record name as `target`; null closes it. */
export default function ConfirmDialog({ target, noun = 'item', processing, onConfirm, onCancel }) {
    const ref = useRef(null);

    useEffect(() => {
        const dlg = ref.current;
        if (target && !dlg.open) dlg.showModal();
        if (!target && dlg.open) dlg.close();
    }, [target]);

    return (
        <dialog
            ref={ref}
            onClose={onCancel}
            aria-labelledby="confirm-title"
            className="m-auto w-[min(92vw,26rem)] rounded-xl border border-line bg-card p-6 text-ink backdrop:bg-black/60"
        >
            <h3 id="confirm-title" className="font-head text-lg font-bold">Delete this {noun}?</h3>
            <p className="mt-3 text-sm text-mute">
                <strong className="text-ink">{target}</strong> will be removed from the database and from your public portfolio. This cannot be undone.
            </p>
            <div className="mt-5 flex gap-3">
                <button type="button" disabled={processing} onClick={onConfirm}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">
                    {processing ? 'Deleting...' : 'Yes, delete'}
                </button>
                <button type="button" className="pill" onClick={onCancel}>Cancel</button>
            </div>
        </dialog>
    );
}
