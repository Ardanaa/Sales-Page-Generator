import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import { useState } from 'react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        features: '',
        target_audience: '',
        price: '',
        usps: '',
        template: 'dark_modern',
    });

    const [step, setStep] = useState(1);

    const submit = (e) => {
        e.preventDefault();
        post(route('sales-pages.store'));
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('dashboard')} className="p-2 bg-dark-border/50 text-gray-400 hover:text-white rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <h2 className="font-semibold text-2xl text-white leading-tight">Create New Sales Page</h2>
                </div>
            }
        >
            <Head title="Create Sales Page" />

            <div className="py-8">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Stepper */}
                    <div className="mb-8 flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-dark-border z-0 rounded-full"></div>
                        <div 
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-500 z-0 rounded-full transition-all duration-300"
                            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                        ></div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? 'bg-primary-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-dark-surface border border-dark-border text-gray-500'}`}>1</div>
                            <span className={`mt-2 text-xs font-medium ${step >= 1 ? 'text-primary-400' : 'text-gray-500'}`}>Basics</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? 'bg-primary-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-dark-surface border border-dark-border text-gray-500'}`}>2</div>
                            <span className={`mt-2 text-xs font-medium ${step >= 2 ? 'text-primary-400' : 'text-gray-500'}`}>Details</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 3 ? 'bg-primary-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-dark-surface border border-dark-border text-gray-500'}`}>3</div>
                            <span className={`mt-2 text-xs font-medium ${step >= 3 ? 'text-primary-400' : 'text-gray-500'}`}>Template</span>
                        </div>
                    </div>

                    <div className="bg-dark-surface/80 backdrop-blur-xl shadow-2xl sm:rounded-2xl border border-dark-border overflow-hidden relative">
                        <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[100%] bg-primary-600/5 rounded-full blur-[100px] pointer-events-none"></div>

                        <div className="p-8 relative z-10">
                            <form onSubmit={submit} className="space-y-8">
                                
                                {step === 1 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-white mb-2">Product Basics</h3>
                                            <p className="text-gray-400">Tell us what you're selling.</p>
                                        </div>

                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Product Name <span className="text-red-400">*</span></label>
                                            <input
                                                id="name"
                                                type="text"
                                                className="w-full bg-black/40 border border-dark-border text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors placeholder-gray-600"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="e.g. Nexus Dashboard"
                                                required
                                                autoFocus
                                            />
                                            <InputError message={errors.name} className="mt-2 text-red-400" />
                                        </div>

                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Core Description <span className="text-red-400">*</span></label>
                                            <textarea
                                                id="description"
                                                className="w-full bg-black/40 border border-dark-border text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors placeholder-gray-600 resize-none"
                                                rows="4"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                placeholder="What does your product do? What problem does it solve?"
                                                required
                                            />
                                            <InputError message={errors.description} className="mt-2 text-red-400" />
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            <button 
                                                type="button" 
                                                onClick={nextStep}
                                                disabled={!data.name || !data.description}
                                                className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] disabled:shadow-none flex items-center gap-2"
                                            >
                                                Next Step
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-white mb-2">Marketing Details</h3>
                                            <p className="text-gray-400">Give the AI more context for better results.</p>
                                        </div>

                                        <div>
                                            <label htmlFor="features" className="block text-sm font-medium text-gray-300 mb-2">Key Features</label>
                                            <textarea
                                                id="features"
                                                className="w-full bg-black/40 border border-dark-border text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors placeholder-gray-600 resize-none"
                                                rows="3"
                                                value={data.features}
                                                onChange={(e) => setData('features', e.target.value)}
                                                placeholder="e.g. AI generation, 1-click export, Dark mode (comma separated)"
                                            />
                                            <InputError message={errors.features} className="mt-2 text-red-400" />
                                        </div>

                                        <div>
                                            <label htmlFor="target_audience" className="block text-sm font-medium text-gray-300 mb-2">Target Audience</label>
                                            <input
                                                id="target_audience"
                                                type="text"
                                                className="w-full bg-black/40 border border-dark-border text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors placeholder-gray-600"
                                                value={data.target_audience}
                                                onChange={(e) => setData('target_audience', e.target.value)}
                                                placeholder="e.g. SaaS Founders, Marketers"
                                            />
                                            <InputError message={errors.target_audience} className="mt-2 text-red-400" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                                                <input
                                                    id="price"
                                                    type="text"
                                                    className="w-full bg-black/40 border border-dark-border text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors placeholder-gray-600"
                                                    value={data.price}
                                                    onChange={(e) => setData('price', e.target.value)}
                                                    placeholder="e.g. $49 or $9/mo"
                                                />
                                                <InputError message={errors.price} className="mt-2 text-red-400" />
                                            </div>

                                            <div>
                                                <label htmlFor="usps" className="block text-sm font-medium text-gray-300 mb-2">Unique Selling Props (USPs)</label>
                                                <input
                                                    id="usps"
                                                    type="text"
                                                    className="w-full bg-black/40 border border-dark-border text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors placeholder-gray-600"
                                                    value={data.usps}
                                                    onChange={(e) => setData('usps', e.target.value)}
                                                    placeholder="e.g. Lifetime access"
                                                />
                                                <InputError message={errors.usps} className="mt-2 text-red-400" />
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-between">
                                            <button 
                                                type="button" 
                                                onClick={prevStep}
                                                className="bg-dark-border hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
                                            >
                                                Back
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={nextStep}
                                                className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] flex items-center gap-2"
                                            >
                                                Next Step
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-white mb-2">Choose Your Vibe</h3>
                                            <p className="text-gray-400">Pick a design direction — our AI will craft a premium page to match.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Template Option 1 */}
                                            <div 
                                                onClick={() => setData('template', 'dark_modern')}
                                                className={`cursor-pointer rounded-xl border-2 transition-all p-4 hover:scale-[1.02] ${data.template === 'dark_modern' ? 'border-primary-500 bg-primary-500/10' : 'border-dark-border hover:border-gray-600 bg-black/40'}`}
                                            >
                                                <div className="aspect-video bg-[#0B0F19] rounded-lg mb-3 border border-dark-border overflow-hidden relative">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/10"></div>
                                                    <div className="absolute top-2 left-2 w-1/2 h-2 bg-primary-500/30 rounded"></div>
                                                    <div className="absolute top-6 left-2 w-3/4 h-2 bg-gray-700 rounded"></div>
                                                    <div className="absolute bottom-3 left-2 w-10 h-3 bg-indigo-500 rounded shadow-[0_0_10px_rgba(99,102,241,0.4)]"></div>
                                                    <div className="absolute bottom-3 right-2 w-6 h-3 bg-white/10 rounded border border-white/20"></div>
                                                </div>
                                                <h4 className="text-white font-bold">Dark Premium</h4>
                                                <p className="text-xs text-gray-400 mt-1">Glassmorphism, glowing accents, gradient CTAs. Built for SaaS & tech products.</p>
                                            </div>

                                            {/* Template Option 2 */}
                                            <div 
                                                onClick={() => setData('template', 'clean_minimalist')}
                                                className={`cursor-pointer rounded-xl border-2 transition-all p-4 hover:scale-[1.02] ${data.template === 'clean_minimalist' ? 'border-primary-500 bg-primary-500/10' : 'border-dark-border hover:border-gray-600 bg-black/40'}`}
                                            >
                                                <div className="aspect-video bg-[#FAFAF9] rounded-lg mb-3 border border-gray-200 overflow-hidden relative">
                                                    <div className="absolute top-2 left-2 w-1/2 h-2 bg-gray-200 rounded"></div>
                                                    <div className="absolute top-6 left-2 w-3/4 h-2 bg-gray-300 rounded"></div>
                                                    <div className="absolute bottom-3 left-2 w-10 h-3 bg-gray-900 rounded"></div>
                                                    <div className="absolute bottom-3 right-2 w-6 h-3 bg-gray-100 rounded border border-gray-300"></div>
                                                </div>
                                                <h4 className="text-white font-bold">Clean Minimal</h4>
                                                <p className="text-xs text-gray-400 mt-1">Editorial whitespace, warm tones, subtle shadows. Inspired by Apple & Linear.</p>
                                            </div>
                                        </div>
                                        
                                        <InputError message={errors.template} className="mt-2 text-red-400" />

                                        <div className="pt-4 flex justify-between items-center border-t border-dark-border mt-8 pt-6">
                                            <button 
                                                type="button" 
                                                onClick={prevStep}
                                                className="bg-dark-border hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
                                            >
                                                Back
                                            </button>
                                            <button 
                                                type="submit" 
                                                disabled={processing}
                                                className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 hover:scale-105"
                                            >
                                                {processing ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        Generate Magic
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
