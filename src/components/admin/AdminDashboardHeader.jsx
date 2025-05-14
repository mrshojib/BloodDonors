
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Bell, MessageSquare, Settings, UserCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';


const AdminDashboardHeader = () => {
  const { userProfile } = useAuth(); 
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      className="sticky top-0 z-30 bg-white dark:bg-gray-800/80 backdrop-blur-md shadow-sm p-4 border-b border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            স্বাগতম, {userProfile?.name || "অ্যাডমিন"}!
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            আপনার সিস্টেম পরিচালনা করুন।
          </p>
        </div>
        
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">থিম পরিবর্তন</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary ring-2 ring-white dark:ring-gray-800" />
            <span className="sr-only">নোটিফিকেশন</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-9 w-9 border-2 border-primary/50">
                  <AvatarImage src={userProfile?.profileImage || ""} alt={userProfile?.name || "অ্যাডমিন"} />
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                    {userProfile?.name?.charAt(0).toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-800 dark:text-gray-100">{userProfile?.name || "অ্যাডমিন"}</p>
                  <p className="text-xs leading-none text-gray-500 dark:text-gray-400">{userProfile?.email || "admin@example.com"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>প্রোফাইল</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>সেটিংস</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminDashboardHeader;
