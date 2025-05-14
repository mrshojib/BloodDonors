
import React from 'react';
import { Users, UserX, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AdminStatsCards = ({ users }) => {
  const totalUsers = users.length;
  const availableDonors = users.filter(user => user.availability).length;
  const unavailableDonors = users.filter(user => !user.availability).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">মোট ব্যবহারকারী</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsers}</div>
          <p className="text-xs text-muted-foreground">
            সিস্টেমে নিবন্ধিত মোট ব্যবহারকারী
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">উপলব্ধ রক্তদাতা</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{availableDonors}</div>
          <p className="text-xs text-muted-foreground">
            বর্তমানে রক্তদানের জন্য উপলব্ধ
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">অনুপলব্ধ রক্তদাতা</CardTitle>
          <UserX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{unavailableDonors}</div>
          <p className="text-xs text-muted-foreground">
            বর্তমানে রক্তদানের জন্য অনুপলব্ধ
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
