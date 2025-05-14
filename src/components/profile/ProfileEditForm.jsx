
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import LocationSelector from '@/components/common/LocationSelector';

export const ProfileEditForm = ({ editedProfile, handleInputChange, handleLocationChange, handleCheckboxChange }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">নাম</Label>
          <Input
            id="name"
            name="name"
            value={editedProfile.name || ''}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">ফোন নম্বর</Label>
          <Input
            id="phone"
            name="phone"
            value={editedProfile.phone || ''}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="age">বয়স</Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={editedProfile.age || ''}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="address">ঠিকানা</Label>
          <Input
            id="address"
            name="address"
            value={editedProfile.address || ''}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
      </div>
      
      <div>
        <Label>বিস্তারিত ঠিকানা</Label>
        <div className="mt-1">
          <LocationSelector 
            onChange={handleLocationChange} 
            initialValues={{
              division: editedProfile.division || '',
              district: editedProfile.district || '',
              upazila: editedProfile.upazila || '',
              area: editedProfile.area || ''
            }}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="availability" 
          checked={editedProfile.availability || false}
          onCheckedChange={(checked) => handleCheckboxChange('availability', checked)}
        />
        <label
          htmlFor="availability"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          আমি রক্তদানের জন্য উপলব্ধ
        </label>
      </div>
    </div>
  );
};
