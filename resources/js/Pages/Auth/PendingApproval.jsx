import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function PendingApproval() {
    return (
        <GuestLayout>
            <Head title="Account Pending Approval" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Thanks for signing up! Your account registration is currently pending approval by an administrator. 
                You will be notified via email once your account has been approved and you can log in.
            </div>
            
            <div className="mt-4 flex items-center justify-between">
                <a
                    href="/"
                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Back to Home
                </a>
            </div>
        </GuestLayout>
    );
}
