import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CropCard from '../../components/marketplace/CropCard/CropCard';
import CropFilter from '../../components/marketplace/CropFilter/CropFilter';
import CropDetails from '../../components/marketplace/CropDetails/CropDetails';
import PurchaseModal from '../../components/marketplace/PurchaseModal/PurchaseModal';
import { searchCrops, addToWishlist, removeFromWishlist } from '../../services/api/marketplaceService';
import './Marketplace.css';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    cropType: searchParams.get('type') || '',
    location: searchParams.get('location') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minTrustScore: parseInt(searchParams.get('minTrust') || '0'),
    tokenType: searchParams.get('tokenType') || '',
    organic: searchParams.get('organic') === 'true',
    certified: searchParams.get('certified') === 'true',
    sortBy: searchParams.get('sort') || 'newest',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({
    currentPage: parseInt(searchParams.get('page') || '1'),
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseCrop, setPurchaseCrop] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch crops on mount and when filters change
  useEffect(() => {
    fetchCrops();
  }, [filters, pagination.currentPage, searchQuery]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (filters.cropType) params.set('type', filters.cropType);
    if (filters.location) params.set('location', filters.location);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minTrustScore > 0) params.set('minTrust', filters.minTrustScore.toString());
    if (filters.tokenType) params.set('tokenType', filters.tokenType);
    if (filters.organic) params.set('organic', 'true');
    if (filters.certified) params.set('certified', 'true');
    if (filters.sortBy) params.set('sort', filters.sortBy);
    if (pagination.currentPage > 1) params.set('page', pagination.currentPage.toString());
    
    setSearchParams(params);
  }, [filters, pagination.currentPage, searchQuery, setSearchParams]);

  // Fetch crops from API
  const fetchCrops = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await searchCrops({
        query: searchQuery,
        ...filters,
        page: pagination.currentPage,
        limit: pagination.itemsPerPage
      });

      if (response.success) {
        setCrops(response.data || []);
        if (response.pagination) {
          setPagination(prev => ({
            ...prev,
            totalPages: response.pagination.totalPages || 1,
            totalItems: response.pagination.totalItems || 0
          }));
        }
      } else {
        setError(response.message || 'Failed to fetch crops');
      }
    } catch (err) {
      setError('An error occurred while fetching crops');
      console.error('Fetch crops error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    fetchCrops();
  };

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Handle filter reset
  const handleFilterReset = () => {
    setFilters({
      cropType: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      minTrustScore: 0,
      tokenType: '',
      organic: false,
      certified: false,
      sortBy: 'newest',
      sortOrder: 'desc'
    });
    setSearchQuery('');
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle quick view
  const handleQuickView = (crop) => {
    setSelectedCrop(crop);
    setShowQuickView(true);
  };

  // Handle purchase
  const handlePurchaseClick = (crop) => {
    setPurchaseCrop(crop);
    setShowPurchaseModal(true);
    setShowQuickView(false);
  };

  // Handle purchase confirmation
  const handlePurchaseConfirm = async (purchaseData) => {
    console.log('Purchase confirmed:', purchaseData);
    // API call would go here
    // After successful purchase, close modal and show success message
    setShowPurchaseModal(false);
    setPurchaseCrop(null);
    // Show success notification
  };

  // Handle wishlist toggle
  const handleWishlistToggle = async (cropId, isAdding) => {
    try {
      if (isAdding) {
        await addToWishlist(cropId);
        setWishlist(prev => [...prev, cropId]);
      } else {
        await removeFromWishlist(cropId);
        setWishlist(prev => prev.filter(id => id !== cropId));
      }
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (pagination.totalPages <= maxVisible) {
      for (let i = 1; i <= pagination.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (pagination.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(pagination.totalPages);
      } else if (pagination.currentPage >= pagination.totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = pagination.totalPages - 3; i <= pagination.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = pagination.currentPage - 1; i <= pagination.currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(pagination.totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="marketplace">
      {/* Header */}
      <section className="marketplace__header">
        <div className="container">
          <h1 className="marketplace__title">Marketplace</h1>
          <p className="marketplace__subtitle">
            Discover quality crops from verified farmers across East Africa
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="marketplace__search-section">
        <div className="container">
          <form className="marketplace__search" onSubmit={handleSearch}>
            <input
              type="text"
              className="marketplace__search-input"
              placeholder="Search for crops, farmers, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="marketplace__search-button btn btn--primary">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Main Content */}
      <section className="marketplace__main section">
        <div className="container">
          <div className="marketplace__layout">
            {/* Filters Sidebar */}
            <aside className={`marketplace__filters ${showMobileFilters ? 'marketplace__filters--visible' : ''}`}>
              <CropFilter
                onFilterChange={handleFilterChange}
                onReset={handleFilterReset}
                initialFilters={filters}
              />
            </aside>

            {/* Content Area */}
            <div className="marketplace__content">
              {/* Toolbar */}
              <div className="marketplace__toolbar">
                <div className="marketplace__results-info">
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    <span>
                      Showing {crops.length} of {pagination.totalItems} results
                    </span>
                  )}
                </div>

                <div className="marketplace__toolbar-actions">
                  {/* Mobile Filter Toggle */}
                  <button
                    className="marketplace__filter-toggle btn btn--secondary btn--small"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                  >
                    Filters
                  </button>

                  {/* View Mode Toggle */}
                  <div className="marketplace__view-toggle">
                    <button
                      className={`marketplace__view-btn ${viewMode === 'grid' ? 'marketplace__view-btn--active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                    >
                      ⊞
                    </button>
                    <button
                      className={`marketplace__view-btn ${viewMode === 'list' ? 'marketplace__view-btn--active' : ''}`}
                      onClick={() => setViewMode('list')}
                      aria-label="List view"
                    >
                      ☰
                    </button>
                  </div>
                </div>
              </div>

              {/* Error State */}
              {error && (
                <div className="alert alert--error">
                  {error}
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="marketplace__loading">
                  <div className="loader"></div>
                  <p>Loading crops...</p>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && crops.length === 0 && (
                <div className="marketplace__empty">
                  <div className="marketplace__empty-icon">🌾</div>
                  <h3 className="marketplace__empty-title">No crops found</h3>
                  <p className="marketplace__empty-text">
                    Try adjusting your filters or search query to find what you're looking for.
                  </p>
                  <button
                    className="btn btn--primary"
                    onClick={handleFilterReset}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Crops Grid/List */}
              {!loading && !error && crops.length > 0 && (
                <div className={`marketplace__crops ${viewMode === 'list' ? 'marketplace__crops--list' : ''}`}>
                  {crops.map(crop => (
                    <CropCard
                      key={crop.id}
                      crop={crop}
                      onQuickView={handleQuickView}
                      onAddToWishlist={handleWishlistToggle}
                      isInWishlist={wishlist.includes(crop.id)}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loading && !error && pagination.totalPages > 1 && (
                <div className="marketplace__pagination">
                  <button
                    className="marketplace__pagination-btn"
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                  >
                    Previous
                  </button>

                  <div className="marketplace__pagination-numbers">
                    {getPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span key={`ellipsis-${index}`} className="marketplace__pagination-ellipsis">
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          className={`marketplace__pagination-number ${
                            pagination.currentPage === page ? 'marketplace__pagination-number--active' : ''
                          }`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      )
                    ))}
                  </div>

                  <button
                    className="marketplace__pagination-btn"
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {showQuickView && selectedCrop && (
        <div className="marketplace__modal-overlay" onClick={() => setShowQuickView(false)}>
          <div className="marketplace__modal-content" onClick={(e) => e.stopPropagation()}>
            <CropDetails
              crop={selectedCrop}
              onPurchase={handlePurchaseClick}
              onClose={() => setShowQuickView(false)}
            />
          </div>
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && purchaseCrop && (
        <PurchaseModal
          crop={purchaseCrop}
          isOpen={showPurchaseModal}
          onClose={() => {
            setShowPurchaseModal(false);
            setPurchaseCrop(null);
          }}
          onConfirm={handlePurchaseConfirm}
        />
      )}

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div 
          className="marketplace__filter-overlay"
          onClick={() => setShowMobileFilters(false)}
        />
      )}
    </div>
  );
};

export default Marketplace;