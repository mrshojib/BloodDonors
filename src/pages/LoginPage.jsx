
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state, or default to home page
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Redirect to the page they were trying to access, or home
        navigate(from, { replace: true });
      } else {
        setError('লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
      }
    } catch (err) {
      setError('লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
              </svg>
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">লগইন করুন</h2>
          <p className="mt-2 text-sm text-gray-600">
            অথবা{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary/80">
              নতুন অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">ইমেইল</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল লিখুন"
                className="mt-1"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">পাসওয়ার্ড</Label>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
                  পাসওয়ার্ড ভুলে গেছেন?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  লগইন করুন
                </>
              )}
            </Button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            অ্যাডমিন হিসেবে লগইন করতে চান?{' '}
            <Link to="/admin-login" className="font-medium text-primary hover:text-primary/80">
              অ্যাডমিন লগইন
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
