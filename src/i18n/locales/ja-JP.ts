/**
 * 日本語翻訳
 */
export default {
    // 一般
    common: {
        loading: '読み込み中...',
        error: 'エラーが発生しました',
        retry: '再試行',
        save: '保存',
        cancel: 'キャンセル',
        delete: '削除',
        edit: '編集',
        view: '表示',
        search: '検索',
        back: '戻る',
        next: '次へ',
        previous: '前へ',
    },

    // ヘッダー/ナビゲーション
    nav: {
        home: 'ホーム',
        articles: '記事',
        categories: 'カテゴリー',
        tags: 'タグ',
        about: '約',
        login: 'ログイン',
        register: '登録',
        logout: 'ログアウト',
        profile: 'プロフィール',
        search: '記事を検索...',
    },

    // ホームページ
    home: {
        welcome: 'HoWhite ブログへようこそ',
        tagline: '技術、生活、思考を共有する',
        featuredArticles: '注目の記事',
        latestArticles: '最新の記事',
        popularCategories: '人気のカテゴリー',
        popularTags: '人気のタグ',
        readMore: '続きを読む',
        viewAll: 'すべて表示',
    },

    // 記事
    article: {
        readingTime: '読むのに必要な時間: {{time}} 分',
        publishedOn: '{{date}} に公開',
        updatedOn: '{{date}} に更新',
        author: '著者: {{name}}',
        relatedArticles: '関連記事',
        comments: 'コメント',
        leaveComment: 'コメントを残す',
        yourComment: 'あなたのコメント',
        submit: '送信',
        category: 'カテゴリー',
        categories: 'カテゴリー',
        tag: 'タグ',
        tags: 'タグ',
        share: '共有',
    },

    // カテゴリー
    category: {
        allCategories: 'すべてのカテゴリー',
        articles: 'このカテゴリーの記事',
        noArticles: 'このカテゴリーにはまだ記事がありません',
    },

    // タグ
    tag: {
        allTags: 'すべてのタグ',
        articles: 'このタグの記事',
        noArticles: 'このタグの記事はまだありません',
    },

    // 約
    about: {
        title: 'HoWhite ブログについて',
        description: '現代的な個人技術ブログ',
    },

    // 認証
    auth: {
        login: 'ログイン',
        register: '登録',
        email: 'メールアドレス',
        password: 'パスワード',
        confirmPassword: 'パスワードを確認',
        username: 'ユーザー名',
        forgotPassword: 'パスワードをお忘れですか？',
        noAccount: 'アカウントをお持ちでない方',
        hasAccount: 'すでにアカウントをお持ちの方',
        resetPassword: 'パスワードをリセット',
        passwordRequirements: 'パスワードは8文字以上必要です',
        emailInvalid: '有効なメールアドレスを入力してください',
        passwordMismatch: 'パスワードが一致しません',
    },

    // ユーザープロフィール
    profile: {
        title: 'ユーザープロフィール',
        personalInfo: '個人情報',
        changePassword: 'パスワードを変更',
        savedArticles: '保存した記事',
        comments: '私のコメント',
        deleteAccount: 'アカウントを削除',
        deleteConfirm:
            'アカウントを削除してもよろしいですか？この操作は元に戻せません。',
    },

    // テーマ
    theme: {
        light: 'ライトモード',
        dark: 'ダークモード',
        system: 'システムモード',
        toggle: 'テーマを切り替え',
        current: '現在のテーマ: {{mode}}',
    },

    // 言語
    language: {
        select: '言語を選択',
        english: '英語',
        simplifiedChinese: '簡体字中国語',
        traditionalChinese: '繁体字中国語',
        japanese: '日本語',
    },

    // エラーページ
    error: {
        notFound: 'ページが見つかりません',
        notFoundMessage: 'お探しのページは存在しません',
        serverError: 'サーバーエラー',
        serverErrorMessage: 'サーバー側で問題が発生しました',
        goHome: 'ホームに戻る',
    },

    // フッター
    footer: {
        copyright: '© {{year}} HoWhite ブログ. All rights reserved.',
        terms: '利用規約',
        privacy: 'プライバシーポリシー',
        contact: 'お問い合わせ',
    },
};
