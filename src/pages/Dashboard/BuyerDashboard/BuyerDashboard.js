import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../../components/common/Card/Card';
import Button from '../../../components/common/Button/Button';
import Badge from '../../../components/common/Badge/Badge';
import orderService from '../../../services/api/orderService';
import analyticsService from '../../../services/api/analyticsService';
import './BuyerDashboard.css';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeOrders: 0,
    totalSpent: 0,
    pendingDeliveries: 0,
    portfolioValue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [marketHighlights, setMarketHighlights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch multiple data sources in parallel
      const [ordersData, orderStats, insights] = await Promise.all([
        orderService.getOrders({ limit: 5 }),
        orderService.getOrderStats(),
        analyticsService.getMarketInsights()
      ]);

      setStats({
        activeOrders: orderStats.activeOrders,
        totalSpent: orderStats.totalSpent,
        pendingDeliveries: ordersData.filter(o => o.status === 'growing' || o.status === 'in_transit').length,
        portfolioValue: 15420 // Mock value
      });

      setRecentOrders(ordersData.slice(0, 5));
      setRecommendations(insights.recommendations);

      // Mock market highlights
      setMarketHighlights([
        {
          id: 1,
          cropType: 'Coffee Arabica',
          farmer: 'Highland Farms',
          price: 4.20,
          discount: 12,
          trustScore: 880,
          image: '/mock-coffee.jpg'
        },
        {
          id: 2,
          cropType: 'Organic Tea',
          farmer: 'Green Valley Estate',
          price: 2.95,
          discount: 8,
          trustScore: 910,
          image: '/mock-tea.jpg'
        },
        {
          id: 3,
          cropType: 'Premium Maize',
          farmer: 'Sunrise Collective',
          price: 0.75,
          discount: 15,
          trustScore: 850,
          image: '/mock-maize.jpg'
        }
      ]);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      growing: { variant: 'info', label: 'Growing' },
      confirmed: { variant: 'default', label: 'Confirmed' },
      in_transit: { variant: 'warning', label: 'In Transit' },
      delivered: { variant: 'success', label: 'Delivered' }
    };
    return config[status] || { variant: 'default', label: status };
  };

  if (isLoading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="buyer-dashboard">
      {/* Welcome Section */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.companyName || 'Buyer'}!</h1>
          <p>Here's your sourcing overview for today</p>
        </div>
        <Link to="/marketplace">
          <Button variant="primary">Browse Marketplace</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-icon" style={{ background: '#FFF3E0' }}>📦</div>
          <div className="stat-content">
            <span className="stat-value">{stats.activeOrders}</span>
            <span className="stat-label">Active Orders</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: '#E3F2FD' }}>💰</div>
          <div className="stat-content">
            <span className="stat-value">${stats.totalSpent.toLocaleString()}</span>
            <span className="stat-label">Total Spent</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: '#E8F5E9' }}>⏳</div>
          <div className="stat-content">
            <span className="stat-value">{stats.pendingDeliveries}</span>
            <span className="stat-label">Pending Deliveries</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: '#FFF3E0' }}>📊</div>
          <div className="stat-content">
            <span className="stat-value">${stats.portfolioValue.toLocaleString()}</span>
            <span className="stat-label">Portfolio Value</span>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Recent Orders */}
        <div className="dashboard-column">
          <Card className="dashboard-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <Link to="/dashboard/buyer/orders">View All</Link>
            </div>

            {recentOrders.length > 0 ? (
              <div className="orders-list">
                {recentOrders.map(order => {
                  const statusConfig = getStatusBadge(order.status);
                  return (
                    <div key={order.orderId} className="order-item">
                      <div className="order-info">
                        <div className="order-main">
                          <h3>{order.cropType}</h3>
                          <p className="order-farmer">{order.farmer.name}</p>
                        </div>
                        <div className="order-details">
                          <span className="quantity">{order.quantity} {order.unit}</span>
                          <span className="amount">${order.totalAmount}</span>
                        </div>
                      </div>
                      <div className="order-actions">
                        <Badge variant={statusConfig.variant}>
                          {statusConfig.label}
                        </Badge>
                        <Link to={`/orders/${order.orderId}`}>
                          <Button variant="secondary" size="small">Track</Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <p>No recent orders</p>
                <Link to="/marketplace">
                  <Button variant="primary">Start Shopping</Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <Card className="dashboard-section recommendations-section">
              <h2>Recommendations</h2>
              <div className="recommendations-list">
                {recommendations.map((rec, index) => (
                  <div key={index} className={`recommendation-item priority-${rec.priority}`}>
                    <div className="rec-icon">
                      {rec.type === 'price_opportunity' && '💰'}
                      {rec.type === 'new_supplier' && '⭐'}
                      {rec.type === 'harvest_season' && '🌾'}
                    </div>
                    <div className="rec-content">
                      <h4>{rec.title}</h4>
                      <p>{rec.description}</p>
                      {rec.potentialSavings && (
                        <span className="savings-badge">
                          Save ${rec.potentialSavings}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Marketplace Highlights */}
        <div className="dashboard-column">
          <Card className="dashboard-section">
            <div className="section-header">
              <h2>Marketplace Highlights</h2>
              <Link to="/marketplace">Browse All</Link>
            </div>

            <div className="highlights-grid">
              {marketHighlights.map(item => (
                <div key={item.id} className="highlight-card">
                  <div className="highlight-image">
                    <img src={item.image} alt={item.cropType} />
                    {item.discount > 0 && (
                      <span className="discount-badge">-{item.discount}%</span>
                    )}
                  </div>
                  <div className="highlight-content">
                    <h3>{item.cropType}</h3>
                    <p className="highlight-farmer">{item.farmer}</p>
                    <div className="highlight-footer">
                      <div className="highlight-price">
                        <span className="price-label">From</span>
                        <span className="price-value">${item.price}</span>
                      </div>
                      <div className="trust-score-mini">
                        ⭐ {item.trustScore}
                      </div>
                    </div>
                    <Button variant="primary" size="small" fullWidth>
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="quick-actions-section">
            <h2>Quick Actions</h2>
            <div className="quick-actions-grid">
              <Link to="/dashboard/buyer/portfolio" className="quick-action-card">
                <div className="action-icon">📊</div>
                <h3>View Portfolio</h3>
                <p>Track your holdings</p>
              </Link>

              <Link to="/dashboard/buyer/analytics" className="quick-action-card">
                <div className="action-icon">📈</div>
                <h3>Analytics</h3>
                <p>View insights</p>
              </Link>

              <Link to="/dashboard/buyer/profile" className="quick-action-card">
                <div className="action-icon">⚙️</div>
                <h3>Settings</h3>
                <p>Manage account</p>
              </Link>

              <Link to="/marketplace" className="quick-action-card">
                <div className="action-icon">🛒</div>
                <h3>Browse Market</h3>
                <p>Find new crops</p>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;