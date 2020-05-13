exports.getBrowser = async () => {
  if (process.env.LOCAL == 'true') {
    const puppeteer = require('puppeteer-extra')
 
    const StealthPlugin = require('puppeteer-extra-plugin-stealth')
    puppeteer.use(StealthPlugin())

    return await puppeteer.launch({ 
      headless: false, 
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
      ],
      ignoreHTTPSErrors: true,
      ignoreDefaultArgs: true
    })
  } else {
    const chromium = require('chrome-aws-lambda')
    const puppeteer = require('puppeteer-extra');

    // Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());
    // const { addExtra } = require('puppeteer-extra')
    // const StealthPlugin = require('puppeteer-extra-plugin-stealth')

    // const puppeteerExtra = addExtra(chromium.puppeteer)
    // puppeteerExtra.use(StealthPlugin())

    return await puppeteer.launch({
      executablePath: await chromium.executablePath,
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless,
    })
  }
}

exports.getChromium = () => require('chrome-aws-lambda')