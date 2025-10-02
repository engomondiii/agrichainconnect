import React, { useState, useEffect } from 'react';
import './PurchaseModal.css';

const PurchaseModal = ({ crop, isOpen, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(crop?.minimumPurchase || 10);
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setQuantity(crop?.minimumPurchase || 10);
      setPaymentMethod('mpesa');
      setDeliveryAddress('');
      setAgreedToTerms(false);
      setIsProcessing(false);
      setStep(1);
    }
  }, [isOpen, crop]);

  if (!isOpen || !crop) return null;

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Calculate costs
  const subtotal = crop.pricePerToken * quantity;
  const platformFee = subtotal * 0.025; // 2.5% platform fee
  const total = subtotal + platformFee;
  const totalKg = (quantity * 0.1).toFixed(1);

  // Validation
  const isQuantityValid = quantity >= (crop.minimumPurchase || 10) && 
                          quantity <= (crop.availableTokens || 0);
  const isStep1Valid = isQuantityValid;
  const isStep2Valid = paymentMethod && deliveryAddress.trim().length > 0;
  const isStep3Valid = agreedToTerms;

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(value);
  };

  // Quick quantity buttons
  const setQuickQuantity = (amount) => {
    const newQuantity = Math.min(amount, crop.availableTokens || 0);
    setQuantity(Math.max(newQuantity, crop.minimumPurchase || 10));
  };

  // Handle next step
  const handleNext = () => {
    if (step === 1 && isStep1Valid) {
      setStep(2);
    } else if (step === 2 && isStep2Valid) {
      setStep(3);
    }
  };

  // Handle purchase confirmation
  const handleConfirm = async () => {
    if (!isStep3Valid) return;

    setIsProcessing(true);

    const purchaseData = {
      cropId: crop.id,
      quantity,
      paymentMethod,
      deliveryAddress,
      subtotal,
      platformFee,
      total
    };

    try {
      if (onConfirm) {
        await onConfirm(purchaseData);
      }
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Payment methods
  const paymentMethods = [
    { id: 'mpesa', name: 'M-Pesa', icon: '📱', description: 'Mobile money' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard' },
    { id: 'crypto', name: 'Cryptocurrency', icon: '₿', description: 'BTC, ETH, USDT' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', description: 'Direct transfer' }
  ];

  return (
    <div className="purchase-modal-overlay" onClick={onClose}>
      <div className="purchase-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="purchase-modal__header">
          <h2 className="purchase-modal__title">Purchase Tokens</h2>
          <button 
            className="purchase-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Progress Steps */}
        <div className="purchase-modal__progress">
          <div className={`purchase-modal__progress-step ${step >= 1 ? 'purchase-modal__progress-step--active' : ''} ${step > 1 ? 'purchase-modal__progress-step--completed' : ''}`}>
            <div className="purchase-modal__progress-number">1</div>
            <div className="purchase-modal__progress-label">Quantity</div>
          </div>
          <div className="purchase-modal__progress-line"></div>
          <div className={`purchase-modal__progress-step ${step >= 2 ? 'purchase-modal__progress-step--active' : ''} ${step > 2 ? 'purchase-modal__progress-step--completed' : ''}`}>
            <div className="purchase-modal__progress-number">2</div>
            <div className="purchase-modal__progress-label">Payment</div>
          </div>
          <div className="purchase-modal__progress-line"></div>
          <div className={`purchase-modal__progress-step ${step >= 3 ? 'purchase-modal__progress-step--active' : ''}`}>
            <div className="purchase-modal__progress-number">3</div>
            <div className="purchase-modal__progress-label">Confirm</div>
          </div>
        </div>

        {/* Content */}
        <div className="purchase-modal__content">
          {/* Crop Summary */}
          <div className="purchase-modal__crop-summary">
            <img 
              src={crop.images?.[0] || '/assets/images/placeholder-crop.jpg'} 
              alt={crop.name}
              className="purchase-modal__crop-image"
            />
            <div className="purchase-modal__crop-info">
              <h3 className="purchase-modal__crop-name">{crop.name}</h3>
              <p className="purchase-modal__crop-meta">
                {crop.type} • {crop.location}
              </p>
              <div className="purchase-modal__crop-price">
                {formatPrice(crop.pricePerToken)} per token
              </div>
            </div>
          </div>

          {/* Step 1: Quantity Selection */}
          {step === 1 && (
            <div className="purchase-modal__step">
              <h3 className="purchase-modal__step-title">Select Quantity</h3>
              
              <div className="purchase-modal__quantity-input">
                <label className="form-label">Number of Tokens</label>
                <div className="purchase-modal__quantity-controls">
                  <button
                    type="button"
                    className="purchase-modal__quantity-btn"
                    onClick={() => setQuantity(Math.max(quantity - 10, crop.minimumPurchase || 10))}
                    disabled={quantity <= (crop.minimumPurchase || 10)}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="form-input purchase-modal__quantity-field"
                    value={quantity}onChange={handleQuantityChange}
                    min={crop.minimumPurchase || 10}
                    max={crop.availableTokens || 0}
                  />
                  <button
                    type="button"
                    className="purchase-modal__quantity-btn"
                    onClick={() => setQuantity(Math.min(quantity + 10, crop.availableTokens || 0))}
                    disabled={quantity >= (crop.availableTokens || 0)}
                  >
                    +
                  </button>
                </div>
                <div className="purchase-modal__quantity-info">
                  Min: {crop.minimumPurchase || 10} tokens • Max: {crop.availableTokens?.toLocaleString()} tokens
                </div>
              </div>

              {/* Quick Selection Buttons */}
              <div className="purchase-modal__quick-select">
                <button
                  type="button"
                  className="btn btn--secondary btn--small"
                  onClick={() => setQuickQuantity(50)}
                >
                  50 tokens
                </button>
                <button
                  type="button"
                  className="btn btn--secondary btn--small"
                  onClick={() => setQuickQuantity(100)}
                >
                  100 tokens
                </button>
                <button
                  type="button"
                  className="btn btn--secondary btn--small"
                  onClick={() => setQuickQuantity(500)}
                >
                  500 tokens
                </button>
                <button
                  type="button"
                  className="btn btn--secondary btn--small"
                  onClick={() => setQuickQuantity(crop.availableTokens || 0)}
                >
                  Max
                </button>
              </div>

              {/* Quantity Summary */}
              <div className="purchase-modal__quantity-summary card card--soft-info">
                <div className="purchase-modal__summary-item">
                  <span>Tokens</span>
                  <strong>{quantity.toLocaleString()}</strong>
                </div>
                <div className="purchase-modal__summary-item">
                  <span>Total Weight</span>
                  <strong>{totalKg} kg</strong>
                </div>
                <div className="purchase-modal__summary-item">
                  <span>Price per Token</span>
                  <strong>{formatPrice(crop.pricePerToken)}</strong>
                </div>
              </div>

              {!isQuantityValid && quantity > 0 && (
                <div className="alert alert--error">
                  Please enter a quantity between {crop.minimumPurchase || 10} and {crop.availableTokens?.toLocaleString()} tokens.
                </div>
              )}
            </div>
          )}

          {/* Step 2: Payment & Delivery */}
          {step === 2 && (
            <div className="purchase-modal__step">
              <h3 className="purchase-modal__step-title">Payment & Delivery Details</h3>
              
              {/* Payment Method Selection */}
              <div className="purchase-modal__section">
                <label className="form-label">Payment Method</label>
                <div className="purchase-modal__payment-methods">
                  {paymentMethods.map(method => (
                    <label
                      key={method.id}
                      className={`purchase-modal__payment-method ${paymentMethod === method.id ? 'purchase-modal__payment-method--selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="purchase-modal__payment-icon">{method.icon}</div>
                      <div className="purchase-modal__payment-info">
                        <div className="purchase-modal__payment-name">{method.name}</div>
                        <div className="purchase-modal__payment-desc">{method.description}</div>
                      </div>
                      <div className="purchase-modal__payment-check">✓</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="purchase-modal__section">
                <label className="form-label" htmlFor="deliveryAddress">
                  Delivery Address <span className="form-required">*</span>
                </label>
                <textarea
                  id="deliveryAddress"
                  className="form-textarea"
                  rows="3"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter your full delivery address including city and postal code"
                  required
                />
              </div>

              {/* Delivery Information */}
              <div className="purchase-modal__delivery-info card card--soft-success">
                <h4 className="purchase-modal__delivery-title">Delivery Information</h4>
                <ul className="purchase-modal__delivery-list">
                  <li>
                    {crop.tokenType === 'DFFT' 
                      ? `Expected delivery: ${new Date(crop.expectedHarvestDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
                      : 'Delivery within 3-7 business days'}
                  </li>
                  <li>Delivery tracking provided after shipment</li>
                  <li>Quality guarantee on all deliveries</li>
                  <li>Secure escrow until delivery confirmation</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="purchase-modal__step">
              <h3 className="purchase-modal__step-title">Review & Confirm</h3>
              
              {/* Order Summary */}
              <div className="purchase-modal__order-summary card">
                <h4 className="purchase-modal__summary-title">Order Summary</h4>
                
                <div className="purchase-modal__summary-row">
                  <span>Quantity</span>
                  <strong>{quantity.toLocaleString()} tokens ({totalKg} kg)</strong>
                </div>
                
                <div className="purchase-modal__summary-row">
                  <span>Price per Token</span>
                  <span>{formatPrice(crop.pricePerToken)}</span>
                </div>
                
                <div className="purchase-modal__summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="purchase-modal__summary-row">
                  <span>Platform Fee (2.5%)</span>
                  <span>{formatPrice(platformFee)}</span>
                </div>
                
                <div className="purchase-modal__summary-divider"></div>
                
                <div className="purchase-modal__summary-row purchase-modal__summary-row--total">
                  <span>Total Amount</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
              </div>

              {/* Payment & Delivery Details */}
              <div className="purchase-modal__review-details card card--soft-secondary">
                <div className="purchase-modal__review-item">
                  <div className="purchase-modal__review-label">Payment Method</div>
                  <div className="purchase-modal__review-value">
                    {paymentMethods.find(m => m.id === paymentMethod)?.name}
                  </div>
                </div>
                <div className="purchase-modal__review-item">
                  <div className="purchase-modal__review-label">Delivery Address</div>
                  <div className="purchase-modal__review-value">{deliveryAddress}</div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="purchase-modal__terms">
                <label className="purchase-modal__checkbox">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <span>
                    I agree to the <a href="/terms" target="_blank">Terms & Conditions</a> and 
                    understand that funds will be held in escrow until delivery is confirmed.
                  </span>
                </label>
              </div>

              {/* Important Notes */}
              <div className="purchase-modal__notes alert alert--info">
                <strong>Important:</strong>
                <ul>
                  <li>Your payment will be securely held in a smart contract escrow</li>
                  <li>Funds are released to the farmer only after verified delivery</li>
                  <li>Full refund if crop failure is confirmed by AI oracle</li>
                  <li>You can track your order in your dashboard</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="purchase-modal__footer">
          {step > 1 && (
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => setStep(step - 1)}
              disabled={isProcessing}
            >
              Back
            </button>
          )}
          
          <div className="purchase-modal__footer-spacer"></div>
          
          <button
            type="button"
            className="btn btn--outline"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </button>
          
          {step < 3 ? (
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleNext}
              disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleConfirm}
              disabled={!isStep3Valid || isProcessing}
            >
              {isProcessing ? 'Processing...' : `Confirm Purchase ${formatPrice(total)}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;