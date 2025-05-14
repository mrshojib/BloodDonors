
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import SearchPage from '@/pages/SearchPage';
import ProfilePage from '@/pages/ProfilePage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import NotFoundPage from '@/pages/NotFoundPage';
import UrgentBloodRequestPage from '@/pages/UrgentBloodRequestPage';

// Auth Guards
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminRoute } from '@/components/auth/AdminRoute';

// Theme Provider
import { ThemeProvider } from '@/contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="urgent-request" element={<UrgentBloodRequestPage />} />
            
            {/* Protected User Routes */}
            <Route 
              path="profile/:username" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
          </Route>

          {/* Admin Routes - Updated URL */}
          <Route path="/adminlogin-dashboard" element={<AdminLoginPage />} />
          <Route 
            path="/admin-dashboard" 
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminDashboardPage />
                </AdminLayout>
              </AdminRoute>
            } 
          />

          {/* 404 and Redirects */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
