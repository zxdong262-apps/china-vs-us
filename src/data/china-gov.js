/**
 * China Government Data Module
 * Source: National Bureau of Statistics of China
 * https://data.stats.gov.cn/
 * 
 * This module provides data specifically from Chinese government sources
 * Comparing China and United States
 * Agriculture, energy, and other sector-specific data
 */

const chinaGovData = {
  // Agriculture production (2024, in million tonnes)
  agricultureProduction: {
    grain: {
      china: 706.5,
      us: 460.0,
      source: 'National Bureau of Statistics of China / USDA',
      year: 2024,
      unit: 'million tonnes'
    },
    vegetables: {
      china: 590.0,
      us: 32.0,
      source: 'National Bureau of Statistics of China / USDA',
      year: 2024,
      unit: 'million tonnes'
    },
    fruits: {
      china: 330.0,
      us: 28.0,
      source: 'National Bureau of Statistics of China / USDA',
      year: 2024,
      unit: 'million tonnes'
    }
  },
  
  // Power generation capacity (2024, in GW)
  powerCapacity: {
    windPower: {
      china: 520,
      us: 149,
      source: 'National Energy Administration of China / EIA',
      year: 2024,
      unit: 'GW'
    },
    solarPower: {
      china: 1186,
      us: 173,
      source: 'National Energy Administration of China / EIA',
      year: 2024,
      unit: 'GW'
    },
    hydropower: {
      china: 450,
      us: 102,
      source: 'National Energy Administration of China / EIA',
      year: 2025,
      unit: 'GW'
    }
  },
  
  // Manufacturing production (2024)
  manufacturing: {
    automobile: {
      china: 31.24,
      us: 10.6,
      source: 'China Association of Automobile Manufacturers / OICA',
      year: 2024,
      unit: 'million vehicles'
    },
    newEnergyVehicles: {
      china: 12.14,
      us: 1.4,
      source: 'China Association of Automobile Manufacturers',
      year: 2024,
      unit: 'million vehicles'
    },
    shipbuilding: {
      china: 43.5,
      us: 1.2,
      source: 'China Shipbuilding Industry Corporation / Clarksons',
      year: 2024,
      unit: 'million CGT'
    },
    aluminum: {
      china: 43.0,
      us: 3.8,
      source: 'China Nonferrous Metal Industry Association / USGS',
      year: 2024,
      unit: 'million tonnes'
    }
  },
  
  // Transportation infrastructure (2024, in km)
  transportation: {
    expressway: {
      china: 190000,
      us: 107000,
      source: 'Ministry of Transport of China / FHWA',
      year: 2025,
      unit: 'km'
    },
    highSpeedRail: {
      china: 50000,
      us: 0,
      source: 'China Railway / UIC',
      year: 2025,
      unit: 'km'
    }
  }
};

export default chinaGovData;
