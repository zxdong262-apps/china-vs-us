/**
 * IMF Data Module
 * Source: https://www.imf.org/en/Publications/WEO
 * 
 * This module provides data from International Monetary Fund
 * Focus on economic forecasts and financial indicators
 * Comparing China and United States
 */

const imfData = {
  // Manufacturing output (2024, in trillion USD)
  manufacturingOutput: {
    china: 5.15,
    us: 2.85,
    source: 'IMF',
    year: 2024,
    unit: 'trillion USD'
  },
  
  // Military budget (2024, in billion USD)
  militaryBudget: {
    china: 245,
    us: 886,
    source: 'SIPRI',
    year: 2024,
    unit: 'billion USD'
  },
  
  // Military budget as percentage of GDP
  // GDP from world-bank.js: China 18.53 trillion, US 28.78 trillion
  militaryBudgetInGDPPercentage: {
    china: 1.32,
    us: 3.08,
    source: 'SIPRI/IMF',
    year: 2024,
    unit: 'percent'
  },
  
  // Medical services expenditure (2023, in billion USD)
  medicalServices: {
    china: 896,
    us: 4870,
    source: 'World Bank',
    year: 2023,
    unit: 'billion USD'
  },
  
  // Medical services as percentage of GDP
  medicalServicesInGDPPercentage: {
    china: 7.1,
    us: 16.6,
    source: 'World Bank',
    year: 2023,
    unit: 'percent'
  },
  
  // Legal services GDP (2023, in billion USD)
  legalServicesGDP: {
    china: 45,
    us: 320,
    source: 'World Bank',
    year: 2023,
    unit: 'billion USD'
  },
  
  // Legal services as percentage of GDP
  legalServicesGDPInPercentage: {
    china: 0.24,
    us: 1.11,
    source: 'World Bank',
    year: 2023,
    unit: 'percent'
  },
  
  // Blood products export (2023, in billion USD)
  bloodProductsExport: {
    china: 3.2,
    us: 15.8,
    source: 'UN Comtrade',
    year: 2023,
    unit: 'billion USD'
  }
};

export default imfData;
