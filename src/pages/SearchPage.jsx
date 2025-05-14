
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SearchResults } from '@/components/search/SearchResults';
import { SearchPageHeader } from '@/components/search/SearchPageHeader';
import { useSearchLogic } from '@/components/search/useSearchLogic';

const SearchPage = () => {
  const { searchUsers } = useAuth();
  const routeLocation = useLocation();

  const {
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
  } = useSearchLogic(searchUsers, routeLocation);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SearchPageHeader />

        <SearchFilters
          searchCriteria={searchCriteria}
          setSearchCriteria={setSearchCriteria}
          handleSearch={handleSearch}
          clearFilters={clearFilters}
          isFiltering={isFiltering}
          setIsFiltering={setIsFiltering}
          isMobileFilterOpen={isMobileFilterOpen}
          setIsMobileFilterOpen={setIsMobileFilterOpen}
          handleLocationChange={handleLocationChange}
        />

        <SearchResults 
          results={searchResults} 
          searchPerformed={Object.values(searchCriteria).some(val => val !== '' && (typeof val === 'string' ? val.trim() !== '' : val !== true) )}
          clearFilters={clearFilters}
        />
      </div>
    </div>
  );
};

export default SearchPage;
