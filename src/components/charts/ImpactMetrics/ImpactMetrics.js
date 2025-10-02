import React, { useState } from 'react';
import './ImpactMetrics.css';

const ImpactMetrics = ({ 
  type = 'all', // 'all', 'social', 'environmental', 'economic'
  timeRange = '1y'
}) => {
  const [activeCategory, setActiveCategory] = useState(type);

  // Mock data - replace with actual API data
  const impactData = {
    social: {
      farmersSupported: 1250,
      farmersSupportedGrowth: 15.2,
      jobsCreated: 3780,
      jobsCreatedGrowth: 22.5,
      womenEmpowered: 520,
      womenEmpoweredGrowth: 28.3,
      trainingHours: 15600,
      trainingHoursGrowth: 18.7,
      communityProjects: 45,
      communityProjectsGrowth: 12.5,
      fairTradeTransactions: 8950,
      fairTradeTransactionsGrowth: 25.8,
      timeline: [
        { month: 'Jan', farmers: 1050, jobs: 3100, women: 410 },
        { month: 'Feb', farmers: 1080, jobs: 3200, women: 425 },
        { month: 'Mar', farmers: 1100, jobs: 3300, women: 440 },
        { month: 'Apr', farmers: 1130, jobs: 3400, women: 460 },
        { month: 'May', farmers: 1160, jobs: 3500, women: 475 },
        { month: 'Jun', farmers: 1180, jobs: 3580, women: 490 },
        { month: 'Jul', farmers: 1200, jobs: 3650, women: 500 },
        { month: 'Aug', farmers: 1220, jobs: 3700, women: 510 },
        { month: 'Sep', farmers: 1235, jobs: 3750, women: 515 },
        { month: 'Oct', farmers: 1245, jobs: 3765, women: 518 },
        { month: 'Nov', farmers: 1248, jobs: 3775, women: 519 },
        { month: 'Dec', farmers: 1250, jobs: 3780, women: 520 }
      ]
    },
    environmental: {
      carbonOffset: 45600,
      carbonOffsetGrowth: 32.4,
      waterSaved: 1250000,
      waterSavedGrowth: 28.9,
      organicFarms: 680,
      organicFarmsGrowth: 45.2,
      treesPlanted: 28500,
      treesPlantedGrowth: 52.3,
      wasteReduced: 125000,
      wasteReducedGrowth: 18.6,
      renewableEnergy: 85,
      renewableEnergyGrowth: 15.2,
      timeline: [
        { month: 'Jan', carbon: 38000, water: 1050000, organic: 550 },
        { month: 'Feb', carbon: 39000, water: 1080000, organic: 570 },
        { month: 'Mar', carbon: 40000, water: 1100000, organic: 590 },
        { month: 'Apr', carbon: 41000, water: 1130000, organic: 610 },
        { month: 'May', carbon: 42000, water: 1160000, organic: 625 },
        { month: 'Jun', carbon: 42500, water: 1180000, organic: 635 },
        { month: 'Jul', carbon: 43000, water: 1200000, organic: 645 },
        { month: 'Aug', carbon: 43500, water: 1215000, organic: 655 },
        { month: 'Sep', carbon: 44000, water: 1225000, organic: 660 },
        { month: 'Oct', carbon: 44500, water: 1235000, organic: 670 },
        { month: 'Nov', carbon: 45000, water: 1242000, organic: 675 },
        { month: 'Dec', carbon: 45600, water: 1250000, organic: 680 }
      ]
    },
    economic: {
      totalRevenue: 12500000,
      totalRevenueGrowth: 18.5,
      farmerIncome: 8750000,
      farmerIncomeGrowth: 22.3,
      avgIncomeIncrease: 35.6,
      avgIncomeIncreaseGrowth: 8.2,
      marketAccess: 92,
      marketAccessGrowth: 12.8,
      priceStability: 88,
      priceStabilityGrowth: 15.4,
      costReduction: 25,
      costReductionGrowth: 5.6,
      timeline: [
        { month: 'Jan', revenue: 950000, farmerIncome: 665000, avgIncome: 28 },
        { month: 'Feb', revenue: 980000, farmerIncome: 686000, avgIncome: 29 },
        { month: 'Mar', revenue: 1000000, farmerIncome: 700000, avgIncome: 30 },
        { month: 'Apr', revenue: 1020000, farmerIncome: 714000, avgIncome: 31 },
        { month: 'May', revenue: 1050000, farmerIncome: 735000, avgIncome: 32 },
        { month: 'Jun', revenue: 1080000, farmerIncome: 756000, avgIncome: 33 },
        { month: 'Jul', revenue: 1100000, farmerIncome: 770000, avgIncome: 33.5 },
        { month: 'Aug', revenue: 1050000, farmerIncome: 735000, avgIncome: 34 },
        { month: 'Sep', revenue: 1030000, farmerIncome: 721000, avgIncome: 34.5 },
        { month: 'Oct', revenue: 1040000, farmerIncome: 728000, avgIncome: 35 },
        { month: 'Nov', revenue: 1060000, farmerIncome: 742000, avgIncome: 35.3 },
        { month: 'Dec', revenue: 1090000, farmerIncome: 763000, avgIncome: 35.6 }
      ]
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const renderSocialMetrics = () => (
    <div className="impact-category social-impact">
      <div className="category-header">
        <h3>Social Impact</h3>
        <p>Empowering communities and creating opportunities</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card highlight">
          <div className="metric-icon">👨‍🌾</div>
          <div className="metric-data">
            <span className="metric-value">{formatNumber(impactData.social.farmersSupported)}</span>
            <span className="metric-label">Farmers Supported</span>
            <span className="metric-growth positive">
              +{impactData.social.farmersSupportedGrowth}% this year
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">💼</div>
          <div className="metric-data">
            <span className="metric-value">{formatNumber(impactData.social.jobsCreated)}</span>
            <span className="metric-label">Jobs Created</span>
            <span className="metric-growth positive">
              +{impactData.social.jobsCreatedGrowth}%
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">👩‍🌾</div>
          <div className="metric-data">
            <span className="metric-value">{formatNumber(impactData.social.womenEmpowered)}</span>
            <span className="metric-label">Women Empowered</span>
            <span className="metric-growth positive">
              +{impactData.social.womenEmpoweredGrowth}%
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📚</div>
          <div className="metric-data">
            <span className="metric-value">{formatNumber(impactData.social.trainingHours)}</span>
            <span className="metric-label">Training Hours</span>
            <span className="metric-growth positive">
              +{impactData.social.trainingHoursGrowth}%
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🏘️</div>
          <div className="metric-data">
            <span className="metric-value">{impactData.social.communityProjects}</span>
            <span className="metric-label">Community Projects</span>
            <span className="metric-growth positive">
              +{impactData.social.communityProjectsGrowth}%
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🤝</div>
          <div className="metric-data">
            <span className="metric-value">{formatNumber(impactData.social.fairTradeTransactions)}</span>
            <span className="metric-label">Fair Trade Transactions</span>
            <span className="metric-growth positive">
              +{impactData.social.fairTradeTransactionsGrowth}%
            </span>
          </div>
        </div>
      </div>

      <div className="trend-chart">
        <h4>Social Impact Trends (2024)</h4>
        <div className="multi-line-chart">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1={i * 25}
                x2="100"
                y2={i * 25}
                stroke="var(--color-border-light)"
                strokeWidth="0.2"
              />
            ))}

            {/* Farmers Line */}
            <polyline
              points={impactData.social.timeline.map((d, i) => {
                const x = (i / 11) * 100;
                const y = 100 - ((d.farmers - 1000) / 300) * 100;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="0.8"
            />

            {/* Jobs Line */}
            <polyline
              points={impactData.social.timeline.map((d, i) => {
                const x = (i / 11) * 100;
                const y = 100 - ((d.jobs - 3000) / 900) * 100;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="var(--color-secondary-blue)"
              strokeWidth="0.8"
            />

            {/* Women Line */}
            <polyline
              points={impactData.social.timeline.map((d, i) => {
                const x = (i / 11) * 100;
                const y = 100 - ((d.women - 400) / 150) * 100;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="var(--color-secondary-yellow)"
              strokeWidth="0.8"
            />
          </svg>
        </div>
        <div className="chart-legend-horizontal">
          <div className="legend-item">
            <div className="legend-line" style={{ background: 'var(--color-primary)' }}></div>
            <span>Farmers</span>
          </div>
          <div className="legend-item">
            <div className="legend-line" style={{ background: 'var(--color-secondary-blue)' }}></div>
            <span>Jobs</span>
          </div>
          <div className="legend-item">
            <div className="legend-line" style={{ background: 'var(--color-secondary-yellow)' }}></div>
            <span>Women</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEnvironmentalMetrics = () => (
    <div className="impact-category environmental-impact">
      <div className="category-header">
        <h3>Environmental Impact</h3>
        <p>Protecting our planet for future generations</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card highlight">
          <div className="metric-icon">🌍</div>
          <div className="metric-data">
            <span className="metric-value">{formatNumber(impactData.environmental.carbonOffset)} kg</span>
            <span className="metric-label">CO₂ Offset</span>
            <span className="metric-growth positive">
              +{impactData.environmental.carbonOffsetGrowth}% this year
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">💧</div>
          <div className="metric-data">
            <span className="metric-value">{formatNumber(impactData.environmental.waterSaved)} L</span>
            <span className="metric-label">Water Saved</span>
            <span className="metric-growth positive">
              +{impactData.environmental.waterSavedGrowth}%
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🌱</div>
          <div className="metric-data">
            <span className="metric-value">{impactData.environmental.organicFarms}</span>
            <span className="metric-label">Organic Farms</span>
            <span className="metric-growth positive">
              +{impactData.environmental.organicFarmsGrowth}%
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🌳</div>
          <div className="metric-data">
            <span className="metric-value">{formatNumber(impactData.environmental.treesPlanted)}</span>
            <span className="metric-label">Trees Planted</span>
            <span className="metric-growth positive">
              +{impactData.environmental.treesPlantedGrowth}%
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">♻️</div>
          <div className="metric-data">
            <span className="metric-value">{formatNumber(impactData.environmental.wasteReduced)} kg</span>
            <span className="metric-label">Waste Reduced</span>
            <span className="metric-growth positive">
              +{impactData.environmental.wasteReducedGrowth}%
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-data">
            <span className="metric-value">{impactData.environmental.renewableEnergy}%</span>
            <span className="metric-label">Renewable Energy</span>
            <span className="metric-growth positive">
              +{impactData.environmental.renewableEnergyGrowth}%
            </span>
          </div>
        </div>
      </div>

      <div className="trend-chart">
        <h4>Environmental Impact Trends (2024)</h4>
        <div className="multi-line-chart">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1={i * 25}
                x2="100"
                y2={i * 25}
                stroke="var(--color-border-light)"
                strokeWidth="0.2"
              />
            ))}

            {/* Carbon Area */}
            <path
              d={`M 0 ${100 - ((impactData.environmental.timeline[0].carbon - 37000) / 10000) * 100}
                  ${impactData.environmental.timeline.map((d, i) => {
                    const x = (i / 11) * 100;
                    const y = 100 - ((d.carbon - 37000) / 10000) * 100;
                    return `L ${x} ${y}`;
                  }).join(' ')}
                  L 100 100 L 0 100 Z`}
              fill="url(#envGradient)"
              opacity="0.3"
            />

            {/* Carbon Line */}
            <polyline
              points={impactData.environmental.timeline.map((d, i) => {
                const x = (i / 11) * 100;
                const y = 100 - ((d.carbon - 37000) / 10000) * 100;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="var(--color-success)"
              strokeWidth="0.8"
            />

            <defs>
              <linearGradient id="envGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-success)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );

  const renderEconomicMetrics = () => (
    <div className="impact-category economic-impact">
      <div className="category-header">
        <h3>Economic Impact</h3>
        <p>Creating sustainable prosperity and financial inclusion</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card highlight">
          <div className="metric-icon">💰</div>
          <div className="metric-data">
            <span className="metric-value">${formatNumber(impactData.economic.totalRevenue)}</span>
            <span className="metric-label">Total Revenue</span>
            <span className="metric-growth positive">
              +{impactData.economic.totalRevenueGrowth}% this year
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">💵</div>
          <div className="metric-data">
            <span className="metric-value">${formatNumber(impactData.economic.farmerIncome)}</span>
            <span className="metric-label">Farmer Income</span>
            <span className="metric-growth positive">
              +{impactData.economic.farmerIncomeGrowth}%
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📈</div>
          <div className="metric-data">
            <span className="metric-value">{impactData.economic.avgIncomeIncrease}%</span>
            <span className="metric-label">Avg Income Increase</span>
            <span className="metric-growth positive">
              +{impactData.economic.avgIncomeIncreaseGrowth}%
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🏪</div>
          <div className="metric-data">
            <span className="metric-value">{impactData.economic.marketAccess}%</span>
            <span className="metric-label">Market Access</span>
            <span className="metric-growth positive">
              +{impactData.economic.marketAccessGrowth}%
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-data">
            <span className="metric-value">{impactData.economic.priceStability}%</span>
            <span className="metric-label">Price Stability</span>
            <span className="metric-growth positive">
              +{impactData.economic.priceStabilityGrowth}%
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">💸</div>
          <div className="metric-data">
            <span className="metric-value">{impactData.economic.costReduction}%</span>
            <span className="metric-label">Cost Reduction</span>
            <span className="metric-growth positive">
              +{impactData.economic.costReductionGrowth}%
            </span>
          </div>
        </div>
      </div>

      <div className="trend-chart">
        <h4>Economic Impact Trends (2024)</h4>
        <div className="multi-line-chart">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1={i * 25}
                x2="100"
                y2={i * 25}
                stroke="var(--color-border-light)"
                strokeWidth="0.2"
              />
            ))}

            {/* Revenue Bar Chart (simplified) */}
            {impactData.economic.timeline.map((d, i) => {
              const x = (i / 11) * 100;
              const height = ((d.revenue - 900000) / 250000) * 80;
              return (
                <rect
                  key={i}
                  x={x - 2}
                  y={100 - height}
                  width="4"
                  height={height}
                  fill="var(--color-primary)"
                  opacity="0.6"
                />
              );
            })}

            {/* Farmer Income Line */}
            <polyline
              points={impactData.economic.timeline.map((d, i) => {
                const x = (i / 11) * 100;
                const y = 100 - ((d.farmerIncome - 650000) / 150000) * 100;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="var(--color-secondary-yellow)"
              strokeWidth="0.8"
            />
          </svg>
        </div>
        <div className="chart-legend-horizontal">
          <div className="legend-item">
            <div className="legend-box" style={{ background: 'var(--color-primary)' }}></div>
            <span>Total Revenue</span>
          </div>
          <div className="legend-item">
            <div className="legend-line" style={{ background: 'var(--color-secondary-yellow)' }}></div>
            <span>Farmer Income</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="impact-metrics">
      {/* Category Selector */}
      <div className="category-selector">
        <button
          className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          <span className="btn-icon">📊</span>
          All Impact
        </button>
        <button
          className={`category-btn ${activeCategory === 'social' ? 'active' : ''}`}
          onClick={() => setActiveCategory('social')}
        >
          <span className="btn-icon">👥</span>
          Social
        </button>
        <button
          className={`category-btn ${activeCategory === 'environmental' ? 'active' : ''}`}
          onClick={() => setActiveCategory('environmental')}
        >
          <span className="btn-icon">🌍</span>
          Environmental
        </button>
        <button
          className={`category-btn ${activeCategory === 'economic' ? 'active' : ''}`}
          onClick={() => setActiveCategory('economic')}
        >
          <span className="btn-icon">💰</span>
          Economic
        </button>
      </div>

      {/* Render Categories */}
      <div className="impact-content">
        {(activeCategory === 'all' || activeCategory === 'social') && renderSocialMetrics()}
        {(activeCategory === 'all' || activeCategory === 'environmental') && renderEnvironmentalMetrics()}
        {(activeCategory === 'all' || activeCategory === 'economic') && renderEconomicMetrics()}
      </div>
    </div>
  );
};

export default ImpactMetrics;