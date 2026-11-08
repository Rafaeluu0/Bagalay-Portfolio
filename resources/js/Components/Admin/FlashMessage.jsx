import { usePage } from '@inertiajs/react';

/** Shows the `success` flash message set by the controller (create / update / delete). */
export default function FlashMessage() {
    const { flash } = usePage().props;
    if (!flash?.success) return null;

    return (
        <p role="status" className="mb-6 rounded-lg border border-acc/40 bg-acc/10 p-3 text-sm text-acc">
            ✓ {flash.success}
        </p>
    );
}
