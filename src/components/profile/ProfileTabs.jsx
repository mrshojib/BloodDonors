
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileInfoView } from '@/components/profile/ProfileInfoView';
import { ProfileEditForm } from '@/components/profile/ProfileEditForm';
import { DonationHistoryView } from '@/components/profile/DonationHistoryView';
import { MapPin } from 'lucide-react';

export const ProfileTabs = ({ 
  isEditing, 
  profile, 
  editedProfile, 
  handleInputChange, 
  handleLocationChange, 
  handleCheckboxChange,
  setIsEditing,
  isCurrentUserProfile
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{profile.area}, {profile.upazila}, {profile.district}, {profile.division}</span>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <div className="bg-primary/10 text-primary font-bold text-2xl px-4 py-2 rounded-lg">
            {profile.bloodGroup}
          </div>
          <div className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${profile.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {profile.availability ? 'উপলব্ধ' : 'অনুপলব্ধ'}
          </div>
        </div>
      </div>

      <Tabs defaultValue="info" className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="info">ব্যক্তিগত তথ্য</TabsTrigger>
          <TabsTrigger value="donation">রক্তদান ইতিহাস</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="mt-6">
          {!isEditing ? (
            <ProfileInfoView profile={profile} setIsEditing={setIsEditing} isCurrentUserProfile={isCurrentUserProfile} />
          ) : (
            <ProfileEditForm
              editedProfile={editedProfile}
              handleInputChange={handleInputChange}
              handleLocationChange={handleLocationChange}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
        </TabsContent>
        
        <TabsContent value="donation" className="mt-6">
          <DonationHistoryView isCurrentUserProfile={isCurrentUserProfile} />
        </TabsContent>
      </Tabs>
    </>
  );
};
