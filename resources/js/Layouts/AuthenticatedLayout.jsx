import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Toast from '@/Components/Toast';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { flash } = usePage().props;

    return (
        <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex overflow-hidden">
            
            {/* Global Toasts */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
                {flash?.success && <Toast message={flash.success} type="success" />}
                {flash?.error && <Toast message={flash.error} type="error" />}
            </div>

            {/* Sidebar Desktop */}
            <aside className={`hidden bg-dark-surface border-r border-dark-border lg:flex lg:flex-col fixed inset-y-0 z-20 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
                <div className="flex items-center justify-between h-20 border-b border-dark-border px-4 relative">
                    <Link href="/" className={`flex items-center gap-2 group ${isSidebarCollapsed ? 'mx-auto' : ''}`}>
                        <div className="bg-primary-600 text-white p-1.5 rounded-lg group-hover:bg-primary-500 transition-colors shadow-[0_0_10px_rgba(99,102,241,0.3)] shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        {!isSidebarCollapsed && <span className="text-xl font-bold text-white tracking-tight">CopyGenius</span>}
                    </Link>
                    
                    {/* Toggle Button */}
                    <button 
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className={`absolute -right-3 top-1/2 -translate-y-1/2 bg-dark-surface border border-dark-border text-gray-400 hover:text-white rounded-full p-1 z-30 transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    <Link
                        href={route('dashboard')}
                        className={`flex items-center gap-3 py-3 rounded-xl transition-all ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-4'} ${
                            route().current('dashboard')
                                ? 'bg-primary-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                                : 'text-gray-400 hover:bg-dark-border hover:text-white'
                        }`}
                        title={isSidebarCollapsed ? "Dashboard" : ""}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {!isSidebarCollapsed && <span className="font-medium">Dashboard</span>}
                    </Link>

                    <Link
                        href={route('sales-pages.create')}
                        className={`flex items-center gap-3 py-3 rounded-xl transition-all ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-4'} ${
                            route().current('sales-pages.create')
                                ? 'bg-primary-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                                : 'text-gray-400 hover:bg-dark-border hover:text-white'
                        }`}
                        title={isSidebarCollapsed ? "New Generator" : ""}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        {!isSidebarCollapsed && <span className="font-medium">New Generator</span>}
                    </Link>
                </div>

                <div className={`p-4 border-t border-dark-border ${isSidebarCollapsed ? 'px-2' : ''}`}>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className={`flex items-center gap-3 w-full py-3 rounded-xl hover:bg-dark-border transition-colors text-left ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'}`} title={isSidebarCollapsed ? user.name : ""}>
                                <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-tr from-primary-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                {!isSidebarCollapsed && (
                                    <>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-sm font-medium text-white truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <svg className="h-4 w-4 shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content align={isSidebarCollapsed ? "left" : "top"} width="48" contentClasses="bg-dark-surface border border-dark-border py-1">
                            <Dropdown.Link href={route('profile.edit')} className="text-gray-300 hover:bg-dark-border hover:text-white">Profile</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button" className="text-red-400 hover:bg-red-500/10 hover:text-red-300">
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 w-full bg-dark-surface/80 backdrop-blur-md border-b border-dark-border z-30 flex items-center justify-between px-4 h-16">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary-600 text-white p-1 rounded group-hover:bg-primary-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">CopyGenius</span>
                </Link>
                <button
                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                    className="p-2 text-gray-400 hover:text-white focus:outline-none"
                >
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showingNavigationDropdown ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {showingNavigationDropdown && (
                <div className="lg:hidden fixed inset-0 z-20 bg-dark-surface pt-16">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')} className="text-white">
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('sales-pages.create')} active={route().current('sales-pages.create')} className="text-white">
                            New Generator
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-4 pb-1 border-t border-dark-border">
                        <div className="px-4">
                            <div className="text-base font-medium text-white">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="text-white">Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-red-400">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className={`flex-1 relative min-h-screen pt-16 lg:pt-0 overflow-y-auto transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                {/* Background effect */}
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary-900/20 rounded-full blur-[120px] pointer-events-none"></div>
                
                {header && (
                    <header className="bg-transparent pt-8 pb-4 px-4 sm:px-6 lg:px-8 border-b border-white/5 relative z-20">
                        {header}
                    </header>
                )}
                <div className="relative z-10 pb-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
