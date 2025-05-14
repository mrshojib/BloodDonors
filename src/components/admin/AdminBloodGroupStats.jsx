
import React from 'react';
import { Droplet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AdminBloodGroupStats = ({ users }) => {
  const bloodGroupCounts = {};
  users.forEach(user => {
    if (user.bloodGroup) {
      bloodGroupCounts[user.bloodGroup] = (bloodGroupCounts[user.bloodGroup] || 0) + 1;
    }
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>রক্তের গ্রুপ অনুযায়ী রক্তদাতা</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {bloodGroups.map(group => (
            <div key={group} className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="mr-4 bg-primary/10 p-2 rounded-full">
                <Droplet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold">{group}</p>
                <p className="text-sm text-gray-500">{bloodGroupCounts[group] || 0} জন</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
