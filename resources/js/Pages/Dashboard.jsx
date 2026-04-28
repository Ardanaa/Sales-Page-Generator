import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Dashboard({ auth, salesPages }) {
    const [confirmingPageDeletion, setConfirmingPageDeletion] = useState(false);
    const [pageToDelete, setPageToDelete] = useState(null);

    const confirmPageDeletion = (page) => {
        setPageToDelete(page);
        setConfirmingPageDeletion(true);
    };

    const deletePage = () => {
        if (!pageToDelete) return;
        router.delete(route('sales-pages.destroy', pageToDelete.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setConfirmingPageDeletion(false);
        setTimeout(() => setPageToDelete(null), 200); // Wait for transition
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-2xl text-white leading-tight">Your Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Welcome Card */}
                    <div className="bg-dark-surface/80 backdrop-blur-xl border border-dark-border overflow-hidden shadow-lg sm:rounded-2xl mb-8 relative">
                        <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-gradient-to-l from-primary-600/10 to-transparent pointer-events-none"></div>
                        <div className="p-8 text-gray-100 flex flex-col md:flex-row md:items-center justify-between relative z-10">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Welcome back, {auth.user.name}!</h3>
                                <p className="text-gray-400">Ready to generate some high-converting sales copy?</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <Link 
                                    href={route('sales-pages.create')} 
                                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:scale-105"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Create New Page
                                </Link>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-6">Recent Sales Pages</h3>

                    {salesPages?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {salesPages.map((page) => (
                                <div key={page.id} className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden hover:border-primary-500/50 transition-all group shadow-lg hover:shadow-primary-500/10 flex flex-col h-full">
                                    <div className="p-6 flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-lg font-bold text-white line-clamp-1">{page.name}</h4>
                                            <span className="bg-primary-500/20 text-primary-400 text-xs px-2 py-1 rounded border border-primary-500/20 whitespace-nowrap">
                                                Generated
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                            {page.description}
                                        </p>
                                    </div>
                                    <div className="px-6 py-4 border-t border-dark-border bg-black/20 flex justify-between items-center">
                                        <span className="text-xs text-gray-500">
                                            {new Date(page.created_at).toLocaleDateString()}
                                        </span>
                                        <div className="flex gap-4 items-center">
                                            <button 
                                                onClick={() => confirmPageDeletion(page)}
                                                className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                                            >
                                                Delete
                                            </button>
                                            <Link 
                                                href={route('sales-pages.show', page.id)}
                                                className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                                            >
                                                View Page
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-dark-surface border border-dark-border border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                            <div className="bg-dark-border rounded-full p-4 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No pages yet</h3>
                            <p className="text-gray-400 mb-6 max-w-sm">You haven't generated any sales pages yet. Create your first one to see it here.</p>
                            <Link 
                                href={route('sales-pages.create')} 
                                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-lg transition-colors border border-white/10"
                            >
                                Generate First Page
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <Modal show={confirmingPageDeletion} onClose={closeModal}>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-red-500/20 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-white">
                                Delete Sales Page
                            </h2>
                            <p className="mt-1 text-sm text-gray-400">
                                Are you sure you want to delete <span className="text-white font-bold">{pageToDelete?.name}</span>?
                            </p>
                        </div>
                    </div>

                    <p className="mt-1 text-sm text-gray-400 mb-6">
                        Once this page is deleted, all of its generated copy and data will be permanently deleted. This action cannot be undone.
                    </p>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal} className="!bg-dark-border !text-gray-300 hover:!bg-white/10 border-transparent hover:border-transparent">
                            Cancel
                        </SecondaryButton>

                        <DangerButton onClick={deletePage} className="!bg-red-500 hover:!bg-red-600">
                            Delete Page
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
