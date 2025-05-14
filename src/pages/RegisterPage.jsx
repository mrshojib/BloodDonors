
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RegistrationFormFields } from '@/components/auth/RegistrationFormFields';
import { RegistrationFormHeader } from '@/components/auth/RegistrationFormHeader';
import { RegistrationFormLogic } from '@/components/auth/RegistrationFormLogic';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  bloodGroup: '',
  gender: '',
  age: '',
  address: '',
  division: '',
  district: '',
  upazila: '',
  area: '',
  availability: true
};

const RegisterPage = () => {
  const {
    formData,
    loading,
    error,
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    handleLocationChange,
    handleSubmit,
  } = RegistrationFormLogic(initialFormData);
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RegistrationFormHeader />
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-md relative text-sm" role="alert">
                <strong className="font-bold">ত্রুটি: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <RegistrationFormFields
              formData={formData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              handleCheckboxChange={handleCheckboxChange}
              handleLocationChange={handleLocationChange}
            />

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
                    <UserPlus className="mr-2 h-4 w-4" />
                    নিবন্ধন করুন
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
