
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast.jsx';


export const RegistrationFormLogic = (initialFormData) => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name, checked) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleLocationChange = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('পাসওয়ার্ড মিলছে না');
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "পাসওয়ার্ড মিলছে না।",
      });
      return;
    }
    
    if (formData.password.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await register(formData.email, formData.password, formData);
      
      if (result.success) {
        toast({
          title: "সফল!",
          description: "নিবন্ধন সফল হয়েছে। আপনাকে হোমপেজে পাঠানো হচ্ছে।",
        });
        navigate('/');
      } else {
        const errorMessage = result.error?.message || 'নিবন্ধন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।';
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "নিবন্ধন ব্যর্থ",
          description: errorMessage,
        });
      }
    } catch (err) {
      const errorMessage = 'নিবন্ধন প্রক্রিয়াতে একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "অপ্রত্যাশিত ত্রুটি",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    error,
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    handleLocationChange,
    handleSubmit,
  };
};
