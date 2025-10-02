import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';
import './SecondaryMarket.css';

const SecondaryMarket = () => {
  const [selectedToken, setSelectedToken] = useState(null);
  const [orderBook, setOrderBook] = useState({ buyOrders: [], sellOrders: [] });
  const [priceHistory, setPriceHistory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('buy'); // buy or sell
  const [orderForm, setOrderForm] = useState({
    quantity: '',
    price: '',
    total: 0
  });
  const [userPortfolio, setUserPortfolio] = useState([]);
  const [marketStats, setMarketStats] = useState({
    lastPrice: 0,
    change24h: 0,
    high24h: 0,
    low24h: 0,
    volume24h: 0
  });

  useEffect(() => {
    fetchMarketData();
  }, [selectedToken]);

  useEffect(() => {
    // Calculate total when quantity or price changes
    const total = (parseFloat(orderForm.quantity) || 0) * (parseFloat(orderForm.price) || 0);
    setOrderForm(prev => ({ ...prev, total }));
  }, [orderForm.quantity, orderForm.price]);

  const fetchMarketData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockTokens = [
        {
          tokenId: 'DFFT-2025-C001',
          cropType: 'Coffee Arabica',
          farmer: 'Green Hills Farm',
          harvestDate: '2025-11-20',
          totalSupply: 100000,
          availableSupply: 45000
        },
        {
          tokenId: 'DFFT-2025-T045',
          cropType: 'Organic Tea',
          farmer: 'Mountain View Estate',
          harvestDate: '2025-10-15',
          totalSupply: 50000,
          availableSupply: 12000
        }
      ];

      if (!selectedToken) {
        setSelectedToken(mockTokens[0]);
      }

      // Mock order book
      const mockOrderBook = {
        buyOrders: [
          { price: 4.75, quantity: 5000, total: 23750, trader: '0x1a2b...3c4d' },
          { price: 4.70, quantity: 8000, total: 37600, trader: '0x5e6f...7g8h' },
          { price: 4.65, quantity: 12000, total: 55800, trader: '0x9i0j...1k2l' },
          { price: 4.60, quantity: 15000, total: 69000, trader: '0x3m4n...5o6p' },
          { price: 4.55, quantity: 10000, total: 45500, trader: '0x7q8r...9s0t' }
        ],
        sellOrders: [
          { price: 4.85, quantity: 3000, total: 14550, trader: '0xab1c...2d3e' },
          { price: 4.90, quantity: 7000, total: 34300, trader: '0xef4g...5h6i' },
          { price: 4.95, quantity: 10000, total: 49500, trader: '0xjk7l...8m9n' },
          { price: 5.00, quantity: 15000, total: 75000, trader: '0xop0q...1r2s' },
          { price: 5.05, quantity: 8000, total: 40400, trader: '0xtu3v...4w5x' }
        ]
      };

      setOrderBook(mockOrderBook);

      // Mock price history (last 24 hours)
      const mockPriceHistory = Array.from({ length: 24 }, (_, i) => ({
        time: `${23 - i}h`,
        price: 4.50 + Math.random() * 0.5,
        volume: Math.floor(Math.random() * 5000) + 1000
      }));

      setPriceHistory(mockPriceHistory);

      // Mock market stats
      setMarketStats({
        lastPrice: 4.80,
        change24h: 5.5,
        high24h: 4.95,
        low24h: 4.50,
        volume24h: 125000
      });

      // Mock transactions
      const mockTransactions = [
        { id: 1, type: 'buy', price: 4.80, quantity: 500, total: 2400, time: '2 mins ago', trader: '0x1a2b...3c4d' },
        { id: 2, type: 'sell', price: 4.75, quantity: 1200, total: 5700, time: '5 mins ago', trader: '0x5e6f...7g8h' },
        { id: 3, type: 'buy', price: 4.78, quantity: 800, total: 3824, time: '8 mins ago', trader: '0x9i0j...1k2l' },
        { id: 4, type: 'sell', price: 4.82, quantity: 300, total: 1446, time: '12 mins ago', trader: '0x3m4n...5o6p' },
        { id: 5, type: 'buy', price: 4.76, quantity: 1500, total: 7140, time: '15 mins ago', trader: '0x7q8r...9s0t' }
      ];

      setTransactions(mockTransactions);

      // Mock user portfolio
      setUserPortfolio([
        { tokenId: 'DFFT-2025-C001', quantity: 5000, avgPrice: 4.60, currentPrice: 4.80 },
        { tokenId: 'DFFT-2025-T045', quantity: 2000, avgPrice: 3.15, currentPrice: 3.20 }
      ]);

    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fillFromOrderBook = (price, quantity, type) => {
    setActiveTab(type === 'buy' ? 'sell' : 'buy'); // Switch to opposite tab
    setOrderForm({
      quantity: quantity.toString(),
      price: price.toString(),
      total: price * quantity
    });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    try {
      // Validate form
      if (!orderForm.quantity || !orderForm.price) {
        alert('Please fill in all fields');
        return;
      }

      const orderData = {
        tokenId: selectedToken.tokenId,
        type: activeTab,
        quantity: parseFloat(orderForm.quantity),
        price: parseFloat(orderForm.price),
        total: orderForm.total
      };

      console.log('Submitting order:', orderData);
      
      // Mock order submission
      alert(`${activeTab.toUpperCase()} order placed successfully!\n\nQuantity: ${orderForm.quantity} tokens\nPrice: $${orderForm.price}\nTotal: $${orderForm.total.toFixed(2)}`);
      
      // Reset form
      setOrderForm({ quantity: '', price: '', total: 0 });
      
      // Refresh market data
      fetchMarketData();
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const calculateSpread = () => {
    if (orderBook.sellOrders.length && orderBook.buyOrders.length) {
      const bestAsk = orderBook.sellOrders[0].price;
      const bestBid = orderBook.buyOrders[0].price;
      return ((bestAsk - bestBid) / bestBid * 100).toFixed(2);
    }
    return '0.00';
  };

  if (!selectedToken) {
    return <div className="secondary-market-loading">Loading market data...</div>;
  }

  return (
    <div className="secondary-market">
      {/* Header */}
      <div className="market-header">
        <div className="token-info">
          <h1>{selectedToken.cropType}</h1>
          <p className="token-id">{selectedToken.tokenId}</p>
          <p className="token-details">
            {selectedToken.farmer} • Harvest: {new Date(selectedToken.harvestDate).toLocaleDateString()}
          </p>
        </div>

        <div className="market-stats-header">
          <div className="stat-item">
            <span className="stat-label">Last Price</span>
            <span className="stat-value">${marketStats.lastPrice.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">24h Change</span>
            <span className={`stat-value ${marketStats.change24h >= 0 ? 'positive' : 'negative'}`}>
              {marketStats.change24h >= 0 ? '+' : ''}{marketStats.change24h.toFixed(2)}%
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">24h High</span>
            <span className="stat-value">${marketStats.high24h.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">24h Low</span>
            <span className="stat-value">${marketStats.low24h.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">24h Volume</span>
            <span className="stat-value">{marketStats.volume24h.toLocaleString()} tokens</span>
          </div>
        </div>
      </div>

      {/* Main Trading Interface */}
      <div className="trading-layout">
        {/* Left Column: Order Book & Recent Trades */}
        <div className="trading-column left-column">
          {/* Order Book */}
          <Card className="order-book-card">
            <div className="card-header">
              <h2>Order Book</h2>
              <div className="spread-indicator">
                Spread: <strong>{calculateSpread()}%</strong>
              </div>
            </div>

            <div className="order-book">
              {/* Sell Orders (Asks) */}
              <div className="order-book-section sell-orders">
                <div className="order-book-header">
                  <span>Price (USD)</span>
                  <span>Quantity</span>
                  <span>Total (USD)</span>
                </div>
                {orderBook.sellOrders.map((order, index) => (
                  <div 
                    key={index} 
                    className="order-row sell-order"
                    onClick={() => fillFromOrderBook(order.price, order.quantity, 'sell')}
                  >
                    <span className="order-price">${order.price.toFixed(2)}</span>
                    <span className="order-quantity">{order.quantity.toLocaleString()}</span>
                    <span className="order-total">${order.total.toLocaleString()}</span>
                    <div 
                      className="order-depth-bar sell-bar" 
                      style={{ width: `${(order.quantity / 15000) * 100}%` }}
                    />
                  </div>
                ))}
              </div>

              {/* Spread */}
              <div className="spread-divider">
                <span className="spread-price">
                  ${((orderBook.sellOrders[0]?.price + orderBook.buyOrders[0]?.price) / 2).toFixed(2)}
                </span>
              </div>

              {/* Buy Orders (Bids) */}
              <div className="order-book-section buy-orders">
                {orderBook.buyOrders.map((order, index) => (
                  <div 
                    key={index} 
                    className="order-row buy-order"
                    onClick={() => fillFromOrderBook(order.price, order.quantity, 'buy')}
                  >
                    <span className="order-price">${order.price.toFixed(2)}</span>
                    <span className="order-quantity">{order.quantity.toLocaleString()}</span>
                    <span className="order-total">${order.total.toLocaleString()}</span>
                    <div 
                      className="order-depth-bar buy-bar" 
                      style={{ width: `${(order.quantity / 15000) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Transactions */}
          <Card className="recent-trades-card">
            <h2>Recent Trades</h2>
            <div className="recent-trades">
              <div className="trades-header">
                <span>Type</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Time</span>
              </div>
              {transactions.map(tx => (
                <div key={tx.id} className="trade-row">
                  <Badge variant={tx.type === 'buy' ? 'success' : 'error'}>
                    {tx.type.toUpperCase()}
                  </Badge>
                  <span className={`trade-price ${tx.type}`}>${tx.price.toFixed(2)}</span>
                  <span className="trade-quantity">{tx.quantity.toLocaleString()}</span>
                  <span className="trade-time">{tx.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Center Column: Price Chart */}
        <div className="trading-column center-column">
          <Card className="chart-card">
            <div className="chart-header">
              <h2>Price Chart (24h)</h2>
              <div className="chart-controls">
                <button className="chart-btn active">24H</button>
                <button className="chart-btn">7D</button>
                <button className="chart-btn">30D</button>
              </div>
            </div>

            <div className="price-chart">
              <div className="chart-y-axis">
                <span>$5.00</span>
                <span>$4.75</span>
                <span>$4.50</span>
                <span>$4.25</span>
                <span>$4.00</span>
              </div>
              <div className="chart-area">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Price area */}
                  <path
                    d={`M 0 ${100 - ((priceHistory[0]?.price - 4.0) / 1.0 * 100)} 
                        ${priceHistory.map((point, i) => 
                          `L ${(i / (priceHistory.length - 1)) * 100} ${100 - ((point.price - 4.0) / 1.0 * 100)}`
                        ).join(' ')}
                        L 100 100 L 0 100 Z`}
                    fill="url(#priceGradient)"
                  />
                  
                  {/* Price line */}
                  <polyline
                    points={priceHistory.map((point, i) => 
                      `${(i / (priceHistory.length - 1)) * 100},${100 - ((point.price - 4.0) / 1.0 * 100)}`
                    ).join(' ')}
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
              <div className="chart-x-axis">
                <span>24h ago</span>
                <span>18h</span>
                <span>12h</span>
                <span>6h</span>
                <span>Now</span>
              </div>
            </div>

            {/* Volume Chart */}
            <div className="volume-chart">
              <h3>Volume</h3>
              <div className="volume-bars">
                {priceHistory.map((point, i) => (
                  <div 
                    key={i} 
                    className="volume-bar"
                    style={{ height: `${(point.volume / 5000) * 100}%` }}
                    title={`${point.volume} tokens`}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Your Portfolio */}
          <Card className="portfolio-card">
            <h2>Your Holdings</h2>
            {userPortfolio.length > 0 ? (
              <div className="portfolio-holdings">
                {userPortfolio.map((holding, index) => {
                  const gainLoss = (holding.currentPrice - holding.avgPrice) * holding.quantity;
                  const gainLossPercent = ((holding.currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
                  return (
                    <div key={index} className="holding-item">
                      <div className="holding-info">
                        <span className="holding-token">{holding.tokenId}</span>
                        <span className="holding-quantity">{holding.quantity.toLocaleString()} tokens</span>
                      </div>
                      <div className="holding-values">
                        <div className="value-row">
                          <span>Avg. Price:</span>
                          <span>${holding.avgPrice.toFixed(2)}</span>
                        </div>
                        <div className="value-row">
                          <span>Current:</span>
                          <span>${holding.currentPrice.toFixed(2)}</span>
                        </div>
                        <div className="value-row">
                          <span>P&L:</span>
                          <span className={gainLoss >= 0 ? 'positive' : 'negative'}>
                            {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="empty-message">You don't own any tokens yet</p>
            )}
          </Card>
        </div>

        {/* Right Column: Trading Form */}
        <div className="trading-column right-column">
          <Card className="trading-form-card">
            <div className="form-tabs">
              <button
                className={`tab-button ${activeTab === 'buy' ? 'active' : ''}`}
                onClick={() => setActiveTab('buy')}
              >
                Buy
              </button>
              <button
                className={`tab-button ${activeTab === 'sell' ? 'active' : ''}`}
                onClick={() => setActiveTab('sell')}
              >
                Sell
              </button>
            </div>

            <form onSubmit={handleSubmitOrder} className="trading-form">
              <div className="form-group">
                <label htmlFor="price">Price per Token (USD)</label>
                <div className="input-with-buttons">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={orderForm.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                  <button 
                    type="button" 
                    className="quick-fill-btn"
                    onClick={() => setOrderForm(prev => ({
                      ...prev,
                      price: activeTab === 'buy' 
                        ? orderBook.sellOrders[0]?.price.toString() 
                        : orderBook.buyOrders[0]?.price.toString()
                    }))}
                  >
                    Market
                  </button>
                </div>
                <span className="field-hint">
                  Best {activeTab === 'buy' ? 'Ask' : 'Bid'}: $
                  {activeTab === 'buy' 
                    ? orderBook.sellOrders[0]?.price.toFixed(2) 
                    : orderBook.buyOrders[0]?.price.toFixed(2)}
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity (tokens)</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={orderForm.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  step="1"
                  min="0"
                />
                <span className="field-hint">
                  Available: {selectedToken.availableSupply.toLocaleString()} tokens
                </span>
              </div>

              <div className="form-group">
                <label>Total (USD)</label>
                <div className="total-display">
                  ${orderForm.total.toFixed(2)}
                </div>
              </div>

              <div className="percentage-buttons">
                {[25, 50, 75, 100].map(percent => (
                  <button
                    key={percent}
                    type="button"
                    className="percent-btn"
                    onClick={() => {
                      const maxQuantity = activeTab === 'buy' 
                        ? Math.floor(10000 / (parseFloat(orderForm.price) || 1)) // Assuming $10,000 balance
                        : userPortfolio.find(h => h.tokenId === selectedToken.tokenId)?.quantity || 0;
                      setOrderForm(prev => ({
                        ...prev,
                        quantity: Math.floor(maxQuantity * (percent / 100)).toString()
                      }));
                    }}
                  >
                    {percent}%
                  </button>
                ))}
              </div>

              <Button 
                variant="primary" 
                type="submit" 
                fullWidth
                disabled={!orderForm.quantity || !orderForm.price}
              >
                {activeTab === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
              </Button>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Order Type:</span>
                  <span>{activeTab === 'buy' ? 'Limit Buy' : 'Limit Sell'}</span>
                </div>
                <div className="summary-row">
                  <span>Est. Fee (2%):</span>
                  <span>${(orderForm.total * 0.02).toFixed(2)}</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total {activeTab === 'buy' ? 'Cost' : 'Receive'}:</span>
                  <span className="total-amount">
                    ${(orderForm.total * (activeTab === 'buy' ? 1.02 : 0.98)).toFixed(2)}
                  </span>
                </div>
              </div>
            </form>
          </Card>

          {/* Market Info */}
          <Card className="market-info-card">
            <h3>Market Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Total Supply:</span>
                <span className="info-value">{selectedToken.totalSupply.toLocaleString()}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Available:</span>
                <span className="info-value">{selectedToken.availableSupply.toLocaleString()}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Circulating:</span>
                <span className="info-value">
                  {((selectedToken.totalSupply - selectedToken.availableSupply) / selectedToken.totalSupply * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecondaryMarket;