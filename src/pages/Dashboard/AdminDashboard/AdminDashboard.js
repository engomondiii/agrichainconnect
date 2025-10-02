import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/common/Card/Card';
import Button from '../../../components/common/Button/Button';
import Badge from '../../../components/common/Badge/Badge';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, users, transactions, disputes, reports
  const [platformStats, setPlatformStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d, 90d, 1y
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      // Mock data - replace with actual API calls
      setPlatformStats({
        totalUsers: 2847,
        totalFarmers: 1523,
        totalBuyers: 1324,
        activeUsers: 1245,
        totalTransactions: 15672,
        totalVolume: 4250000,
        avgTransactionValue: 271,
        platformRevenue: 85000,
        tokensMinted: {
          dfft: 45230,
          dfrt: 38940
        },
        escrowBalance: 125000,
        disputeRate: 0.8,
        userGrowth: 15.3,
        transactionGrowth: 22.7,
        revenueGrowth: 18.9
      });

      setUsers([
        {
          id: 'U001',
          name: 'John Kamau',
          email: 'john.kamau@email.com',
          role: 'farmer',
          status: 'active',
          trustScore: 850,
          joinDate: '2024-01-15',
          totalTransactions: 45,
          totalVolume: 12500,
          verificationStatus: 'verified',
          lastActive: '2 hours ago'
        },
        {
          id: 'U002',
          name: 'Sarah Njeri',
          email: 'sarah.njeri@email.com',
          role: 'buyer',
          status: 'active',
          trustScore: 920,
          joinDate: '2024-02-20',
          totalTransactions: 78,
          totalVolume: 34500,
          verificationStatus: 'verified',
          lastActive: '1 hour ago'
        },
        {
          id: 'U003',
          name: 'Peter Ochieng',
          email: 'peter.ochieng@email.com',
          role: 'farmer',
          status: 'suspended',
          trustScore: 450,
          joinDate: '2024-03-10',
          totalTransactions: 12,
          totalVolume: 2800,
          verificationStatus: 'pending',
          lastActive: '3 days ago'
        },
        {
          id: 'U004',
          name: 'Grace Wanjiku',
          email: 'grace.wanjiku@email.com',
          role: 'buyer',
          status: 'active',
          trustScore: 780,
          joinDate: '2024-04-05',
          totalTransactions: 34,
          totalVolume: 8900,
          verificationStatus: 'verified',
          lastActive: '30 minutes ago'
        }
      ]);

      setTransactions([
        {
          id: 'TXN-2025-001',
          type: 'purchase',
          from: 'Sarah Njeri',
          to: 'John Kamau',
          amount: 450,
          tokenId: 'DFFT-2025-C001',
          status: 'completed',
          timestamp: '2025-01-02T10:30:00Z',
          blockchainHash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t'
        },
        {
          id: 'TXN-2025-002',
          type: 'mint',
          from: 'System',
          to: 'Peter Ochieng',
          amount: 0,
          tokenId: 'DFFT-2025-M078',
          status: 'completed',
          timestamp: '2025-01-02T09:15:00Z',
          blockchainHash: '0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u'
        },
        {
          id: 'TXN-2025-003',
          type: 'transfer',
          from: 'Grace Wanjiku',
          to: 'Sarah Njeri',
          amount: 320,
          tokenId: 'DFRT-2025-T045',
          status: 'pending',
          timestamp: '2025-01-02T08:45:00Z',
          blockchainHash: '0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v'
        },
        {
          id: 'TXN-2025-004',
          type: 'purchase',
          from: 'John Kamau',
          to: 'Grace Wanjiku',
          amount: 680,
          tokenId: 'DFFT-2025-C102',
          status: 'failed',
          timestamp: '2025-01-02T07:20:00Z',
          blockchainHash: '0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w'
        }
      ]);

      setDisputes([
        {
          id: 'DIS-2025-001',
          orderId: 'ORD-2025-C001',
          plaintiff: 'Sarah Njeri',
          defendant: 'John Kamau',
          subject: 'Quality Issue',
          description: 'Received coffee quality does not match the description',
          status: 'open',
          priority: 'high',
          amount: 450,
          createdAt: '2025-01-01T14:30:00Z',
          evidence: ['photo1.jpg', 'quality_report.pdf'],
          messages: 3
        },
        {
          id: 'DIS-2025-002',
          orderId: 'ORD-2024-M095',
          plaintiff: 'Peter Ochieng',
          defendant: 'Grace Wanjiku',
          subject: 'Delivery Delay',
          description: 'Order was not delivered within agreed timeframe',
          status: 'investigating',
          priority: 'medium',
          amount: 320,
          createdAt: '2024-12-28T10:15:00Z',
          evidence: ['timeline.pdf'],
          messages: 7
        },
        {
          id: 'DIS-2024-156',
          orderId: 'ORD-2024-T078',
          plaintiff: 'Michael Omondi',
          defendant: 'Jane Akinyi',
          subject: 'Payment Issue',
          description: 'Payment not released from escrow',
          status: 'resolved',
          priority: 'low',
          amount: 250,
          createdAt: '2024-12-20T08:45:00Z',
          resolvedAt: '2024-12-22T16:20:00Z',
          resolution: 'Payment released to seller',
          evidence: ['payment_proof.pdf'],
          messages: 12
        }
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleUserAction = (userId, action) => {
    console.log(`Action: ${action} for user: ${userId}`);
    // Implement actual user management actions
    alert(`${action} action for user ${userId}`);
  };

  const handleDisputeAction = (disputeId, action) => {
    console.log(`Action: ${action} for dispute: ${disputeId}`);
    // Implement actual dispute management actions
    alert(`${action} action for dispute ${disputeId}`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { variant: 'success', label: 'Active' },
      suspended: { variant: 'error', label: 'Suspended' },
      pending: { variant: 'warning', label: 'Pending' },
      completed: { variant: 'success', label: 'Completed' },
      failed: { variant: 'error', label: 'Failed' },
      open: { variant: 'error', label: 'Open' },
      investigating: { variant: 'warning', label: 'Investigating' },
      resolved: { variant: 'success', label: 'Resolved' },
      verified: { variant: 'success', label: 'Verified' }
    };
    return statusMap[status] || { variant: 'default', label: status };
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#F44336',
      medium: '#FF9800',
      low: '#4CAF50'
    };
    return colors[priority] || '#757575';
  };

  const renderOverview = () => (
    <div className="overview-section">
      {/* Stats Grid */}
      <div className="stats-grid">
        <Card className="stat-card primary">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <span className="stat-value">{platformStats.totalUsers.toLocaleString()}</span>
            <span className="stat-label">Total Users</span>
            <span className="stat-growth positive">+{platformStats.userGrowth}%</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">👨‍🌾</div>
          <div className="stat-content">
            <span className="stat-value">{platformStats.totalFarmers.toLocaleString()}</span>
            <span className="stat-label">Farmers</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-content">
            <span className="stat-value">{platformStats.totalBuyers.toLocaleString()}</span>
            <span className="stat-label">Buyers</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <span className="stat-value">{platformStats.activeUsers.toLocaleString()}</span>
            <span className="stat-label">Active Users</span>
          </div>
        </Card>

        <Card className="stat-card success">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <span className="stat-value">{formatCurrency(platformStats.totalVolume)}</span>
            <span className="stat-label">Total Volume</span>
            <span className="stat-growth positive">+{platformStats.transactionGrowth}%</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <span className="stat-value">{platformStats.totalTransactions.toLocaleString()}</span>
            <span className="stat-label">Transactions</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">💵</div>
          <div className="stat-content">
            <span className="stat-value">{formatCurrency(platformStats.avgTransactionValue)}</span>
            <span className="stat-label">Avg. Transaction</span>
          </div>
        </Card>

        <Card className="stat-card warning">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <span className="stat-value">{formatCurrency(platformStats.platformRevenue)}</span>
            <span className="stat-label">Platform Revenue</span>
            <span className="stat-growth positive">+{platformStats.revenueGrowth}%</span>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <Card className="chart-card">
          <h3>Token Distribution</h3>
          <div className="token-distribution">
            <div className="token-item">
              <div className="token-info">
                <span className="token-type">DFFT (Future Tokens)</span>
                <span className="token-count">{platformStats.tokensMinted.dfft.toLocaleString()}</span>
              </div>
              <div className="token-bar">
                <div 
                  className="token-bar-fill dfft"
                  style={{ width: `${(platformStats.tokensMinted.dfft / (platformStats.tokensMinted.dfft + platformStats.tokensMinted.dfrt)) * 100}%` }}
                />
              </div>
            </div>
            <div className="token-item">
              <div className="token-info">
                <span className="token-type">DFRT (Redeemable Tokens)</span>
                <span className="token-count">{platformStats.tokensMinted.dfrt.toLocaleString()}</span>
              </div>
              <div className="token-bar">
                <div 
                  className="token-bar-fill dfrt"
                  style={{ width: `${(platformStats.tokensMinted.dfrt / (platformStats.tokensMinted.dfft + platformStats.tokensMinted.dfrt)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="chart-card">
          <h3>Escrow & Disputes</h3>
          <div className="escrow-metrics">
            <div className="metric-row">
              <span className="metric-label">Escrow Balance:</span>
              <span className="metric-value">{formatCurrency(platformStats.escrowBalance)}</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Dispute Rate:</span>
              <span className="metric-value">{platformStats.disputeRate}%</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Active Disputes:</span>
              <span className="metric-value">{disputes.filter(d => d.status !== 'resolved').length}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="activity-card">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {transactions.slice(0, 5).map(tx => (
            <div key={tx.id} className="activity-item">
              <div className="activity-icon">
                {tx.type === 'purchase' && '🛒'}
                {tx.type === 'mint' && '✨'}
                {tx.type === 'transfer' && '↔️'}
              </div>
              <div className="activity-content">
                <span className="activity-title">{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</span>
                <span className="activity-details">{tx.from} → {tx.to}</span>
              </div>
              <div className="activity-meta">
                <Badge variant={getStatusBadge(tx.status).variant}>
                  {getStatusBadge(tx.status).label}
                </Badge>
                <span className="activity-time">{formatDate(tx.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="users-section">
      {/* Search and Filters */}
      <Card className="filters-card">
        <div className="filters-header">
          <input
            type="text"
            placeholder="Search users by name, email, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className="filter-buttons">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
            <Button variant="primary" size="small">
              Export Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="users-table-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Trust Score</th>
                <th>Transactions</th>
                <th>Volume</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(user => 
                  (filterStatus === 'all' || user.status === filterStatus) &&
                  (searchQuery === '' || 
                   user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   user.id.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .map(user => (
                  <tr key={user.id}>
                    <td className="user-id">{user.id}</td>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">{user.name.charAt(0)}</div>
                        <div className="user-info">
                          <span className="user-name">{user.name}</span>
                          <span className="user-last-active">{user.lastActive}</span>
                        </div>
                      </div>
                    </td>
                    <td className="user-email">{user.email}</td>
                    <td>
                      <Badge variant={user.role === 'farmer' ? 'success' : 'info'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td>
                      <Badge variant={getStatusBadge(user.status).variant}>
                        {getStatusBadge(user.status).label}
                      </Badge>
                    </td>
                    <td>
                      <div className="trust-score">
                        <span className={`score-value ${user.trustScore >= 800 ? 'high' : user.trustScore >= 600 ? 'medium' : 'low'}`}>
                          {user.trustScore}
                        </span>
                      </div>
                    </td>
                    <td>{user.totalTransactions}</td>
                    <td>{formatCurrency(user.totalVolume)}</td>
                    <td>{formatDate(user.joinDate)}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn view"
                          onClick={() => setSelectedUser(user)}
                          title="View Details"
                        >
                          👁️
                        </button>
                        {user.status === 'active' ? (
                          <button 
                            className="action-btn suspend"
                            onClick={() => handleUserAction(user.id, 'suspend')}
                            title="Suspend User"
                          >
                            🚫
                          </button>
                        ) : (
                          <button 
                            className="action-btn activate"
                            onClick={() => handleUserAction(user.id, 'activate')}
                            title="Activate User"
                          >
                            ✅
                          </button>
                        )}
                        <button 
                          className="action-btn message"
                          onClick={() => handleUserAction(user.id, 'message')}
                          title="Send Message"
                        >
                          💬
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <Card className="user-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>User Details</h3>
              <button className="close-btn" onClick={() => setSelectedUser(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="user-detail-section">
                <h4>Basic Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">User ID:</span>
                    <span className="detail-value">{selectedUser.id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{selectedUser.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedUser.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Role:</span>
                    <Badge variant={selectedUser.role === 'farmer' ? 'success' : 'info'}>
                      {selectedUser.role}
                    </Badge>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <Badge variant={getStatusBadge(selectedUser.status).variant}>
                      {getStatusBadge(selectedUser.status).label}
                    </Badge>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Verification:</span>
                    <Badge variant={getStatusBadge(selectedUser.verificationStatus).variant}>
                      {getStatusBadge(selectedUser.verificationStatus).label}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="user-detail-section">
                <h4>Activity Metrics</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Trust Score:</span>
                    <span className="detail-value">{selectedUser.trustScore}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Total Transactions:</span>
                    <span className="detail-value">{selectedUser.totalTransactions}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Total Volume:</span>
                    <span className="detail-value">{formatCurrency(selectedUser.totalVolume)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Join Date:</span>
                    <span className="detail-value">{formatDate(selectedUser.joinDate)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Last Active:</span>
                    <span className="detail-value">{selectedUser.lastActive}</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                {selectedUser.status === 'active' ? (
                  <Button 
                    variant="error"
                    onClick={() => {
                      handleUserAction(selectedUser.id, 'suspend');
                      setSelectedUser(null);
                    }}
                  >
                    Suspend User
                  </Button>
                ) : (
                  <Button 
                    variant="success"
                    onClick={() => {
                      handleUserAction(selectedUser.id, 'activate');
                      setSelectedUser(null);
                    }}
                  >
                    Activate User
                  </Button>
                )}
                <Button 
                  variant="primary"
                  onClick={() => {
                    handleUserAction(selectedUser.id, 'message');
                    setSelectedUser(null);
                  }}
                >
                  Send Message
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );

  const renderTransactions = () => (
    <div className="transactions-section">
      <Card className="transactions-table-card">
        <div className="card-header">
          <h3>All Transactions</h3>
          <div className="header-actions">
            <select className="filter-select">
              <option value="all">All Types</option>
              <option value="purchase">Purchase</option>
              <option value="mint">Mint</option>
              <option value="transfer">Transfer</option>
            </select>
            <Button variant="primary" size="small">
              Export
            </Button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Token ID</th>
                <th>Status</th>
                <th>Timestamp</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td className="tx-id">{tx.id}</td>
                  <td>
                    <Badge variant="default">{tx.type}</Badge>
                  </td>
                  <td>{tx.from}</td>
                  <td>{tx.to}</td>
                  <td className="tx-amount">{tx.amount > 0 ? formatCurrency(tx.amount) : '-'}</td>
                  <td className="token-id">{tx.tokenId}</td>
                  <td>
                    <Badge variant={getStatusBadge(tx.status).variant}>
                      {getStatusBadge(tx.status).label}
                    </Badge>
                  </td>
                  <td>{formatDate(tx.timestamp)}</td>
                  <td>
                    <div className="action-buttons">
                      <a 
                        href={`https://polygonscan.com/tx/${tx.blockchainHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn view"
                        title="View on Explorer"
                      >
                        🔗
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderDisputes = () => (
    <div className="disputes-section">
      <Card className="disputes-stats">
        <div className="dispute-stat">
          <span className="stat-value">{disputes.filter(d => d.status === 'open').length}</span>
          <span className="stat-label">Open</span>
        </div>
        <div className="dispute-stat">
          <span className="stat-value">{disputes.filter(d => d.status === 'investigating').length}</span>
          <span className="stat-label">Investigating</span>
        </div>
        <div className="dispute-stat">
          <span className="stat-value">{disputes.filter(d => d.status === 'resolved').length}</span>
          <span className="stat-label">Resolved</span>
        </div>
        <div className="dispute-stat">
          <span className="stat-value">{platformStats.disputeRate}%</span>
          <span className="stat-label">Dispute Rate</span>
        </div>
      </Card>

      <div className="disputes-grid">
        {disputes.map(dispute => (
          <Card key={dispute.id} className="dispute-card">
            <div className="dispute-header">
              <div className="dispute-id-section">
                <span className="dispute-id">{dispute.id}</span>
                <Badge variant={getStatusBadge(dispute.status).variant}>
                  {getStatusBadge(dispute.status).label}
                </Badge>
              </div>
              <div 
                className="dispute-priority"
                style={{ background: getPriorityColor(dispute.priority) }}
              >
                {dispute.priority}
              </div>
            </div>

            <div className="dispute-content">
              <h4>{dispute.subject}</h4>
              <p className="dispute-description">{dispute.description}</p>

              <div className="dispute-parties">
                <div className="party">
                  <span className="party-label">Plaintiff:</span>
                  <span className="party-name">{dispute.plaintiff}</span>
                </div>
                <div className="party">
                  <span className="party-label">Defendant:</span>
                  <span className="party-name">{dispute.defendant}</span>
                </div>
              </div>

              <div className="dispute-meta">
                <div className="meta-item">
                  <span className="meta-label">Amount:</span>
                  <span className="meta-value">{formatCurrency(dispute.amount)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Order ID:</span>
                  <span className="meta-value">{dispute.orderId}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Created:</span>
                  <span className="meta-value">{formatDate(dispute.createdAt)}</span>
                </div>
                {dispute.resolvedAt && (
                  <div className="meta-item">
                    <span className="meta-label">Resolved:</span>
                    <span className="meta-value">{formatDate(dispute.resolvedAt)}</span>
                  </div>
                )}
              </div>

              {dispute.evidence && dispute.evidence.length > 0 && (
                <div className="dispute-evidence">
                  <span className="evidence-label">Evidence:</span>
                  <div className="evidence-list">
                    {dispute.evidence.map((file, index) => (
                      <span key={index} className="evidence-file">📎 {file}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="dispute-messages">
                <span className="messages-icon">💬</span>
                <span className="messages-count">{dispute.messages} messages</span>
              </div>

              {dispute.resolution && (
                <div className="dispute-resolution">
                  <strong>Resolution:</strong> {dispute.resolution}
                </div>
              )}
            </div>

            <div className="dispute-actions">
              {dispute.status !== 'resolved' ? (
                <>
                  <Button 
                    variant="primary" 
                    size="small"
                    onClick={() => setSelectedDispute(dispute)}
                  >
                    Review
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="small"
                    onClick={() => handleDisputeAction(dispute.id, 'investigate')}
                  >
                    Investigate
                  </Button>
                  <Button 
                    variant="success" 
                    size="small"
                    onClick={() => handleDisputeAction(dispute.id, 'resolve')}
                  >
                    Resolve
                  </Button>
                </>
              ) : (
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={() => setSelectedDispute(dispute)}
                >
                  View Details
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Dispute Details Modal */}
      {selectedDispute && (
        <div className="modal-overlay" onClick={() => setSelectedDispute(null)}>
          <Card className="dispute-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Dispute Details - {selectedDispute.id}</h3>
              <button className="close-btn" onClick={() => setSelectedDispute(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="dispute-detail-section">
                <h4>Case Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Dispute ID:</span>
                    <span className="detail-value">{selectedDispute.id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Order ID:</span>
                    <span className="detail-value">{selectedDispute.orderId}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <Badge variant={getStatusBadge(selectedDispute.status).variant}>
                      {getStatusBadge(selectedDispute.status).label}
                    </Badge>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Priority:</span>
                    <span 
                      className="detail-value"
                      style={{ color: getPriorityColor(selectedDispute.priority) }}
                    >
                      {selectedDispute.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Amount:</span>
                    <span className="detail-value">{formatCurrency(selectedDispute.amount)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Created:</span>
                    <span className="detail-value">{formatDate(selectedDispute.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="dispute-detail-section">
                <h4>Parties Involved</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Plaintiff:</span>
                    <span className="detail-value">{selectedDispute.plaintiff}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Defendant:</span>
                    <span className="detail-value">{selectedDispute.defendant}</span>
                  </div>
                </div>
              </div>

              <div className="dispute-detail-section">
                <h4>Description</h4>
                <p className="dispute-full-description">{selectedDispute.description}</p>
              </div>

              {selectedDispute.resolution && (
                <div className="dispute-detail-section">
                  <h4>Resolution</h4>
                  <p className="resolution-text">{selectedDispute.resolution}</p>
                </div>
              )}

              <div className="modal-actions">
                {selectedDispute.status !== 'resolved' && (
                  <>
                    <Button 
                      variant="primary"
                      onClick={() => {
                        handleDisputeAction(selectedDispute.id, 'message');
                        setSelectedDispute(null);
                      }}
                    >
                      Send Message
                    </Button>
                    <Button 
                      variant="warning"
                      onClick={() => {
                        handleDisputeAction(selectedDispute.id, 'investigate');
                        setSelectedDispute(null);
                      }}
                    >
                      Start Investigation
                    </Button>
                    <Button 
                      variant="success"
                      onClick={() => {
                        handleDisputeAction(selectedDispute.id, 'resolve');
                        setSelectedDispute(null);
                      }}
                    >
                      Resolve Dispute
                    </Button>
                  </>
                )}
                <Button 
                  variant="secondary"
                  onClick={() => setSelectedDispute(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );

  const renderReports = () => (
    <div className="reports-section">
      <div className="reports-header">
        <h2>Analytics & Reports</h2>
        <div className="time-range-selector">
          <button
            className={`range-btn ${timeRange === '7d' ? 'active' : ''}`}
            onClick={() => setTimeRange('7d')}
          >
            7 Days
          </button>
          <button
            className={`range-btn ${timeRange === '30d' ? 'active' : ''}`}
            onClick={() => setTimeRange('30d')}
          >
            30 Days
          </button>
          <button
            className={`range-btn ${timeRange === '90d' ? 'active' : ''}`}
            onClick={() => setTimeRange('90d')}
          >
            90 Days
          </button>
          <button
            className={`range-btn ${timeRange === '1y' ? 'active' : ''}`}
            onClick={() => setTimeRange('1y')}
          >
            1 Year
          </button>
        </div>
      </div>

      <div className="reports-grid">
        <Card className="report-card">
          <div className="report-icon">👥</div>
          <h3>User Growth Report</h3>
          <p>Track user acquisition, retention, and churn rates</p>
          <Button variant="primary" size="small" fullWidth>
            Generate Report
          </Button>
        </Card>

        <Card className="report-card">
          <div className="report-icon">💰</div>
          <h3>Revenue Report</h3>
          <p>Analyze platform revenue, fees, and transaction volumes</p>
          <Button variant="primary" size="small" fullWidth>
            Generate Report
          </Button>
        </Card>

        <Card className="report-card">
          <div className="report-icon">📊</div>
          <h3>Transaction Analytics</h3>
          <p>Detailed breakdown of all platform transactions</p>
          <Button variant="primary" size="small" fullWidth>
            Generate Report
          </Button>
        </Card>

        <Card className="report-card">
          <div className="report-icon">🎯</div>
          <h3>Farmer Performance</h3>
          <p>Individual farmer metrics and performance scores</p>
          <Button variant="primary" size="small" fullWidth>
            Generate Report
          </Button>
        </Card>

        <Card className="report-card">
          <div className="report-icon">🛒</div>
          <h3>Buyer Activity Report</h3>
          <p>Buyer purchasing patterns and preferences</p>
          <Button variant="primary" size="small" fullWidth>
            Generate Report
          </Button>
        </Card>

        <Card className="report-card">
          <div className="report-icon">⚖️</div>
          <h3>Dispute Analysis</h3>
          <p>Comprehensive dispute statistics and resolutions</p>
          <Button variant="primary" size="small" fullWidth>
            Generate Report
          </Button>
        </Card>

        <Card className="report-card">
          <div className="report-icon">🌍</div>
          <h3>Regional Insights</h3>
          <p>Geographic distribution and regional performance</p>
          <Button variant="primary" size="small" fullWidth>
            Generate Report
          </Button>
        </Card>

        <Card className="report-card">
          <div className="report-icon">📈</div>
          <h3>Token Economics</h3>
          <p>DFFT and DFRT minting, trading, and redemption data</p>
          <Button variant="primary" size="small" fullWidth>
            Generate Report
          </Button>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card className="quick-stats-card">
        <h3>Platform Health Indicators</h3>
        <div className="health-indicators">
          <div className="indicator">
            <div className="indicator-header">
              <span className="indicator-label">System Uptime</span>
              <span className="indicator-status healthy">Healthy</span>
            </div>
            <div className="indicator-bar">
              <div className="indicator-fill" style={{ width: '99.8%' }}></div>
            </div>
            <span className="indicator-value">99.8%</span>
          </div>

          <div className="indicator">
            <div className="indicator-header">
              <span className="indicator-label">Transaction Success Rate</span>
              <span className="indicator-status healthy">Healthy</span>
            </div>
            <div className="indicator-bar">
              <div className="indicator-fill" style={{ width: '97.5%' }}></div>
            </div>
            <span className="indicator-value">97.5%</span>
          </div>

          <div className="indicator">
            <div className="indicator-header">
              <span className="indicator-label">User Satisfaction</span>
              <span className="indicator-status healthy">Healthy</span>
            </div>
            <div className="indicator-bar">
              <div className="indicator-fill" style={{ width: '92%' }}></div>
            </div>
            <span className="indicator-value">4.6/5.0</span>
          </div>

          <div className="indicator">
            <div className="indicator-header">
              <span className="indicator-label">Dispute Resolution Time</span>
              <span className="indicator-status warning">Monitor</span>
            </div>
            <div className="indicator-bar">
              <div className="indicator-fill warning" style={{ width: '60%' }}></div>
            </div>
            <span className="indicator-value">3.2 days avg</span>
          </div>
        </div>
      </Card>
    </div>
  );

  if (!platformStats) {
    return <div className="admin-loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <p>Platform management and oversight</p>
        </div>
        <div className="header-actions">
          <Button variant="secondary">
            Download Report
          </Button>
          <Button variant="primary">
            System Settings
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <span className="tab-icon">📊</span>
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <span className="tab-icon">👥</span>
          Users ({platformStats.totalUsers})
        </button>
        <button
          className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          <span className="tab-icon">💳</span>
          Transactions ({platformStats.totalTransactions})
        </button>
        <button
          className={`tab ${activeTab === 'disputes' ? 'active' : ''}`}
          onClick={() => setActiveTab('disputes')}
        >
          <span className="tab-icon">⚖️</span>
          Disputes ({disputes.filter(d => d.status !== 'resolved').length})
        </button>
        <button
          className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <span className="tab-icon">📈</span>
          Reports
        </button>
      </div>

      {/* Content */}
      <div className="admin-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'transactions' && renderTransactions()}
        {activeTab === 'disputes' && renderDisputes()}
        {activeTab === 'reports' && renderReports()}
      </div>
    </div>
  );
};

export default AdminDashboard;