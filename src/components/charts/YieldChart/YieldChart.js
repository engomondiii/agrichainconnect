import React, { useState } from 'react';
import './YieldChart.css';

const YieldChart = ({ 
  farmerId,
  farmerName = 'Green Hills Farm',
  cropType = 'Coffee'
}) => {
  const [viewMode, setViewMode] = useState('comparison'); // comparison, historical, seasonal

  // Mock data - replace with actual API data
  const yieldData = {
    predicted: [
      { year: 2021, predicted: 450, actual: 420, variance: -6.7 },
      { year: 2022, predicted: 480, actual: 495, variance: 3.1 },
      { year: 2023, predicted: 500, actual: 485, variance: -3.0 },
      { year: 2024, predicted: 520, actual: 530, variance: 1.9 },
      { year: 2025, predicted: 550, actual: null, variance: null }
    ],
    seasonal: [
      { month: 'Jan', yield: 45, avgTemp: 22, rainfall: 80 },
      { month: 'Feb', yield: 40, avgTemp: 23, rainfall: 70 },
      { month: 'Mar', yield: 35, avgTemp: 24, rainfall: 90 },
      { month: 'Apr', yield: 30, avgTemp: 23, rainfall: 150 },
      { month: 'May', yield: 25, avgTemp: 22, rainfall: 180 },
      { month: 'Jun', yield: 20, avgTemp: 21, rainfall: 120 },
      { month: 'Jul', yield: 25, avgTemp: 21, rainfall: 100 },
      { month: 'Aug', yield: 35, avgTemp: 22, rainfall: 110 },
      { month: 'Sep', yield: 45, avgTemp: 23, rainfall: 130 },
      { month: 'Oct', yield: 55, avgTemp: 24, rainfall: 140 },
      { month: 'Nov', yield: 60, avgTemp: 23, rainfall: 160 },
      { month: 'Dec', yield: 50, avgTemp: 22, rainfall: 120 }
    ],
    trends: {
      averageYield: 485,
      bestYear: 2024,
      predictionAccuracy: 95.8,
      improvementRate: 4.2
    }
  };

  const getMaxYield = () => {
    return Math.max(...yieldData.predicted.map(d => Math.max(d.predicted, d.actual || 0)));
  };

  const calculateAccuracy = () => {
    const withActual = yieldData.predicted.filter(d => d.actual !== null);
    const avgVariance = withActual.reduce((sum, d) => sum + Math.abs(d.variance), 0) / withActual.length;
    return 100 - avgVariance;
  };

  return (
    <div className="yield-chart">
      {/* Header */}
      <div className="yield-header">
        <div className="yield-title-section">
          <h3 className="yield-title">Yield Analysis - {farmerName}</h3>
          <p className="yield-subtitle">{cropType} Production (kg)</p>
        </div>

        {/* View Mode Selector */}
        <div className="view-mode-selector">
          <button
            className={`mode-btn ${viewMode === 'comparison' ? 'active' : ''}`}
            onClick={() => setViewMode('comparison')}
          >
            Predicted vs Actual
          </button>
          <button
            className={`mode-btn ${viewMode === 'seasonal' ? 'active' : ''}`}
            onClick={() => setViewMode('seasonal')}
          >
            Seasonal Trends
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="yield-metrics">
        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#E8F5E9' }}>📈</div>
          <div className="metric-content">
            <span className="metric-value">{yieldData.trends.averageYield} kg</span>
            <span className="metric-label">Avg. Yield</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#E3F2FD' }}>🎯</div>
          <div className="metric-content">
            <span className="metric-value">{calculateAccuracy().toFixed(1)}%</span>
            <span className="metric-label">Prediction Accuracy</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#FFF3E0' }}>📊</div>
          <div className="metric-content">
            <span className="metric-value">+{yieldData.trends.improvementRate}%</span>
            <span className="metric-label">YoY Growth</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      {viewMode === 'comparison' && (
        <div className="comparison-chart">
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color predicted"></div>
              <span>Predicted Yield</span>
            </div>
            <div className="legend-item">
              <div className="legend-color actual"></div>
              <span>Actual Yield</span>
            </div>
          </div>

          <div className="bar-chart-container">
            {yieldData.predicted.map((data, index) => {
              const maxYield = getMaxYield();
              const predictedHeight = (data.predicted / maxYield) * 100;
              const actualHeight = data.actual ? (data.actual / maxYield) * 100 : 0;
              
              return (
                <div key={index} className="bar-group">
                  <div className="bar-pair">
                    <div 
                      className="bar predicted-bar"
                      style={{ height: `${predictedHeight}%` }}
                      title={`Predicted: ${data.predicted} kg`}
                    >
                      <span className="bar-value">{data.predicted}</span>
                    </div>
                    {data.actual && (
                      <div 
                        className="bar actual-bar"
                        style={{ height: `${actualHeight}%` }}
                        title={`Actual: ${data.actual} kg`}
                      >
                        <span className="bar-value">{data.actual}</span>
                      </div>
                    )}
                    {!data.actual && (
                      <div className="bar future-bar">
                        <span className="bar-label-future">Pending</span>
                      </div>
                    )}
                  </div>
                  <div className="bar-label">
                    <span className="year-label">{data.year}</span>
                    {data.variance !== null && (
                      <span className={`variance-badge ${data.variance >= 0 ? 'positive' : 'negative'}`}>
                        {data.variance >= 0 ? '+' : ''}{data.variance.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'seasonal' && (
        <div className="seasonal-chart">
          <div className="seasonal-legend">
            <div className="legend-item">
              <div className="legend-line yield-line"></div>
              <span>Monthly Yield</span>
            </div>
            <div className="legend-item">
              <div className="legend-line rainfall-line"></div>
              <span>Rainfall</span>
            </div>
          </div>

          <div className="line-chart-container">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid Lines */}
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

              {/* Yield Line */}
              <polyline
                points={yieldData.seasonal.map((d, i) => {
                  const x = (i / (yieldData.seasonal.length - 1)) * 100;
                  const y = 100 - (d.yield / 60) * 100;
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="0.8"
              />

              {/* Rainfall Area */}
              <path
                d={`M 0 ${100 - (yieldData.seasonal[0].rainfall / 200) * 100}
                    ${yieldData.seasonal.map((d, i) => {
                      const x = (i / (yieldData.seasonal.length - 1)) * 100;
                      const y = 100 - (d.rainfall / 200) * 100;
                      return `L ${x} ${y}`;
                    }).join(' ')}
                    L 100 100 L 0 100 Z`}
                fill="var(--color-secondary-blue)"
                opacity="0.2"
              />

              {/* Data Points */}
              {yieldData.seasonal.map((d, i) => (
                <circle
                  key={i}
                  cx={(i / (yieldData.seasonal.length - 1)) * 100}
                  cy={100 - (d.yield / 60) * 100}
                  r="1"
                  fill="var(--color-primary)"
                />
              ))}
            </svg>

            <div className="chart-x-labels">
              {yieldData.seasonal.map((d, i) => (
                <span key={i} className="x-label">{d.month}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Insights */}
      <div className="yield-insights">
        <h4>Key Insights</h4>
        <ul className="insights-list">
          <li>
            <span className="insight-icon">✓</span>
            <span>Prediction accuracy has improved to {calculateAccuracy().toFixed(1)}% over the past 5 years</span>
          </li>
          <li>
            <span className="insight-icon">✓</span>
            <span>Best performing year was {yieldData.trends.bestYear} with {yieldData.predicted.find(d => d.year === yieldData.trends.bestYear)?.actual} kg</span>
          </li>
          <li>
            <span className="insight-icon">✓</span>
            <span>Year-over-year growth rate of {yieldData.trends.improvementRate}% indicates improving farming practices</span>
          </li>
          {viewMode === 'seasonal' && (
            <li>
              <span className="insight-icon">✓</span>
              <span>Peak harvest months are October-November, correlating with optimal rainfall patterns</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default YieldChart;