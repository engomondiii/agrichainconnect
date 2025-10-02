import web3Config from './web3Config';

/**
 * Contract Service
 * Handles smart contract interactions for DFFT, DFRT, Escrow, and Marketplace
 */

// Contract ABIs (simplified versions - replace with your actual ABIs)
const DFFT_ABI = [
  {
    "inputs": [{"type": "address", "name": "to"}, {"type": "uint256", "name": "amount"}],
    "name": "mint",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"type": "address", "name": "from"}, {"type": "address", "name": "to"}, {"type": "uint256", "name": "tokenId"}],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256", "name": "tokenId"}],
    "name": "getTokenMetadata",
    "outputs": [
      {"type": "string", "name": "cropType"},
      {"type": "uint256", "name": "quantity"},
      {"type": "uint256", "name": "harvestDate"},
      {"type": "address", "name": "farmer"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "address", "name": "owner"}],
    "name": "balanceOf",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "address", "name": "owner"}, {"type": "uint256", "name": "index"}],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

const DFRT_ABI = [
  {
    "inputs": [{"type": "address", "name": "to"}, {"type": "uint256", "name": "amount"}],
    "name": "mint",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"type": "address", "name": "from"}, {"type": "address", "name": "to"}, {"type": "uint256", "name": "tokenId"}],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256", "name": "tokenId"}],
    "name": "redeem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256", "name": "tokenId"}],
    "name": "getTokenMetadata",
    "outputs": [
      {"type": "string", "name": "cropType"},
      {"type": "uint256", "name": "quantity"},
      {"type": "bool", "name": "isRedeemed"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const ESCROW_ABI = [
  {
    "inputs": [
      {"type": "address", "name": "buyer"},
      {"type": "address", "name": "seller"},
      {"type": "uint256", "name": "amount"},
      {"type": "uint256", "name": "tokenId"}
    ],
    "name": "createEscrow",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256", "name": "escrowId"}],
    "name": "releasePayment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256", "name": "escrowId"}],
    "name": "refund",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256", "name": "escrowId"}],
    "name": "getEscrowDetails",
    "outputs": [
      {"type": "address", "name": "buyer"},
      {"type": "address", "name": "seller"},
      {"type": "uint256", "name": "amount"},
      {"type": "uint256", "name": "tokenId"},
      {"type": "uint8", "name": "status"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const MARKETPLACE_ABI = [
  {
    "inputs": [
      {"type": "uint256", "name": "tokenId"},
      {"type": "uint256", "name": "price"},
      {"type": "string", "name": "tokenType"}
    ],
    "name": "listToken",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256", "name": "listingId"}],
    "name": "buyToken",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256", "name": "listingId"}],
    "name": "cancelListing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveListings",
    "outputs": [{"type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  }
];

class ContractService {
  constructor() {
    this.dfftContract = null;
    this.dfrtContract = null;
    this.escrowContract = null;
    this.marketplaceContract = null;
  }

  /**
   * Initialize all contracts
   */
  async initializeContracts() {
    try {
      const web3 = web3Config.getWeb3();
      
      // Initialize DFFT contract
      const dfftAddress = web3Config.getContractAddress('DFFT_TOKEN');
      this.dfftContract = new web3.eth.Contract(DFFT_ABI, dfftAddress);

      // Initialize DFRT contract
      const dfrtAddress = web3Config.getContractAddress('DFRT_TOKEN');
      this.dfrtContract = new web3.eth.Contract(DFRT_ABI, dfrtAddress);

      // Initialize Escrow contract
      const escrowAddress = web3Config.getContractAddress('ESCROW');
      this.escrowContract = new web3.eth.Contract(ESCROW_ABI, escrowAddress);

      // Initialize Marketplace contract
      const marketplaceAddress = web3Config.getContractAddress('MARKETPLACE');
      this.marketplaceContract = new web3.eth.Contract(MARKETPLACE_ABI, marketplaceAddress);

      console.log('Contracts initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing contracts:', error);
      throw error;
    }
  }

  /**
   * DFFT Token Operations
   */

  async mintDFFT(toAddress, cropData, fromAddress) {
    try {
      if (!this.dfftContract) await this.initializeContracts();

      const web3 = web3Config.getWeb3();
      const gasPrice = await web3.eth.getGasPrice();

      // Estimate gas
      const gasEstimate = await this.dfftContract.methods
        .mint(toAddress, cropData.quantity)
        .estimateGas({ from: fromAddress });

      // Execute transaction
      const receipt = await this.dfftContract.methods
        .mint(toAddress, cropData.quantity)
        .send({
          from: fromAddress,
          gas: Math.floor(gasEstimate * 1.2), // Add 20% buffer
          gasPrice: gasPrice
        });

      return {
        success: true,
        transactionHash: receipt.transactionHash,
        tokenId: receipt.events.Transfer.returnValues.tokenId,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Error minting DFFT:', error);
      throw error;
    }
  }

  async transferDFFT(fromAddress, toAddress, tokenId, senderAddress) {
    try {
      if (!this.dfftContract) await this.initializeContracts();

      const web3 = web3Config.getWeb3();
      const gasPrice = await web3.eth.getGasPrice();

      const receipt = await this.dfftContract.methods
        .transferFrom(fromAddress, toAddress, tokenId)
        .send({
          from: senderAddress,
          gas: 100000,
          gasPrice: gasPrice
        });

      return {
        success: true,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Error transferring DFFT:', error);
      throw error;
    }
  }

  async getDFFTMetadata(tokenId) {
    try {
      if (!this.dfftContract) await this.initializeContracts();

      const metadata = await this.dfftContract.methods
        .getTokenMetadata(tokenId)
        .call();

      return {
        cropType: metadata.cropType,
        quantity: metadata.quantity,
        harvestDate: new Date(parseInt(metadata.harvestDate) * 1000),
        farmer: metadata.farmer
      };
    } catch (error) {
      console.error('Error getting DFFT metadata:', error);
      throw error;
    }
  }

  async getDFFTBalance(ownerAddress) {
    try {
      if (!this.dfftContract) await this.initializeContracts();

      const balance = await this.dfftContract.methods
        .balanceOf(ownerAddress)
        .call();

      return parseInt(balance);
    } catch (error) {
      console.error('Error getting DFFT balance:', error);
      throw error;
    }
  }

  async getDFFTTokens(ownerAddress) {
    try {
      if (!this.dfftContract) await this.initializeContracts();

      const balance = await this.getDFFTBalance(ownerAddress);
      const tokens = [];

      for (let i = 0; i < balance; i++) {
        const tokenId = await this.dfftContract.methods
          .tokenOfOwnerByIndex(ownerAddress, i)
          .call();
        
        const metadata = await this.getDFFTMetadata(tokenId);
        
        tokens.push({
          tokenId: tokenId,
          ...metadata
        });
      }

      return tokens;
    } catch (error) {
      console.error('Error getting DFFT tokens:', error);
      throw error;
    }
  }

  /**
   * DFRT Token Operations
   */

  async mintDFRT(toAddress, cropData, fromAddress) {
    try {
      if (!this.dfrtContract) await this.initializeContracts();

      const web3 = web3Config.getWeb3();
      const gasPrice = await web3.eth.getGasPrice();

      const gasEstimate = await this.dfrtContract.methods
        .mint(toAddress, cropData.quantity)
        .estimateGas({ from: fromAddress });

      const receipt = await this.dfrtContract.methods
        .mint(toAddress, cropData.quantity)
        .send({
          from: fromAddress,
          gas: Math.floor(gasEstimate * 1.2),
          gasPrice: gasPrice
        });

      return {
        success: true,
        transactionHash: receipt.transactionHash,
        tokenId: receipt.events.Transfer.returnValues.tokenId,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Error minting DFRT:', error);
      throw error;
    }
  }

  async redeemDFRT(tokenId, fromAddress) {
    try {
      if (!this.dfrtContract) await this.initializeContracts();

      const web3 = web3Config.getWeb3();
      const gasPrice = await web3.eth.getGasPrice();

      const receipt = await this.dfrtContract.methods
        .redeem(tokenId)
        .send({
          from: fromAddress,
          gas: 150000,
          gasPrice: gasPrice
        });

      return {
        success: true,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Error redeeming DFRT:', error);
      throw error;
    }
  }

  async getDFRTMetadata(tokenId) {
    try {
      if (!this.dfrtContract) await this.initializeContracts();

      const metadata = await this.dfrtContract.methods
        .getTokenMetadata(tokenId)
        .call();

      return {
        cropType: metadata.cropType,
        quantity: metadata.quantity,
        isRedeemed: metadata.isRedeemed
      };
    } catch (error) {
      console.error('Error getting DFRT metadata:', error);
      throw error;
    }
  }

  /**
   * Escrow Operations
   */

  async createEscrow(buyerAddress, sellerAddress, amount, tokenId, fromAddress) {
    try {
      if (!this.escrowContract) await this.initializeContracts();

      const web3 = web3Config.getWeb3();
      const gasPrice = await web3.eth.getGasPrice();
      const amountInWei = web3Config.toWei(amount);

      const gasEstimate = await this.escrowContract.methods
        .createEscrow(buyerAddress, sellerAddress, amountInWei, tokenId)
        .estimateGas({ from: fromAddress, value: amountInWei });

      const receipt = await this.escrowContract.methods
        .createEscrow(buyerAddress, sellerAddress, amountInWei, tokenId)
        .send({
          from: fromAddress,
          value: amountInWei,
          gas: Math.floor(gasEstimate * 1.2),
          gasPrice: gasPrice
        });

      return {
        success: true,
        transactionHash: receipt.transactionHash,
        escrowId: receipt.events.EscrowCreated.returnValues.escrowId,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Error creating escrow:', error);
      throw error;
    }
  }

  async releaseEscrowPayment(escrowId, fromAddress) {
    try {
      if (!this.escrowContract) await this.initializeContracts();

      const web3 = web3Config.getWeb3();
      const gasPrice = await web3.eth.getGasPrice();

      const receipt = await this.escrowContract.methods
        .releasePayment(escrowId)
        .send({
          from: fromAddress,
          gas: 150000,
          gasPrice: gasPrice
        });

      return {
        success: true,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Error releasing escrow payment:', error);
      throw error;
    }
  }

  async refundEscrow(escrowId, fromAddress) {
    try {
      if (!this.escrowContract) await this.initializeContracts();

      const web3 = web3Config.getWeb3();
      const gasPrice = await web3.eth.getGasPrice();

      const receipt = await this.escrowContract.methods
        .refund(escrowId)
        .send({
          from: fromAddress,
          gas: 150000,
          gasPrice: gasPrice
        });

      return {
        success: true,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Error refunding escrow:', error);
      throw error;
    }
  }

  async getEscrowDetails(escrowId) {
    try {
      if (!this.escrowContract) await this.initializeContracts();

      const details = await this.escrowContract.methods
        .getEscrowDetails(escrowId)
        .call();

      const statusMap = ['Pending', 'Completed', 'Refunded', 'Disputed'];

      return {
        buyer: details.buyer,
        seller: details.seller,
        amount: web3Config.fromWei(details.amount),
        tokenId: details.tokenId,
        status: statusMap[details.status]
      };
    } catch (error) {
      console.error('Error getting escrow details:', error);
      throw error;
    }
  }

  /**
   * Marketplace Operations
   */

  async listTokenOnMarketplace(tokenId, price, tokenType, fromAddress) {
    try {
      if (!this.marketplaceContract) await this.initializeContracts();

      const web3 = web3Config.getWeb3();
      const gasPrice = await web3.eth.getGasPrice();
      const priceInWei = web3Config.toWei(price);

      const gasEstimate = await this.marketplaceContract.methods
        .listToken(tokenId, priceInWei, tokenType)
        .estimateGas({ from: fromAddress });

      const receipt = await this.marketplaceContract.methods
        .listToken(tokenId, priceInWei, tokenType)
        .send({
          from: fromAddress,
          gas: Math.floor(gasEstimate * 1.2),
          gasPrice: gasPrice
        });

      return {
        success: true,
        transactionHash: receipt.transactionHash,
        listingId: receipt.events.TokenListed.returnValues.listingId,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Error listing token:', error);
      throw error;
    }
  }

  async buyTokenFromMarketplace(listingId, price, fromAddress) {
    try {
      if (!this.marketplaceContract) await this.initializeContracts();

      const web3 = web3Config.getWeb3();
      const gasPrice = await web3.eth.getGasPrice();
      const priceInWei = web3Config.toWei(price);

      const gasEstimate = await this.marketplaceContract.methods
        .buyToken(listingId)
        .estimateGas({ from: fromAddress, value: priceInWei });

      const receipt = await this.marketplaceContract.methods
        .buyToken(listingId)
        .send({
          from: fromAddress,
          value: priceInWei,
          gas: Math.floor(gasEstimate * 1.2),
          gasPrice: gasPrice
        });

      return {
        success: true,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Error buying token:', error);
      throw error;
    }
  }

  async cancelMarketplaceListing(listingId, fromAddress) {
    try {
      if (!this.marketplaceContract) await this.initializeContracts();

      const web3 = web3Config.getWeb3();
      const gasPrice = await web3.eth.getGasPrice();

      const receipt = await this.marketplaceContract.methods
        .cancelListing(listingId)
        .send({
          from: fromAddress,
          gas: 100000,
          gasPrice: gasPrice
        });

      return {
        success: true,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Error canceling listing:', error);
      throw error;
    }
  }

  async getActiveMarketplaceListings() {
    try {
      if (!this.marketplaceContract) await this.initializeContracts();

      const listingIds = await this.marketplaceContract.methods
        .getActiveListings()
        .call();

      return listingIds.map(id => parseInt(id));
    } catch (error) {
      console.error('Error getting active listings:', error);
      throw error;
    }
  }

  /**
   * Utility Methods
   */

  async waitForTransactionReceipt(transactionHash) {
    try {
      const web3 = web3Config.getWeb3();
      let receipt = null;
      let attempts = 0;
      const maxAttempts = 60; // Wait up to 60 seconds

      while (receipt === null && attempts < maxAttempts) {
        receipt = await web3.eth.getTransactionReceipt(transactionHash);
        
        if (receipt === null) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          attempts++;
        }
      }

      if (receipt === null) {
        throw new Error('Transaction receipt not found after maximum attempts');
      }

      return receipt;
    } catch (error) {
      console.error('Error waiting for transaction receipt:', error);
      throw error;
    }
  }

  async getTransactionStatus(transactionHash) {
    try {
      const web3 = web3Config.getWeb3();
      const receipt = await web3.eth.getTransactionReceipt(transactionHash);

      if (!receipt) {
        return { status: 'pending' };
      }

      return {
        status: receipt.status ? 'success' : 'failed',
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed
      };
    } catch (error) {
      console.error('Error getting transaction status:', error);
      throw error;
    }
  }

  getContractAddress(contractName) {
    return web3Config.getContractAddress(contractName);
  }

  getExplorerUrl(transactionHash) {
    const network = web3Config.getCurrentNetwork();
    if (!network) return null;
    return `${network.blockExplorer}/tx/${transactionHash}`;
  }
}

// Create singleton instance
const contractService = new ContractService();

export default contractService;