import apiClient from './apiClient';

/**
 * Loan Service
 * Handles all loan-related API calls
 * NOTE: This is a prototype implementation for demonstration purposes
 */

const loanService = {
  /**
   * Calculate loan eligibility based on trust score and farm history
   * @param {number} trustScore - Farmer's trust score (0-1000)
   * @param {object} farmData - Additional farm data
   * @returns {Promise<object>} Eligibility details
   */
  checkEligibility: async (trustScore, farmData = {}) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.post('/loans/eligibility', { trustScore, farmData });
      
      // Simulated eligibility calculation
      const isEligible = trustScore >= 400;
      const maxLoanAmount = calculateMaxLoan(trustScore, farmData);
      const interestRate = calculateInterestRate(trustScore);
      
      return {
        eligible: isEligible,
        maxLoanAmount,
        interestRate,
        minTrustScore: 400,
        reason: isEligible 
          ? 'You meet the minimum requirements for a loan' 
          : 'Your trust score is below the minimum required (400)',
        terms: {
          minAmount: 100,
          maxAmount: maxLoanAmount,
          minDuration: 3, // months
          maxDuration: 24, // months
          interestRate,
          processingFee: 0.02 // 2% of loan amount
        }
      };
    } catch (error) {
      console.error('Error checking loan eligibility:', error);
      throw error;
    }
  },

  /**
   * Apply for a new loan
   * @param {object} loanApplication - Loan application data
   * @returns {Promise<object>} Application result
   */
  applyForLoan: async (loanApplication) => {
    try {
      // Validate application data
      validateLoanApplication(loanApplication);

      // Mock implementation - replace with actual API call
      // const response = await apiClient.post('/loans/apply', loanApplication);

      // Simulated application submission
      const applicationId = generateApplicationId();
      const estimatedApprovalDate = new Date();
      estimatedApprovalDate.setDate(estimatedApprovalDate.getDate() + 3); // 3 days

      return {
        success: true,
        applicationId,
        status: 'pending_review',
        submittedAt: new Date().toISOString(),
        estimatedApprovalDate: estimatedApprovalDate.toISOString(),
        message: 'Your loan application has been submitted successfully',
        nextSteps: [
          'Document verification (1-2 days)',
          'Credit assessment (1 day)',
          'Final approval (1 day)',
          'Funds disbursement (same day after approval)'
        ]
      };
    } catch (error) {
      console.error('Error applying for loan:', error);
      throw error;
    }
  },

  /**
   * Get loan application status
   * @param {string} applicationId - Application ID
   * @returns {Promise<object>} Application status
   */
  getLoanStatus: async (applicationId) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get(`/loans/applications/${applicationId}`);

      // Simulated loan status
      return {
        applicationId,
        status: 'approved', // pending_review, under_review, approved, rejected, disbursed
        submittedAt: '2025-10-01T10:00:00Z',
        updatedAt: '2025-10-03T15:30:00Z',
        amount: 5000,
        interestRate: 6.5,
        duration: 12, // months
        purpose: 'Farm equipment purchase',
        collateral: 'Future harvest (DFFT tokens)',
        documents: [
          { name: 'Farm Registration', status: 'verified' },
          { name: 'National ID', status: 'verified' },
          { name: 'Bank Statement', status: 'verified' }
        ],
        timeline: [
          { 
            stage: 'Application Submitted', 
            date: '2025-10-01T10:00:00Z', 
            status: 'completed',
            description: 'Your application was successfully submitted'
          },
          { 
            stage: 'Document Verification', 
            date: '2025-10-02T14:30:00Z', 
            status: 'completed',
            description: 'All documents have been verified'
          },
          { 
            stage: 'Credit Assessment', 
            date: '2025-10-03T11:00:00Z', 
            status: 'completed',
            description: 'Credit assessment completed successfully'
          },
          { 
            stage: 'Final Approval', 
            date: '2025-10-03T15:30:00Z', 
            status: 'completed',
            description: 'Loan approved by credit committee'
          },
          { 
            stage: 'Funds Disbursement', 
            date: null, 
            status: 'pending',
            description: 'Funds will be transferred to your account within 24 hours'
          }
        ],
        approvalDetails: {
          approvedAmount: 5000,
          monthlyPayment: 441.58,
          totalRepayment: 5299.00,
          firstPaymentDate: '2025-11-03'
        }
      };
    } catch (error) {
      console.error('Error fetching loan status:', error);
      throw error;
    }
  },

  /**
   * Get all loans for current user
   * @param {object} filters - Filter options (status, sortBy, etc.)
   * @returns {Promise<Array>} List of loans
   */
  getUserLoans: async (filters = {}) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get('/loans/my-loans', { params: filters });

      // Simulated user loans
      return [
        {
          loanId: 'LN-2025-001',
          amount: 3000,
          interestRate: 7.0,
          duration: 12,
          status: 'active',
          disbursedAt: '2025-08-15T10:00:00Z',
          monthlyPayment: 265.48,
          totalRepayment: 3185.76,
          amountPaid: 796.44, // 3 payments made
          remainingBalance: 2389.32,
          nextPaymentDate: '2025-11-15',
          nextPaymentAmount: 265.48,
          paymentsCompleted: 3,
          paymentsRemaining: 9,
          collateral: {
            type: 'DFFT',
            cropType: 'Coffee',
            quantity: 500,
            estimatedValue: 4500
          }
        },
        {
          loanId: 'LN-2025-045',
          amount: 5000,
          interestRate: 6.5,
          duration: 12,
          status: 'approved',
          approvedAt: '2025-10-03T15:30:00Z',
          monthlyPayment: 441.58,
          totalRepayment: 5299.00,
          disbursementDate: '2025-10-05',
          firstPaymentDate: '2025-11-05'
        }
      ];
    } catch (error) {
      console.error('Error fetching user loans:', error);
      throw error;
    }
  },

  /**
   * Get loan repayment schedule
   * @param {string} loanId - Loan ID
   * @returns {Promise<object>} Repayment schedule
   */
  getRepaymentSchedule: async (loanId) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get(`/loans/${loanId}/schedule`);

      // Simulated repayment schedule
      const schedule = generateRepaymentSchedule(3000, 7.0, 12);

      return {
        loanId,
        amount: 3000,
        interestRate: 7.0,
        duration: 12,
        monthlyPayment: 265.48,
        totalRepayment: 3185.76,
        totalInterest: 185.76,
        schedule
      };
    } catch (error) {
      console.error('Error fetching repayment schedule:', error);
      throw error;
    }
  },

  /**
   * Make a loan payment
   * @param {string} loanId - Loan ID
   * @param {number} amount - Payment amount
   * @param {string} paymentMethod - Payment method
   * @returns {Promise<object>} Payment confirmation
   */
  makePayment: async (loanId, amount, paymentMethod = 'mobile_money') => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.post(`/loans/${loanId}/payments`, { amount, paymentMethod });

      const paymentId = generatePaymentId();
      
      return {
        success: true,
        paymentId,
        loanId,
        amount,
        paymentMethod,
        processedAt: new Date().toISOString(),
        newBalance: 2123.84, // Simulated new balance
        nextPaymentDate: '2025-12-15',
        nextPaymentAmount: 265.48,
        message: 'Payment processed successfully',
        receiptUrl: `/receipts/${paymentId}`
      };
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  },

  /**
   * Request loan restructuring
   * @param {string} loanId - Loan ID
   * @param {object} restructureRequest - Restructuring details
   * @returns {Promise<object>} Restructure request result
   */
  requestRestructure: async (loanId, restructureRequest) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.post(`/loans/${loanId}/restructure`, restructureRequest);

      return {
        success: true,
        requestId: generateApplicationId(),
        loanId,
        requestedChanges: restructureRequest,
        status: 'pending_review',
        submittedAt: new Date().toISOString(),
        estimatedResponseTime: '3-5 business days',
        message: 'Your restructuring request has been submitted for review'
      };
    } catch (error) {
      console.error('Error requesting loan restructure:', error);
      throw error;
    }
  },

  /**
   * Get loan payment history
   * @param {string} loanId - Loan ID
   * @returns {Promise<Array>} Payment history
   */
  getPaymentHistory: async (loanId) => {
    try {
      // Mock implementation - replace with actual API call
      // const response = await apiClient.get(`/loans/${loanId}/payments`);

      // Simulated payment history
      return [
        {
          paymentId: 'PAY-2025-001',
          amount: 265.48,
          principal: 247.98,
          interest: 17.50,
          date: '2025-09-15T10:30:00Z',
          method: 'mobile_money',
          status: 'completed',
          balanceAfter: 2752.02
        },
        {
          paymentId: 'PAY-2025-015',
          amount: 265.48,
          principal: 249.44,
          interest: 16.04,
          date: '2025-10-15T09:15:00Z',
          method: 'mobile_money',
          status: 'completed',
          balanceAfter: 2502.58
        },
        {
          paymentId: 'PAY-2025-032',
          amount: 265.48,
          principal: 250.92,
          interest: 14.56,
          date: '2025-11-15T14:20:00Z',
          method: 'bank_transfer',
          status: 'completed',
          balanceAfter: 2251.66
        }
      ];
    } catch (error) {
      console.error('Error fetching payment history:', error);
      throw error;
    }
  },

  /**
   * Calculate loan estimates
   * @param {number} amount - Loan amount
   * @param {number} duration - Loan duration in months
   * @param {number} interestRate - Annual interest rate
   * @returns {object} Loan calculations
   */
  calculateLoan: (amount, duration, interestRate) => {
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, duration)) / 
                          (Math.pow(1 + monthlyRate, duration) - 1);
    const totalRepayment = monthlyPayment * duration;
    const totalInterest = totalRepayment - amount;
    const processingFee = amount * 0.02;

    return {
      loanAmount: amount,
      duration,
      interestRate,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalRepayment: Math.round(totalRepayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      processingFee: Math.round(processingFee * 100) / 100,
      totalCost: Math.round((totalRepayment + processingFee) * 100) / 100
    };
  }
};

// Helper Functions

/**
 * Calculate maximum loan amount based on trust score and farm data
 */
function calculateMaxLoan(trustScore, farmData) {
  const baseLoan = 1000;
  const scoreMultiplier = (trustScore / 1000) * 10; // 0-10x multiplier
  const farmMultiplier = farmData.farmSize ? Math.min(farmData.farmSize / 2, 5) : 1;
  
  const maxLoan = baseLoan * scoreMultiplier * farmMultiplier;
  return Math.min(Math.round(maxLoan / 100) * 100, 50000); // Round to nearest 100, max 50k
}

/**
 * Calculate interest rate based on trust score
 */
function calculateInterestRate(trustScore) {
  // Higher trust score = lower interest rate
  // Range: 3% (score 900+) to 10% (score 400)
  if (trustScore >= 900) return 3.0;
  if (trustScore >= 800) return 4.0;
  if (trustScore >= 700) return 5.0;
  if (trustScore >= 600) return 6.5;
  if (trustScore >= 500) return 7.5;
  if (trustScore >= 400) return 8.5;
  return 10.0;
}

/**
 * Validate loan application data
 */
function validateLoanApplication(application) {
  const required = ['amount', 'duration', 'purpose', 'collateral'];
  const missing = required.filter(field => !application[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }

  if (application.amount < 100) {
    throw new Error('Minimum loan amount is $100');
  }

  if (application.duration < 3 || application.duration > 24) {
    throw new Error('Loan duration must be between 3 and 24 months');
  }

  return true;
}

/**
 * Generate unique application ID
 */
function generateApplicationId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `APP-${timestamp}-${random}`.toUpperCase();
}

/**
 * Generate unique payment ID
 */
function generatePaymentId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `PAY-${timestamp}-${random}`.toUpperCase();
}

/**
 * Generate repayment schedule
 */
function generateRepaymentSchedule(amount, interestRate, duration) {
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, duration)) / 
                        (Math.pow(1 + monthlyRate, duration) - 1);
  
  let balance = amount;
  const schedule = [];
  const startDate = new Date();

  for (let i = 1; i <= duration; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;

    const paymentDate = new Date(startDate);
    paymentDate.setMonth(paymentDate.getMonth() + i);

    schedule.push({
      installmentNumber: i,
      dueDate: paymentDate.toISOString().split('T')[0],
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principal * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(Math.max(balance, 0) * 100) / 100,
      status: i <= 3 ? 'paid' : 'pending' // First 3 payments marked as paid for demo
    });
  }

  return schedule;
}

export default loanService;