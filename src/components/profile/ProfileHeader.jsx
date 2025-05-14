
import React from 'react';
import { Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const ProfileHeader = ({ profile, isCurrentUserProfile, isEditing, setIsEditing, handleSaveProfile, handleCancelEdit }) => {
  return (
    <div className="relative h-48 bg-gradient-to-r from-primary/80 to-primary">
      <div className="absolute -bottom-16 left-8">
        <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
          <AvatarImage src={profile.profileImage} alt={profile.name} />
          <AvatarFallback className="bg-primary text-white text-2xl">
            {profile.name ? profile.name.charAt(0) : 'U'}
          </AvatarFallback>
        </Avatar>
      </div>
      
      {isCurrentUserProfile && !isEditing && (
        <div className="absolute top-4 right-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/90 hover:bg-white"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="mr-2 h-4 w-4" />
            প্রোফাইল সম্পাদনা
          </Button>
        </div>
      )}
      
      {isEditing && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/90 hover:bg-white"
            onClick={handleCancelEdit}
          >
            <X className="mr-2 h-4 w-4" />
            বাতিল
          </Button>
          <Button 
            size="sm" 
            className="bg-primary text-white hover:bg-primary/90"
            onClick={handleSaveProfile}
          >
            <Save className="mr-2 h-4 w-4" />
            সংরক্ষণ
          </Button>
        </div>
      )}
    </div>
  );
};
