
import React, { useState, useEffect, useCallback } from 'react';

export const useSearchLogic = (searchUsersFunction, routeLocation) => {
  const getInitialSearchCriteria = useCallback(() => {
    const queryParams = new URLSearchParams(routeLocation.search);
    return {
      bloodGroup: queryParams.get('bloodGroup') || '',
      division: queryParams.get('division') || '',
      district: queryParams.get('district') || '',
      upazila: queryParams.get('upazila') || '',
      area: queryParams.get('area') || '',
      availability: queryParams.get('availability') === 'false' ? false : true,
    };
  }, [routeLocation.search]);

  const [searchCriteria, setSearchCriteria] = useState(getInitialSearchCriteria);
  const [searchResults, setSearchResults] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleSearch = useCallback(() => {
    const results = searchUsersFunction(searchCriteria);
    setSearchResults(results);
    setIsFiltering(false);
    setIsMobileFilterOpen(false);
  }, [searchCriteria, searchUsersFunction]);
  
  useEffect(() => {
    const hasInitialCriteria = Object.values(getInitialSearchCriteria()).some(val => val !== '' && val !== true);
    if (hasInitialCriteria) {
      handleSearch();
    }
  }, [handleSearch, getInitialSearchCriteria]);

  const handleLocationChange = useCallback((data) => {
    setSearchCriteria(prev => ({ ...prev, ...data }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchCriteria({
      bloodGroup: '',
      division: '',
      district: '',
      upazila: '',
      area: '',
      availability: true
    });
    setSearchResults([]);
    setIsFiltering(false);
  }, []);

  return {
    searchCriteria,
    setSearchCriteria,
    searchResults,
    isFiltering,
    setIsFiltering,
    isMobileFilterOpen,
    setIsMobileFilterOpen,
    handleSearch,
    handleLocationChange,
    clearFilters,
  };
};
