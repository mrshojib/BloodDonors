
import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
};

export default MainLayout;
