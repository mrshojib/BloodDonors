
import React from 'react';
import { useToast } from '@/components/ui/use-toast';

export const useAuthActions = (setCurrentUser, setUserProfile, setIsAdmin) => {
  const { toast } = useToast();

  const registerAction = async (email, password, userData) => {
    try {
      const newUser = {
        uid: 'user_' + Date.now(),
        email,
        displayName: userData.name,
        emailVerified: false
      };
      
      const userProfileData = {
        uid: newUser.uid,
        name: userData.name,
        email,
        phone: userData.phone,
        bloodGroup: userData.bloodGroup,
        gender: userData.gender,
        age: userData.age,
        address: userData.address,
        division: userData.division,
        district: userData.district,
        upazila: userData.upazila,
        area: userData.area,
        availability: userData.availability,
        profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=e11d48&color=fff`,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('userProfile', JSON.stringify(userProfileData));
      
      setCurrentUser(newUser);
      setUserProfile(userProfileData);
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(userProfileData);
      localStorage.setItem('users', JSON.stringify(users));
      
      toast({
        title: "নিবন্ধন সফল হয়েছে",
        description: "আপনার অ্যাকাউন্ট সফলভাবে তৈরি করা হয়েছে।",
        variant: "default",
      });
      
      return { success: true };
    } catch (error) {
      toast({
        title: "নিবন্ধন ব্যর্থ হয়েছে",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const loginAction = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new Error('ইমেইল বা পাসওয়ার্ড ভুল');
      }
      
      const authUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.name,
        emailVerified: true
      };
      
      localStorage.setItem('currentUser', JSON.stringify(authUser));
      localStorage.setItem('userProfile', JSON.stringify(user));
      
      setCurrentUser(authUser);
      setUserProfile(user);
      
      toast({
        title: "লগইন সফল হয়েছে",
        description: "আপনি সফলভাবে লগইন করেছেন।",
        variant: "default",
      });
      
      return { success: true };
    } catch (error) {
      toast({
        title: "লগইন ব্যর্থ হয়েছে",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const adminLoginAction = async (email, password) => {
    try {
      if (email === 'shojibhn360@gmail.com' && password === 'admin12345') {
        const adminUser = {
          uid: 'admin_1',
          email,
          displayName: 'Admin',
          isAdmin: true
        };
        
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        localStorage.setItem('isAdmin', 'true');
        
        setCurrentUser(adminUser);
        setIsAdmin(true);
        
        toast({
          title: "অ্যাডমিন লগইন সফল হয়েছে",
          description: "আপনি সফলভাবে অ্যাডমিন হিসেবে লগইন করেছেন।",
          variant: "default",
        });
        
        return { success: true };
      } else {
        throw new Error('অবৈধ অ্যাডমিন ক্রেডেনশিয়ালস');
      }
    } catch (error) {
      toast({
        title: "অ্যাডমিন লগইন ব্যর্থ হয়েছে",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const logoutAction = async () => {
    try {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userProfile');
      localStorage.removeItem('isAdmin');
      
      setCurrentUser(null);
      setUserProfile(null);
      setIsAdmin(false);
      
      toast({
        title: "লগআউট সফল হয়েছে",
        description: "আপনি সফলভাবে লগআউট করেছেন।",
        variant: "default",
      });
      
      return { success: true };
    } catch (error) {
      toast({
        title: "লগআউট ব্যর্থ হয়েছে",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updateUserProfileAction = async (currentUser, userProfile, userData) => {
    try {
      if (!currentUser) throw new Error('ব্যবহারকারী লগইন করা নেই');
      
      const updatedProfile = { ...userProfile, ...userData };
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(user => 
        user.uid === currentUser.uid ? updatedProfile : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      setUserProfile(updatedProfile);
      
      toast({
        title: "প্রোফাইল আপডেট সফল হয়েছে",
        description: "আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে।",
        variant: "default",
      });
      
      return { success: true };
    } catch (error) {
      toast({
        title: "প্রোফাইল আপডেট ব্যর্থ হয়েছে",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return {
    register: registerAction,
    login: loginAction,
    adminLogin: adminLoginAction,
    logout: logoutAction,
    updateUserProfile: updateUserProfileAction,
  };
};

export const getUserByUsernameAction = async (username) => {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(user => user.name && user.name.toLowerCase().replace(/\s+/g, '') === username.toLowerCase());
  } catch (error) {
    console.error("Error getting user by username:", error);
    return null;
  }
};

export const getAllUsersAction = () => {
  try {
    return JSON.parse(localStorage.getItem('users') || '[]');
  } catch (error) {
    console.error("Error getting all users:", error);
    return [];
  }
};

export const searchUsersAction = (criteria) => {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    return users.filter(user => {
      if (criteria.bloodGroup && user.bloodGroup !== criteria.bloodGroup) {
        return false;
      }
      if (criteria.division && user.division !== criteria.division) {
        return false;
      }
      if (criteria.district && user.district !== criteria.district) {
        return false;
      }
      if (criteria.upazila && user.upazila !== criteria.upazila) {
        return false;
      }
      if (criteria.area && user.area && !user.area.toLowerCase().includes(criteria.area.toLowerCase())) {
        return false;
      }
      if (criteria.availability && user.availability !== criteria.availability) {
        return false;
      }
      return true;
    });
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
};
