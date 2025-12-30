import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { FileText } from 'lucide-react';

export default function Terms() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar startSolid />

            <Head title="Terms of Service" />

            {/* Header */}
            <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-700/50">
                <div className="relative max-w-7xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                            <FileText className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
                            <p className="text-slate-400 mt-2">Last updated: December 2025</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 space-y-8">
                        {/* Agreement */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
                            <p className="text-slate-300 leading-relaxed">
                                By accessing and using NelnadoSolutions platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>
                        </div>

                        {/* Use License */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Use License</h2>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                Permission is granted to temporarily download one copy of the materials (information or software) on NelnadoSolutions for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="text-slate-300 space-y-2">
                                <li>• Modify or copy the materials</li>
                                <li>• Use the materials for any commercial purpose or for any public display</li>
                                <li>• Attempt to decompile or reverse engineer any software contained on the platform</li>
                                <li>• Transfer the materials to another person or "mirror" the materials on any other server</li>
                                <li>• Remove any copyright or other proprietary notations from the materials</li>
                                <li>• Upload viruses, worms, or any other harmful code to the platform</li>
                            </ul>
                        </div>

                        {/* User Accounts */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">User Accounts and Registration</h2>
                            <p className="text-slate-300 leading-relaxed">
                                When you create an account, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your password and account information. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account or any other breach of security.
                            </p>
                        </div>

                        {/* Course Content */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Course Content and Learning Materials</h2>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                All course materials, lectures, videos, assignments, and content provided are for educational purposes only and are the intellectual property of NelnadoSolutions or our instructors. You agree to:
                            </p>
                            <ul className="text-slate-300 space-y-2">
                                <li>• Use course materials solely for your personal learning</li>
                                <li>• Not distribute, sell, or share course content with unauthorized parties</li>
                                <li>• Respect copyright and intellectual property rights</li>
                                <li>• Not record or reproduce course videos without permission</li>
                                <li>• Complete your own assignments and maintain academic integrity</li>
                            </ul>
                        </div>

                        {/* Payment Terms */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Payment and Refunds</h2>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                Paid courses are non-refundable once purchased and access has been granted. You have the right to view all course materials during the duration of your enrollment. Refund requests must be made within 7 days of purchase for legitimate technical issues.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                We reserve the right to modify pricing and course availability. Price changes will not affect current enrollments but will apply to new purchases.
                            </p>
                        </div>

                        {/* User Conduct */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Prohibited Conduct</h2>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                You agree not to:
                            </p>
                            <ul className="text-slate-300 space-y-2">
                                <li>• Harass, abuse, or threaten other users or instructors</li>
                                <li>• Post offensive, discriminatory, or inappropriate content</li>
                                <li>• Attempt to gain unauthorized access to the platform</li>
                                <li>• Spam or send unsolicited messages</li>
                                <li>• Use the platform for illegal activities</li>
                                <li>• Interfere with platform functionality or security</li>
                                <li>• Impersonate others or provide false information</li>
                            </ul>
                        </div>

                        {/* Instructor Responsibilities */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Instructor Responsibilities</h2>
                            <p className="text-slate-300 leading-relaxed">
                                Instructors are responsible for ensuring that their course content is accurate, legal, and not infringing on third-party rights. Instructors agree not to use the platform to distribute malware, engage in fraudulent activities, or violate any laws. We reserve the right to remove courses or suspend instructors for policy violations.
                            </p>
                        </div>

                        {/* Limitation of Liability */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                            <p className="text-slate-300 leading-relaxed">
                                THE MATERIALS ON NELNANDOSOLUTIONS ARE PROVIDED ON AN 'AS IS' BASIS. NELNANDOSOLUTIONS MAKES NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIMS AND NEGATES ALL OTHER WARRANTIES INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT OF INTELLECTUAL PROPERTY OR OTHER VIOLATION OF RIGHTS.
                            </p>
                        </div>

                        {/* Termination */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Termination of Service</h2>
                            <p className="text-slate-300 leading-relaxed">
                                We reserve the right to terminate or suspend your account and access to the platform at any time, for any reason, including but not limited to violation of these Terms of Service. Upon termination, your right to use the platform will immediately cease.
                            </p>
                        </div>

                        {/* Intellectual Property */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property Rights</h2>
                            <p className="text-slate-300 leading-relaxed">
                                All content on the platform, including but not limited to text, graphics, logos, images, and software, is the property of NelnadoSolutions or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, transmit, or modify this content without prior written permission.
                            </p>
                        </div>

                        {/* Governing Law */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                            <p className="text-slate-300 leading-relaxed">
                                These Terms and Conditions and any dispute arising out of or relating to them shall be governed by and construed in accordance with the laws applicable in our jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                            </p>
                        </div>

                        {/* Changes to Terms */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
                            <p className="text-slate-300 leading-relaxed">
                                NelnadoSolutions reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. Your continued use of the platform following the posting of revised Terms means that you accept and agree to the changes.
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
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
