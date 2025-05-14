
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { ProfileLoadingSpinner } from '@/components/profile/ProfileLoadingSpinner';


const ProfilePage = () => {
  const { username } = useParams();
  const { currentUser, userProfile: authUserProfile, getUserByUsername, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState(null);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchProfileData = useCallback(async () => {
    setIsLoading(true);
    if (username) {
      const fetchedProfile = await getUserByUsername(username);
      if (fetchedProfile) {
        setProfile(fetchedProfile);
        setEditedProfile(fetchedProfile);
        if (currentUser && fetchedProfile.uid === currentUser.uid) {
          setIsCurrentUserProfile(true);
        }
      } else {
        navigate('/404');
      }
    }
    setIsLoading(false);
  }, [username, currentUser, getUserByUsername, navigate]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleLocationChange = useCallback((data) => {
    setEditedProfile(prev => ({ ...prev, ...data }));
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleCheckboxChange = useCallback((name, checked) => {
    setEditedProfile(prev => ({ ...prev, [name]: checked }));
  }, []);

  const handleSaveProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      await updateUserProfile(editedProfile);
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Add user feedback like a toast message here
    }
    setIsLoading(false);
  }, [editedProfile, updateUserProfile]);

  const handleCancelEdit = useCallback(() => {
    setEditedProfile(profile); // Revert to original profile data
    setIsEditing(false);
  }, [profile]);

  if (isLoading || !profile) {
    return <ProfileLoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileHeader
            profile={profile}
            isCurrentUserProfile={isCurrentUserProfile}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSaveProfile={handleSaveProfile}
            handleCancelEdit={handleCancelEdit}
          />
          
          <div className="pt-20 sm:pt-24 pb-8 px-4 sm:px-8">
            <ProfileTabs
              isEditing={isEditing}
              profile={profile}
              editedProfile={editedProfile}
              handleInputChange={handleInputChange}
              handleLocationChange={handleLocationChange}
              handleCheckboxChange={handleCheckboxChange}
              setIsEditing={setIsEditing}
              isCurrentUserProfile={isCurrentUserProfile}
              handleSaveProfile={handleSaveProfile}
              handleCancelEdit={handleCancelEdit}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
