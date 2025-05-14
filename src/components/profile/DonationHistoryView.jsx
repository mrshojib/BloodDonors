
import React from 'react';
import { Button } from '@/components/ui/button';

export const DonationHistoryView = ({ isCurrentUserProfile }) => {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">কোন রক্তদান ইতিহাস নেই</h3>
      <p className="text-gray-600 mb-6">
        এখনো কোন রক্তদানের রেকর্ড যোগ করা হয়নি।
      </p>
      {isCurrentUserProfile && (
        <Button variant="outline">
          রক্তদানের তথ্য যোগ করুন
        </Button>
      )}
    </div>
  );
};
