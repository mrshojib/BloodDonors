
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Calendar, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const DonorCard = ({ donor }) => {
  const {
    name,
    bloodGroup,
    division,
    district,
    upazila,
    area,
    phone,
    availability,
    profileImage
  } = donor;

  const username = name.toLowerCase().replace(/\s+/g, '');

  return (
    <motion.div
      className="card-hover rounded-xl bg-white shadow-md border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src={profileImage} alt={name} />
              <AvatarFallback className="bg-primary text-white">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <h3 className="text-lg font-semibold">{name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="mr-1 h-3 w-3" />
                <span>{area}, {upazila}, {district}, {division}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">{bloodGroup}</span>
            <span className="text-xs text-gray-500">রক্তের গ্রুপ</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="mr-1 h-3 w-3 text-primary" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="mr-1 h-3 w-3 text-primary" />
            <span>{availability ? 'উপলব্ধ' : 'অনুপলব্ধ'}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <Link to={`/profile/${username}`}>
            <Button variant="outline" size="sm">
              প্রোফাইল দেখুন
            </Button>
          </Link>
          <a href={`tel:${phone}`}>
            <Button variant="primary" size="sm" className="bg-primary text-white hover:bg-primary/90">
              কল করুন
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default DonorCard;
