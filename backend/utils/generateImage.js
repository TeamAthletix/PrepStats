const puppeteer = require('puppeteer');

module.exports = async function renderGraphic(htmlContent, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent);
  await page.setViewport({ width: 1080, height: 1350 });

  await page.screenshot({ path: outputPath });
  await browser.close();
};
