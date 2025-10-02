import React, { createContext, useState, useCallback, useEffect } from 'react';

export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter state
  const [filters, setFilters] = useState({
    cropType: 'all',
    priceRange: { min: 0, max: 1000 },
    location: 'all',
    tokenType: 'all', // DFFT or DFRT
    trustScore: 0,
    sortBy: 'newest' // newest, oldest, price-low, price-high, trust-score
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  // Apply filters and search
  useEffect(() => {
    applyFiltersAndSearch();
  }, [listings, filters, searchQuery]);

  const applyFiltersAndSearch = useCallback(() => {
    let results = [...listings];

    // Apply search
    if (searchQuery) {
      results = results.filter(listing =>
        listing.cropType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.cropType !== 'all') {
      results = results.filter(listing => listing.cropType === filters.cropType);
    }

    if (filters.tokenType !== 'all') {
      results = results.filter(listing => listing.tokenType === filters.tokenType);
    }

    if (filters.location !== 'all') {
      results = results.filter(listing => listing.location === filters.location);
    }

    // Price range filter
    results = results.filter(listing =>
      listing.price >= filters.priceRange.min &&
      listing.price <= filters.priceRange.max
    );

    // Trust score filter
    results = results.filter(listing => listing.trustScore >= filters.trustScore);

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'trust-score':
        results.sort((a, b) => b.trustScore - a.trustScore);
        break;
      case 'oldest':
        results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'newest':
      default:
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setFilteredListings(results);
    setSearchResults(results);
    setTotalPages(Math.ceil(results.length / itemsPerPage));
  }, [listings, filters, searchQuery, itemsPerPage]);

  const updateFilter = useCallback((filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  const updatePriceRange = useCallback((min, max) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { min, max }
    }));
    setCurrentPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      cropType: 'all',
      priceRange: { min: 0, max: 1000 },
      location: 'all',
      tokenType: 'all',
      trustScore: 0,
      sortBy: 'newest'
    });
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  const search = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const goToPage = useCallback((pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const previousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const getPaginatedListings = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredListings.slice(startIndex, endIndex);
  }, [filteredListings, currentPage, itemsPerPage]);

  const value = {
    // Listings
    listings,
    filteredListings,
    setListings,
    isLoading,
    error,
    setIsLoading,
    setError,

    // Filters
    filters,
    updateFilter,
    updatePriceRange,
    resetFilters,

    // Search
    searchQuery,
    searchResults,
    search,
    clearSearch,

    // Pagination
    currentPage,
    totalPages,
    itemsPerPage,
    goToPage,
    nextPage,
    previousPage,
    getPaginatedListings
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
};