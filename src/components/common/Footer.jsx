
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, ShieldAlert } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 mr-3 bg-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                </svg>
              </div>
              <span className="font-bold text-2xl text-white">রক্তবন্ধন</span>
            </div>
            <p className="text-red-100 dark:text-red-200 text-sm mb-4">
              রক্তদাতা এবং রক্তের প্রয়োজন রয়েছে এমন ব্যক্তিদের মধ্যে সেতুবন্ধন তৈরি করা আমাদের লক্ষ্য।
            </p>
            <div className="flex space-x-3">
              <a href="#" className="footer-icon"><Facebook size={20} /></a>
              <a href="#" className="footer-icon"><Twitter size={20} /></a>
              <a href="#" className="footer-icon"><Instagram size={20} /></a>
              <a href="#" className="footer-icon"><Youtube size={20} /></a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">দ্রুত লিংক</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="footer-link">হোম</Link></li>
              <li><Link to="/register" className="footer-link">রক্তদাতা রেজিস্ট্রেশন</Link></li>
              <li><Link to="/search" className="footer-link">রক্তদাতা খুঁজুন</Link></li>
              <li><Link to="/urgent-request" className="footer-link flex items-center"><ShieldAlert size={16} className="mr-1.5" /> জরুরি রক্তের আবেদন</Link></li>
              <li><Link to="#" className="footer-link">আমাদের সম্পর্কে</Link></li>
              <li><Link to="/login" className="footer-link">প্রোফাইল</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">যোগাযোগ করুন</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-red-100 dark:text-red-200">
                <MapPin size={16} className="mr-2 flex-shrink-0" />
                <span>ময়মনসিংহ সদর, ময়মনসিংহ, বাংলাদেশ</span>
              </li>
              <li className="flex items-center text-red-100 dark:text-red-200">
                <Phone size={16} className="mr-2 flex-shrink-0" />
                <a href="tel:01401202647" className="footer-link">01401202647</a>
              </li>
              <li className="flex items-center text-red-100 dark:text-red-200">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <a href="mailto:shojibhn360@gmail.com" className="footer-link">shojibhn360@gmail.com</a>
              </li>
               <li className="flex items-center text-red-100 dark:text-red-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>২৪/৭ সার্ভিস</span>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex items-center justify-center">
             <img  class="rounded-lg opacity-80 h-auto max-h-48 w-full object-cover" alt="Blood donation awareness graphic" src="https://images.unsplash.com/photo-1643207771058-8fb65a2330c9" />
          </div>
        </div>
        
        <div className="border-t border-red-700 dark:border-red-500 mt-8 pt-6 text-center text-red-200 dark:text-red-300 text-sm">
          <p className="flex items-center justify-center">
            &copy; {new Date().getFullYear()} রক্তবন্ধন। সর্বস্বত্ব সংরক্ষিত।
          </p>
           <p className="mt-1">ডিজাইন ও ডেভেলপ করেছে: <a href="https://www.facebook.com/shojib.hossain.niloy" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline footer-link">সজিব হোসেন নিলয়</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
