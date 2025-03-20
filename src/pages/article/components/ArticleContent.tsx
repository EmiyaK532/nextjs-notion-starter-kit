import React from 'react';

interface ArticleContentProps {
    content: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
    return (
        <div className="prose prose-lg dark:prose-invert mb-12 max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default ArticleContent;
