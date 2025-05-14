
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  useAuthActions, 
  getUserByUsernameAction, 
  getAllUsersAction, 
  searchUsersAction 
} from './authActions'; 
import { useAuthLocalStorage } from './authLocalStorage';
import { useAdminAuth } from './adminAuth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { 
    storedUser, 
    storedProfile, 
    setStoredUser, 
    setStoredProfile, 
    clearStoredAuthData 
  } = useAuthLocalStorage();

  const {
    isAdmin,
    adminLogin,
    adminLogout,
    loading: adminLoading,
  } = useAdminAuth();

  const [currentUser, setCurrentUser] = useState(storedUser);
  const [userProfile, setUserProfile] = useState(storedProfile);
  const [loading, setLoading] = useState(true);


  const authActions = useAuthActions(
    setCurrentUser, 
    setUserProfile, 
    () => {}, // setIsAdmin is now handled by useAdminAuth
    setStoredUser,
    setStoredProfile,
    () => {}, // setStoredAdmin is now handled by useAdminAuth
    clearStoredAuthData
  );

  useEffect(() => {
    if (storedUser && !storedProfile && storedUser.uid && !storedUser.isAdmin) {
      const fetchProfile = async () => {
        const profile = await getUserByUsernameAction(storedUser.displayName.toLowerCase().replace(/\s+/g, ''));
        if (profile) {
          setUserProfile(profile);
          setStoredProfile(profile);
        }
      };
      fetchProfile();
    }
    setLoading(false);
  }, [storedUser, storedProfile, setStoredProfile]);

  const updateUserProfile = (userData) => {
    return authActions.updateUserProfile(currentUser, userProfile, userData);
  };

  const combinedLogout = async () => {
    await authActions.logout(); // Regular user logout
    await adminLogout(); // Admin logout
  };
  
  const value = {
    currentUser,
    userProfile,
    isAdmin,
    loading: loading || adminLoading,
    register: authActions.register,
    login: authActions.login,
    adminLogin, // From useAdminAuth
    logout: combinedLogout,
    updateUserProfile,
    getUserByUsername: getUserByUsernameAction,
    getAllUsers: getAllUsersAction,
    searchUsers: searchUsersAction,
  };

  return (
    <AuthContext.Provider value={value}>
      {!(loading || adminLoading) && children}
    </AuthContext.Provider>
  );
}
