import React, { useState, useEffect } from 'react';
import Card from '../../common/Card/Card';
import Badge from '../../common/Badge/Badge';
import Button from '../../common/Button/Button';
import './Portfolio.css';

const Portfolio = () => {
  const [holdings, setHoldings] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, delivered
  const [sortBy, setSortBy] = useState('date'); // date, value, crop
  const [portfolioStats, setPortfolioStats] = useState({
    totalValue: 0,
    totalHoldings: 0,
    pendingDeliveries: 0,
    unrealizedGains: 0
  });

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      // Mock data - replace with actual API call
      const mockHoldings = [
        {
          id: 1,
          tokenId: 'DFFT-2025-C001',
          cropType: 'Coffee Arabica',
          farmer: {
            name: 'Green Hills Farm',
            trustScore: 850,
            location: 'Kenya'
          },
          quantity: 100,
          unit: 'kg',
          purchasePrice: 4.50,
          currentPrice: 4.80,
          totalValue: 480,
          purchaseDate: '2025-09-15',
          expectedDelivery: '2025-11-20',
          status: 'pending',
          type: 'DFFT'
        },
        {
          id: 2,
          tokenId: 'DFRT-2025-T045',
          cropType: 'Organic Tea',
          farmer: {
            name: 'Mountain View Estate',
            trustScore: 920,
            location: 'Uganda'
          },
          quantity: 50,
          unit: 'kg',
          purchasePrice: 3.20,
          currentPrice: 3.20,
          totalValue: 160,
          purchaseDate: '2025-10-01',
          expectedDelivery: '2025-10-10',
          status: 'delivered',
          deliveredDate: '2025-10-09',
          type: 'DFRT'
        },
        {
          id: 3,
          tokenId: 'DFFT-2025-M078',
          cropType: 'Maize',
          farmer: {
            name: 'Sunrise Cooperative',
            trustScore: 780,
            location: 'Tanzania'
          },
          quantity: 500,
          unit: 'kg',
          purchasePrice: 0.85,
          currentPrice: 0.90,
          totalValue: 450,
          purchaseDate: '2025-09-20',
          expectedDelivery: '2025-12-15',
          status: 'pending',
          type: 'DFFT'
        }
      ];

      setHoldings(mockHoldings);

      // Calculate portfolio stats
      const stats = {
        totalValue: mockHoldings.reduce((sum, h) => sum + h.totalValue, 0),
        totalHoldings: mockHoldings.length,
        pendingDeliveries: mockHoldings.filter(h => h.status === 'pending').length,
        unrealizedGains: mockHoldings.reduce((sum, h) => 
          sum + ((h.currentPrice - h.purchasePrice) * h.quantity), 0
        )
      };

      setPortfolioStats(stats);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  const getFilteredHoldings = () => {
    let filtered = holdings;

    if (filter !== 'all') {
      filtered = filtered.filter(h => h.status === filter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'date':
          return new Date(b.purchaseDate) - new Date(a.purchaseDate);
        case 'value':
          return b.totalValue - a.totalValue;
        case 'crop':
          return a.cropType.localeCompare(b.cropType);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { variant: 'warning', label: 'Pending Delivery' },
      delivered: { variant: 'success', label: 'Delivered' },
      in_transit: { variant: 'info', label: 'In Transit' }
    };
    const statusConfig = config[status] || { variant: 'default', label: status };
    return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>;
  };

  const calculateGainLoss = (holding) => {
    const gain = (holding.currentPrice - holding.purchasePrice) * holding.quantity;
    const percentage = ((holding.currentPrice - holding.purchasePrice) / holding.purchasePrice) * 100;
    const isPositive = gain >= 0;

    return {
      amount: gain,
      percentage,
      isPositive
    };
  };

  const exportToCSV = () => {
    // Generate CSV export
    const csvContent = [
      ['Token ID', 'Crop', 'Farmer', 'Quantity', 'Purchase Price', 'Current Price', 'Total Value', 'Status'],
      ...holdings.map(h => [
        h.tokenId,
        h.cropType,
        h.farmer.name,
        `${h.quantity} ${h.unit}`,
        h.purchasePrice,
        h.currentPrice,
        h.totalValue,
        h.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredHoldings = getFilteredHoldings();

  return (
    <div className="portfolio">
      <div className="portfolio-header">
        <h1>My Portfolio</h1>
        <Button variant="secondary" onClick={exportToCSV}>
          Export to CSV
        </Button>
      </div>

      {/* Portfolio Stats */}
      <div className="portfolio-stats">
        <Card className="stat-card">
          <div className="stat-icon" style={{ background: '#E3F2FD' }}>💼</div>
          <div className="stat-content">
            <span className="stat-value">${portfolioStats.totalValue.toFixed(2)}</span>
            <span className="stat-label">Total Portfolio Value</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: '#E8F5E9' }}>📦</div>
          <div className="stat-content">
            <span className="stat-value">{portfolioStats.totalHoldings}</span>
            <span className="stat-label">Total Holdings</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: '#FFF3E0' }}>⏳</div>
          <div className="stat-content">
            <span className="stat-value">{portfolioStats.pendingDeliveries}</span>
            <span className="stat-label">Pending Deliveries</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: portfolioStats.unrealizedGains >= 0 ? '#E8F5E9' : '#FFEBEE' }}>
            {portfolioStats.unrealizedGains >= 0 ? '📈' : '📉'}
          </div>
          <div className="stat-content">
            <span className={`stat-value ${portfolioStats.unrealizedGains >= 0 ? 'positive' : 'negative'}`}>
              {portfolioStats.unrealizedGains >= 0 ? '+' : ''}${portfolioStats.unrealizedGains.toFixed(2)}
            </span>
            <span className="stat-label">Unrealized Gains/Loss</span>
          </div>
        </Card>
      </div>

      {/* Filters and Sort */}
      <Card className="portfolio-controls">
        <div className="filter-group">
          <label>Filter:</label>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`}
              onClick={() => setFilter('delivered')}
            >
              Delivered
            </button>
          </div>
        </div>

        <div className="sort-group">
          <label htmlFor="sortBy">Sort by:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Purchase Date</option>
            <option value="value">Total Value</option>
            <option value="crop">Crop Type</option>
          </select>
        </div>
      </Card>

      {/* Holdings List */}
      <div className="holdings-list">
        {filteredHoldings.length > 0 ? (
          filteredHoldings.map(holding => {
            const gainLoss = calculateGainLoss(holding);
            return (
              <Card key={holding.id} className="holding-card">
                <div className="holding-header">
                  <div className="holding-main-info">
                    <h3>{holding.cropType}</h3>
                    <p className="token-id">{holding.tokenId}</p>
                  </div>
                  <div className="holding-status">
                    {getStatusBadge(holding.status)}
                    <Badge variant="default">{holding.type}</Badge>
                  </div>
                </div>

                <div className="holding-details">
                  <div className="holding-section">
                    <h4>Farmer</h4>
                    <p className="farmer-name">{holding.farmer.name}</p>
                    <p className="farmer-location">{holding.farmer.location}</p>
                    <div className="trust-score-mini">
                      Trust Score: <strong>{holding.farmer.trustScore}</strong>
                    </div>
                  </div>

                  <div className="holding-section">
                    <h4>Quantity</h4>
                    <p className="quantity-value">{holding.quantity} {holding.unit}</p>
                  </div>

                  <div className="holding-section">
                    <h4>Purchase Price</h4>
                    <p className="price-value">${holding.purchasePrice} / {holding.unit}</p>
                    <p className="purchase-date">{new Date(holding.purchaseDate).toLocaleDateString()}</p>
                  </div>

                  <div className="holding-section">
                    <h4>Current Price</h4>
                    <p className="price-value">${holding.currentPrice} / {holding.unit}</p>
                    <p className={`gain-loss ${gainLoss.isPositive ? 'positive' : 'negative'}`}>
                      {gainLoss.isPositive ? '+' : ''}{gainLoss.percentage.toFixed(2)}%
                    </p>
                  </div>

                  <div className="holding-section">
                    <h4>Total Value</h4>
                    <p className="total-value">${holding.totalValue.toFixed(2)}</p>
                    <p className={`gain-loss-amount ${gainLoss.isPositive ? 'positive' : 'negative'}`}>
                      {gainLoss.isPositive ? '+' : ''}${gainLoss.amount.toFixed(2)}
                    </p>
                  </div>

                  <div className="holding-section">
                    <h4>Delivery</h4>
                    {holding.status === 'delivered' ? (
                      <p className="delivery-date">
                        Delivered: {new Date(holding.deliveredDate).toLocaleDateString()}
                      </p>
                    ) : (
                      <p className="delivery-date">
                        Expected: {new Date(holding.expectedDelivery).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="holding-actions">
                  <Button variant="secondary" size="small">View Details</Button>
                  {holding.status === 'pending' && (
                    <Button variant="secondary" size="small">Track Order</Button>
                  )}
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="empty-portfolio">
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No holdings found</h3>
              <p>Start purchasing crops to build your portfolio</p>
              <Button variant="primary">Browse Marketplace</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Portfolio;