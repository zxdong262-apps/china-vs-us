// Script to generate QR code images for each locale
import QRCode from 'qrcode';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import locales from '../../src/locales/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const outputDir = path.join(rootDir, 'public/images');

// Production base URL
import { PRODUCTION_BASE_URL, packName } from './conf.js';

const supportedLocales = locales.getSupportedLocales();
const defaultLocale = supportedLocales[0];

function getLocaleUrl(localeCode) {
  if (localeCode === defaultLocale) {
    return PRODUCTION_BASE_URL + '/';
  }
  return PRODUCTION_BASE_URL + '/' + localeCode + '/';
}

function getQrCodeFileName(localeCode) {
  if (localeCode === defaultLocale) {
    return `qrcode-${packName}.png`;
  }
  return `qrcode-${packName}-${localeCode}.png`;
}

async function generateQrCodes() {
  console.log('Generating QR code images for each locale...');
  
  // Ensure images directory exists
  await fs.promises.mkdir(outputDir, { recursive: true });
  console.log('Images directory ready');
  
  console.log('Supported locales:', supportedLocales);
  
  for (const localeCode of supportedLocales) {
    const productionUrl = getLocaleUrl(localeCode);
    const fileName = getQrCodeFileName(localeCode);
    const outputPath = path.join(outputDir, fileName);
    
    console.log(`Generating QR code for ${localeCode}: ${productionUrl}`);
    
    await QRCode.toFile(outputPath, productionUrl, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    
    console.log(`Saved: ${outputPath}`);
  }
  
  console.log('QR code generation complete!');
}

generateQrCodes().catch(err => {
  console.error('QR code generation failed:', err);
  process.exit(1);
});