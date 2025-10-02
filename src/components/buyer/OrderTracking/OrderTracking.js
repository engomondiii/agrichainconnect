import React, { useState, useEffect } from 'react';
import Card from '../../common/Card/Card';
import Badge from '../../common/Badge/Badge';
import Button from '../../common/Button/Button';
import './OrderTracking.css';

const OrderTracking = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await orderService.getOrderDetails(orderId);
      
      const mockOrder = {
        orderId: 'ORD-2025-C001',
        tokenId: 'DFFT-2025-C001',
        cropType: 'Coffee Arabica',
        variety: 'SL28',
        quantity: 100,
        unit: 'kg',
        price: 4.50,
        totalAmount: 450,
        purchaseDate: '2025-09-15T10:00:00Z',
        expectedDelivery: '2025-11-20',
        status: 'growing', // purchased, confirmed, growing, harvested, in_transit, delivered
        farmer: {
          id: 'F123',
          name: 'Green Hills Farm',
          trustScore: 850,
          location: 'Nyeri, Kenya',
          contact: 'farmer@greenhills.ke'
        },
        timeline: [
          {
            stage: 'Order Placed',
            date: '2025-09-15T10:00:00Z',
            status: 'completed',
            description: 'Your order has been confirmed and payment processed'
          },
          {
            stage: 'Farmer Confirmed',
            date: '2025-09-15T14:30:00Z',
            status: 'completed',
            description: 'Farmer has confirmed the order and allocated your tokens'
          },
          {
            stage: 'Growing',
            date: '2025-09-16T08:00:00Z',
            status: 'active',
            description: 'Crop is currently growing. Regular updates will be provided.',
            updates: [
              {
                date: '2025-10-01',
                message: 'Crop health excellent. Weather conditions favorable.',
                image: '/mock-crop-1.jpg'
              },
              {
                date: '2025-10-15',
                message: 'Mid-season update: Crop development on track.',
                image: '/mock-crop-2.jpg'
              }
            ]
          },
          {
            stage: 'Harvest',
            date: null,
            status: 'pending',
            description: 'Scheduled for mid-November 2025'
          },
          {
            stage: 'Quality Check',
            date: null,
            status: 'pending',
            description: 'Post-harvest quality inspection'
          },
          {
            stage: 'In Transit',
            date: null,
            status: 'pending',
            description: 'Delivery to your specified location'
          },
          {
            stage: 'Delivered',
            date: null,
            status: 'pending',
            description: 'Final delivery confirmation'
          }
        ],
        aiOracleData: {
          lastUpdate: '2025-10-20T12:00:00Z',
          cropHealth: 92,
          weatherConditions: 'Favorable',
          yieldPrediction: 98,
          riskLevel: 'Low',
          satelliteImage: '/mock-satellite.jpg',
          details: {
            temperature: '22°C',
            rainfall: 'Adequate',
            soilMoisture: 'Optimal',
            pestActivity: 'None detected'
          }
        },
        communications: [
          {
            id: 1,
            from: 'farmer',
            date: '2025-09-20T09:30:00Z',
            message: 'Thank you for your order! The coffee plants are in excellent condition. Will keep you updated regularly.'
          },
          {
            id: 2,
            from: 'buyer',
            date: '2025-09-21T15:00:00Z',
            message: 'Great to hear! Looking forward to the harvest. Please let me know if you need anything.'
          }
        ]
      };

      setOrder(mockOrder);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      completed: { variant: 'success', label: 'Completed' },
      active: { variant: 'info', label: 'In Progress' },
      pending: { variant: 'default', label: 'Pending' }
    };
    return config[status] || { variant: 'default', label: status };
  };

  const getCurrentStage = () => {
    if (!order) return null;
    return order.timeline.find(stage => stage.status === 'active');
  };

  const handleSendMessage = async () => {
    try {
      // Send message to farmer
      // await orderService.sendMessage(orderId, message);
      console.log('Sending message:', message);
      
      // Add to communications
      const newMessage = {
        id: order.communications.length + 1,
        from: 'buyer',
        date: new Date().toISOString(),
        message
      };
      
      setOrder(prev => ({
        ...prev,
        communications: [...prev.communications, newMessage]
      }));
      
      setMessage('');
      setShowContactModal(false);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const confirmDelivery = async () => {
    try {
      // Confirm delivery
      // await orderService.confirmDelivery(orderId);
      alert('Delivery confirmed! Payment will be released to the farmer.');
    } catch (error) {
      console.error('Error confirming delivery:', error);
    }
  };

  if (isLoading) {
    return <div className="order-tracking-loading">Loading order details...</div>;
  }

  if (!order) {
    return <div className="order-tracking-error">Order not found</div>;
  }

  const currentStage = getCurrentStage();

  return (
    <div className="order-tracking">
      <div className="tracking-header">
        <div className="header-main">
          <h1>Order Tracking</h1>
          <p className="order-id">Order ID: {order.orderId}</p>
        </div>
        <Button variant="secondary" onClick={() => setShowContactModal(true)}>
          Contact Farmer
        </Button>
      </div>

      {/* Order Summary */}
      <Card className="order-summary-card">
        <div className="summary-grid">
          <div className="summary-item">
            <h3>{order.cropType}</h3>
            <p className="variety">{order.variety}</p>
          </div>
          <div className="summary-item">
            <span className="summary-label">Quantity</span>
            <span className="summary-value">{order.quantity} {order.unit}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Amount</span>
            <span className="summary-value">${order.totalAmount}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Expected Delivery</span>
            <span className="summary-value">
              {new Date(order.expectedDelivery).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="farmer-info">
          <h4>Farmer Information</h4>
          <div className="farmer-details">
            <p className="farmer-name">{order.farmer.name}</p>
            <p className="farmer-location">{order.farmer.location}</p>
            <div className="trust-score-display">
              Trust Score: <strong>{order.farmer.trustScore}</strong>
            </div>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <Card className="timeline-card">
        <h2>Order Timeline</h2>
        <div className="timeline">
          {order.timeline.map((stage, index) => {
            const statusConfig = getStatusBadge(stage.status);
            return (
              <div 
                key={index} 
                className={`timeline-item ${stage.status}`}
              >
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  {index < order.timeline.length - 1 && (
                    <div className="timeline-line"></div>
                  )}
                </div>
                
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{stage.stage}</h3>
                    <Badge variant={statusConfig.variant}>
                      {statusConfig.label}
                    </Badge>
                  </div>
                  
                  {stage.date && (
                    <p className="timeline-date">
                      {new Date(stage.date).toLocaleString()}
                    </p>
                  )}
                  
                  <p className="timeline-description">{stage.description}</p>
                  
                  {stage.updates && stage.updates.length > 0 && (
                    <div className="stage-updates">
                      <h4>Progress Updates</h4>
                      {stage.updates.map((update, idx) => (
                        <div key={idx} className="update-item">
                          <p className="update-date">
                            {new Date(update.date).toLocaleDateString()}
                          </p>
                          <p className="update-message">{update.message}</p>
                          {update.image && (
                            <img 
                              src={update.image} 
                              alt="Crop update" 
                              className="update-image"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* AI Oracle Data */}
      {order.aiOracleData && (
        <Card className="oracle-card">
          <h2>AI Oracle - Crop Monitoring</h2>
          <p className="oracle-update">
            Last updated: {new Date(order.aiOracleData.lastUpdate).toLocaleString()}
          </p>

          <div className="oracle-metrics">
            <div className="oracle-metric">
              <div className="metric-circle" style={{ '--progress': order.aiOracleData.cropHealth }}>
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" className="metric-bg"></circle>
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    className="metric-progress"
                    style={{ strokeDasharray: `${order.aiOracleData.cropHealth * 2.827}, 282.7` }}
                  ></circle>
                </svg>
                <div className="metric-value">{order.aiOracleData.cropHealth}%</div>
              </div>
              <span className="metric-label">Crop Health</span>
            </div>

            <div className="oracle-metric">
              <div className="metric-circle" style={{ '--progress': order.aiOracleData.yieldPrediction }}>
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" className="metric-bg"></circle>
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    className="metric-progress"
                    style={{ strokeDasharray: `${order.aiOracleData.yieldPrediction * 2.827}, 282.7` }}
                  ></circle>
                </svg>
                <div className="metric-value">{order.aiOracleData.yieldPrediction}%</div>
              </div>
              <span className="metric-label">Yield Prediction</span>
            </div>

            <div className="oracle-info">
              <div className="info-item">
                <span className="info-label">Weather:</span>
                <span className="info-value">{order.aiOracleData.weatherConditions}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Risk Level:</span>
                <Badge variant={order.aiOracleData.riskLevel === 'Low' ? 'success' : 'warning'}>
                  {order.aiOracleData.riskLevel}
                </Badge>
              </div>
            </div>
          </div>

          <div className="oracle-details">
            <h4>Environmental Details</h4>
            <div className="details-grid">
              <div className="detail-box">
                <span className="detail-icon">🌡️</span>
                <span className="detail-label">Temperature</span>
                <span className="detail-value">{order.aiOracleData.details.temperature}</span>
              </div>
              <div className="detail-box">
                <span className="detail-icon">💧</span>
                <span className="detail-label">Rainfall</span>
                <span className="detail-value">{order.aiOracleData.details.rainfall}</span>
              </div>
              <div className="detail-box">
                <span className="detail-icon">🌱</span>
                <span className="detail-label">Soil Moisture</span>
                <span className="detail-value">{order.aiOracleData.details.soilMoisture}</span>
              </div>
              <div className="detail-box">
                <span className="detail-icon">🐛</span>
                <span className="detail-label">Pest Activity</span>
                <span className="detail-value">{order.aiOracleData.details.pestActivity}</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Communications */}
      <Card className="communications-card">
        <h2>Communications</h2>
        <div className="messages-list">
          {order.communications.map(comm => (
            <div 
              key={comm.id} 
              className={`message-item ${comm.from}`}
            >
              <div className="message-header">
                <span className="message-sender">
                  {comm.from === 'farmer' ? order.farmer.name : 'You'}
                </span>
                <span className="message-date">
                  {new Date(comm.date).toLocaleString()}
                </span>
              </div>
              <p className="message-content">{comm.message}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      {order.status === 'delivered' && (
        <Card className="action-card">
          <h3>Confirm Delivery</h3>
          <p>Have you received the delivery in good condition?</p>
          <div className="action-buttons">
            <Button variant="primary" onClick={confirmDelivery}>
              Confirm Delivery
            </Button>
            <Button variant="secondary">Report Issue</Button>
          </div>
        </Card>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Contact Farmer</h3>
              <button 
                className="modal-close"
                onClick={() => setShowContactModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Send a message to {order.farmer.name}</p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows="5"
              />
            </div>
            <div className="modal-footer">
              <Button variant="secondary" onClick={() => setShowContactModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;