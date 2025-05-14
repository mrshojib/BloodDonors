
import React from 'react';
import { motion } from 'framer-motion';
import DonorCard from '@/components/common/DonorCard';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SearchResults = ({ results, searchPerformed, clearFilters }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (!searchPerformed && results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">রক্তদাতা খুঁজতে শুরু করুন</h3>
        <p className="text-gray-600">
          রক্তের গ্রুপ এবং এলাকা নির্বাচন করে অনুসন্ধান করুন।
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">কোন রক্তদাতা পাওয়া যায়নি</h3>
        <p className="text-gray-600 mb-6">
          আপনার অনুসন্ধান মানদণ্ড পরিবর্তন করে আবার চেষ্টা করুন।
        </p>
        <Button 
          variant="outline" 
          onClick={clearFilters}
        >
          <X className="mr-2 h-4 w-4" />
          ফিল্টার মুছুন
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {results.length} জন রক্তদাতা পাওয়া গেছে
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((donor, index) => (
          <DonorCard key={donor.uid || index} donor={donor} />
        ))}
      </div>
    </motion.div>
  );
};
