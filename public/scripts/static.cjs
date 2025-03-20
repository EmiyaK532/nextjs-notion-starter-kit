const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function generateStaticPage() {
    // 指定输出目录
    const outputDir = path.join(__dirname, 'build');

    // 确保输出目录存在
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // 输出文件路径
    const outputPath = path.join(outputDir, 'index.html');

    const browser = await puppeteer.launch({
        executablePath:
            'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // 替换成您的 Chrome 路径
    });

    const page = await browser.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    const html = await page.content();

    // 将HTML内容写入文件
    fs.writeFileSync(outputPath, html);

    console.log(`静态HTML已生成至: ${outputPath}`);
    await browser.close();
}

generateStaticPage();
