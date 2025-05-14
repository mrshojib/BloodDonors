
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle, XCircle, Edit3, Trash2 } from 'lucide-react';
import { useRequests } from '@/contexts/RequestContext';
import { useToast } from '@/components/ui/use-toast.jsx';

export const AdminRequestManagementTable = ({ requests }) => {
  const { updateRequestStatus } = useRequests();
  const { toast } = useToast();

  const handleStatusUpdate = (requestId, newStatus) => {
    updateRequestStatus(requestId, newStatus);
    toast({
      title: "স্ট্যাটাস আপডেট!",
      description: `আবেদনের স্ট্যাটাস '${newStatus}' এ পরিবর্তন করা হয়েছে।`,
      className: newStatus === 'approved' ? 'bg-green-500 text-white' : newStatus === 'rejected' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white',
    });
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'approved': return 'default'; 
      case 'rejected': return 'destructive';
      case 'completed': return 'outline';
      default: return 'secondary';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'বিবেচনাধীন';
      case 'approved': return 'অনুমোদিত';
      case 'rejected': return 'প্রত্যাখ্যাত';
      case 'completed': return 'সম্পন্ন';
      default: return status;
    }
  };


  if (!requests || requests.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400 py-8">কোনো রক্তের আবেদন পাওয়া যায়নি।</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-700/50">
            <TableHead className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">রোগীর নাম</TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">রক্তের গ্রুপ</TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">হাসপাতাল</TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">যোগাযোগকারী</TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">স্ট্যাটাস</TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">আবেদনের তারিখ</TableHead>
            <TableHead className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">পদক্ষেপ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {requests.map((request) => (
            <TableRow key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150">
              <TableCell className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{request.patientName}</TableCell>
              <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                 <Badge variant="outline" className="text-primary border-primary/50 bg-primary/10 text-xs px-2 py-0.5">{request.bloodGroup}</Badge>
              </TableCell>
              <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{request.hospitalName}</TableCell>
              <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                <div>{request.contactName}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">{request.contactPhone}</div>
              </TableCell>
              <TableCell className="px-4 py-3 whitespace-nowrap text-sm">
                <Badge variant={getStatusBadgeVariant(request.status)} className="text-xs px-2 py-0.5 capitalize">
                  {getStatusText(request.status)}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {new Date(request.requestedAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'short', day: 'numeric' })}
              </TableCell>
              <TableCell className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700 h-8 w-8" onClick={() => alert('View details for ' + request.patientName)}>
                    <Eye size={16} />
                  </Button>
                  {request.status === 'pending' && (
                    <>
                      <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-700 h-8 w-8" onClick={() => handleStatusUpdate(request.id, 'approved')}>
                        <CheckCircle size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 h-8 w-8" onClick={() => handleStatusUpdate(request.id, 'rejected')}>
                        <XCircle size={16} />
                      </Button>
                    </>
                  )}
                  {request.status === 'approved' && (
                     <Button variant="ghost" size="icon" className="text-teal-500 hover:text-teal-700 h-8 w-8" onClick={() => handleStatusUpdate(request.id, 'completed')}>
                        <CheckCircle size={16} className="text-teal-500"/> <span className="sr-only">সম্পন্ন করুন</span>
                      </Button>
                  )}
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 h-8 w-8" onClick={() => alert('Edit request for ' + request.patientName)}>
                    <Edit3 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
