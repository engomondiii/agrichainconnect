import React, { useState, useEffect, useRef } from 'react';
import './PriceChart.css';

const PriceChart = ({ 
  data = [], 
  cropType = 'Coffee',
  showComparison = false,
  comparisonData = []
}) => {
  const [timeRange, setTimeRange] = useState('6m'); // 1m, 3m, 6m, 1y, all
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    // Generate or filter data based on time range
    const mockData = generateMockData(timeRange);
    setChartData(mockData);
  }, [timeRange, data]);

  const generateMockData = (range) => {
    const dataPoints = {
      '1m': 30,
      '3m': 90,
      '6m': 180,
      '1y': 365,
      'all': 730
    };

    const points = dataPoints[range] || 180;
    const today = new Date();
    
    return Array.from({ length: points }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (points - i - 1));
      
      const basePrice = 4.50;
      const trend = (i / points) * 0.3;
      const volatility = Math.sin(i / 10) * 0.2;
      const noise = (Math.random() - 0.5) * 0.1;
      
      return {
        date: date.toISOString().split('T')[0],
        price: basePrice + trend + volatility + noise,
        volume: Math.floor(Math.random() * 5000) + 1000
      };
    });
  };

  const getMinMax = () => {
    const prices = chartData.map(d => d.price);
    return {
      min: Math.min(...prices) * 0.95,
      max: Math.max(...prices) * 1.05
    };
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const calculateChange = () => {
    if (chartData.length < 2) return { value: 0, percentage: 0 };
    
    const firstPrice = chartData[0].price;
    const lastPrice = chartData[chartData.length - 1].price;
    const change = lastPrice - firstPrice;
    const percentage = (change / firstPrice) * 100;
    
    return { value: change, percentage };
  };

  const handleMouseMove = (e) => {
    if (!chartRef.current || chartData.length === 0) return;
    
    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const index = Math.floor((x / rect.width) * chartData.length);
    
    if (index >= 0 && index < chartData.length) {
      setHoveredPoint(chartData[index]);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  if (chartData.length === 0) {
    return <div className="price-chart-loading">Loading chart data...</div>;
  }

  const { min, max } = getMinMax();
  const change = calculateChange();
  const currentPrice = hoveredPoint ? hoveredPoint.price : chartData[chartData.length - 1].price;

  return (
    <div className="price-chart">
      {/* Chart Header */}
      <div className="chart-header">
        <div className="chart-title-section">
          <h3 className="chart-title">{cropType} Price History</h3>
          <div className="current-price">
            <span className="price-value">{formatPrice(currentPrice)}</span>
            <span className={`price-change ${change.percentage >= 0 ? 'positive' : 'negative'}`}>
              {change.percentage >= 0 ? '+' : ''}{change.percentage.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="time-range-selector">
          {['1m', '3m', '6m', '1y', 'all'].map(range => (
            <button
              key={range}
              className={`range-btn ${timeRange === range ? 'active' : ''}`}
              onClick={() => setTimeRange(range)}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div 
        className="chart-container"
        ref={chartRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Y-Axis */}
        <div className="chart-y-axis">
          {Array.from({ length: 5 }, (_, i) => {
            const value = max - ((max - min) / 4) * i;
            return (
              <span key={i} className="y-axis-label">
                {formatPrice(value)}
              </span>
            );
          })}
        </div>

        {/* Chart Area */}
        <div className="chart-area">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1={i * 25}
                x2="100"
                y2={i * 25}
                stroke="var(--color-border-light)"
                strokeWidth="0.1"
                opacity="0.5"
              />
            ))}

            {/* Price Area */}
            <path
              d={`M 0 ${100 - ((chartData[0].price - min) / (max - min)) * 100}
                  ${chartData.map((point, i) => {
                    const x = (i / (chartData.length - 1)) * 100;
                    const y = 100 - ((point.price - min) / (max - min)) * 100;
                    return `L ${x} ${y}`;
                  }).join(' ')}
                  L 100 100 L 0 100 Z`}
              fill="url(#priceGradient)"
            />

            {/* Price Line */}
            <polyline
              points={chartData.map((point, i) => {
                const x = (i / (chartData.length - 1)) * 100;
                const y = 100 - ((point.price - min) / (max - min)) * 100;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="0.5"
            />

            {/* Comparison Line (if enabled) */}
            {showComparison && comparisonData.length > 0 && (
              <polyline
                points={comparisonData.map((point, i) => {
                  const x = (i / (comparisonData.length - 1)) * 100;
                  const y = 100 - ((point.price - min) / (max - min)) * 100;
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="var(--color-secondary-blue)"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
            )}

            {/* Hover Indicator */}
            {hoveredPoint && (
              <>
                <line
                  x1={(chartData.indexOf(hoveredPoint) / (chartData.length - 1)) * 100}
                  y1="0"
                  x2={(chartData.indexOf(hoveredPoint) / (chartData.length - 1)) * 100}
                  y2="100"
                  stroke="var(--color-text-secondary)"
                  strokeWidth="0.2"
                  strokeDasharray="1,1"
                />
                <circle
                  cx={(chartData.indexOf(hoveredPoint) / (chartData.length - 1)) * 100}
                  cy={100 - ((hoveredPoint.price - min) / (max - min)) * 100}
                  r="1"
                  fill="var(--color-primary)"
                  stroke="white"
                  strokeWidth="0.3"
                />
              </>
            )}
          </svg>

          {/* Tooltip */}
          {hoveredPoint && (
            <div 
              className="chart-tooltip"
              style={{
                left: `${(chartData.indexOf(hoveredPoint) / (chartData.length - 1)) * 100}%`
              }}
            >
              <div className="tooltip-date">{formatDate(hoveredPoint.date)}</div>
              <div className="tooltip-price">{formatPrice(hoveredPoint.price)}</div>
              <div className="tooltip-volume">Vol: {hoveredPoint.volume.toLocaleString()}</div>
            </div>
          )}
        </div>

        {/* X-Axis */}
        <div className="chart-x-axis">
          {Array.from({ length: 5 }, (_, i) => {
            const index = Math.floor((i / 4) * (chartData.length - 1));
            return (
              <span key={i} className="x-axis-label">
                {formatDate(chartData[index].date)}
              </span>
            );
          })}
        </div>
      </div>

      {/* Chart Stats */}
      <div className="chart-stats">
        <div className="stat-item">
          <span className="stat-label">Open</span>
          <span className="stat-value">{formatPrice(chartData[0].price)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">High</span>
          <span className="stat-value">{formatPrice(max * 0.98)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Low</span>
          <span className="stat-value">{formatPrice(min * 1.02)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Close</span>
          <span className="stat-value">{formatPrice(chartData[chartData.length - 1].price)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Avg Volume</span>
          <span className="stat-value">
            {Math.floor(chartData.reduce((sum, d) => sum + d.volume, 0) / chartData.length).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;