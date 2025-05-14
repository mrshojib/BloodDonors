
import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export const AdminHeader = ({ adminName }) => {
  return (
    <motion.div
      className="mb-8 p-6 bg-gradient-to-r from-primary via-red-500 to-rose-600 dark:from-primary dark:via-red-700 dark:to-rose-800 rounded-lg shadow-lg text-white"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-1">স্বাগতম, {adminName}!</h1>
          <p className="text-lg sm:text-xl text-red-100 dark:text-red-200">
            আপনি এখন অ্যাডমিন ড্যাশবোর্ডে আছেন।
          </p>
        </div>
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
        >
          <Award size={48} className="text-yellow-300 opacity-80" />
        </motion.div>
      </div>
    </motion.div>
  );
};
