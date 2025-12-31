import React from 'react';
import { Link } from '@inertiajs/react';
import { GraduationCap, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 border-t border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-6 sm:py-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                        {/* Brand */}
                        <div>
                            <Link
                                href="/"
                                className="flex items-center space-x-2 mb-2 sm:mb-3"
                            >
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1.5 rounded">
                                    <GraduationCap className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-bold text-white">
                                    NelnadoSolutions
                                </span>
                            </Link>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Quality education at scale.
                            </p>
                        </div>

                        {/* Links */}
                        <div className="hidden md:grid grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-white text-xs font-semibold uppercase tracking-wide mb-3">
                                    Product
                                </h4>
                                <ul className="space-y-2">
                                    <li>
                                        <Link
                                            href="/courses"
                                            className="text-slate-400 hover:text-white text-sm transition-colors"
                                        >
                                            Courses
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/about"
                                            className="text-slate-400 hover:text-white text-sm transition-colors"
                                        >
                                            About
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white text-xs font-semibold uppercase tracking-wide mb-3">
                                    Support
                                </h4>
                                <ul className="space-y-2">
                                    <li>
                                        <a
                                            href="mailto:mokomnelvis@yahoo.com"
                                            className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1"
                                        >
                                            <Mail size={13} />
                                            Contact
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="tel:+12409060295"
                                            className="text-slate-400 hover:text-white text-sm transition-colors"
                                        >
                                            +1 (240) 906-0295
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="hidden md:block">
                            <h4 className="text-white text-xs font-semibold uppercase tracking-wide mb-3">
                                Connect
                            </h4>
                            <p className="text-slate-400 text-sm mb-2">
                                Get in touch with us
                            </p>
                            <a
                                href="mailto:mokomnelvis@yahoo.com"
                                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                            >
                                mokomnelvis@yahoo.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-4 sm:py-6 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-slate-500 text-xs">
                    <p>
                        © {currentYear} NelnadoSolutions. All rights reserved.
                    </p>
                    <div className="flex gap-4 sm:gap-6">
                        <Link
                            href={route("privacy")}
                            className="hover:text-white transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href={route("terms")}
                            className="hover:text-white transition-colors"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
