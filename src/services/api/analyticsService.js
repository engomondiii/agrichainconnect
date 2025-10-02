import apiClient from './apiClient';

/**
 * Analytics Service
 * Handles analytics and insights API calls for buyers
 */

const analyticsService = {
  /**
   * Get purchase analytics for the buyer
   * @param {string} timeRange - Time range (1m, 3m, 6m, 1y, all)
   * @returns {Promise<object>} Purchase analytics data
   */
  getPurchaseAnalytics: async (timeRange = '6m') => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get('/analytics/purchases', { params: { timeRange } });

      const mockData = {
        timeRange,
        summary: {
          totalSpent: 45750,
          totalOrders: 38,
          averageOrderValue: 1204,
          uniqueFarmers: 28
        },
        spendingByMonth: [
          { month: 'May 2025', amount: 5200, orders: 4 },
          { month: 'Jun 2025', amount: 6800, orders: 6 },
          { month: 'Jul 2025', amount: 8100, orders: 7 },
          { month: 'Aug 2025', amount: 9200, orders: 8 },
          { month: 'Sep 2025', amount: 8650, orders: 7 },
          { month: 'Oct 2025', amount: 7800, orders: 6 }
        ],
        spendingByCrop: [
          { crop: 'Coffee', amount: 18500, percentage: 40, orders: 15 },
          { crop: 'Tea', amount: 13725, percentage: 30, orders: 12 },
          { crop: 'Maize', amount: 9150, percentage: 20, orders: 8 },
          { crop: 'Beans', amount: 4575, percentage: 10, orders: 3 }
        ],
        topSuppliers: [
          { 
            farmerId: 'F123',
            name: 'Green Hills Farm', 
            totalSpent: 6750, 
            orders: 15,
            location: 'Kenya'
          },
          { 
            farmerId: 'F456',
            name: 'Mountain View Estate', 
            totalSpent: 5120, 
            orders: 12,
            location: 'Uganda'
          },
          { 
            farmerId: 'F789',
            name: 'Sunrise Cooperative', 
            totalSpent: 3850, 
            orders: 10,
            location: 'Tanzania'
          }
        ]
      };

      return mockData;
    } catch (error) {
      console.error('Error fetching purchase analytics:', error);
      throw error;
    }
  },

  /**
   * Get supplier performance metrics
   * @param {object} filters - Filter options
   * @returns {Promise<object>} Supplier performance data
   */
  getSupplierPerformance: async (filters = {}) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get('/analytics/suppliers', { params: filters });

      return {
        totalSuppliers: 28,
        averageRating: 4.7,
        onTimeDeliveryRate: 94,
        suppliers: [
          {
            farmerId: 'F123',
            name: 'Green Hills Farm',
            orders: 15,
            onTimeRate: 100,
            avgQuality: 4.8,
            avgDeliveryDays: 3,
            totalPurchased: 6750,
            lastOrder: '2025-10-15'
          },
          {
            farmerId: 'F456',
            name: 'Mountain View Estate',
            orders: 12,
            onTimeRate: 100,
            avgQuality: 4.9,
            avgDeliveryDays: 2,
            totalPurchased: 5120,
            lastOrder: '2025-10-10'
          },
          {
            farmerId: 'F789',
            name: 'Sunrise Cooperative',
            orders: 10,
            onTimeRate: 90,
            avgQuality: 4.6,
            avgDeliveryDays: 4,
            totalPurchased: 3850,
            lastOrder: '2025-09-28'
          },
          {
            farmerId: 'F321',
            name: 'Valley Fresh Farms',
            orders: 8,
            onTimeRate: 87,
            avgQuality: 4.5,
            avgDeliveryDays: 5,
            totalPurchased: 2980,
            lastOrder: '2025-09-20'
          }
        ]
      };
    } catch (error) {
      console.error('Error fetching supplier performance:', error);
      throw error;
    }
  },

  /**
   * Get market price trends
   * @param {string} timeRange - Time range for trends
   * @returns {Promise<object>} Price trend data
   */
  getPriceTrends: async (timeRange = '6m') => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get('/analytics/price-trends', { params: { timeRange } });

      return {
        timeRange,
        priceHistory: [
          { 
            month: 'May 2025', 
            coffee: 4.20, 
            tea: 3.10, 
            maize: 0.80,
            beans: 1.50
          },
          { 
            month: 'Jun 2025', 
            coffee: 4.35, 
            tea: 3.15, 
            maize: 0.82,
            beans: 1.52
          },
          { 
            month: 'Jul 2025', 
            coffee: 4.50, 
            tea: 3.20, 
            maize: 0.85,
            beans: 1.55
          },
          { 
            month: 'Aug 2025', 
            coffee: 4.55, 
            tea: 3.25, 
            maize: 0.87,
            beans: 1.58
          },
          { 
            month: 'Sep 2025', 
            coffee: 4.60, 
            tea: 3.30, 
            maize: 0.90,
            beans: 1.60
          },
          { 
            month: 'Oct 2025', 
            coffee: 4.80, 
            tea: 3.20, 
            maize: 0.88,
            beans: 1.62
          }
        ],
        currentPrices: {
          coffee: 4.80,
          tea: 3.20,
          maize: 0.88,
          beans: 1.62
        },
        marketAverage: {
          coffee: 5.50,
          tea: 3.80,
          maize: 1.00,
          beans: 1.85
        },
        savings: {
          total: 6850,
          percentage: 15,
          byCrop: {
            coffee: 3150,
            tea: 2280,
            maize: 960,
            beans: 460
          }
        }
      };
    } catch (error) {
      console.error('Error fetching price trends:', error);
      throw error;
    }
  },

  /**
   * Get sustainability metrics
   * @returns {Promise<object>} Sustainability data
   */
  getSustainabilityMetrics: async () => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get('/analytics/sustainability');

      return {
        organicPercentage: 45,
        carbonOffset: 1250,
        waterSaved: 45000,
        farmersSupported: 28,
        womenFarmers: 12,
        fairTradePercentage: 60,
        localSourcing: 85,
        breakdown: {
          byMonth: [
            { month: 'May', carbonOffset: 180, waterSaved: 6500 },
            { month: 'Jun', carbonOffset: 220, waterSaved: 7800 },
            { month: 'Jul', carbonOffset: 240, waterSaved: 8200 },
            { month: 'Aug', carbonOffset: 210, waterSaved: 7500 },
            { month: 'Sep', carbonOffset: 200, waterSaved: 7200 },
            { month: 'Oct', carbonOffset: 200, waterSaved: 7800 }
          ]
        }
      };
    } catch (error) {
      console.error('Error fetching sustainability metrics:', error);
      throw error;
    }
  },

  /**
   * Get market insights and recommendations
   * @returns {Promise<object>} Market insights
   */
  getMarketInsights: async () => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get('/analytics/insights');

      return {
        recommendations: [
          {
            type: 'price_opportunity',
            title: 'Coffee prices trending down',
            description: 'Coffee prices have decreased 5% this week. Consider purchasing now.',
            priority: 'high',
            potentialSavings: 450
          },
          {
            type: 'new_supplier',
            title: 'Highly rated supplier available',
            description: 'Organic Valley Farms (rating 4.9) has new listings',
            priority: 'medium'
          },
          {
            type: 'harvest_season',
            title: 'Tea harvest season beginning',
            description: 'Peak tea season starts next week. Quality and availability will be optimal.',
            priority: 'medium'
          }
        ],
        trends: {
          priceDirection: {
            coffee: 'up',
            tea: 'stable',
            maize: 'down'
          },
          supplyLevels: {
            coffee: 'high',
            tea: 'medium',
            maize: 'high'
          }
        },
        alerts: [
          {
            type: 'warning',
            message: 'Your usual coffee supplier has limited stock',
            actionRequired: true
          }
        ]
      };
    } catch (error) {
      console.error('Error fetching market insights:', error);
      throw error;
    }
  },

  /**
   * Export analytics data
   * @param {string} format - Export format (csv, pdf, xlsx)
   * @param {object} options - Export options
   * @returns {Promise<Blob>} Exported file
   */
  exportAnalytics: async (format = 'csv', options = {}) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get('/analytics/export', { 
      //   params: { format, ...options },
      //   responseType: 'blob'
      // });

      // Generate mock CSV data
      const csvData = [
        ['Month', 'Total Spent', 'Orders', 'Average Order Value'],
        ['May 2025', '$5,200', '4', '$1,300'],
        ['Jun 2025', '$6,800', '6', '$1,133'],
        ['Jul 2025', '$8,100', '7', '$1,157'],
        ['Aug 2025', '$9,200', '8', '$1,150'],
        ['Sep 2025', '$8,650', '7', '$1,236'],
        ['Oct 2025', '$7,800', '6', '$1,300']
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvData], { type: 'text/csv' });
      return blob;
    } catch (error) {
      console.error('Error exporting analytics:', error);
      throw error;
    }
  }
};

export default analyticsService;