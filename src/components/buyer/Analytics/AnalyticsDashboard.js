import React, { useState, useEffect } from 'react';
import Card from '../../common/Card/Card';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('6m'); // 1m, 3m, 6m, 1y, all
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      // Mock data - replace with actual API call
      const mockAnalytics = {
        spending: {
          total: 45750,
          byMonth: [
            { month: 'May', amount: 5200 },
            { month: 'Jun', amount: 6800 },
            { month: 'Jul', amount: 8100 },
            { month: 'Aug', amount: 9200 },
            { month: 'Sep', amount: 8650 },
            { month: 'Oct', amount: 7800 }
          ],
          byCrop: [
            { crop: 'Coffee', amount: 18500, percentage: 40 },
            { crop: 'Tea', amount: 13725, percentage: 30 },
            { crop: 'Maize', amount: 9150, percentage: 20 },
            { crop: 'Beans', amount: 4575, percentage: 10 }
          ]
        },
        suppliers: {
          total: 28,
          topPerformers: [
            { name: 'Green Hills Farm', orders: 15, onTimeRate: 100, avgQuality: 4.8 },
            { name: 'Mountain View Estate', orders: 12, onTimeRate: 100, avgQuality: 4.9 },
            { name: 'Sunrise Cooperative', orders: 10, onTimeRate: 90, avgQuality: 4.6 },
            { name: 'Valley Fresh Farms', orders: 8, onTimeRate: 87, avgQuality: 4.5 }
          ]
        },
        priceAnalysis: {
          trends: [
            { month: 'May', coffee: 4.20, tea: 3.10, maize: 0.80 },
            { month: 'Jun', coffee: 4.35, tea: 3.15, maize: 0.82 },
            { month: 'Jul', coffee: 4.50, tea: 3.20, maize: 0.85 },
            { month: 'Aug', coffee: 4.55, tea: 3.25, maize: 0.87 },
            { month: 'Sep', coffee: 4.60, tea: 3.30, maize: 0.90 },
            { month: 'Oct', coffee: 4.80, tea: 3.20, maize: 0.88 }
          ],
          savings: 6850,
          vsMarketAverage: '+15%'
        },
        sustainability: {
          organicPercentage: 45,
          carbonOffset: 1250,
          waterSaved: 45000,
          farmersSupported: 28,
          womenFarmers: 12
        }
      };

      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  if (!analytics) {
    return <div className="analytics-loading">Loading analytics...</div>;
  }

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <div className="time-range-selector">
          <button
            className={timeRange === '1m' ? 'active' : ''}
            onClick={() => setTimeRange('1m')}
          >
            1M
          </button>
          <button
            className={timeRange === '3m' ? 'active' : ''}
            onClick={() => setTimeRange('3m')}
          >
            3M
          </button>
          <button
            className={timeRange === '6m' ? 'active' : ''}
            onClick={() => setTimeRange('6m')}
          >
            6M
          </button>
          <button
            className={timeRange === '1y' ? 'active' : ''}
            onClick={() => setTimeRange('1y')}
          >
            1Y
          </button>
          <button
            className={timeRange === 'all' ? 'active' : ''}
            onClick={() => setTimeRange('all')}
          >
            All
          </button>
        </div>
      </div>

      {/* Spending Analysis */}
      <Card className="analytics-card">
        <h2>Spending Analysis</h2>
        <div className="total-spending">
          <span className="spending-label">Total Spending</span>
          <span className="spending-value">${analytics.spending.total.toLocaleString()}</span>
        </div>

        <div className="chart-section">
          <h3>Spending Over Time</h3>
          <div className="bar-chart">
            {analytics.spending.byMonth.map((item, index) => {
              const maxAmount = Math.max(...analytics.spending.byMonth.map(m => m.amount));
              const height = (item.amount / maxAmount) * 100;
              return (
                <div key={index} className="bar-item">
                  <div className="bar-column">
                    <div 
                      className="bar-fill" 
                      style={{ height: `${height}%` }}
                      title={`$${item.amount.toLocaleString()}`}
                    ></div>
                  </div>
                  <span className="bar-label">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chart-section">
          <h3>Spending by Crop Type</h3>
          <div className="pie-chart-legend">
            {analytics.spending.byCrop.map((item, index) => (
              <div key={index} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ 
                    background: `hsl(${index * 90}, 70%, 50%)` 
                  }}
                ></div>
                <span className="legend-label">{item.crop}</span>
                <span className="legend-value">
                  ${item.amount.toLocaleString()} ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Supplier Performance */}
      <Card className="analytics-card">
        <h2>Supplier Performance</h2>
        <p className="card-subtitle">Top performing farmers based on quality and reliability</p>
        
        <div className="suppliers-table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Farmer</th>
                <th>Orders</th>
                <th>On-Time Rate</th>
                <th>Avg. Quality</th>
              </tr>
            </thead>
            <tbody>
              {analytics.suppliers.topPerformers.map((supplier, index) => (
                <tr key={index}>
                  <td className="rank-cell">
                    <span className="rank-badge">{index + 1}</span>
                  </td>
                  <td className="farmer-cell">{supplier.name}</td>
                  <td>{supplier.orders}</td>
                  <td>
                    <div className="rate-display">
                      <div className="rate-bar">
                        <div 
                          className="rate-fill" 
                          style={{ width: `${supplier.onTimeRate}%` }}
                        ></div>
                      </div>
                      <span>{supplier.onTimeRate}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="quality-display">
                      <span className="stars">
                        {'★'.repeat(Math.floor(supplier.avgQuality))}
                        {supplier.avgQuality % 1 !== 0 && '☆'}
                      </span>
                      <span>{supplier.avgQuality}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Price Trends */}
      <Card className="analytics-card">
        <h2>Price Trends</h2>
        <div className="savings-highlight">
          <span className="savings-label">Total Savings vs Market Average</span>
          <span className="savings-amount">
            ${analytics.priceAnalysis.savings.toLocaleString()}
            <span className="savings-percentage">
              ({analytics.priceAnalysis.vsMarketAverage})
            </span>
          </span>
        </div>

        <div className="line-chart">
          <div className="chart-grid">
            {[5, 4, 3, 2, 1].map(i => (
              <div key={i} className="grid-line">
                <span className="grid-label">${i}</span>
              </div>
            ))}
          </div>
          <div className="chart-content">
            {analytics.priceAnalysis.trends.map((item, index) => (
              <div key={index} className="data-point-group">
                <div className="data-points">
                  <div 
                    className="data-point coffee" 
                    style={{ bottom: `${(item.coffee / 5) * 100}%` }}
                    title={`Coffee: $${item.coffee}`}
                  ></div>
                  <div 
                    className="data-point tea" 
                    style={{ bottom: `${(item.tea / 5) * 100}%` }}
                    title={`Tea: $${item.tea}`}
                  ></div>
                  <div 
                    className="data-point maize" 
                    style={{ bottom: `${(item.maize / 5) * 100}%` }}
                    title={`Maize: $${item.maize}`}
                  ></div>
                </div>
                <span className="x-label">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color coffee"></div>
            <span>Coffee</span>
          </div>
          <div className="legend-item">
            <div className="legend-color tea"></div>
            <span>Tea</span>
          </div>
          <div className="legend-item">
            <div className="legend-color maize"></div>
            <span>Maize</span>
          </div>
        </div>
      </Card>

      {/* Sustainability Metrics */}
      <Card className="analytics-card sustainability-card">
        <h2>Sustainability Impact</h2>
        <p className="card-subtitle">Your positive impact on the environment and communities</p>

        <div className="sustainability-grid">
          <div className="impact-metric">
            <div className="impact-icon" style={{ background: '#E8F5E9' }}>🌱</div>
            <div className="impact-content">
              <span className="impact-value">{analytics.sustainability.organicPercentage}%</span>
              <span className="impact-label">Organic Products</span>
            </div>
          </div>

          <div className="impact-metric">
            <div className="impact-icon" style={{ background: '#E3F2FD' }}>🌍</div>
            <div className="impact-content">
              <span className="impact-value">{analytics.sustainability.carbonOffset} kg</span>
              <span className="impact-label">Carbon Offset</span>
            </div>
          </div>

          <div className="impact-metric">
            <div className="impact-icon" style={{ background: '#E1F5FE' }}>💧</div>
            <div className="impact-content">
              <span className="impact-value">{analytics.sustainability.waterSaved.toLocaleString()} L</span>
              <span className="impact-label">Water Saved</span>
            </div>
          </div>

          <div className="impact-metric">
            <div className="impact-icon" style={{ background: '#FFF3E0' }}>👨‍🌾</div>
            <div className="impact-content">
              <span className="impact-value">{analytics.sustainability.farmersSupported}</span>
              <span className="impact-label">Farmers Supported</span>
            </div>
          </div>

          <div className="impact-metric">
            <div className="impact-icon" style={{ background: '#FCE4EC' }}>👩‍🌾</div>
            <div className="impact-content">
              <span className="impact-value">{analytics.sustainability.womenFarmers}</span>
              <span className="impact-label">Women Farmers</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;