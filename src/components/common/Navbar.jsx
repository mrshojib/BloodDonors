
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut, Search, Home, UserPlus, LogIn, Moon, Sun, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { currentUser, userProfile, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  const profileLink = userProfile?.name 
    ? `/profile/${userProfile.name.toLowerCase().replace(/\s+/g, '')}`
    : (currentUser ? `/profile/${currentUser.uid}` : '/login');


  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div 
                className="w-10 h-10 mr-2 bg-primary rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                </svg>
              </motion.div>
              <span className="font-bold text-2xl text-gray-900 dark:text-white">রক্তবন্ধন</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <Link to="/">
              <Button variant="ghost" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <Home className="mr-1 h-4 w-4" />
                হোম
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="ghost" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <Search className="mr-1 h-4 w-4" />
                রক্তদাতা খুঁজুন
              </Button>
            </Link>
             <Link to="/urgent-request">
              <Button variant="ghost" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <ShieldAlert className="mr-1 h-4 w-4" />
                জরুরি আবেদন
              </Button>
            </Link>
            
            {currentUser ? (
              <>
                <Link to={profileLink}>
                  <Button variant="ghost" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                    <User className="mr-1 h-4 w-4" />
                    প্রোফাইল
                  </Button>
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  <LogOut className="mr-1 h-4 w-4" />
                  লগআউট
                </Button>
                <Avatar className="h-9 w-9 border-2 border-primary">
                  <AvatarImage src={userProfile?.profileImage} alt={userProfile?.name} />
                  <AvatarFallback className="bg-primary text-white text-sm">
                    {userProfile?.name?.charAt(0) || currentUser?.displayName?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                    <LogIn className="mr-1 h-4 w-4" />
                    লগইন
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="flex items-center bg-primary text-white hover:bg-primary/90">
                    <UserPlus className="mr-1 h-4 w-4" />
                    রেজিস্টার
                  </Button>
                </Link>
              </>
            )}
             <Button variant="ghost" onClick={toggleTheme} size="icon" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {isAdmin && (
              <Link to="/admin-dashboard">
                  <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                      অ্যাডমিন
                  </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" onClick={toggleTheme} size="icon" className="mr-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">মেনু খুলুন</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden"
        id="mobile-menu"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        initial="closed"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {isOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 shadow-xl border-t border-gray-200 dark:border-gray-700">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <Home className="mr-2 h-5 w-5" />
                হোম
              </Button>
            </Link>
            <Link to="/search" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <Search className="mr-2 h-5 w-5" />
                রক্তদাতা খুঁজুন
              </Button>
            </Link>
            <Link to="/urgent-request" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <ShieldAlert className="mr-2 h-5 w-5" />
                জরুরি আবেদন
              </Button>
            </Link>
            
            {currentUser ? (
              <>
                <Link to={profileLink} onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                    <User className="mr-2 h-5 w-5" />
                    প্রোফাইল
                  </Button>
                </Link>
                <Button variant="ghost" onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  <LogOut className="mr-2 h-5 w-5" />
                  লগআউট
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                    <LogIn className="mr-2 h-5 w-5" />
                    লগইন
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full justify-start bg-primary text-white hover:bg-primary/90">
                    <UserPlus className="mr-2 h-5 w-5" />
                    রেজিস্টার
                  </Button>
                </Link>
              </>
            )}
             {isAdmin && (
              <Link to="/admin-dashboard" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                      অ্যাডমিন ড্যাশবোর্ড
                  </Button>
              </Link>
            )}
          </div>
        )}
      </motion.div>
    </nav>
  );
};

export default Navbar;
