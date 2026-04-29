import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';

const LoadingStep = ({ label, delay }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div className={`flex items-center gap-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className={`w-5 h-5 rounded-full border-2 border-primary-500/30 flex items-center justify-center ${visible ? 'bg-primary-500/20' : ''}`}>
                {visible && <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>}
            </div>
            <span className="text-gray-400 text-sm font-medium">{label}</span>
        </div>
    );
};

export default function Show({ salesPage, flash, auth }) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatingSection, setGeneratingSection] = useState(null);
    const [previewMode, setPreviewMode] = useState('desktop');
    const iframeRef = useRef(null);

    const generateAI = () => {
        setIsGenerating(true);
        router.post(route('sales-pages.generate', salesPage.id), {}, {
            preserveScroll: true,
            onFinish: () => setIsGenerating(false),
        });
    };

    const generateSectionAI = (sectionName) => {
        setGeneratingSection(sectionName);
        router.post(route('sales-pages.generate-section', salesPage.id), { section: sectionName }, {
            preserveScroll: true,
            onFinish: () => setGeneratingSection(null),
        });
    };

    const downloadHTML = () => {
        if (!salesPage.html_content) return;
        
        const blob = new Blob([salesPage.html_content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${salesPage.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-sales-page.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const hasContent = !!salesPage.html_content;
    const isAnyGenerating = isGenerating || generatingSection !== null;

    const sectionsToRegenerate = [
        'Hero',
        'Benefits',
        'Features',
        'Social Proof',
        'Pricing',
        'Call to Action'
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href={route('dashboard')} className="p-2 bg-dark-border/50 text-gray-400 hover:text-white rounded-lg transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <div>
                            <h2 className="font-semibold text-2xl text-white leading-tight">
                                {salesPage.name}
                            </h2>
                            <p className="text-sm text-primary-400">Live Preview</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        {hasContent && (
                            <>
                                <button
                                    onClick={downloadHTML}
                                    className="inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-dark-surface border border-dark-border rounded-xl font-semibold text-xs sm:text-sm text-gray-300 hover:text-white transition-all shadow-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Export
                                </button>
                                
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button 
                                            disabled={isAnyGenerating}
                                            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-dark-surface border border-primary-500/30 rounded-xl font-semibold text-xs sm:text-sm text-primary-400 hover:text-primary-300 transition-all disabled:opacity-50"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                            </svg>
                                            Sections
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content contentClasses="bg-dark-surface border border-dark-border py-2 w-48">
                                        <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Section</div>
                                        {sectionsToRegenerate.map((section) => (
                                            <button
                                                key={section}
                                                onClick={() => generateSectionAI(section)}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-dark-border hover:text-white transition-colors"
                                            >
                                                {section}
                                            </button>
                                        ))}
                                    </Dropdown.Content>
                                </Dropdown>

                                <button
                                    onClick={generateAI}
                                    disabled={isAnyGenerating}
                                    className="col-span-2 sm:col-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 border border-transparent rounded-xl font-bold text-xs sm:text-sm text-white hover:bg-primary-500 transition-all disabled:opacity-50 shadow-lg shadow-primary-600/20"
                                >
                                    {isGenerating ? 'Generating...' : 'Regenerate Entire Page'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={`${salesPage.name} - Preview`} />

            <div className="py-8 h-[calc(100vh-140px)] min-h-[600px]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col">
                    {!hasContent ? (
                        <div className="flex-1 bg-dark-surface/80 backdrop-blur-xl border border-dark-border border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-12">
                            <div className="w-20 h-20 bg-primary-600/10 rounded-full flex items-center justify-center mb-6 relative">
                                <div className="absolute inset-0 rounded-full border-2 border-primary-500/30 animate-ping opacity-75"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Ready for Magic?</h3>
                            <p className="text-gray-400 max-w-md mb-8">
                                Click the "Generate with AI" button to transform your product details into a fully designed, high-converting HTML sales page.
                            </p>
                            <button
                                onClick={generateAI}
                                disabled={isAnyGenerating}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 border border-transparent rounded-xl font-bold text-white hover:from-primary-500 hover:to-purple-500 transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-105"
                            >
                                {isAnyGenerating ? 'Generating...' : 'Generate Now'}
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full items-center w-full">
                            {/* Device Toggle Toolbar */}
                            <div className="mb-4 hidden sm:flex items-center bg-dark-surface border border-dark-border rounded-lg p-1">
                                <button 
                                    onClick={() => setPreviewMode('desktop')} 
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${previewMode === 'desktop' ? 'bg-primary-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Desktop
                                </button>
                                <button 
                                    onClick={() => setPreviewMode('tablet')} 
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${previewMode === 'tablet' ? 'bg-primary-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    Tablet
                                </button>
                                <button 
                                    onClick={() => setPreviewMode('mobile')} 
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${previewMode === 'mobile' ? 'bg-primary-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    Mobile
                                </button>
                            </div>

                            {/* Live HTML Container */}
                            <div className={`bg-white rounded-xl overflow-hidden border-4 border-dark-surface shadow-2xl relative transition-all duration-500 ease-in-out w-full flex-1 flex flex-col ${previewMode === 'desktop' ? 'max-w-full' : previewMode === 'tablet' ? 'max-w-3xl' : 'sm:max-w-sm'}`}>
                                {/* Browser Header Mockup */}
                                <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-2 absolute top-0 left-0 right-0 z-20 h-12 shrink-0">
                                    <div className="flex gap-1.5 shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="ml-4 flex-1 bg-white rounded-md h-6 px-3 text-xs text-gray-500 flex items-center justify-center border border-gray-200 shadow-sm font-mono truncate">
                                        preview.copygenius.ai/{salesPage.id}
                                    </div>
                                </div>
                                
                                {/* Regenerating Overlay */}
                                {generatingSection && (
                                    <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center pt-12">
                                        <div className="bg-dark-surface border border-primary-500/50 p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 relative overflow-hidden group">
                                            {/* Liquid Animation */}
                                            <div className="w-20 h-20 rounded-full border-4 border-primary-500/30 mb-6 relative overflow-hidden bg-primary-500/10">
                                                <div className="absolute bottom-0 left-0 right-0 bg-primary-500/40 animate-wave h-[60%]">
                                                    <div className="absolute top-0 left-0 right-0 h-4 bg-primary-500/20 blur-sm -mt-2"></div>
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-2 text-center relative z-10">Rewriting {generatingSection}</h3>
                                            <p className="text-gray-400 text-sm text-center relative z-10">
                                                Applying conversion psychology to optimize this section...
                                            </p>
                                            
                                            {/* Decorative glow */}
                                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-600/20 rounded-full blur-3xl group-hover:bg-primary-600/40 transition-colors"></div>
                                        </div>
                                    </div>
                                )}

                                {/* Full Page Generation Overlay */}
                                {isGenerating && !generatingSection && (
                                    <div className="absolute inset-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md flex flex-col items-center justify-center">
                                        <div className="max-w-md w-full px-6 flex flex-col items-center">
                                            <div className="relative w-32 h-32 mb-10">
                                                {/* Outer rings */}
                                                <div className="absolute inset-0 border-2 border-primary-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                                                <div className="absolute inset-2 border-2 border-purple-500/20 rounded-full animate-[spin_7s_linear_infinite_reverse]"></div>
                                                
                                                {/* Water ball */}
                                                <div className="absolute inset-4 bg-dark-surface border-4 border-primary-500/50 rounded-full overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                                                    <div className="absolute inset-0 bg-primary-600/20"></div>
                                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-600 to-primary-400 h-[70%] animate-liquid">
                                                        <div className="absolute top-[-10px] left-[-50%] w-[200%] h-10 bg-primary-300/30 rounded-[40%] animate-wave-slow"></div>
                                                        <div className="absolute top-[-15px] left-[-50%] w-[200%] h-10 bg-primary-400/20 rounded-[35%] animate-wave-fast"></div>
                                                    </div>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <h2 className="text-3xl font-black text-white mb-4 text-center tracking-tight">Crafting Your Vision</h2>
                                            <div className="flex flex-col gap-3 w-full">
                                                <LoadingStep label="Analyzing product psychology..." delay={0} />
                                                <LoadingStep label="Writing persuasive sales copy..." delay={2000} />
                                                <LoadingStep label="Generating modern UI components..." delay={4000} />
                                                <LoadingStep label="Polishing responsive design..." delay={6000} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Live HTML Iframe */}
                                <iframe 
                                    ref={iframeRef}
                                    srcDoc={`
                                        ${salesPage.html_content}
                                        <script>
                                            // Prevent links from navigating the iframe away
                                            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                                                anchor.addEventListener('click', function (e) {
                                                    e.preventDefault();
                                                    const targetId = this.getAttribute('href');
                                                    const targetElement = document.querySelector(targetId);
                                                    if (targetElement) {
                                                        targetElement.scrollIntoView({ behavior: 'smooth' });
                                                        // Update URL hash without reload to maintain current state
                                                        window.history.replaceState(null, null, targetId);
                                                    }
                                                });
                                            });
                                        </script>
                                    `}
                                    title="Sales Page Preview"
                                    className={`w-full flex-1 mt-12 bg-white transition-opacity duration-300 ${generatingSection ? 'opacity-30 blur-sm' : 'opacity-100'}`}
                                    sandbox="allow-scripts allow-same-origin"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
