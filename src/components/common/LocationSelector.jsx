
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const locations = {
  divisions: [
    'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'
  ],
  districts: {
    'ঢাকা': ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'মানিকগঞ্জ', 'মুন্সিগঞ্জ'],
    'চট্টগ্রাম': ['চট্টগ্রাম', 'কক্সবাজার', 'কুমিল্লা', 'ফেনী', 'নোয়াখালী'],
    'রাজশাহী': ['রাজশাহী', 'নাটোর', 'পাবনা', 'সিরাজগঞ্জ', 'বগুড়া'],
    'খুলনা': ['খুলনা', 'যশোর', 'সাতক্ষীরা', 'বাগেরহাট', 'ঝিনাইদহ'],
    'বরিশাল': ['বরিশাল', 'পটুয়াখালী', 'পিরোজপুর', 'ভোলা', 'ঝালকাঠি'],
    'সিলেট': ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ'],
    'রংপুর': ['রংপুর', 'দিনাজপুর', 'কুড়িগ্রাম', 'লালমনিরহাট', 'নীলফামারী'],
    'ময়মনসিংহ': ['ময়মনসিংহ', 'জামালপুর', 'শেরপুর', 'নেত্রকোণা']
  },
  upazilas: {
    'ঢাকা': ['মিরপুর', 'মোহাম্মদপুর', 'গুলশান', 'বনানী', 'ধানমন্ডি'],
    'গাজীপুর': ['গাজীপুর সদর', 'কালিয়াকৈর', 'কাপাসিয়া', 'শ্রীপুর', 'টঙ্গী'],
    'চট্টগ্রাম': ['হালিশহর', 'পতেঙ্গা', 'বাকলিয়া', 'চান্দগাঁও', 'কর্ণফুলী'],
    'রাজশাহী': ['বোয়ালিয়া', 'মতিহার', 'শাহমখদুম', 'রাজপাড়া', 'কাটাখালি'],
    'খুলনা': ['খুলনা সদর', 'ডুমুরিয়া', 'ফুলতলা', 'দাকোপ', 'বটিয়াঘাটা'],
    'বরিশাল': ['বরিশাল সদর', 'বাকেরগঞ্জ', 'বাবুগঞ্জ', 'মেহেন্দিগঞ্জ', 'আগৈলঝাড়া'],
    'সিলেট': ['সিলেট সদর', 'জকিগঞ্জ', 'বিশ্বনাথ', 'গোলাপগঞ্জ', 'কানাইঘাট'],
    'রংপুর': ['রংপুর সদর', 'গঙ্গাচড়া', 'বদরগঞ্জ', 'তারাগঞ্জ', 'পীরগঞ্জ'],
    'ময়মনসিংহ': ['ময়মনসিংহ সদর', 'ত্রিশাল', 'ভালুকা', 'মুক্তাগাছা', 'ফুলবাড়িয়া']
  }
};

const LocationSelector = ({ onChange, initialValues = {} }) => {
  const [division, setDivision] = useState(initialValues.division || "placeholder_division");
  const [district, setDistrict] = useState(initialValues.district || "placeholder_district");
  const [upazila, setUpazila] = useState(initialValues.upazila || "placeholder_upazila");
  const [area, setArea] = useState(initialValues.area || '');

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    if (division && division !== "placeholder_division") {
      setDistricts(locations.districts[division] || []);
      setDistrict("placeholder_district");
      setUpazila("placeholder_upazila");
    } else {
      setDistricts([]);
      setDistrict("placeholder_district");
      setUpazila("placeholder_upazila");
    }
  }, [division]);

  useEffect(() => {
    if (district && district !== "placeholder_district") {
      setUpazilas(locations.upazilas[district] || []);
      setUpazila("placeholder_upazila");
    } else {
      setUpazilas([]);
      setUpazila("placeholder_upazila");
    }
  }, [district]);

  useEffect(() => {
    onChange({
      division: division === "placeholder_division" ? "" : division,
      district: district === "placeholder_district" ? "" : district,
      upazila: upazila === "placeholder_upazila" ? "" : upazila,
      area
    });
  }, [division, district, upazila, area, onChange]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="division">বিভাগ</Label>
          <Select
            value={division}
            onValueChange={setDivision}
          >
            <SelectTrigger id="division">
              <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="placeholder_division" disabled>বিভাগ নির্বাচন করুন</SelectItem>
              {locations.divisions.map((div) => (
                <SelectItem key={div} value={div}>
                  {div}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="district">জেলা</Label>
          <Select
            value={district}
            onValueChange={setDistrict}
            disabled={!division || division === "placeholder_division"}
          >
            <SelectTrigger id="district">
              <SelectValue placeholder="জেলা নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="placeholder_district" disabled>জেলা নির্বাচন করুন</SelectItem>
              {districts.map((dist) => (
                <SelectItem key={dist} value={dist}>
                  {dist}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="upazila">উপজেলা</Label>
          <Select
            value={upazila}
            onValueChange={setUpazila}
            disabled={!district || district === "placeholder_district"}
          >
            <SelectTrigger id="upazila">
              <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="placeholder_upazila" disabled>উপজেলা নির্বাচন করুন</SelectItem>
              {upazilas.map((upz) => (
                <SelectItem key={upz} value={upz}>
                  {upz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="area">এলাকা</Label>
          <input
            id="area"
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="আপনার এলাকা লিখুন"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
