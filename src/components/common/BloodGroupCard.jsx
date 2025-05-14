
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BloodGroupCard = ({ bloodGroup, count = 0 }) => {
  return (
    <motion.div
      className="card-hover relative overflow-hidden rounded-xl bg-white shadow-md border border-gray-100"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link 
        to={`/search?bloodGroup=${bloodGroup}`}
        className="block p-6"
      >
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <h3 className="text-3xl font-bold text-primary">{bloodGroup}</h3>
        <p className="mt-2 text-sm text-gray-500">
          {count} জন রক্তদাতা
        </p>
        <div className="mt-4 flex items-center text-sm font-medium text-primary">
          রক্তদাতা খুঁজুন
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
};

export default BloodGroupCard;
