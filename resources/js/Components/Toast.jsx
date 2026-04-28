import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success' }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!message) return;
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000); // 5 seconds
        return () => clearTimeout(timer);
    }, [message]);

    if (!visible || !message) return null;

    const isSuccess = type === 'success';

    return (
        <div className={`relative border shadow-lg px-6 py-4 rounded-xl flex items-start gap-3 w-80 max-w-full animate-[slideIn_0.3s_ease-out] bg-dark-surface ${isSuccess ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)] text-emerald-400' : 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)] text-red-400'}`}>
            <button 
                onClick={() => setVisible(false)}
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                {isSuccess ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                ) : (
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                )}
            </svg>
            <div className="pr-4">
                <h4 className={`font-bold ${isSuccess ? 'text-emerald-300' : 'text-red-300'}`}>
                    {isSuccess ? 'Success' : 'Action Failed'}
                </h4>
                <p className="text-sm mt-1">{message}</p>
            </div>
        </div>
    );
}
