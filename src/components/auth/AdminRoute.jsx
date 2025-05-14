
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function AdminRoute({ children }) {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="ml-4 text-lg font-semibold text-gray-700 dark:text-gray-200">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/adminlogin-dashboard" replace />;
  }

  return children;
}
