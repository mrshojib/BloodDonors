
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminDashboardHeader from '@/components/admin/AdminDashboardHeader';


const AdminLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <AdminDashboardHeader />
        <motion.main 
          className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto"
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;
