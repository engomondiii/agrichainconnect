import web3Config from './web3Config';

/**
 * Wallet Service
 * Handles wallet connection, balance checking, and transaction signing
 */

class WalletService {
  constructor() {
    this.account = null;
    this.balance = null;
    this.isConnected = false;
    this.walletType = null; // 'metamask', 'walletconnect', etc.
  }

  /**
   * Connect wallet (MetaMask or other Web3 providers)
   */
  async connectWallet() {
    try {
      const web3 = web3Config.getWeb3();
      const provider = web3Config.getProvider();

      if (!provider) {
        throw new Error('No Web3 provider found. Please install MetaMask.');
      }

      // Request account access
      const accounts = await provider.request({ 
        method: 'eth_requestAccounts' 
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please unlock your wallet.');
      }

      this.account = accounts[0];
      this.isConnected = true;
      this.walletType = this.detectWalletType(provider);

      // Get initial balance
      await this.updateBalance();

      // Set up event listeners
      this.setupWalletEventListeners();

      console.log('Wallet connected:', this.account);

      return {
        success: true,
        account: this.account,
        walletType: this.walletType,
        balance: this.balance
      };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      
      // Handle specific errors
      if (error.code === 4001) {
        throw new Error('User rejected the connection request.');
      } else if (error.code === -32002) {
        throw new Error('Connection request already pending. Please check your wallet.');
      }
      
      throw error;
    }
  }

  /**
   * Disconnect wallet
   */
  async disconnectWallet() {
    try {
      this.account = null;
      this.balance = null;
      this.isConnected = false;
      this.walletType = null;

      console.log('Wallet disconnected');

      return {
        success: true,
        message: 'Wallet disconnected successfully'
      };
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      throw error;
    }
  }

  /**
   * Check if wallet is connected
   */
  async checkConnection() {
    try {
      const web3 = web3Config.getWeb3();
      const accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        this.account = accounts[0];
        this.isConnected = true;
        await this.updateBalance();
        return true;
      }

      this.isConnected = false;
      return false;
    } catch (error) {
      console.error('Error checking connection:', error);
      this.isConnected = false;
      return false;
    }
  }

  /**
   * Get current account
   */
  getAccount() {
    return this.account;
  }

  /**
   * Get account balance
   */
  async getBalance(address = null) {
    try {
      const web3 = web3Config.getWeb3();
      const targetAddress = address || this.account;

      if (!targetAddress) {
        throw new Error('No address provided and no wallet connected');
      }

      const balanceWei = await web3.eth.getBalance(targetAddress);
      const balanceEth = web3Config.fromWei(balanceWei);

      return {
        wei: balanceWei,
        eth: balanceEth,
        formatted: `${parseFloat(balanceEth).toFixed(4)} ${web3Config.getCurrentNetwork()?.nativeCurrency?.symbol || 'ETH'}`
      };
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  /**
   * Update stored balance
   */
  async updateBalance() {
    try {
      const balance = await this.getBalance();
      this.balance = balance;
      return balance;
    } catch (error) {
      console.error('Error updating balance:', error);
      throw error;
    }
  }

  /**
   * Sign message
   */
  async signMessage(message) {
    try {
      if (!this.isConnected) {
        throw new Error('Wallet not connected');
      }

      const web3 = web3Config.getWeb3();
      const signature = await web3.eth.personal.sign(
        message,
        this.account,
        '' // Password (not needed for MetaMask)
      );

      return {
        success: true,
        signature: signature,
        message: message,
        signer: this.account
      };
    } catch (error) {
      console.error('Error signing message:', error);
      
      if (error.code === 4001) {
        throw new Error('User rejected the signature request.');
      }
      
      throw error;
    }
  }

  /**
   * Verify signed message
   */
  async verifySignature(message, signature) {
    try {
      const web3 = web3Config.getWeb3();
      const recoveredAddress = await web3.eth.personal.ecRecover(message, signature);

      return {
        isValid: recoveredAddress.toLowerCase() === this.account.toLowerCase(),
        recoveredAddress: recoveredAddress,
        expectedAddress: this.account
      };
    } catch (error) {
      console.error('Error verifying signature:', error);
      throw error;
    }
  }

  /**
   * Send transaction
   */
  async sendTransaction(to, amount, data = null) {
    try {
      if (!this.isConnected) {
        throw new Error('Wallet not connected');
      }

      const web3 = web3Config.getWeb3();
      const amountWei = web3Config.toWei(amount);

      // Build transaction object
      const transaction = {
        from: this.account,
        to: to,
        value: amountWei,
        gas: 21000 // Default for simple transfers
      };

      // Add data if provided
      if (data) {
        transaction.data = data;
        // Estimate gas for contract interaction
        transaction.gas = await web3.eth.estimateGas(transaction);
      }

      // Get gas price
      const gasPrice = await web3.eth.getGasPrice();
      transaction.gasPrice = gasPrice;

      // Send transaction
      const receipt = await web3.eth.sendTransaction(transaction);

      // Update balance after transaction
      await this.updateBalance();

      return {
        success: true,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed
      };
    } catch (error) {
      console.error('Error sending transaction:', error);
      
      if (error.code === 4001) {
        throw new Error('User rejected the transaction.');
      }
      
      throw error;
    }
  }

  /**
   * Estimate transaction fee
   */
  async estimateTransactionFee(to, amount, data = null) {
    try {
      const web3 = web3Config.getWeb3();
      const amountWei = web3Config.toWei(amount);

      const transaction = {
        from: this.account,
        to: to,
        value: amountWei
      };

      if (data) {
        transaction.data = data;
      }

      // Estimate gas
      const gasEstimate = await web3.eth.estimateGas(transaction);
      
      // Get gas price
      const gasPrice = await web3.eth.getGasPrice();

      // Calculate total fee
      const feeWei = BigInt(gasEstimate) * BigInt(gasPrice);
      const feeEth = web3Config.fromWei(feeWei.toString());

      return {
        gasEstimate: gasEstimate.toString(),
        gasPrice: gasPrice.toString(),
        gasPriceGwei: web3Config.fromWei(gasPrice, 'gwei'),
        totalFeeWei: feeWei.toString(),
        totalFeeEth: feeEth,
        formatted: `${parseFloat(feeEth).toFixed(6)} ${web3Config.getCurrentNetwork()?.nativeCurrency?.symbol || 'ETH'}`
      };
    } catch (error) {
      console.error('Error estimating transaction fee:', error);
      throw error;
    }
  }

  /**
   * Add token to wallet (MetaMask)
   */
  async addTokenToWallet(tokenAddress, tokenSymbol, tokenDecimals, tokenImage) {
    try {
      const provider = web3Config.getProvider();

      if (!provider || !provider.request) {
        throw new Error('Provider does not support token addition');
      }

      const wasAdded = await provider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage
          }
        }
      });

      return {
        success: wasAdded,
        message: wasAdded ? 'Token added successfully' : 'Token addition cancelled'
      };
    } catch (error) {
      console.error('Error adding token to wallet:', error);
      throw error;
    }
  }

  /**
   * Switch network
   */
  async switchNetwork(network) {
    try {
      await web3Config.switchNetwork(network);
      
      // Update balance after network switch
      if (this.isConnected) {
        await this.updateBalance();
      }

      return {
        success: true,
        network: network.name
      };
    } catch (error) {
      console.error('Error switching network:', error);
      throw error;
    }
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(startBlock = 0, endBlock = 'latest') {
    try {
      if (!this.account) {
        throw new Error('No account connected');
      }

      const web3 = web3Config.getWeb3();
      const currentBlock = await web3.eth.getBlockNumber();
      
      // Note: This is a simplified version
      // In production, you'd want to use a service like Etherscan API
      const transactions = [];
      const fromBlock = Math.max(0, currentBlock - 1000); // Last 1000 blocks

      // Get sent transactions
      const sentTxs = await web3.eth.getPastLogs({
        fromBlock: fromBlock,
        toBlock: 'latest',
        topics: [
          web3.utils.sha3('Transfer(address,address,uint256)'),
          web3.utils.padLeft(this.account, 64)
        ]
      });

      // Get received transactions
      const receivedTxs = await web3.eth.getPastLogs({
        fromBlock: fromBlock,
        toBlock: 'latest',
        topics: [
          web3.utils.sha3('Transfer(address,address,uint256)'),
          null,
          web3.utils.padLeft(this.account, 64)
        ]
      });

      // Combine and format
      [...sentTxs, ...receivedTxs].forEach(log => {
        transactions.push({
          transactionHash: log.transactionHash,
          blockNumber: log.blockNumber,
          type: log.topics[1] === web3.utils.padLeft(this.account, 64) ? 'sent' : 'received'
        });
      });

      return transactions;
    } catch (error) {
      console.error('Error getting transaction history:', error);
      throw error;
    }
  }

  /**
   * Export private key (WARNING: Use with caution)
   */
  async exportPrivateKey() {
    try {
      // Note: This should only be used for development/testing
      // MetaMask doesn't allow exporting private keys programmatically
      throw new Error('Private key export is not supported for security reasons');
    } catch (error) {
      console.error('Error exporting private key:', error);
      throw error;
    }
  }

  /**
   * Setup wallet event listeners
   */
  setupWalletEventListeners() {
    // Listen for account changes
    window.addEventListener('accountsChanged', (event) => {
      const accounts = event.detail;
      if (accounts.length > 0) {
        this.account = accounts[0];
        this.updateBalance();
        console.log('Account changed to:', this.account);
      } else {
        this.disconnectWallet();
      }
    });

    // Listen for chain changes
    window.addEventListener('chainChanged', () => {
      if (this.isConnected) {
        this.updateBalance();
      }
    });

    // Listen for disconnection
    window.addEventListener('providerDisconnected', () => {
      this.disconnectWallet();
    });
  }

  /**
   * Detect wallet type
   */
  detectWalletType(provider) {
    if (provider.isMetaMask) return 'metamask';
    if (provider.isCoinbaseWallet) return 'coinbase';
    if (provider.isWalletConnect) return 'walletconnect';
    if (provider.isTrust) return 'trust';
    return 'unknown';
  }

  /**
   * Format address for display
   */
  formatAddress(address = null, startLength = 6, endLength = 4) {
    const addr = address || this.account;
    if (!addr) return '';
    
    return `${addr.substring(0, startLength)}...${addr.substring(addr.length - endLength)}`;
  }

  /**
   * Check if address is valid
   */
  isValidAddress(address) {
    return web3Config.isValidAddress(address);
  }

  /**
   * Get wallet info
   */
  getWalletInfo() {
    return {
      account: this.account,
      formattedAccount: this.formatAddress(),
      balance: this.balance,
      isConnected: this.isConnected,
      walletType: this.walletType,
      network: web3Config.getCurrentNetwork()
    };
  }

  /**
   * Request signature for typed data (EIP-712)
   */
  async signTypedData(domain, types, value) {
    try {
      if (!this.isConnected) {
        throw new Error('Wallet not connected');
      }

      const provider = web3Config.getProvider();

      if (!provider || !provider.request) {
        throw new Error('Provider does not support typed data signing');
      }

      const typedData = {
        domain,
        types,
        primaryType: Object.keys(types)[0],
        message: value
      };

      const signature = await provider.request({
        method: 'eth_signTypedData_v4',
        params: [this.account, JSON.stringify(typedData)]
      });

      return {
        success: true,
        signature: signature,
        typedData: typedData,
        signer: this.account
      };
    } catch (error) {
      console.error('Error signing typed data:', error);
      
      if (error.code === 4001) {
        throw new Error('User rejected the signature request.');
      }
      
      throw error;
    }
  }
}

// Create singleton instance
const walletService = new WalletService();

export default walletService;