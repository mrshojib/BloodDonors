
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, UserPlus, Heart, Users, ShieldCheck, CheckSquare, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = () => (
  <section className="hero-section-bg py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        রক্তদাতা খুঁজুন, জীবন বাঁচান
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-red-100 mb-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        আমাদের প্লাটফর্মে যোগ দিন এবং জরুরি প্রয়োজনে রক্তদাতা খুঁজে পেতে সাহায্য করুন। আপনার একটি রক্তদান অনেক জীবন বাঁচাতে পারে।
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link to="/register">
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100 w-full sm:w-auto">
            <UserPlus className="mr-2 h-5 w-5" />
            রক্তদাতা হিসেবে রেজিস্ট্রেশন করুন
          </Button>
        </Link>
        <Link to="/search">
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto">
            <Search className="mr-2 h-5 w-5" />
            রক্তদাতা খুঁজুন
          </Button>
        </Link>
      </motion.div>
    </div>
  </section>
);

const InfoCard = ({ icon, title, description, delay = 0, linkTo }) => {
  const CardContent = () => (
    <motion.div
      className="info-card text-center h-full flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="info-card-icon mx-auto">
        {icon}
      </div>
      <h3 className="info-card-title">{title}</h3>
      <p className="info-card-text flex-grow">{description}</p>
      {linkTo && (
        <Button variant="link" className="mt-4 text-primary">আরও জানুন</Button>
      )}
    </motion.div>
  );

  return linkTo ? <Link to={linkTo} className="block h-full">{CardContent()}</Link> : CardContent();
};


const HowItWorksSection = () => (
  <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="section-title">কিভাবে কাজ করে</h2>
      <p className="section-subtitle">আমাদের প্ল্যাটফর্ম ব্যবহার করে সহজেই রক্তদাতা খুঁজুন বা রক্তদানের জন্য আবেদন করুন।</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <InfoCard 
          icon={<UserPlus size={24} />}
          title="রক্তদাতা রেজিস্ট্রেশন"
          description="আপনার তথ্য দিয়ে রেজিস্টার করুন এবং সম্ভাব্য রক্তদাতা হিসেবে যোগ দিন।"
          linkTo="/register"
        />
        <InfoCard 
          icon={<Search size={24} />}
          title="রক্তদাতা খুঁজুন"
          description="রক্তের গ্রুপ এবং অবস্থান অনুযায়ী উপযুক্ত রক্তদাতা খুঁজে পেতে সাহায্য করুন।"
          delay={0.2}
          linkTo="/search"
        />
        <InfoCard 
          icon={<ShieldAlert size={24} />}
          title="জরুরি রক্তের আবেদন"
          description="রক্তের প্রয়োজন? আপনার জরুরি রক্তের আবেদন পোস্ট করুন এবং নিকটবর্তী রক্তদাতার থেকে সহায়তা পান।"
          delay={0.4}
          linkTo="/urgent-request"
        />
      </div>
    </div>
  </section>
);

const ImportanceOfDonationSection = () => (
  <section className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="section-title">রক্তদানের গুরুত্ব</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <InfoCard
          icon={<Heart className="text-primary" size={28} />}
          title="জরুরি প্রয়োজন পূরণ"
          description="দুর্ঘটনা, অপারেশন, থ্যালাসেমিয়া, ক্যানসার রোগীদের জন্য রক্তের প্রয়োজন হয়।"
        />
        <InfoCard
          icon={<Users className="text-primary" size={28} />}
          title="সামাজিক দায়িত্ব"
          description="রক্তদান একটি মহৎ কাজ। আপনার দেয়া রক্ত অন্য কারো জীবন বাঁচাতে পারে।"
          delay={0.15}
        />
        <InfoCard
          icon={<ShieldCheck className="text-primary" size={28} />}
          title="স্বাস্থ্য সুবিধা"
          description="নিয়মিত রক্তদানে হৃদরোগের ঝুঁকি কমে এবং রক্ত পরীক্ষা করার সুযোগ হয়।"
          delay={0.3}
        />
        <InfoCard
          icon={<Search className="text-primary" size={28} />}
          title="সহজে রক্তদাতা"
          description="আমাদের প্ল্যাটফর্মে সহজেই আপনার এলাকায় রক্তদাতা খুঁজে পাওয়া যায়।"
          delay={0.45}
        />
      </div>
    </div>
  </section>
);

const FaqItem = ({ question, answer, delay = 0 }) => (
  <motion.div
    className="faq-item"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
  >
    <h3 className="faq-question">{question}</h3>
    <p className="faq-answer">{answer}</p>
  </motion.div>
);

const FaqSection = () => (
  <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="section-title">সাধারণ প্রশ্ন ও উত্তর</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FaqItem
          question="কে রক্তদান করতে পারে?"
          answer="১৮-৬০ বছর বয়সের যেকোনো সুস্থ মানুষ রক্তদান করতে পারেন। পুরুষদের ক্ষেত্রে তিন মাস এবং মহিলাদের ক্ষেত্রে চার মাস অন্তর রক্তদান করা যায়।"
        />
        <FaqItem
          question="রক্তদান করলে কি আমার শরীরের ক্ষতি হবে?"
          answer="না, বরং রক্তদান করলে শরীরে নতুন রক্ত তৈরি হয় এবং হৃদরোগের ঝুঁকি কমে। তবে কোন রোগ থাকলে বা দুর্বল অবস্থায় রক্তদান না করাই ভালো।"
          delay={0.1}
        />
        <FaqItem
          question="কত পরিমাণ রক্ত নেওয়া হয়?"
          answer="সাধারণত এক ইউনিট অর্থাৎ প্রায় ৩৫০-৪৫০ মিলি রক্ত নেওয়া হয়। এই পরিমাণ রক্ত দেওয়ার পর শরীর দ্রুত পুনরায় সেই রক্ত তৈরি করে নেয়।"
          delay={0.2}
        />
        <FaqItem
          question="রক্তদানের আগে কি কি প্রস্তুতি নেওয়া উচিত?"
          answer="রক্তদানের আগে ভালো ঘুম নেওয়া, পর্যাপ্ত পানি পান করা এবং সুষম খাবার খাওয়া উচিত। অ্যালকোহল বা ধূমপান থেকে বিরত থাকুন এবং হালকা নাস্তা করে আসুন।"
          delay={0.3}
        />
        <div className="md:col-span-2">
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h3 className="faq-question flex items-center"><CheckSquare size={20} className="mr-2 text-green-600 dark:text-green-400" />রক্তদানের পর করণীয় কী?</h3>
            <ul className="faq-answer list-disc list-inside space-y-1 mt-2">
              <li>বিশ্রাম নিন (৫-১৫ মিনিট)।</li>
              <li>হালকা খাবার ও পানি গ্রহণ করুন।</li>
              <li>আগামী ২৪ ঘণ্টা বেশি পানি পান করুন।</li>
              <li>ভারি শারীরিক কাজ বা ব্যায়াম এড়িয়ে চলুন।</li>
              <li>ব্যান্ডেজ ৩-৪ ঘণ্টা রাখুন।</li>
              <li>ধূমপান ও অ্যালকোহল থেকে বিরত থাকুন (৮-২৪ ঘণ্টা)।</li>
              <li>অসুস্থ বোধ করলে বিশ্রাম নিন ও পানি পান করুন।</li>
            </ul>
          </motion.div>
        </div>
        <motion.div
            className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg shadow md:col-span-2 border-l-4 border-red-500 dark:border-red-400"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <h3 className="faq-question text-red-700 dark:text-red-300">কখন ডাক্তারের পরামর্শ নিতে হবে?</h3>
            <ul className="faq-answer list-disc list-inside space-y-1 mt-2 text-red-600 dark:text-red-400">
              <li>মাথা ঘোরা না কমলে।</li>
              <li>যেখানে সূঁচ দেওয়া হয়েছিল, সেই জায়গাটা ফুলে গেলে বা রক্ত পড়া বন্ধ না হলে।</li>
              <li>জ্বর, বমি বা খুব দুর্বলতা লাগলে।</li>
            </ul>
          </motion.div>
      </div>
    </div>
  </section>
);


const HomePage = () => {
  const { getAllUsers } = useAuth();
  const [bloodGroupCounts, setBloodGroupCounts] = useState({});
  
  useEffect(() => {
    const users = getAllUsers();
    const counts = {};
    users.forEach(user => {
      if (user.bloodGroup) {
        counts[user.bloodGroup] = (counts[user.bloodGroup] || 0) + 1;
      }
    });
    setBloodGroupCounts(counts);
  }, [getAllUsers]);

  return (
    <div className="bg-white dark:bg-gray-900">
      <HeroSection />
      <HowItWorksSection />
      <ImportanceOfDonationSection />
      <FaqSection />
    </div>
  );
};

export default HomePage;
