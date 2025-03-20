import React from 'react';

interface ErrorDisplayProps {
    message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
    return (
        <div className="flex min-h-[300px] flex-col items-center justify-center p-6">
            <div className="w-full max-w-lg rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto mb-4 h-12 w-12 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
                <h2 className="mb-2 text-xl font-semibold text-red-700 dark:text-red-400">
                    加载失败
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{message}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                >
                    重新加载
                </button>
            </div>
        </div>
    );
};

export default ErrorDisplay;
