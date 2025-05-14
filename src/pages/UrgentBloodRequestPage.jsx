
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Send, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import LocationSelector from '@/components/common/LocationSelector';
import { useToast } from '@/components/ui/use-toast.jsx';
import { useAuth } from '@/contexts/AuthContext';
import { useRequests } from '@/contexts/RequestContext';


const UrgentBloodRequestPage = () => {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const { addRequest } = useRequests();

  const initialFormData = {
    patientName: '',
    patientAge: '',
    bloodGroup: '',
    bloodUnits: '1',
    hospitalName: '',
    hospitalAddress: '',
    contactName: currentUser?.displayName || '',
    contactPhone: currentUser?.phone || '', // Assuming userProfile has phone
    reason: '',
    division: '',
    district: '',
    upazila: '',
    area: '',
    relationToPatient: '',
    urgency: 'উচ্চ', // Default urgency
    requestorPhoneOTP: '', // For requestor's phone verification
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1 for form, 2 for OTP
  const [generatedOTP, setGeneratedOTP] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    // In a real app, this OTP would be sent via SMS
    console.log(`Generated OTP for ${formData.contactPhone}: ${otp}`); // For testing
    toast({
      title: "ওটিপি পাঠানো হয়েছে",
      description: `আপনার মোবাইল নম্বর ${formData.contactPhone} এ একটি ওটিপি পাঠানো হয়েছে (কনসোলে দেখুন)।`,
    });
  };

  const handleSendOTP = () => {
    if (!formData.contactPhone || formData.contactPhone.length < 11) {
      setError('সঠিক মোবাইল নম্বর দিন।');
      toast({ variant: "destructive", title: "ত্রুটি", description: "অনুগ্রহ করে একটি সঠিক মোবাইল নম্বর দিন।" });
      return;
    }
    setError('');
    generateOTP();
    setStep(2);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (formData.requestorPhoneOTP === generatedOTP) {
      setError('');
      setIsLoading(true);
      try {
        const requestData = { ...formData, status: 'pending', requestedAt: new Date().toISOString(), requestedBy: currentUser?.uid || 'guest' };
        delete requestData.requestorPhoneOTP; 
        
        addRequest(requestData);

        toast({
          title: "সফল!",
          description: "আপনার রক্তের আবেদন সফলভাবে জমা দেওয়া হয়েছে।",
        });
        setFormData(initialFormData); // Reset form
        setStep(1); // Go back to form
        // Potentially navigate to a success page or dashboard
      } catch (err) {
        setError('আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
        toast({ variant: "destructive", title: "ত্রুটি", description: "আবেদন জমা দিতে সমস্যা হয়েছে।" });
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('ওটিপি সঠিক নয়। অনুগ্রহ করে আবার চেষ্টা করুন।');
      toast({ variant: "destructive", title: "ত্রুটি", description: "ওটিপি সঠিক নয়।" });
    }
  };


  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <ShieldAlert className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              জরুরি রক্তের আবেদন
            </h1>
            <p className="mt-3 text-md text-gray-600 dark:text-gray-300">
              অনুগ্রহ করে নিচের ফর্মটি পূরণ করুন। আপনার আবেদনটি আমাদের রেজিস্টার্ড রক্তদাতাদের কাছে পৌঁছে যাবে।
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-md relative text-sm" role="alert">
              <strong className="font-bold">ত্রুটি: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); handleSendOTP(); }} className="space-y-6">
              <div>
                <Label htmlFor="patientName">রোগীর নাম</Label>
                <Input id="patientName" name="patientName" type="text" required value={formData.patientName} onChange={handleChange} placeholder="রোগীর পুরো নাম" className="mt-1" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="patientAge">রোগীর বয়স</Label>
                  <Input id="patientAge" name="patientAge" type="number" required value={formData.patientAge} onChange={handleChange} placeholder="বয়স (বছর)" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="bloodGroup">রক্তের গ্রুপ</Label>
                  <Select value={formData.bloodGroup} onValueChange={(value) => handleSelectChange('bloodGroup', value)} required>
                    <SelectTrigger id="bloodGroup" className="mt-1"><SelectValue placeholder="রক্তের গ্রুপ নির্বাচন" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem><SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem><SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem><SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem><SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="bloodUnits">রক্তের পরিমাণ (ব্যাগ)</Label>
                  <Input id="bloodUnits" name="bloodUnits" type="number" min="1" required value={formData.bloodUnits} onChange={handleChange} placeholder="কত ব্যাগ প্রয়োজন" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="urgency">জরুরি অবস্থা</Label>
                   <Select value={formData.urgency} onValueChange={(value) => handleSelectChange('urgency', value)} required>
                    <SelectTrigger id="urgency" className="mt-1"><SelectValue placeholder="জরুরি অবস্থা নির্বাচন" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="খুব জরুরি">খুব জরুরি (Very Urgent)</SelectItem>
                      <SelectItem value="জরুরি">জরুরি (Urgent)</SelectItem>
                      <SelectItem value="মাঝারি">মাঝারি (Medium)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="hospitalName">হাসপাতালের নাম</Label>
                <Input id="hospitalName" name="hospitalName" type="text" required value={formData.hospitalName} onChange={handleChange} placeholder="হাসপাতালের নাম" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="hospitalAddress">হাসপাতালের ঠিকানা</Label>
                <Input id="hospitalAddress" name="hospitalAddress" type="text" value={formData.hospitalAddress} onChange={handleChange} placeholder="সংক্ষিপ্ত ঠিকানা" className="mt-1" />
              </div>

               <div>
                <Label>হাসপাতালের বিস্তারিত ঠিকানা</Label>
                <div className="mt-1">
                  <LocationSelector 
                    onChange={handleLocationChange} 
                    initialValues={{ division: formData.division, district: formData.district, upazila: formData.upazila, area: formData.area }}
                  />
                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contactName">যোগাযোগকারীর নাম</Label>
                  <Input id="contactName" name="contactName" type="text" required value={formData.contactName} onChange={handleChange} placeholder="আপনার নাম" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="contactPhone">যোগাযোগকারীর মোবাইল</Label>
                  <Input id="contactPhone" name="contactPhone" type="tel" required value={formData.contactPhone} onChange={handleChange} placeholder="আপনার মোবাইল নম্বর" className="mt-1" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="relationToPatient">রোগীর সাথে সম্পর্ক</Label>
                <Input id="relationToPatient" name="relationToPatient" type="text" required value={formData.relationToPatient} onChange={handleChange} placeholder="যেমন: ভাই, বোন, বন্ধু" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="reason">রক্তের কারণ</Label>
                <Textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} placeholder="কেন রক্তের প্রয়োজন, সংক্ষেপে লিখুন" className="mt-1" />
              </div>

              <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? 'ওটিপি পাঠানো হচ্ছে...' : 'ওটিপি পাঠান'} <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}

          {step === 2 && (
             <form onSubmit={handleVerifyOTP} className="space-y-6">
                <p className="text-sm text-gray-600 dark:text-gray-300">আপনার মোবাইল নম্বর <span className="font-semibold text-primary">{formData.contactPhone}</span> এ একটি ৬-ডিজিটের ওটিপি পাঠানো হয়েছে। অনুগ্রহ করে নিচের ঘরে ওটিপিটি লিখুন।</p>
                <div>
                  <Label htmlFor="requestorPhoneOTP">ওটিপি</Label>
                  <Input 
                    id="requestorPhoneOTP" 
                    name="requestorPhoneOTP" 
                    type="text" 
                    maxLength="6"
                    required 
                    value={formData.requestorPhoneOTP} 
                    onChange={handleChange} 
                    placeholder="৬-ডিজিটের ওটিপি" 
                    className="mt-1 tracking-widest text-center" 
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" className="w-full sm:flex-1 bg-primary text-white hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? 'সাবমিট হচ্ছে...' : 'আবেদন জমা দিন'} <Send className="ml-2 h-4 w-4" />
                  </Button>
                   <Button type="button" variant="outline" onClick={generateOTP} className="w-full sm:flex-1" disabled={isLoading}>
                    পুনরায় ওটিপি পাঠান <RefreshCcw className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                 <Button type="button" variant="ghost" onClick={() => { setStep(1); setError(''); }} className="w-full text-primary" disabled={isLoading}>
                    ফর্ম এ ফিরে যান
                  </Button>
             </form>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default UrgentBloodRequestPage;
