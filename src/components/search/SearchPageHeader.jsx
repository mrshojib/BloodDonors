
import React from 'react';
import { motion } from 'framer-motion';

export const SearchPageHeader = () => (
  <motion.div
    className="text-center mb-12"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">রক্তদাতা খুঁজুন</h1>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      আপনার প্রয়োজনীয় রক্তের গ্রুপ এবং এলাকা নির্বাচন করে রক্তদাতা খুঁজুন। আমরা আপনাকে দ্রুততম সময়ে সঠিক রক্তদাতার সাথে সংযোগ স্থাপনে সহায়তা করবো।
    </p>
  </motion.div>
);
