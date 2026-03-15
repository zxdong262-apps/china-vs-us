/**
 * Data Module Index
 * 
 * Central export point for all data modules
 */

import worldBankData from './world-bank.js';
import imfData from './imf.js';
import chinaGovData from './china-gov.js';
import links from './links.js';

// Combine all data into a single object
const allData = {
  ...worldBankData,
  ...imfData,
  ...chinaGovData,
  links
};

export default {
  worldBank: worldBankData,
  imf: imfData,
  chinaGov: chinaGovData,
  links: links,
  all: allData
};
