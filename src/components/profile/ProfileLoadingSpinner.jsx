
import React from 'react';

export const ProfileLoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-150px)]"> {/* Adjust height as needed */}
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
  </div>
);
