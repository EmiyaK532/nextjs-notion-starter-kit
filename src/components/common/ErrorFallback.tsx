import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Button } from '../ui/button';

const ErrorFallback: React.FC<FallbackProps> = ({
    error,
    resetErrorBoundary,
}) => {
    return (
        <div className="my-4 rounded border border-red-300 bg-red-50 p-4 text-red-800">
            <h3 className="mb-2 text-lg font-semibold">出现错误</h3>
            <p className="mb-2">加载内容时出现问题，但您仍然可以浏览页面。</p>
            <Button
                onClick={resetErrorBoundary}
                variant="outline"
                className="mt-2"
            >
                重试
            </Button>
        </div>
    );
};

export default ErrorFallback;
