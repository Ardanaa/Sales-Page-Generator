import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#0B0F19] pt-6 sm:justify-center sm:pt-0 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary-600 text-white p-2 rounded-xl group-hover:bg-primary-500 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-3xl font-bold text-white tracking-tight">CopyGenius</span>
                </Link>
            </div>

            <div className="mt-8 w-full overflow-hidden bg-dark-surface/80 backdrop-blur-xl border border-dark-border px-8 py-10 shadow-2xl sm:max-w-md sm:rounded-2xl relative z-10">
                {children}
            </div>
        </div>
    );
}
