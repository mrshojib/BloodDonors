
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff, ArrowRight, User, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast.jsx';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { adminLogin, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin-dashboard');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await adminLogin(email, password);
      
    if (result.success) {
      toast({
        title: "সফল!",
        description: "অ্যাডমিন হিসেবে লগইন সফল হয়েছে। ড্যাশবোর্ডে পাঠানো হচ্ছে...",
        className: "bg-green-500 border-green-500 text-white dark:bg-green-700 dark:border-green-700",
      });
      navigate('/admin-dashboard');
    } else {
      setError(result.error || 'অনুমোদিত অ্যাক্সেস। ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।');
      toast({
        variant: "destructive",
        title: "লগইন ব্যর্থ",
        description: result.error || 'অনুমোদিত অ্যাক্সেস। ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।',
      });
    }
    setLoading(false);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-red-50 via-rose-100 to-pink-50 dark:from-slate-900 dark:via-gray-900 dark:to-neutral-900"
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800/80 backdrop-blur-md p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
        variants={itemVariants}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <motion.div 
          className="text-center"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <div className="flex justify-center mb-4">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-primary to-red-500 dark:from-primary dark:to-red-600 rounded-full flex items-center justify-center shadow-xl"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 150, damping: 10 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
              </svg>
            </motion.div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            অ্যাডমিন লগইন
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            বিশেষ সুবিধা পেতে আপনার অ্যাডমিন একাউন্টে প্রবেশ করুন।
          </p>
        </motion.div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <motion.div 
              className="bg-red-100 dark:bg-red-900/60 border-l-4 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300 p-4 rounded-md text-sm shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-semibold">ত্রুটি:</p>
              {error}
            </motion.div>
          )}
          
          <motion.div 
            className="space-y-5"
            variants={itemVariants}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          >
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200">ইমেইল</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল লিখুন"
                className="mt-1 appearance-none block w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent sm:text-sm transition-all duration-200"
              />
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-between">
                <Label htmlFor="password"  className="text-sm font-medium text-gray-700 dark:text-gray-200">পাসওয়ার্ড</Label>
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="mt-1 appearance-none block w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-transparent sm:text-sm transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            variants={itemVariants}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          >
            <Button
              type="submit"
              className="w-full group relative flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-primary to-red-500 hover:from-red-500 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 shadow-lg hover:shadow-primary/40 transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <motion.div 
                  className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 duration-300" />
                  লগইন করুন
                  <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              )}
            </Button>
          </motion.div>
        </form>
        
        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
        >
          <Link to="/" className="font-medium text-sm text-primary hover:text-primary/80 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 flex items-center justify-center">
             <Home className="mr-1.5 h-4 w-4" /> হোমপেজে ফিরে যান
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdminLoginPage;
