import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="CopyGenius - AI Sales Pages" />
            <div className="min-h-screen bg-[#0B0F19] text-gray-100 overflow-hidden relative font-sans">
                
                {/* Background effects */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-2 group">
                            <div className="bg-primary-600 text-white p-2 rounded-xl group-hover:bg-primary-500 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">CopyGenius</span>
                        </div>
                        <nav className="flex gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="text-gray-300 hover:text-white transition-colors font-medium px-4 py-2"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-300 hover:text-white transition-colors font-medium px-4 py-2"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-white text-gray-900 hover:bg-gray-200 transition-colors font-medium px-5 py-2 rounded-full"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    <main className="flex flex-col items-center justify-center text-center pt-32 pb-24">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-primary-500"></span>
                            <span className="text-sm font-medium text-gray-300">Gemini 3.1 Pro Powered</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            Generate High-Converting <br className="hidden md:block"/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-500">
                                Sales Pages in Seconds.
                            </span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                            Stop staring at a blank screen. Input your product details and let our AI generate perfectly structured, beautifully styled sales copy ready to convert.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href={auth.user ? route('dashboard') : route('register')}
                                className="bg-primary-600 hover:bg-primary-500 text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                            >
                                Start Generating Free
                            </Link>
                            <a
                                href="#features"
                                className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold px-8 py-4 rounded-full transition-colors backdrop-blur-sm"
                            >
                                See How It Works
                            </a>
                        </div>
                    </main>
                    
                    {/* Mockup / Dashboard Preview */}
                    <div className="mt-12 relative max-w-5xl mx-auto rounded-xl border border-white/10 bg-dark-surface/50 p-2 backdrop-blur-xl shadow-2xl overflow-hidden mb-32">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] to-transparent z-10 h-full w-full pointer-events-none"></div>
                        <div className="rounded-lg bg-black/40 border border-white/5 h-[400px] flex items-center justify-center">
                            <div className="text-center z-20">
                                <div className="animate-pulse bg-primary-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 blur-sm relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-400 absolute inset-0 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Generating your sales page...</h3>
                                <p className="text-gray-400">Crafting headlines, outlining benefits, and structuring HTML.</p>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <section id="features" className="py-20 border-t border-white/5 relative">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built for Conversions.</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Stop wrestling with page builders. CopyGenius handles the heavy lifting so you can focus on launching.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div className="bg-dark-surface/50 border border-white/5 p-8 rounded-2xl backdrop-blur-sm hover:border-primary-500/50 transition-colors">
                                <div className="h-12 w-12 bg-primary-500/20 text-primary-400 rounded-xl flex items-center justify-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
                                <p className="text-gray-400">Powered by Google's latest Gemini 3.1 Pro model. Go from a simple product idea to a fully fleshed out sales page in under 3 minutes.</p>
                            </div>

                            <div className="bg-dark-surface/50 border border-white/5 p-8 rounded-2xl backdrop-blur-sm hover:border-purple-500/50 transition-colors">
                                <div className="h-12 w-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Production Ready</h3>
                                <p className="text-gray-400">Pages are generated as pure, responsive HTML5 and Tailwind CSS. No bloat, no confusing builder logic. Just clean code ready to export.</p>
                            </div>

                            <div className="bg-dark-surface/50 border border-white/5 p-8 rounded-2xl backdrop-blur-sm hover:border-emerald-500/50 transition-colors">
                                <div className="h-12 w-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Surgical Editing</h3>
                                <p className="text-gray-400">Don't like the pricing section? Hit 'Regenerate Section'. Our AI surgically updates only the parts you want to change without breaking the design.</p>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-24 text-center">
                        <div className="bg-gradient-to-r from-primary-900/40 to-purple-900/40 border border-primary-500/20 rounded-3xl p-12 max-w-4xl mx-auto backdrop-blur-sm">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to skyrocket your sales?</h2>
                            <p className="text-gray-300 mb-8 max-w-xl mx-auto text-lg">Join thousands of creators and marketers building better pages, faster.</p>
                            <Link
                                href={auth.user ? route('dashboard') : route('register')}
                                className="inline-block bg-white text-gray-900 font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
                            >
                                Get Started for Free
                            </Link>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="border-t border-white/5 py-8 mt-12 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="font-bold text-gray-300 tracking-tight">CopyGenius</span>
                        </div>
                        <p>&copy; {new Date().getFullYear()} CopyGenius AI. All rights reserved.</p>
                    </footer>

                </div>
            </div>
        </>
    );
}
