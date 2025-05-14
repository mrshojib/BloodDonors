
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminStatsCards } from '@/components/admin/AdminStatsCards';
import { AdminBloodGroupStats } from '@/components/admin/AdminBloodGroupStats';
import { AdminUserManagementTable } from '@/components/admin/AdminUserManagementTable';
import { AdminRequestManagementTable } from '@/components/admin/AdminRequestManagementTable'; 
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRequests } from '@/contexts/RequestContext';

const AdminSettingsPage = () => (
  <motion.div 
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">সেটিংস</h2>
    <p className="text-gray-600 dark:text-gray-300">এই ফিচারটি শীঘ্রই আসছে।</p>
  </motion.div>
);

export const AdminContentArea = () => {
  const { getAllUsers } = useAuth();
  const { getAllRequests } = useRequests();
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const allUsers = getAllUsers();
    setUsers(allUsers);
    setFilteredUsers(allUsers);

    const allRequests = getAllRequests();
    setRequests(allRequests);
    setFilteredRequests(allRequests);
  }, [getAllUsers, getAllRequests]);

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
      setFilteredRequests(requests);
    } else {
      if (currentPath.includes('/users') || currentPath === '/admin-dashboard') {
        const filteredU = users.filter(user => 
          (user.name && user.name.toLowerCase().includes(lowerSearchTerm)) ||
          (user.email && user.email.toLowerCase().includes(lowerSearchTerm)) ||
          (user.bloodGroup && user.bloodGroup.toLowerCase().includes(lowerSearchTerm)) ||
          (user.division && user.division.toLowerCase().includes(lowerSearchTerm)) ||
          (user.district && user.district.toLowerCase().includes(lowerSearchTerm))
        );
        setFilteredUsers(filteredU);
      }
      if (currentPath.includes('/requests')) {
         const filteredR = requests.filter(req => 
          (req.patientName && req.patientName.toLowerCase().includes(lowerSearchTerm)) ||
          (req.bloodGroup && req.bloodGroup.toLowerCase().includes(lowerSearchTerm)) ||
          (req.hospitalName && req.hospitalName.toLowerCase().includes(lowerSearchTerm)) ||
          (req.contactName && req.contactName.toLowerCase().includes(lowerSearchTerm)) ||
          (req.status && req.status.toLowerCase().includes(lowerSearchTerm))
        );
        setFilteredRequests(filteredR);
      }
    }
  }, [searchTerm, users, requests, currentPath]);
  
  const renderContent = () => {
    if (currentPath.includes('/users')) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">ব্যবহারকারী ব্যবস্থাপনা</h2>
           <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="ব্যবহারকারী খুঁজুন..." />
          <AdminUserManagementTable users={filteredUsers} />
        </div>
      );
    }
    if (currentPath.includes('/blood-groups')) {
      return <AdminBloodGroupStats users={users} />;
    }
    if (currentPath.includes('/requests')) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">জরুরি রক্তের আবেদনসমূহ</h2>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="আবেদন খুঁজুন..." />
          <AdminRequestManagementTable requests={filteredRequests} />
        </div>
      );
    }
    if (currentPath.includes('/settings')) {
      return <AdminSettingsPage />;
    }
    // Default to overview (Dashboard)
    return <AdminStatsCards users={users} requests={requests} />;
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => (
  <div className="mb-6">
    <div className="relative">
      <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-12 pr-4 py-3 border-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary dark:focus:ring-primary rounded-lg text-sm shadow-sm transition-colors duration-200"
      />
    </div>
  </div>
);

