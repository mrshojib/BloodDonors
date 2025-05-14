
import React, { useState, useCallback } from 'react';
import { useAuthLocalStorage } from './authLocalStorage';

const ADMIN_EMAIL = "shojibhn360@gmail.com";
const ADMIN_PASSWORD = "Shojibadmin360";

export const useAdminAuth = () => {
  const { storedAdmin, setStoredAdmin, clearStoredAuthData } = useAuthLocalStorage();
  const [isAdmin, setIsAdmin] = useState(storedAdmin);
  const [loading, setLoading] = useState(false);

  const adminLogin = useCallback(async (email, password) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500)); 

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setStoredAdmin(true);
      setLoading(false);
      return { success: true };
    } else {
      setIsAdmin(false);
      setStoredAdmin(false);
      setLoading(false);
      return { success: false, error: "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।" };
    }
  }, [setStoredAdmin]);

  const adminLogout = useCallback(async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsAdmin(false);
    setStoredAdmin(false); 
    // We only clear admin part of local storage, main user auth might still be active
    // clearStoredAuthData(); // This would log out the regular user too. Decide if this is intended.
    // For now, only clearing admin flag.
    localStorage.removeItem('isAdmin');
    setLoading(false);
  }, [setStoredAdmin]);

  return {
    isAdmin,
    adminLogin,
    adminLogout,
    loading,
  };
};
