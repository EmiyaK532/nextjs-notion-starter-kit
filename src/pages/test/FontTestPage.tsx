import React from 'react';

const FontTestPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-6 text-3xl font-bold">字体展示</h1>
                <p className="mb-8 text-gray-600">测试自定义字体是否正确加载</p>

                <div className="space-y-12">
                    {/* 无衬线字体（Sans Serif）- Inter */}
                    <section className="rounded-lg border border-gray-200 p-6">
                        <h2 className="mb-4 text-2xl font-bold">
                            无衬线字体（Sans Serif）- Inter
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Regular 400
                                </h3>
                                <p className="font-sans text-xl">
                                    The quick brown fox jumps over the lazy dog.
                                    <br />
                                    中文示例：敏捷的棕色狐狸跳过了懒狗。
                                    <br />
                                    日本語サンプル：素早い茶色のキツネは怠け者の犬を飛び越えました。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Bold 700
                                </h3>
                                <p className="font-sans text-xl font-bold">
                                    The quick brown fox jumps over the lazy dog.
                                    <br />
                                    中文示例：敏捷的棕色狐狸跳过了懒狗。
                                    <br />
                                    日本語サンプル：素早い茶色のキツネは怠け者の犬を飛び越えました。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 衬线字体（Serif）- Crimson Pro */}
                    <section className="rounded-lg border border-gray-200 p-6">
                        <h2 className="mb-4 text-2xl font-bold">
                            衬线字体（Serif）- Crimson Pro
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Regular 400
                                </h3>
                                <p className="font-serif text-xl">
                                    The quick brown fox jumps over the lazy dog.
                                    <br />
                                    中文示例：敏捷的棕色狐狸跳过了懒狗。
                                    <br />
                                    日本語サンプル：素早い茶色のキツネは怠け者の犬を飛び越えました。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Bold 700
                                </h3>
                                <p className="font-serif text-xl font-bold">
                                    The quick brown fox jumps over the lazy dog.
                                    <br />
                                    中文示例：敏捷的棕色狐狸跳过了懒狗。
                                    <br />
                                    日本語サンプル：素早い茶色のキツネは怠け者の犬を飛び越えました。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 等宽字体（Monospace）- 系统默认 */}
                    <section className="rounded-lg border border-gray-200 p-6">
                        <h2 className="mb-4 text-2xl font-bold">
                            等宽字体（Monospace）- 系统默认
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Regular 400
                                </h3>
                                <p className="font-mono text-xl">
                                    The quick brown fox jumps over the lazy dog.
                                    <br />
                                    中文示例：敏捷的棕色狐狸跳过了懒狗。
                                    <br />
                                    日本語サンプル：素早い茶色のキツネは怠け者の犬を飛び越えました。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Bold 700
                                </h3>
                                <p className="font-mono text-xl font-bold">
                                    The quick brown fox jumps over the lazy dog.
                                    <br />
                                    中文示例：敏捷的棕色狐狸跳过了懒狗。
                                    <br />
                                    日本語サンプル：素早い茶色のキツネは怠け者の犬を飛び越えました。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 文章示例 */}
                    <section className="rounded-lg border border-gray-200 p-6">
                        <h2 className="mb-4 text-2xl font-bold">文章示例</h2>

                        <div className="prose prose-lg max-w-none">
                            <h3>标题使用无衬线字体</h3>
                            <p>
                                正文内容使用衬线字体，提升长文阅读的舒适度。在长篇文章中，衬线字体通常可以减轻眼睛的疲劳，并提高文本的可读性。
                            </p>

                            <h4>代码示例使用等宽字体</h4>
                            <pre>
                                <code>{`function example() {
  console.log("Hello, world!");
  // 这里使用等宽字体
  return true;
}`}</code>
                            </pre>

                            <blockquote>
                                引用块使用斜体的衬线字体，增加视觉上的区分度。
                            </blockquote>

                            <p>
                                字体的选择对于网站的整体视觉体验和用户阅读体验至关重要。合理的字体搭配可以提升网站的专业感和品质感。
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default FontTestPage;
