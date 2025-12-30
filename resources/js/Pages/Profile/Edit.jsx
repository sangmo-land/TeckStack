import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { User, Shield, Trash2 } from 'lucide-react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout useMarketingNavbar>
            <Head title="Profile Settings" />

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Hero Section */}
                <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-32 pb-12">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
                    </div>

                    <div className="relative max-w-7xl mx-auto">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-3xl font-bold text-white">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-white">{user.name}</h1>
                                <p className="text-slate-400 mt-1">{user.email}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Forms Section */}
                <section className="px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Profile Information */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <User className="w-5 h-5 text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                            </div>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </div>

                        {/* Update Password */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Shield className="w-5 h-5 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Security</h2>
                            </div>
                            <UpdatePasswordForm />
                        </div>

                        {/* Delete Account */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-red-500/20 rounded-lg">
                                    <Trash2 className="w-5 h-5 text-red-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Danger Zone</h2>
                            </div>
                            <DeleteUserForm />
                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
