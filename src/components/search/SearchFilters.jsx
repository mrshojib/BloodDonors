
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import LocationSelector from '@/components/common/LocationSelector';
import { Input } from '@/components/ui/input';

export const SearchFilters = ({
  searchCriteria,
  setSearchCriteria,
  handleSearch,
  clearFilters,
  isFiltering,
  setIsFiltering,
  isDialogOpen,
  setIsDialogOpen,
  handleLocationChange
}) => {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const divisions = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'];

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:block bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <Label htmlFor="bloodGroup">রক্তের গ্রুপ</Label>
            <Select
              value={searchCriteria.bloodGroup || "placeholder"}
              onValueChange={(value) => setSearchCriteria(prev => ({ ...prev, bloodGroup: value === "placeholder" ? "" : value }))}
            >
              <SelectTrigger id="bloodGroup" className="mt-1">
                <SelectValue placeholder="রক্তের গ্রুপ নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placeholder" disabled>রক্তের গ্রুপ নির্বাচন করুন</SelectItem>
                <SelectItem value="all_groups">সকল গ্রুপ</SelectItem>
                {bloodGroups.map(group => <SelectItem key={group} value={group}>{group}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="division">বিভাগ</Label>
            <Select
              value={searchCriteria.division || "placeholder"}
              onValueChange={(value) => setSearchCriteria(prev => ({ ...prev, division: value === "placeholder" ? "" : value, district: '', upazila: '', area: '' }))}
            >
              <SelectTrigger id="division" className="mt-1">
                <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placeholder" disabled>বিভাগ নির্বাচন করুন</SelectItem>
                <SelectItem value="all_divisions">সকল বিভাগ</SelectItem>
                {divisions.map(div => <SelectItem key={div} value={div}>{div}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="areaDesktop">এলাকা</Label>
            <Input
              id="areaDesktop"
              name="area"
              value={searchCriteria.area}
              onChange={(e) => setSearchCriteria(prev => ({ ...prev, area: e.target.value }))}
              placeholder="এলাকা লিখুন"
              className="mt-1"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="availabilityDesktop" 
              checked={searchCriteria.availability}
              onCheckedChange={(checked) => setSearchCriteria(prev => ({ ...prev, availability: checked }))}
            />
            <Label htmlFor="availabilityDesktop" className="text-sm font-medium">শুধু উপলব্ধ</Label>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
            <Button 
              onClick={handleSearch}
              className="bg-primary text-white hover:bg-primary/90"
            >
              <Search className="mr-2 h-4 w-4" />
              খুঁজুন
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsFiltering(!isFiltering)}
            >
              <Filter className="mr-2 h-4 w-4" />
              {isFiltering ? 'কম ফিল্টার' : 'আরও ফিল্টার'}
            </Button>
            {(searchCriteria.bloodGroup || searchCriteria.division || searchCriteria.area) && (
              <Button 
                variant="ghost" 
                onClick={clearFilters}
              >
                <X className="mr-2 h-4 w-4" />
                মুছুন
              </Button>
            )}
        </div>
        
        {isFiltering && (
          <motion.div 
            className="mt-6 border-t pt-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LocationSelector onChange={handleLocationChange} initialValues={searchCriteria} />
          </motion.div>
        )}
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="bloodGroupMobile">রক্তের গ্রুপ</Label>
            <Select
              value={searchCriteria.bloodGroup || "placeholder"}
              onValueChange={(value) => setSearchCriteria(prev => ({ ...prev, bloodGroup: value === "placeholder" ? "" : value }))}
            >
              <SelectTrigger id="bloodGroupMobile" className="mt-1">
                <SelectValue placeholder="রক্তের গ্রুপ নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                 <SelectItem value="placeholder" disabled>রক্তের গ্রুপ নির্বাচন করুন</SelectItem>
                <SelectItem value="all_groups">সকল গ্রুপ</SelectItem>
                {bloodGroups.map(group => <SelectItem key={group} value={group}>{group}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="availabilityMobile" 
              checked={searchCriteria.availability}
              onCheckedChange={(checked) => setSearchCriteria(prev => ({ ...prev, availability: checked }))}
            />
            <Label htmlFor="availabilityMobile" className="text-sm font-medium">শুধু উপলব্ধ রক্তদাতা</Label>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={handleSearch}
              className="flex-1 bg-primary text-white hover:bg-primary/90"
            >
              <Search className="mr-2 h-4 w-4" />
              খুঁজুন
            </Button>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <Filter className="mr-2 h-4 w-4" />
                  আরও ফিল্টার
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>অতিরিক্ত ফিল্টার</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <LocationSelector onChange={handleLocationChange} initialValues={searchCriteria} />
                   <div>
                      <Label htmlFor="areaMobile">এলাকা</Label>
                      <Input
                        id="areaMobile"
                        name="area"
                        value={searchCriteria.area}
                        onChange={(e) => setSearchCriteria(prev => ({ ...prev, area: e.target.value }))}
                        placeholder="এলাকা লিখুন"
                        className="mt-1"
                      />
                    </div>
                  <Button 
                    onClick={() => { handleSearch(); setIsDialogOpen(false); }}
                    className="w-full bg-primary text-white hover:bg-primary/90"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    ফিল্টার প্রয়োগ করুন
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {(searchCriteria.bloodGroup || searchCriteria.division || searchCriteria.area) && (
            <Button 
              variant="ghost" 
              onClick={clearFilters}
              className="w-full"
            >
              <X className="mr-2 h-4 w-4" />
              ফিল্টার মুছুন
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
