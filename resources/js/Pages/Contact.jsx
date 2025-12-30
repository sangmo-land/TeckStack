import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Mail, Phone, MessageCircle, MapPin, Send, CheckCircle } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Contact({ auth }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setStatus('success');
        setTimeout(() => {
            setStatus(null);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            <Head title="Contact Us" />
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <Navbar auth={auth} />
                
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                    
                    <div className="relative max-w-7xl mx-auto text-center">
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-6">
                            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Touch</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Have questions about our courses? Need support? We're here to help you on your learning journey.
                        </p>
                    </div>
                </section>

                {/* Contact Information & Form */}
                <section className="px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Contact Cards */}
                            <div className="space-y-6">
                                {/* Email Card */}
                                <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-blue-500 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                                            <Mail className="text-blue-400" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
                                            <p className="text-slate-400 text-sm mb-3">Send us an email anytime</p>
                                            <a 
                                                href="mailto:mokomnelvis@yahoo.com" 
                                                className="text-blue-400 hover:text-blue-300 font-medium text-sm break-all"
                                            >
                                                mokomnelvis@yahoo.com
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone Card */}
                                <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-green-500 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                                            <Phone className="text-green-400" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
                                            <p className="text-slate-400 text-sm mb-3">Available during business hours</p>
                                            <a 
                                                href="tel:+12409060295" 
                                                className="text-green-400 hover:text-green-300 font-medium text-sm"
                                            >
                                                +1 (240) 906-0295
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* WhatsApp Card */}
                                <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-emerald-500 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                                            <MessageCircle className="text-emerald-400" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white mb-2">WhatsApp</h3>
                                            <p className="text-slate-400 text-sm mb-3">Message us instantly</p>
                                            <a 
                                                href="https://wa.me/12409060295" 
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium text-sm transition-colors"
                                            >
                                                <MessageCircle size={16} />
                                                Chat on WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Location Card */}
                                <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-purple-500 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                                            <MapPin className="text-purple-400" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white mb-2">Our Location</h3>
                                            <p className="text-slate-400 text-sm">
                                                Available worldwide through our online platform
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-2">
                                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold text-white mb-3">Send Us a Message</h2>
                                        <p className="text-slate-400">
                                            Fill out the form below and we'll get back to you as soon as possible.
                                        </p>
                                    </div>

                                    {status === 'success' && (
                                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-3">
                                            <CheckCircle className="text-green-400" size={20} />
                                            <p className="text-green-400 font-medium">Message sent successfully! We'll get back to you soon.</p>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Your Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Your Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                placeholder="How can we help you?"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows="6"
                                                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                                                placeholder="Tell us more about your inquiry..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <Send size={20} />
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center">
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="relative">
                                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                    Ready to Start Learning?
                                </h2>
                                <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                                    Join thousands of students already learning with NelnadoSolutions and take your skills to the next level.
                                </p>
                                <a
                                    href="/courses"
                                    className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-slate-100 transition-colors shadow-xl"
                                >
                                    Browse Courses
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}
