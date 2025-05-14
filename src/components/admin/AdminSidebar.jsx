
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Settings, LogOut, Home, Database, BarChart3, ShieldAlert, GitPullRequest } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminSidebar = () => {
  const { adminLogout, userProfile } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await adminLogout();
    navigate('/adminlogin-dashboard');
  };

  const navItems = [
    { to: "/admin-dashboard", icon: Database, label: "ড্যাশবোর্ড", section: "overview" },
    { to: "/admin-dashboard/users", icon: Users, label: "ব্যবহারকারী", section: "users" },
    { to: "/admin-dashboard/blood-groups", icon: BarChart3, label: "রক্তের গ্রুপ পরিসংখ্যান", section: "bloodGroups"},
    { to: "/admin-dashboard/requests", icon: GitPullRequest, label: "জরুরি আবেদন", section: "requests"},
    { to: "/admin-dashboard/settings", icon: Settings, label: "সেটিংস", section: "settings" },
  ];

  const isActive = (path) => location.pathname === path;
  
  const sidebarVariants = {
    open: { width: "16rem", transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { width: "4.5rem", transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <motion.div 
      className="h-screen sticky top-0 bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-between z-40"
      variants={sidebarVariants}
      initial="open" 
      animate="open"
    >
      <div>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
            <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-primary to-red-500 rounded-full flex items-center justify-center shadow-md"
                whileHover={{ scale: 1.1, rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
              </svg>
            </motion.div>
            <span className="font-bold text-xl text-gray-800 dark:text-white">অ্যাডমিন</span>
        </div>
        
        <nav className="p-3 mt-2">
          <ul className="space-y-1.5">
            {navItems.map(item => (
              <li key={item.label}>
                <Link to={item.to}>
                  <Button 
                    variant={isActive(item.to) ? "secondary" : "ghost"} 
                    className={`w-full justify-start items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200
                                ${isActive(item.to) 
                                  ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-red-300' 
                                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
           <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage src={userProfile?.profileImage || ""} alt={userProfile?.name || "অ্যাডমিন"} />
              <AvatarFallback className="bg-primary/80 text-white font-semibold">
                {userProfile?.name?.charAt(0).toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{userProfile?.name || "অ্যাডমিন"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">অ্যাডমিনিস্ট্রেটর</p>
            </div>
        </div>
        <Link to="/">
            <Button variant="outline" className="w-full justify-start items-center px-3 py-2.5 text-sm font-medium rounded-md mb-2 border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary">
                <Home className="mr-3 h-5 w-5" />
                সাইট দেখুন
            </Button>
        </Link>
        <Button 
            variant="destructive" 
            onClick={handleLogout} 
            className="w-full justify-start items-center px-3 py-2.5 text-sm font-medium rounded-md bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
        >
          <LogOut className="mr-3 h-5 w-5" />
          লগআউট
        </Button>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
