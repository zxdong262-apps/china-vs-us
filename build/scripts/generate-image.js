/**
 * Generate Images Build Script
 * 
 * Generates images from the data table for each locale using html2canvas
 * via puppeteer (headless browser)
 */

import fs from 'fs-extra';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import locales from '../../src/locales/index.js';
import serverApp from '../../src/server/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../../public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Production base URL
import { PRODUCTION_BASE_URL } from './conf.js';

const supportedLocales = locales.getSupportedLocales();
const defaultLocale = supportedLocales[0];

function getLocaleUrl(localeCode) {
  if (localeCode === defaultLocale) {
    return PRODUCTION_BASE_URL + '/';
  }
  return PRODUCTION_BASE_URL + '/' + localeCode + '/';
}

function getImageFileName(localeCode) {
  if (localeCode === defaultLocale) {
    return 'china-vs-us.png';
  }
  return `china-vs-us-${localeCode}.png`;
}

// Get port from command line or use default
const PORT = process.env.PORT || 8081;

function startServer() {
  return new Promise((resolve, reject) => {
    const server = serverApp.listen(PORT, () => {
      console.log(`Local server started on port ${PORT}`);
      
      const checkServer = () => {
        const req = http.get(`http://localhost:${PORT}/`, (res) => {
          resolve(server);
        });
        req.on('error', () => {
          setTimeout(checkServer, 100);
        });
      };
      checkServer();
    });
    
    server.on('error', reject);
  });
}

async function generateImages() {
  console.log('Starting image generation...');
  
  // Ensure images directory exists
  await fs.ensureDir(IMAGES_DIR);
  console.log('Images directory ready');
  
  // Start local server
  const server = await startServer();
  
  // Dynamically import puppeteer
  const puppeteer = await import('puppeteer');
  
  const browser = await puppeteer.default.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=none',
      '--disable-font-subpixel-positioning',
      '--enable-font-antialiasing'
    ]
  });
  
  try {
    console.log('Supported locales:', supportedLocales);
    
    for (const localeCode of supportedLocales) {
      const urlPath = localeCode === defaultLocale ? '/' : `/${localeCode}/`;
      const fullUrl = `http://localhost:${PORT}${urlPath}`;
      const productionUrl = getLocaleUrl(localeCode);
      
      console.log(`Generating image for ${localeCode} from ${fullUrl}...`);
      
      const page = await browser.newPage();

      // Block the qrcodejs CDN script so its onload callback never fires.
      // Without this, qrcodejs may load asynchronously *after* we inject our
      // data-URL QR image, appending a second QR code into #qr-code-wrap.
      await page.setRequestInterception(true);
      page.on('request', interceptedReq => {
        if (interceptedReq.url().includes('qrcodejs')) {
          interceptedReq.abort();
        } else {
          interceptedReq.continue();
        }
      });

      // Set viewport for consistent rendering
      await page.setViewport({
        width: 1200,
        height: 2000,
        deviceScaleFactor: 2
      });
      
      console.log(`Navigating to ${fullUrl}...`);
      try {
        const response = await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        console.log('Response status:', response.status());
      } catch (e) {
        console.log('Navigation error:', e.message);
        // Get the page content to debug
        try {
          const content = await page.content();
          console.log('Page content (first 500 chars):', content.substring(0, 500));
        } catch (e2) {
          console.log('Could not get page content:', e2.message);
        }
        throw e;
      }

      // Wait for the table to be rendered first
      await page.waitForSelector('#data-table', { timeout: 30000 });
      console.log('Table found!');
      
      // Read the pre-generated QR code PNG and convert to base64 data URL
      // so it doesn't depend on the dev server's static file path
      const qrCodeFileName = localeCode === defaultLocale
        ? 'qrcode-china-vs-us.png'
        : `qrcode-china-vs-us-${localeCode}.png`;
      const qrCodeFilePath = path.join(IMAGES_DIR, qrCodeFileName);
      const qrCodeBase64 = (await fs.readFile(qrCodeFilePath)).toString('base64');
      const qrCodeDataUrl = `data:image/png;base64,${qrCodeBase64}`;
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Set the QR code using the pre-generated image as a data URL
      await page.evaluate((url, qrCodeDataUrl) => {
        const tableUrl = document.getElementById('tableUrl');
        if (tableUrl) {
          // Update the URL text
          const urlText = tableUrl.querySelector('.url-text');
          if (urlText) {
            urlText.textContent = url;
          }

          // After commit b724430, the QR code container is #qr-code-wrap (a div).
          // Clear whatever qrcodejs may have put there and inject a plain <img>.
          const qrWrap = tableUrl.querySelector('#qr-code-wrap');
          if (qrWrap) {
            qrWrap.innerHTML = '';
            const img = document.createElement('img');
            img.id = 'qrcode-img';
            img.className = 'qr-code';
            img.src = qrCodeDataUrl;
            img.alt = 'QR Code';
            img.style.cssText = 'display: inline-block; vertical-align: middle; width: 60px; height: 60px;';
            qrWrap.appendChild(img);
          }
        }
      }, productionUrl, qrCodeDataUrl);
      console.log('QR code image set!');

      // Data URLs load synchronously, but wait briefly to ensure paint
      await page.waitForFunction(() => {
        const img = document.getElementById('qrcode-img');
        return img && img.tagName === 'IMG' && img.complete && img.naturalWidth > 0;
      }, { timeout: 10000 });
      console.log('QR code image loaded!');
       
       // Inject html2canvas and execute capture
      const imageBuffer = await page.evaluate(async () => {
        // Load html2canvas from CDN
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
        
        const tableContainer = document.querySelector('#data-table table.data-table');
        if (!tableContainer) {
          throw new Error('Table container not found');
        }
        
        // Use html2canvas to capture the table container directly
        const canvas = await html2canvas(tableContainer, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        return canvas.toDataURL('image/png').split(',')[1];
      });
      
      // Save the image
      const imageFileName = getImageFileName(localeCode);
      const imagePath = path.join(IMAGES_DIR, imageFileName);
      
      await fs.writeFile(imagePath, Buffer.from(imageBuffer, 'base64'));
      console.log(`Saved: ${imagePath}`);
      
      await page.close();
    }
    
    console.log('Image generation complete!');
    
  } finally {
    await browser.close();
    server.close();
    console.log('Local server stopped');
  }
}

generateImages().catch(err => {
  console.error('Image generation failed:', err);
  process.exit(1);
});
