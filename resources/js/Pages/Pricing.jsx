import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { 
    Check,
    X,
    Zap,
    Crown,
    Rocket,
    Users,
    BookOpen,
    Award,
    Clock,
    Download,
    MessageCircle,
    Shield,
    Sparkles,
    TrendingUp,
    Globe,
    Video,
    FileText,
    Headphones,
    Star,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

export default function Pricing({ auth }) {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [openFaq, setOpenFaq] = useState(null);

    const plans = [
        {
            name: 'Free',
            icon: Sparkles,
            gradient: 'from-slate-500 to-slate-600',
            glowColor: 'slate',
            price: {
                monthly: 0,
                annual: 0
            },
            description: 'Perfect for getting started with tech learning',
            popular: false,
            features: [
                { text: 'Access to 5 free courses', included: true },
                { text: 'Basic video quality', included: true },
                { text: 'Community forum access', included: true },
                { text: 'Course completion certificates', included: true },
                { text: 'Mobile app access', included: false },
                { text: 'Downloadable resources', included: false },
                { text: 'Live Q&A sessions', included: false },
                { text: '1-on-1 mentorship', included: false },
                { text: 'Priority support', included: false }
            ],
            cta: 'Get Started Free',
            highlight: false
        },
        {
            name: 'Pro',
            icon: Zap,
            gradient: 'from-blue-500 to-purple-600',
            glowColor: 'blue',
            price: {
                monthly: 29,
                annual: 290
            },
            description: 'For serious learners ready to advance their careers',
            popular: true,
            features: [
                { text: 'Access to 500+ premium courses', included: true },
                { text: 'HD video quality', included: true },
                { text: 'Downloadable resources & code', included: true },
                { text: 'Interactive coding exercises', included: true },
                { text: 'Mobile & offline access', included: true },
                { text: 'Monthly live Q&A sessions', included: true },
                { text: 'Course completion certificates', included: true },
                { text: 'Priority email support', included: true },
                { text: '1-on-1 mentorship', included: false }
            ],
            cta: 'Start Pro Trial',
            highlight: true
        },
        {
            name: 'Enterprise',
            icon: Crown,
            gradient: 'from-orange-500 to-pink-600',
            glowColor: 'orange',
            price: {
                monthly: 99,
                annual: 990
            },
            description: 'Everything you need to master tech skills',
            popular: false,
            features: [
                { text: 'All Pro features included', included: true },
                { text: '4K video quality', included: true },
                { text: 'Unlimited downloads', included: true },
                { text: 'Weekly 1-on-1 mentorship', included: true },
                { text: 'Personalized learning paths', included: true },
                { text: 'Early access to new courses', included: true },
                { text: 'Career coaching sessions', included: true },
                { text: 'Premium community access', included: true },
                { text: '24/7 priority support', included: true }
            ],
            cta: 'Go Enterprise',
            highlight: false
        }
    ];

    const faqs = [
        {
            question: 'Can I switch plans at any time?',
            answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, changes take effect at the end of your current billing cycle.'
        },
        {
            question: 'What happens if I cancel my subscription?',
            answer: 'You\'ll continue to have access to all paid features until the end of your current billing period. After that, your account will revert to the Free plan, and you\'ll keep access to any courses you completed.'
        },
        {
            question: 'Do you offer refunds?',
            answer: 'Yes, we offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied within the first 30 days, we\'ll refund your payment, no questions asked.'
        },
        {
            question: 'Are there any hidden fees?',
            answer: 'No hidden fees ever! The price you see is the price you pay. All features listed in your plan are included, and there are no setup fees or additional charges.'
        },
        {
            question: 'Can I get a discount for annual billing?',
            answer: 'Yes! Annual plans save you approximately 2 months compared to monthly billing. Plus, you get billed once per year for added convenience.'
        },
        {
            question: 'Do you offer student or team discounts?',
            answer: 'Yes! We offer special pricing for students (50% off) and teams (volume discounts starting at 5+ licenses). Contact our sales team for custom enterprise solutions.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and wire transfers for enterprise customers. All payments are processed securely.'
        },
        {
            question: 'Can I access courses offline?',
            answer: 'Pro and Enterprise members can download course videos and resources for offline viewing through our mobile apps on iOS and Android.'
        }
    ];

    const comparisonFeatures = [
        {
            category: 'Course Access',
            features: [
                { name: 'Number of Courses', free: '5 courses', pro: '500+ courses', enterprise: 'All courses' },
                { name: 'New Course Access', free: 'Limited', pro: 'Immediate', enterprise: 'Early access' },
                { name: 'Video Quality', free: 'SD', pro: 'HD', enterprise: '4K' }
            ]
        },
        {
            category: 'Learning Features',
            features: [
                { name: 'Interactive Exercises', free: false, pro: true, enterprise: true },
                { name: 'Downloadable Resources', free: false, pro: true, enterprise: true },
                { name: 'Offline Access', free: false, pro: true, enterprise: true },
                { name: 'Learning Paths', free: false, pro: 'Standard', enterprise: 'Personalized' }
            ]
        },
        {
            category: 'Support & Mentorship',
            features: [
                { name: 'Community Forum', free: true, pro: true, enterprise: true },
                { name: 'Email Support', free: 'Standard', pro: 'Priority', enterprise: '24/7 Priority' },
                { name: 'Live Q&A Sessions', free: false, pro: 'Monthly', enterprise: 'Weekly' },
                { name: '1-on-1 Mentorship', free: false, pro: false, enterprise: 'Weekly' }
            ]
        }
    ];

    const stats = [
        { icon: Users, value: '50K+', label: 'Active Students' },
        { icon: BookOpen, value: '500+', label: 'Premium Courses' },
        { icon: Award, value: '98%', label: 'Satisfaction Rate' },
        { icon: TrendingUp, value: '4.8/5', label: 'Average Rating' }
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const getSavings = (plan) => {
        if (plan.price.monthly === 0) return 0;
        const monthlyCost = plan.price.monthly * 12;
        const annualCost = plan.price.annual;
        return monthlyCost - annualCost;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar auth={auth} />

            {/* Hero Section */}
            <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                </div>

                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
                            <Rocket className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 text-sm font-medium">Simple, Transparent Pricing</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Invest in Your
                            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Tech Career
                            </span>
                        </h1>
                        
                        <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                            Choose the plan that fits your learning goals. Start free, upgrade anytime.
                            All plans include lifetime access to completed courses.
                        </p>

                        {/* Billing Toggle */}
                        <div className="inline-flex items-center bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full p-1">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                                    billingCycle === 'monthly'
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('annual')}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                                    billingCycle === 'annual'
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                Annual
                                <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                                    Save 17%
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-3">
                                    <stat.icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-slate-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative group ${plan.highlight ? 'lg:-mt-8' : ''}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-4 py-1 rounded-full">
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-3xl blur-xl`} />
                                
                                <div className={`relative bg-slate-800/50 backdrop-blur-sm border-2 rounded-3xl p-8 transition-all duration-300 ${
                                    plan.highlight 
                                        ? 'border-blue-500 lg:py-12' 
                                        : 'border-slate-700 hover:border-slate-600'
                                }`}>
                                    {/* Header */}
                                    <div className="text-center mb-8">
                                        <div className={`inline-flex p-4 bg-gradient-to-r ${plan.gradient} rounded-2xl mb-4`}>
                                            <plan.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                        <p className="text-slate-400 text-sm">{plan.description}</p>
                                    </div>

                                    {/* Price */}
                                    <div className="text-center mb-8 pb-8 border-b border-slate-700">
                                        <div className="flex items-baseline justify-center mb-2">
                                            <span className="text-5xl font-bold text-white">
                                                ${billingCycle === 'monthly' ? plan.price.monthly : Math.floor(plan.price.annual / 12)}
                                            </span>
                                            <span className="text-slate-400 ml-2">/month</span>
                                        </div>
                                        {billingCycle === 'annual' && plan.price.annual > 0 && (
                                            <div className="space-y-1">
                                                <p className="text-slate-400 text-sm">
                                                    ${plan.price.annual} billed annually
                                                </p>
                                                <p className="text-green-400 text-sm font-medium">
                                                    Save ${getSavings(plan)} per year
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-4 mb-8">
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start space-x-3">
                                                {feature.included ? (
                                                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                                ) : (
                                                    <X className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                                                )}
                                                <span className={`text-sm ${feature.included ? 'text-slate-300' : 'text-slate-600'}`}>
                                                    {feature.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <Link
                                        href={plan.price.monthly === 0 ? '/register' : '/checkout'}
                                        className={`block w-full text-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                                            plan.highlight
                                                ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg hover:shadow-${plan.glowColor}-500/50`
                                                : 'bg-slate-700 text-white hover:bg-slate-600'
                                        }`}
                                    >
                                        {plan.cta}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
                
                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Compare Plans</h2>
                        <p className="text-xl text-slate-400">
                            See exactly what's included in each plan
                        </p>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
                        {comparisonFeatures.map((category, catIndex) => (
                            <div key={catIndex}>
                                <div className="bg-slate-700/50 px-6 py-4">
                                    <h3 className="text-lg font-bold text-white">{category.category}</h3>
                                </div>
                                {category.features.map((feature, featureIndex) => (
                                    <div
                                        key={featureIndex}
                                        className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-slate-700 last:border-b-0 hover:bg-slate-700/30 transition-colors"
                                    >
                                        <div className="col-span-1 text-slate-300 font-medium">
                                            {feature.name}
                                        </div>
                                        <div className="text-center">
                                            {typeof feature.free === 'boolean' ? (
                                                feature.free ? (
                                                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-slate-600 mx-auto" />
                                                )
                                            ) : (
                                                <span className="text-slate-400">{feature.free}</span>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            {typeof feature.pro === 'boolean' ? (
                                                feature.pro ? (
                                                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-slate-600 mx-auto" />
                                                )
                                            ) : (
                                                <span className="text-slate-400">{feature.pro}</span>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            {typeof feature.enterprise === 'boolean' ? (
                                                feature.enterprise ? (
                                                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-slate-600 mx-auto" />
                                                )
                                            ) : (
                                                <span className="text-slate-400">{feature.enterprise}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                        <p className="text-xl text-slate-400">
                            Everything you need to know about our pricing
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-colors"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                                >
                                    <span className="text-lg font-semibold text-white pr-4">
                                        {faq.question}
                                    </span>
                                    {openFaq === index ? (
                                        <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                    )}
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-slate-400 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
                
                <div className="relative max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: '30-Day Money Back',
                                description: 'Not satisfied? Get a full refund within 30 days, no questions asked.',
                                gradient: 'from-green-500 to-teal-600'
                            },
                            {
                                icon: Clock,
                                title: 'Lifetime Access',
                                description: 'Keep access to all completed courses, even if you cancel your subscription.',
                                gradient: 'from-blue-500 to-cyan-600'
                            },
                            {
                                icon: Headphones,
                                title: 'Expert Support',
                                description: 'Our dedicated support team is here to help you succeed every step of the way.',
                                gradient: 'from-purple-500 to-pink-600'
                            }
                        ].map((badge, index) => (
                            <div key={index} className="text-center">
                                <div className={`inline-flex p-4 bg-gradient-to-r ${badge.gradient} rounded-2xl mb-4`}>
                                    <badge.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{badge.title}</h3>
                                <p className="text-slate-400">{badge.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 md:p-16">
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                        
                        <div className="relative text-center max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Start Learning Today
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Join 50,000+ students already transforming their careers with NelnadoSolutions
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/register"
                                    className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                                >
                                    Start Free Trial
                                </Link>
                                <Link
                                    href="/courses"
                                    className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    Browse Courses
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
