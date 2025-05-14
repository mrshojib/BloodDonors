
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const AdminUserTableRow = ({ user }) => {
  const username = user.name ? user.name.toLowerCase().replace(/\s+/g, '') : '';
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 items-center">
      <div className="md:col-span-2 flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={user.profileImage} alt={user.name} />
          <AvatarFallback className="bg-primary text-white">
            {user.name ? user.name.charAt(0) : 'U'}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{user.name || 'N/A'}</p>
          <p className="text-sm text-gray-500">{user.email || 'N/A'}</p>
        </div>
      </div>
      <div className="mt-2 md:mt-0">
        <span className="md:hidden font-semibold">রক্তের গ্রুপ: </span>
        <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
          {user.bloodGroup || 'N/A'}
        </span>
      </div>
      <div className="mt-2 md:mt-0">
        <span className="md:hidden font-semibold">যোগাযোগ: </span>
        <p className="text-sm">{user.phone || 'N/A'}</p>
      </div>
      <div className="mt-2 md:mt-0">
        <span className="md:hidden font-semibold">অবস্থান: </span>
        <p className="text-sm">{user.district || 'N/A'}, {user.division || 'N/A'}</p>
      </div>
      <div className="mt-2 md:mt-0">
        <Link to={`/profile/${username}`}>
          <Button variant="outline" size="sm" className="w-full md:w-auto">
            বিস্তারিত
          </Button>
        </Link>
      </div>
    </div>
  );
};
