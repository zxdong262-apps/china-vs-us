/**
 * Metric metadata used by templates and servers.
 */

const metrics = [
  { key: 'population', path: 'population', category: 'population', icon: '👥' },
  { key: 'landArea', path: 'landArea', category: 'geography', icon: '🌍' },
  { key: 'gdp', path: 'gdp', category: 'economy', icon: '💰' },
  { key: 'ppp', path: 'ppp', category: 'economy', icon: '⚖️' },
  { key: 'lifeExpectancy', path: 'lifeExpectancy', category: 'health', icon: '🏥' },
  { key: 'gdpPerCapita', path: 'gdpPerCapita', category: 'economy', icon: '💵' },
  { key: 'gdpPerCapitaExcludingTopRichest', path: 'gdpPerCapitaExcludingTopRichest', category: 'economy', icon: '📊' },
  { key: 'militaryBudget', path: 'militaryBudget', category: 'military', icon: '⚔️' },
  { key: 'militaryBudgetInGDPPercentage', path: 'militaryBudgetInGDPPercentage', category: 'military', icon: '📈' },
  { key: 'medicalServices', path: 'medicalServices', category: 'health', icon: '🏨' },
  { key: 'medicalServicesInGDPPercentage', path: 'medicalServicesInGDPPercentage', category: 'health', icon: '📉' },
  { key: 'legalServicesGDP', path: 'legalServicesGDP', category: 'legal', icon: '⚖️' },
  { key: 'legalServicesGDPInPercentage', path: 'legalServicesGDPInPercentage', category: 'legal', icon: '📊' },
  { key: 'prisonPopulation', path: 'prisonPopulation', category: 'justice', icon: '👮' },
  { key: 'prisonPopulationInPercentage', path: 'prisonPopulationInPercentage', category: 'justice', icon: '📊' },
  { key: 'bloodProductsExport', path: 'bloodProductsExport', category: 'trade', icon: '🩸' },
  { key: 'arableLand', path: 'arableLand', category: 'agriculture', icon: '🌱' },
  { key: 'manufacturingOutput', path: 'manufacturingOutput', category: 'industry', icon: '🏭' },
  { key: 'electricityProduction', path: 'electricityProduction', category: 'energy', icon: '⚡' },
  { key: 'windPower', path: 'powerCapacity.windPower', category: 'energy', icon: '💨' },
  { key: 'solarPower', path: 'powerCapacity.solarPower', category: 'energy', icon: '☀️' },
  { key: 'hydropower', path: 'powerCapacity.hydropower', category: 'energy', icon: '💧' },
  { key: 'steelProduction', path: 'steelProduction', category: 'metals', icon: '🔩' },
  { key: 'aluminumProduction', path: 'manufacturing.aluminum', category: 'metals', icon: '🔧' },
  { key: 'grainProduction', path: 'agricultureProduction.grain', category: 'agricultureGrain', icon: '🌾' },
  { key: 'vegetableProduction', path: 'agricultureProduction.vegetables', category: 'agricultureVegetable', icon: '🥬' },
  { key: 'fruitProduction', path: 'agricultureProduction.fruits', category: 'agricultureFruit', icon: '🍎' },
  { key: 'automobile', path: 'manufacturing.automobile', category: 'automobile', icon: '🚗' },
  { key: 'newEnergyVehicles', path: 'manufacturing.newEnergyVehicles', category: 'ev', icon: '🚎' },
  { key: 'shipbuilding', path: 'manufacturing.shipbuilding', category: 'shipbuilding', icon: '🚢' },
  { key: 'expressway', path: 'transportation.expressway', category: 'transport', icon: '🛣️' },
  { key: 'highSpeedRail', path: 'transportation.highSpeedRail', category: 'rail', icon: '🚄' }
];

export default {
  metrics
};
