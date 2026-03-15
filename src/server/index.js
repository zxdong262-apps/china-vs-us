/**
 * Express Development Server
 * 
 * Starts a development server with hot reload support
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import data from '../data/index.js';
import locales from '../locales/index.js';
import metrics from '../data/metrics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3004;

export { app, PORT };

function getDataByPath(obj, path) {
  return path.split('.').reduce((o, k) => (o || {})[k], obj);
}

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../client'));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Get supported locales
const supportedLocales = locales.getSupportedLocales();

// Main route with optional locale parameter
app.get(['/', '/:locale'], (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const localeParam = req.params.locale;
  
  // Determine locale: use param if provided and supported, otherwise default to en_US
  let localeCode;
  if (localeParam && supportedLocales.includes(localeParam)) {
    localeCode = localeParam;
  } else {
    localeCode = 'en_US';
  }
  
  const locale = locales.getLocale(localeCode);
  
  // Generate locale URLs
  const localeUrls = {};
  supportedLocales.forEach((code) => {
    localeUrls[code] = code === 'en_US' ? baseUrl + '/' : baseUrl + '/' + code;
  });
  
  const canonicalUrl = localeUrls[localeCode];
  
  // JSON-LD Structured Data - Enhanced for AI (GEO)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        'name': locale.site.title,
        'description': locale.site.description,
        'url': canonicalUrl,
        'inLanguage': localeCode.replace('_', '-'),
        'publisher': {
          '@type': 'Organization',
          'name': 'China vs United States',
          'url': baseUrl
        },
        'dateModified': new Date().toISOString().split('T')[0],
        'about': {
          '@type': 'Thing',
          'name': 'Statistical Comparison',
          'description': locale.site.description
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': `${baseUrl}/?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Dataset',
        'name': locale.site.title,
        'description': `Comparison of key statistics between China and United States. ${locale.site.description}`,
        'url': canonicalUrl,
        'inLanguage': localeCode.replace('_', '-'),
        'dateModified': new Date().toISOString().split('T')[0],
        'datePublished': '2024-01-01',
        'creator': {
          '@type': 'Organization',
          'name': 'China vs United States',
          'url': baseUrl
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'China vs United States',
          'url': baseUrl
        },
        'dataSource': [
          {
            '@type': 'Organization',
            'name': 'World Bank',
            'url': 'https://data.worldbank.org/'
          },
          {
            '@type': 'Organization',
            'name': 'International Monetary Fund (IMF)',
            'url': 'https://www.imf.org/en/Publications/WEO'
          },
          {
            '@type': 'Organization',
            'name': 'National Bureau of Statistics of China',
            'url': 'https://data.stats.gov.cn/'
          },
          {
            '@type': 'Organization',
            'name': 'Ministry of Statistics and Programme Implementation (United States)',
            'url': 'https://mospi.nic.in/'
          }
        ],
        'keywords': ['China statistics', 'United States comparison', 'population', 'GDP', 'economy', 'energy', '中国统计数据', '美国经济对比'],
        'license': 'https://creativecommons.org/licenses/by/4.0/',
        'citation': [
          {
            '@type': 'CreativeWork',
            'name': 'World Bank Open Data',
            'url': 'https://data.worldbank.org/'
          },
          {
            '@type': 'CreativeWork',
            'name': 'IMF World Economic Outlook',
            'url': 'https://www.imf.org/en/Publications/WEO'
          }
        ]
      },
      {
        '@type': 'WebPage',
        'name': locale.site.title,
        'description': locale.site.description,
        'url': canonicalUrl,
        'inLanguage': localeCode.replace('_', '-'),
        'dateModified': new Date().toISOString().split('T')[0],
        'author': {
          '@type': 'Organization',
          'name': 'China vs United States',
          'url': baseUrl
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'China vs United States',
          'url': baseUrl
        },
        'about': {
          '@type': 'Thing',
          'name': 'Statistical Data Comparison',
          'description': `Comprehensive statistical comparison between China and United States covering ${metrics.metrics.length} key metrics including population, economy, energy, agriculture, and manufacturing.`
        }
      }
    ]
  };
  
  // Set locals for template
  res.locals.currentLocale = localeCode;
  res.locals.locale = locale;
  res.locals.supportedLocales = supportedLocales;
  res.locals.data = data.all;
  res.locals.dataItems = metrics.metrics;
  res.locals.getDataByPath = getDataByPath;
  res.locals.canonicalUrl = canonicalUrl;
  res.locals.localeUrls = localeUrls;
  res.locals.jsonLd = jsonLd;
  res.locals.isProduction = process.env.NODE_ENV === 'production';
  
  res.render('index');
});

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  app.listen(PORT, () => {
    console.log(`Development server running at http://localhost:${PORT}`);
    console.log(`Open your browser to view the site.`);
  });
}

export default app;
