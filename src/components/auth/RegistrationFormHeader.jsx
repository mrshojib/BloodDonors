
import React from 'react';
import { Link } from 'react-router-dom';

export const RegistrationFormHeader = () => (
  <div className="text-center">
    <div className="flex justify-center">
      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        </svg>
      </div>
    </div>
    <h2 className="mt-4 text-3xl font-bold text-gray-900">রক্তদাতা হিসেবে নিবন্ধন করুন</h2>
    <p className="mt-2 text-sm text-gray-600">
      ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
      <Link to="/login" className="font-medium text-primary hover:text-primary/80">
        লগইন করুন
      </Link>
    </p>
  </div>
);
