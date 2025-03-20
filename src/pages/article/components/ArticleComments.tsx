import React, { useState } from 'react';
import { Article, Comment, User } from '@/types';
import { formatDate } from '@/utils/formatters';
import { Card, CardContent } from '@/components/shared';
import { CommentStatus } from '@/constants';

interface ArticleCommentsProps {
    article: Article;
    currentUser?: User | null;
}

const ArticleComments: React.FC<ArticleCommentsProps> = ({
    article,
    currentUser,
}) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!commentText.trim() || !currentUser) {
            return;
        }

        try {
            setIsSubmitting(true);

            // 这里应该调用API提交评论
            // 模拟添加新评论
            const newComment: Comment = {
                id: `temp-${Date.now()}`,
                content: commentText,
                author: {
                    name: currentUser.name,
                    email: currentUser.email,
                    avatar: currentUser.avatar,
                },
                article: {
                    id: article.id,
                    title: article.title,
                    slug: article.slug,
                },
                status: CommentStatus.APPROVED, // 假设评论直接被批准
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            setComments([...comments, newComment]);
            setCommentText('');
        } catch (error) {
            console.error('Failed to submit comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-8">
            <Card>
                <CardContent>
                    <h3 className="mb-6 text-xl font-semibold">
                        评论 ({comments.length})
                    </h3>

                    {/* 评论列表 */}
                    {comments.length > 0 ? (
                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="border-b border-gray-200 pb-5 last:border-0 last:pb-0 dark:border-gray-700"
                                >
                                    <div className="flex items-start">
                                        <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                            {comment.author.avatar ? (
                                                <img
                                                    src={comment.author.avatar}
                                                    alt={comment.author.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="bg-primary-500 flex h-full w-full items-center justify-center text-lg font-medium text-white">
                                                    {comment.author.name[0].toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-1 flex items-center">
                                                <span className="mr-2 font-medium">
                                                    {comment.author.name}
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {formatDate(
                                                        comment.createdAt,
                                                    )}
                                                </span>
                                            </div>
                                            <p className="text-gray-800 dark:text-gray-200">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">
                            暂无评论，成为第一个评论的人吧！
                        </p>
                    )}

                    {/* 评论表单 */}
                    {currentUser ? (
                        <form onSubmit={handleSubmitComment} className="mt-6">
                            <div className="mb-4">
                                <textarea
                                    className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                    rows={4}
                                    placeholder="写下你的评论..."
                                    value={commentText}
                                    onChange={(e) =>
                                        setCommentText(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={
                                        isSubmitting || !commentText.trim()
                                    }
                                    className="bg-primary-500 hover:bg-primary-600 rounded-md px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSubmitting ? '提交中...' : '发表评论'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-gray-800">
                            <p className="mb-2 text-gray-600 dark:text-gray-300">
                                登录后才能发表评论
                            </p>
                            <a
                                href="/login"
                                className="bg-primary-500 hover:bg-primary-600 inline-block rounded-md px-4 py-2 text-white transition-colors"
                            >
                                登录
                            </a>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ArticleComments;
