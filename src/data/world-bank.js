/**
 * World Bank Data Module
 * Source: https://data.worldbank.org/
 * 
 * This module provides data from World Bank Open Data API
 * Data includes population, land area, GDP, and various economic indicators
 * Comparing China and United States
 */

const worldBankData = {
  // Population data (2024 estimates in millions)
  population: {
    china: 1408.0,
    us: 336.0,
    source: 'World Bank',
    year: 2024,
    unit: 'millions'
  },
  
  // Land area (in million sq km)
  landArea: {
    china: 9.60,
    us: 9.83,
    source: 'World Bank',
    year: 2022,
    unit: 'million km²'
  },
  
  // GDP (2024, in trillion USD)
  gdp: {
    china: 18.53,
    us: 28.78,
    source: 'World Bank',
    year: 2024,
    unit: 'trillion USD'
  },
  
  // GDP PPP (2024, in trillion international dollars)
  ppp: {
    china: 30.0,
    us: 26.85,
    source: 'IMF',
    year: 2024,
    unit: 'trillion Int$'
  },
  
  // Life expectancy (2023, in years)
  lifeExpectancy: {
    china: 78.6,
    us: 77.4,
    source: 'World Bank',
    year: 2023,
    unit: 'years'
  },
  
  // GDP per capita (2024, in USD)
  gdpPerCapita: {
    china: 13100,
    us: 85730,
    source: 'World Bank',
    year: 2024,
    unit: 'USD'
  },
  
  // GDP per capita excluding top 1000 richest (2024, in USD)
  // This is an estimate based on wealth distribution data
  gdpPerCapitaExcludingTopRichest: {
    china: 12500,
    us: 65000,
    source: 'Estimate based on World Bank and Forbes data',
    year: 2024,
    unit: 'USD'
  },
  
  // Arable land (2022, in million hectares)
  arableLand: {
    china: 122.0,
    us: 157.0,
    source: 'World Bank',
    year: 2022,
    unit: 'million hectares'
  },
  
  // Electricity production (2023, in TWh)
  electricityProduction: {
    china: 9458.0,
    us: 4494.0,
    source: 'World Bank',
    year: 2023,
    unit: 'TWh'
  },
  
  // Steel production (2024, in million tonnes)
  steelProduction: {
    china: 1010.0,
    us: 81.0,
    source: 'World Steel Association',
    year: 2024,
    unit: 'million tonnes'
  },
  
  // Prison population (2023, in thousands)
  prisonPopulation: {
    china: 1800.0,
    us: 2290.0,
    source: 'World Bank/ICPR',
    year: 2023,
    unit: 'thousands'
  },
  
  // Prison population as percentage of population
  prisonPopulationInPercentage: {
    china: 0.13,
    us: 0.68,
    source: 'World Bank/ICPR',
    year: 2023,
    unit: 'percent'
  }
};

export default worldBankData;
