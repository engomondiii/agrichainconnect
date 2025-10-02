import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../../components/common/Card/Card';
import Button from '../../../components/common/Button/Button';
import Badge from '../../../components/common/Badge/Badge';
import TrustScore from '../../../components/farmer/TrustScore/TrustScore';
import './FarmerDashboard.css';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeListings: 0,
    pendingOrders: 0,
    totalEarnings: 0,
    trustScore: 0
  });
  const [listings, setListings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data - replace with actual API calls
      setStats({
        activeListings: 5,
        pendingOrders: 3,
        totalEarnings: 12450.50,
        trustScore: 850
      });

      setListings([
        {
          id: 1,
          cropType: 'Coffee',
          quantity: 500,
          unit: 'kg',
          price: 4.50,
          status: 'active',
          views: 45,
          interested: 8
        },
        {
          id: 2,
          cropType: 'Tea',
          quantity: 300,
          unit: 'kg',
          price: 3.20,
          status: 'active',
          views: 32,
          interested: 5
        }
      ]);

      setOrders([
        {
          id: 1,
          buyer: 'Green Valley Co.',
          crop: 'Coffee Arabica',
          quantity: 100,
          status: 'pending_delivery',
          dueDate: '2025-10-15'
        },
        {
          id: 2,
          buyer: 'Fair Trade Ltd.',
          crop: 'Organic Tea',
          quantity: 50,
          status: 'confirmed',
          dueDate: '2025-10-20'
        }
      ]);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { variant: 'success', label: 'Active' },
      pending_delivery: { variant: 'warning', label: 'Pending Delivery' },
      confirmed: { variant: 'info', label: 'Confirmed' },
      completed: { variant: 'success', label: 'Completed' }
    };

    const config = statusConfig[status] || { variant: 'default', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (isLoading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="farmer-dashboard">
      {/* Welcome Section */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.farmName || 'Farmer'}!</h1>
          <p>Here's what's happening with your farm today</p>
        </div>
        <Link to="/dashboard/farmer/create-listing">
          <Button variant="primary">+ Create New Listing</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-icon" style={{ background: '#E8F5E9' }}>📦</div>
          <div className="stat-content">
            <span className="stat-value">{stats.activeListings}</span>
            <span className="stat-label">Active Listings</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: '#FFF3E0' }}>⏳</div>
          <div className="stat-content">
            <span className="stat-value">{stats.pendingOrders}</span>
            <span className="stat-label">Pending Orders</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: '#E3F2FD' }}>💰</div>
          <div className="stat-content">
            <span className="stat-value">${stats.totalEarnings.toFixed(2)}</span>
            <span className="stat-label">Total Earnings</span>
          </div>
        </Card>

        <Card className="stat-card trust-score-stat">
          <TrustScore score={stats.trustScore} showDetails={false} />
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-content">
        {/* Active Listings */}
        <Card className="dashboard-section">
          <div className="section-header">
            <h2>Active Listings</h2>
            <Link to="/dashboard/farmer/listings">View All</Link>
          </div>

          {listings.length > 0 ? (
            <div className="listings-table">
              <table>
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Views</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map(listing => (
                    <tr key={listing.id}>
                        <td className="crop-cell">
                        <strong>{listing.cropType}</strong>
                      </td>
                      <td>{listing.quantity} {listing.unit}</td>
                      <td>${listing.price}</td>
                      <td>
                        <span className="views-count">{listing.views} views</span>
                        <span className="interested-count">{listing.interested} interested</span>
                      </td>
                      <td>{getStatusBadge(listing.status)}</td>
                      <td className="actions-cell">
                        <button className="action-btn">Edit</button>
                        <button className="action-btn">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p>No active listings yet</p>
              <Link to="/dashboard/farmer/create-listing">
                <Button variant="primary">Create Your First Listing</Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Pending Orders */}
        <Card className="dashboard-section">
          <div className="section-header">
            <h2>Pending Orders</h2>
            <Link to="/dashboard/farmer/orders">View All</Link>
          </div>

          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <div className="order-main">
                      <h3>{order.crop}</h3>
                      <p className="buyer-name">{order.buyer}</p>
                    </div>
                    <div className="order-details">
                      <span className="quantity">{order.quantity} kg</span>
                      <span className="due-date">Due: {new Date(order.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="order-actions">
                    {getStatusBadge(order.status)}
                    {order.status === 'pending_delivery' && (
                      <Button variant="primary" size="small">Mark as Delivered</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No pending orders</p>
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link to="/dashboard/farmer/create-listing" className="quick-action-card">
            <div className="action-icon">📝</div>
            <h3>Create Listing</h3>
            <p>List a new crop for sale</p>
          </Link>

          <Link to="/dashboard/farmer/profile" className="quick-action-card">
            <div className="action-icon">👤</div>
            <h3>Edit Profile</h3>
            <p>Update your farm information</p>
          </Link>

          <Link to="/dashboard/farmer/analytics" className="quick-action-card">
            <div className="action-icon">📊</div>
            <h3>View Analytics</h3>
            <p>Track your performance</p>
          </Link>

          <Link to="/marketplace" className="quick-action-card">
            <div className="action-icon">🛒</div>
            <h3>Browse Market</h3>
            <h3>Browse Market</h3>
            <p>See what others are selling</p>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default FarmerDashboard;