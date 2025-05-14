
import React from 'react';
import { Phone, Calendar, Clock, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ProfileInfoView = ({ profile, setIsEditing, isCurrentUserProfile }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">ইমেইল</h3>
          <p className="mt-1">{profile.email}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">ফোন নম্বর</h3>
          <p className="mt-1 flex items-center">
            <Phone className="h-4 w-4 mr-1 text-primary" />
            {profile.phone}
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">বয়স</h3>
          <p className="mt-1 flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-primary" />
            {profile.age} বছর
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">লিঙ্গ</h3>
          <p className="mt-1">{profile.gender}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">ঠিকানা</h3>
          <p className="mt-1">{profile.address}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">রক্তদানের অবস্থা</h3>
          <p className="mt-1 flex items-center">
            <Clock className="h-4 w-4 mr-1 text-primary" />
            {profile.availability ? 'রক্তদানের জন্য উপলব্ধ' : 'বর্তমানে অনুপলব্ধ'}
          </p>
        </div>
        
        {isCurrentUserProfile && (
          <div className="pt-4">
            <Button 
              variant="outline" 
              className="w-full md:w-auto"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              প্রোফাইল সম্পাদনা
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
