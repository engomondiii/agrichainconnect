import apiClient from './apiClient';

/**
 * Order Service
 * Handles all order-related API calls for buyers
 */

const orderService = {
  /**
   * Get all orders for the current buyer
   * @param {object} filters - Filter options (status, dateRange, etc.)
   * @returns {Promise<Array>} List of orders
   */
  getOrders: async (filters = {}) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get('/orders', { params: filters });

      const mockOrders = [
        {
          orderId: 'ORD-2025-C001',
          tokenId: 'DFFT-2025-C001',
          cropType: 'Coffee Arabica',
          variety: 'SL28',
          quantity: 100,
          unit: 'kg',
          price: 4.50,
          totalAmount: 450,
          status: 'growing',
          purchaseDate: '2025-09-15T10:00:00Z',
          expectedDelivery: '2025-11-20',
          farmer: {
            id: 'F123',
            name: 'Green Hills Farm',
            location: 'Nyeri, Kenya',
            trustScore: 850
          },
          type: 'DFFT'
        },
        {
          orderId: 'ORD-2025-T045',
          tokenId: 'DFRT-2025-T045',
          cropType: 'Organic Tea',
          variety: 'Green Tea',
          quantity: 50,
          unit: 'kg',
          price: 3.20,
          totalAmount: 160,
          status: 'delivered',
          purchaseDate: '2025-10-01T09:00:00Z',
          expectedDelivery: '2025-10-10',
          deliveredDate: '2025-10-09T14:30:00Z',
          farmer: {
            id: 'F456',
            name: 'Mountain View Estate',
            location: 'Kampala, Uganda',
            trustScore: 920
          },
          type: 'DFRT'
        },
        {
          orderId: 'ORD-2025-M078',
          tokenId: 'DFFT-2025-M078',
          cropType: 'Maize',
          variety: 'Hybrid',
          quantity: 500,
          unit: 'kg',
          price: 0.85,
          totalAmount: 425,
          status: 'confirmed',
          purchaseDate: '2025-09-20T11:30:00Z',
          expectedDelivery: '2025-12-15',
          farmer: {
            id: 'F789',
            name: 'Sunrise Cooperative',
            location: 'Arusha, Tanzania',
            trustScore: 780
          },
          type: 'DFFT'
        },
        {
          orderId: 'ORD-2025-C102',
          tokenId: 'DFFT-2025-C102',
          cropType: 'Coffee Robusta',
          variety: 'Robusta',
          quantity: 200,
          unit: 'kg',
          price: 3.80,
          totalAmount: 760,
          status: 'in_transit',
          purchaseDate: '2025-08-10T08:00:00Z',
          expectedDelivery: '2025-10-25',
          shippingDate: '2025-10-20T10:00:00Z',
          trackingNumber: 'TRK-2025-4567',
          farmer: {
            id: 'F321',
            name: 'Valley Fresh Farms',
            location: 'Kisumu, Kenya',
            trustScore: 810
          },
          type: 'DFFT'
        }
      ];

      // Apply filters
      let filtered = mockOrders;

      if (filters.status) {
        filtered = filtered.filter(order => order.status === filters.status);
      }

      if (filters.cropType) {
        filtered = filtered.filter(order => 
          order.cropType.toLowerCase().includes(filters.cropType.toLowerCase())
        );
      }

      if (filters.sortBy === 'date') {
        filtered.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
      } else if (filters.sortBy === 'amount') {
        filtered.sort((a, b) => b.totalAmount - a.totalAmount);
      }

      return filtered;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  /**
   * Get detailed information about a specific order
   * @param {string} orderId - Order ID
   * @returns {Promise<object>} Order details
   */
  getOrderDetails: async (orderId) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get(`/orders/${orderId}`);

      return {
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
        status: 'growing',
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
            message: 'Thank you for your order! The coffee plants are in excellent condition.'
          }
        ]
      };
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  },

  /**
   * Track order status updates
   * @param {string} orderId - Order ID
   * @returns {Promise<object>} Current status and tracking info
   */
  trackOrder: async (orderId) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get(`/orders/${orderId}/tracking`);

      return {
        orderId,
        currentStatus: 'in_transit',
        lastUpdate: new Date().toISOString(),
        estimatedDelivery: '2025-10-25',
        trackingNumber: 'TRK-2025-4567',
        carrier: 'Express Logistics',
        location: 'Distribution Center - Nairobi',
        updates: [
          {
            timestamp: '2025-10-20T10:00:00Z',
            status: 'picked_up',
            location: 'Nyeri Farm',
            description: 'Package picked up from farmer'
          },
          {
            timestamp: '2025-10-21T14:30:00Z',
            status: 'in_transit',
            location: 'Nairobi Hub',
            description: 'Package arrived at sorting facility'
          },
          {
            timestamp: '2025-10-22T09:00:00Z',
            status: 'in_transit',
            location: 'Distribution Center',
            description: 'Out for delivery'
          }
        ]
      };
    } catch (error) {
      console.error('Error tracking order:', error);
      throw error;
    }
  },

  /**
   * Confirm delivery of an order
   * @param {string} orderId - Order ID
   * @param {object} confirmationData - Delivery confirmation details
   * @returns {Promise<object>} Confirmation result
   */
  confirmDelivery: async (orderId, confirmationData = {}) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.post(`/orders/${orderId}/confirm`, confirmationData);

      return {
        success: true,
        orderId,
        confirmedAt: new Date().toISOString(),
        message: 'Delivery confirmed successfully. Payment has been released to the farmer.',
        nextSteps: [
          'Please rate the farmer and provide feedback',
          'Your transaction is now complete',
          'Thank you for using Agri-Chain Connect!'
        ]
      };
    } catch (error) {
      console.error('Error confirming delivery:', error);
      throw error;
    }
  },

  /**
   * Report an issue with an order
   * @param {string} orderId - Order ID
   * @param {object} issueData - Issue details
   * @returns {Promise<object>} Issue report result
   */
  reportIssue: async (orderId, issueData) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.post(`/orders/${orderId}/issues`, issueData);

      return {
        success: true,
        issueId: `ISS-${Date.now()}`,
        orderId,
        status: 'under_review',
        submittedAt: new Date().toISOString(),
        message: 'Your issue has been submitted and is under review.',
        expectedResolution: '3-5 business days'
      };
    } catch (error) {
      console.error('Error reporting issue:', error);
      throw error;
    }
  },

  /**
   * Send a message to the farmer
   * @param {string} orderId - Order ID
   * @param {string} message - Message content
   * @returns {Promise<object>} Message send result
   */
  sendMessage: async (orderId, message) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.post(`/orders/${orderId}/messages`, { message });

      return {
        success: true,
        messageId: `MSG-${Date.now()}`,
        orderId,
        sentAt: new Date().toISOString(),
        message
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  /**
   * Rate and review a farmer after delivery
   * @param {string} orderId - Order ID
   * @param {object} reviewData - Rating and review
   * @returns {Promise<object>} Review submission result
   */
  submitReview: async (orderId, reviewData) => {
    try {
      // Validate review data
      if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 5) {
        throw new Error('Rating must be between 1 and 5');
      }

      // Mock implementation - replace with actual API call
      // const response = await apiClient.post(`/orders/${orderId}/reviews`, reviewData);

      return {
        success: true,
        reviewId: `REV-${Date.now()}`,
        orderId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        submittedAt: new Date().toISOString(),
        message: 'Thank you for your feedback!'
      };
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  },

  /**
   * Cancel an order (only for pending orders)
   * @param {string} orderId - Order ID
   * @param {string} reason - Cancellation reason
   * @returns {Promise<object>} Cancellation result
   */
  cancelOrder: async (orderId, reason) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.post(`/orders/${orderId}/cancel`, { reason });

      return {
        success: true,
        orderId,
        cancelledAt: new Date().toISOString(),
        refundAmount: 450,
        refundStatus: 'processing',
        message: 'Order cancelled successfully. Refund will be processed within 3-5 business days.',
        reason
      };
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  },

  /**
   * Get order statistics for the buyer
   * @returns {Promise<object>} Order statistics
   */
  getOrderStats: async () => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get('/orders/stats');

      return {
        totalOrders: 24,
        activeOrders: 5,
        completedOrders: 18,
        cancelledOrders: 1,
        totalSpent: 12450.50,
        averageOrderValue: 518.77,
        topCrop: 'Coffee',
        favoriteSupplier: 'Green Hills Farm'
      };
    } catch (error) {
      console.error('Error fetching order stats:', error);
      throw error;
    }
  }
};

export default orderService;