
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import LocationSelector from '@/components/common/LocationSelector';

export const RegistrationFormFields = ({ formData, handleChange, handleSelectChange, handleCheckboxChange, handleLocationChange }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label htmlFor="name">নাম</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="আপনার পূর্ণ নাম লিখুন"
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="email">ইমেইল</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="আপনার ইমেইল লিখুন"
          className="mt-1"
        />
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label htmlFor="phone">মোবাইল নম্বর</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="আপনার মোবাইল নম্বর লিখুন"
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="bloodGroup">রক্তের গ্রুপ</Label>
        <Select
          value={formData.bloodGroup}
          onValueChange={(value) => handleSelectChange('bloodGroup', value)}
          required
        >
          <SelectTrigger id="bloodGroup" className="mt-1">
            <SelectValue placeholder="রক্তের গ্রুপ নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label htmlFor="gender">লিঙ্গ</Label>
        <Select
          value={formData.gender}
          onValueChange={(value) => handleSelectChange('gender', value)}
          required
        >
          <SelectTrigger id="gender" className="mt-1">
            <SelectValue placeholder="লিঙ্গ নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="পুরুষ">পুরুষ</SelectItem>
            <SelectItem value="মহিলা">মহিলা</SelectItem>
            <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="age">বয়স</Label>
        <Input
          id="age"
          name="age"
          type="number"
          required
          min="18"
          max="65"
          value={formData.age}
          onChange={handleChange}
          placeholder="আপনার বয়স লিখুন"
          className="mt-1"
        />
      </div>
    </div>
    
    <div>
      <Label htmlFor="address">ঠিকানা</Label>
      <Input
        id="address"
        name="address"
        type="text"
        value={formData.address}
        onChange={handleChange}
        placeholder="আপনার ঠিকানা লিখুন"
        className="mt-1"
      />
    </div>
    
    <div>
      <Label>বিস্তারিত ঠিকানা</Label>
      <div className="mt-1">
        <LocationSelector 
          onChange={handleLocationChange} 
          initialValues={{
            division: formData.division,
            district: formData.district,
            upazila: formData.upazila,
            area: formData.area,
          }}
        />
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label htmlFor="password">পাসওয়ার্ড</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="পাসওয়ার্ড লিখুন"
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="পাসওয়ার্ড আবার লিখুন"
          className="mt-1"
        />
      </div>
    </div>
    
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="availability" 
        checked={formData.availability}
        onCheckedChange={(checked) => handleCheckboxChange('availability', checked)}
      />
      <label
        htmlFor="availability"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        আমি রক্তদানের জন্য উপলব্ধ
      </label>
    </div>
  </div>
);
