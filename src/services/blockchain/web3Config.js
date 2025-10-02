import Web3 from 'web3';

/**
 * Web3 Configuration Service
 * Handles Web3 initialization, network configuration, and provider setup
 */

// Network configurations
export const NETWORKS = {
  MAINNET: {
    chainId: '0x1',
    chainIdDecimal: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
    blockExplorer: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  SEPOLIA: {
    chainId: '0xaa36a7',
    chainIdDecimal: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
    blockExplorer: 'https://sepolia.etherscan.io',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'SepoliaETH',
      decimals: 18
    }
  },
  POLYGON: {
    chainId: '0x89',
    chainIdDecimal: 137,
    name: 'Polygon Mainnet',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    }
  },
  POLYGON_MUMBAI: {
    chainId: '0x13881',
    chainIdDecimal: 80001,
    name: 'Polygon Mumbai Testnet',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    blockExplorer: 'https://mumbai.polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    }
  },
  LOCALHOST: {
    chainId: '0x539',
    chainIdDecimal: 1337,
    name: 'Localhost',
    rpcUrl: 'http://127.0.0.1:8545',
    blockExplorer: 'http://localhost',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  }
};

// Default network (change based on environment)
export const DEFAULT_NETWORK = process.env.NODE_ENV === 'production' 
  ? NETWORKS.POLYGON 
  : NETWORKS.POLYGON_MUMBAI;

// Contract addresses (update with your deployed contract addresses)
export const CONTRACT_ADDRESSES = {
  DFFT_TOKEN: {
    [NETWORKS.POLYGON.chainIdDecimal]: '0x0000000000000000000000000000000000000000',
    [NETWORKS.POLYGON_MUMBAI.chainIdDecimal]: '0x0000000000000000000000000000000000000000',
    [NETWORKS.LOCALHOST.chainIdDecimal]: '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  },
  DFRT_TOKEN: {
    [NETWORKS.POLYGON.chainIdDecimal]: '0x0000000000000000000000000000000000000000',
    [NETWORKS.POLYGON_MUMBAI.chainIdDecimal]: '0x0000000000000000000000000000000000000000',
    [NETWORKS.LOCALHOST.chainIdDecimal]: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
  },
  ESCROW: {
    [NETWORKS.POLYGON.chainIdDecimal]: '0x0000000000000000000000000000000000000000',
    [NETWORKS.POLYGON_MUMBAI.chainIdDecimal]: '0x0000000000000000000000000000000000000000',
    [NETWORKS.LOCALHOST.chainIdDecimal]: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
  },
  MARKETPLACE: {
    [NETWORKS.POLYGON.chainIdDecimal]: '0x0000000000000000000000000000000000000000',
    [NETWORKS.POLYGON_MUMBAI.chainIdDecimal]: '0x0000000000000000000000000000000000000000',
    [NETWORKS.LOCALHOST.chainIdDecimal]: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'
  }
};

class Web3Config {
  constructor() {
    this.web3 = null;
    this.provider = null;
    this.currentNetwork = null;
    this.isInitialized = false;
  }

  /**
   * Initialize Web3 with the appropriate provider
   */
  async initialize() {
    try {
      // Check if MetaMask or other Web3 provider is installed
      if (window.ethereum) {
        this.provider = window.ethereum;
        this.web3 = new Web3(window.ethereum);
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Get current network
        const chainId = await this.web3.eth.getChainId();
        this.currentNetwork = this.getNetworkByChainId(chainId);
        
        this.isInitialized = true;
        console.log('Web3 initialized successfully');
        return this.web3;
      } else if (window.web3) {
        // Legacy dapp browsers
        this.provider = window.web3.currentProvider;
        this.web3 = new Web3(window.web3.currentProvider);
        this.isInitialized = true;
        return this.web3;
      } else {
        // No Web3 provider found, use fallback
        console.warn('No Web3 provider found. Using fallback provider.');
        this.web3 = new Web3(new Web3.providers.HttpProvider(DEFAULT_NETWORK.rpcUrl));
        this.currentNetwork = DEFAULT_NETWORK;
        this.isInitialized = true;
        return this.web3;
      }
    } catch (error) {
      console.error('Error initializing Web3:', error);
      throw error;
    }
  }

  /**
   * Set up event listeners for provider events
   */
  setupEventListeners() {
    if (!this.provider || !this.provider.on) return;

    // Account changed
    this.provider.on('accountsChanged', (accounts) => {
      console.log('Accounts changed:', accounts);
      window.dispatchEvent(new CustomEvent('accountsChanged', { detail: accounts }));
      
      // Reload page if no accounts
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
      }
    });

    // Chain changed
    this.provider.on('chainChanged', (chainId) => {
      console.log('Chain changed:', chainId);
      const chainIdDecimal = parseInt(chainId, 16);
      this.currentNetwork = this.getNetworkByChainId(chainIdDecimal);
      window.dispatchEvent(new CustomEvent('chainChanged', { detail: chainIdDecimal }));
      
      // Reload page on chain change (recommended by MetaMask)
      window.location.reload();
    });

    // Connection
    this.provider.on('connect', (info) => {
      console.log('Connected to provider:', info);
      window.dispatchEvent(new CustomEvent('providerConnected', { detail: info }));
    });

    // Disconnection
    this.provider.on('disconnect', (error) => {
      console.log('Disconnected from provider:', error);
      window.dispatchEvent(new CustomEvent('providerDisconnected', { detail: error }));
    });
  }

  /**
   * Get network configuration by chain ID
   */
  getNetworkByChainId(chainId) {
    return Object.values(NETWORKS).find(
      network => network.chainIdDecimal === chainId
    ) || null;
  }

  /**
   * Get current Web3 instance
   */
  getWeb3() {
    if (!this.isInitialized) {
      throw new Error('Web3 not initialized. Call initialize() first.');
    }
    return this.web3;
  }

  /**
   * Get current provider
   */
  getProvider() {
    return this.provider;
  }

  /**
   * Get current network
   */
  getCurrentNetwork() {
    return this.currentNetwork;
  }

  /**
   * Check if connected to the correct network
   */
  async isCorrectNetwork() {
    if (!this.web3) return false;
    
    try {
      const chainId = await this.web3.eth.getChainId();
      return chainId === DEFAULT_NETWORK.chainIdDecimal;
    } catch (error) {
      console.error('Error checking network:', error);
      return false;
    }
  }

  /**
   * Switch to a specific network
   */
  async switchNetwork(network) {
    if (!this.provider || !this.provider.request) {
      throw new Error('Provider does not support network switching');
    }

    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.chainId }],
      });
      
      this.currentNetwork = network;
      return true;
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        try {
          await this.provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: network.chainId,
                chainName: network.name,
                rpcUrls: [network.rpcUrl],
                nativeCurrency: network.nativeCurrency,
                blockExplorerUrls: [network.blockExplorer]
              }
            ],
          });
          
          this.currentNetwork = network;
          return true;
        } catch (addError) {
          console.error('Error adding network:', addError);
          throw addError;
        }
      }
      console.error('Error switching network:', error);
      throw error;
    }
  }

  /**
   * Get contract address for current network
   */
  getContractAddress(contractName) {
    if (!this.currentNetwork) {
      throw new Error('Network not initialized');
    }

    const addresses = CONTRACT_ADDRESSES[contractName];
    if (!addresses) {
      throw new Error(`Contract ${contractName} not found`);
    }

    const address = addresses[this.currentNetwork.chainIdDecimal];
    if (!address || address === '0x0000000000000000000000000000000000000000') {
      throw new Error(
        `Contract ${contractName} not deployed on ${this.currentNetwork.name}`
      );
    }

    return address;
  }

  /**
   * Convert value to Wei
   */
  toWei(value, unit = 'ether') {
    return this.web3.utils.toWei(value.toString(), unit);
  }

  /**
   * Convert value from Wei
   */
  fromWei(value, unit = 'ether') {
    return this.web3.utils.fromWei(value.toString(), unit);
  }

  /**
   * Check if address is valid
   */
  isValidAddress(address) {
    return this.web3.utils.isAddress(address);
  }

  /**
   * Get block number
   */
  async getBlockNumber() {
    return await this.web3.eth.getBlockNumber();
  }

  /**
   * Get gas price
   */
  async getGasPrice() {
    return await this.web3.eth.getGasPrice();
  }

  /**
   * Estimate gas for transaction
   */
  async estimateGas(transaction) {
    return await this.web3.eth.estimateGas(transaction);
  }
}

// Create singleton instance
const web3Config = new Web3Config();

export default web3Config;