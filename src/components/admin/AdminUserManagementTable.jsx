
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminUserTableRow } from '@/components/admin/AdminUserTableRow';

export const AdminUserManagementTable = ({ users }) => {
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredUsers = () => {
    if (activeTab === "available") {
      return users.filter(user => user.availability);
    }
    if (activeTab === "unavailable") {
      return users.filter(user => !user.availability);
    }
    return users;
  };

  const currentUsers = getFilteredUsers();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">সকল ব্যবহারকারী</TabsTrigger>
        <TabsTrigger value="available">উপলব্ধ রক্তদাতা</TabsTrigger>
        <TabsTrigger value="unavailable">অনুপলব্ধ রক্তদাতা</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-6">
        <UserTableContent users={currentUsers} />
      </TabsContent>
      
      <TabsContent value="available" className="mt-6">
        <UserTableContent users={currentUsers} />
      </TabsContent>
      
      <TabsContent value="unavailable" className="mt-6">
        <UserTableContent users={currentUsers} />
      </TabsContent>
    </Tabs>
  );
};

const UserTableContent = ({ users }) => (
  <div className="rounded-md border">
    <div className="hidden md:grid grid-cols-6 gap-4 p-4 font-medium border-b bg-gray-50">
      <div className="col-span-2">ব্যবহারকারী</div>
      <div>রক্তের গ্রুপ</div>
      <div>যোগাযোগ</div>
      <div>অবস্থান</div>
      <div>অ্যাকশন</div>
    </div>
    
    <div className="divide-y">
      {users.length > 0 ? (
        users.map((user, index) => (
          <AdminUserTableRow key={user.uid || index} user={user} />
        ))
      ) : (
        <div className="p-8 text-center">
          <p className="text-gray-500">কোন ব্যবহারকারী পাওয়া যায়নি</p>
        </div>
      )}
    </div>
  </div>
);
