import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Shield } from 'lucide-react';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar startSolid />

            <Head title="Privacy Policy" />

            {/* Header */}
            <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-700/50">
                <div className="relative max-w-7xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                            <Shield className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
                            <p className="text-slate-400 mt-2">Last updated: December 2025</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 space-y-8">
                        {/* Introduction */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                            <p className="text-slate-300 leading-relaxed">
                                NelnadoSolutions ("Company," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our online learning platform.
                            </p>
                        </div>

                        {/* Information We Collect */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Personal Information</h3>
                                    <p className="text-slate-300 leading-relaxed">
                                        We collect information you voluntarily provide, such as your name, email address, password, phone number, profile picture, and payment information when you create an account, enroll in courses, or contact us.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Course Interaction Data</h3>
                                    <p className="text-slate-300 leading-relaxed">
                                        We collect information about your course activity, including lessons viewed, progress tracking, assignments completed, quizzes taken, and interaction with course materials to provide you with a better learning experience.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Device Information</h3>
                                    <p className="text-slate-300 leading-relaxed">
                                        We automatically collect information about your device, including IP address, browser type, operating system, referral URLs, and pages visited to analyze platform usage and improve our services.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* How We Use Your Information */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                            <ul className="text-slate-300 space-y-2">
                                <li>• Provide, maintain, and improve our platform and courses</li>
                                <li>• Process transactions and send related information</li>
                                <li>• Send educational content, course updates, and announcements</li>
                                <li>• Respond to your inquiries and provide customer support</li>
                                <li>• Prevent fraudulent transactions and protect account security</li>
                                <li>• Analyze usage patterns to enhance user experience</li>
                                <li>• Comply with legal obligations and enforce our agreements</li>
                                <li>• Send promotional materials (with your consent)</li>
                            </ul>
                        </div>

                        {/* Data Security */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                            <p className="text-slate-300 leading-relaxed">
                                We implement industry-standard security measures, including SSL encryption, secure password hashing, and firewalls to protect your personal information. However, no method of transmission over the Internet is completely secure. We cannot guarantee absolute security of your data.
                            </p>
                        </div>

                        {/* Information Sharing */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
                            <p className="text-slate-300 leading-relaxed">
                                We do not sell, trade, or rent your personal information to third parties. We may share information with:
                            </p>
                            <ul className="text-slate-300 space-y-2 mt-4">
                                <li>• Service providers who assist in operating our platform</li>
                                <li>• Payment processors to complete transactions</li>
                                <li>• Legal authorities when required by law</li>
                                <li>• Your course instructors (limited to course-related information)</li>
                            </ul>
                        </div>

                        {/* Your Rights */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                            <p className="text-slate-300 leading-relaxed">
                                You have the right to:
                            </p>
                            <ul className="text-slate-300 space-y-2 mt-4">
                                <li>• Access your personal information</li>
                                <li>• Correct inaccurate data</li>
                                <li>• Request deletion of your information</li>
                                <li>• Opt-out of marketing communications</li>
                                <li>• Export your data in a structured format</li>
                            </ul>
                        </div>

                        {/* Cookies */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
                            <p className="text-slate-300 leading-relaxed">
                                We use cookies to remember your preferences, understand usage patterns, and improve your experience. You can control cookie settings through your browser. Note that disabling cookies may limit platform functionality.
                            </p>
                        </div>

                        {/* Children's Privacy */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
                            <p className="text-slate-300 leading-relaxed">
                                Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn that we have collected such information, we will delete it promptly.
                            </p>
                        </div>

                        {/* Policy Changes */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
                            <p className="text-slate-300 leading-relaxed">
                                We may update this Privacy Policy periodically to reflect changes in our practices or applicable law. We will notify you of significant changes by updating the "Last updated" date and posting the new policy on our website.
                            </p>
                        </div>

                        {/* Contact Us */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                            <p className="text-slate-300 leading-relaxed">
                                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
                            </p>
                            <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                                <p className="text-white font-semibold">NelnadoSolutions</p>
                                <p className="text-slate-300 text-sm mt-2">Email: mokomnelvis@yahoo.com</p>
                                <p className="text-slate-300 text-sm">Phone: +1 (240) 906-0295</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
