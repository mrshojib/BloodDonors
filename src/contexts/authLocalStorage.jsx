
import React, { useState, useCallback } from 'react';

export const useAuthLocalStorage = () => {
  const getStoredItem = (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  const setStoredItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeStoredItem = (key) => {
    localStorage.removeItem(key);
  };

  const [storedUser, setStoredUserInternal] = useState(() => getStoredItem('currentUser'));
  const [storedProfile, setStoredProfileInternal] = useState(() => getStoredItem('userProfile'));
  const [storedAdmin, setStoredAdminInternal] = useState(() => getStoredItem('isAdmin') === true);

  const setStoredUser = useCallback((user) => {
    setStoredUserInternal(user);
    setStoredItem('currentUser', user);
  }, []);

  const setStoredProfile = useCallback((profile) => {
    setStoredProfileInternal(profile);
    setStoredItem('userProfile', profile);
  }, []);

  const setStoredAdmin = useCallback((isAdminFlag) => {
    setStoredAdminInternal(isAdminFlag);
    setStoredItem('isAdmin', isAdminFlag);
  }, []);
  
  const clearStoredAuthData = useCallback(() => {
    setStoredUserInternal(null);
    setStoredProfileInternal(null);
    setStoredAdminInternal(false);
    removeStoredItem('currentUser');
    removeStoredItem('userProfile');
    removeStoredItem('isAdmin');
  }, []);

  return {
    storedUser,
    storedProfile,
    storedAdmin,
    setStoredUser,
    setStoredProfile,
    setStoredAdmin,
    clearStoredAuthData,
  };
};
