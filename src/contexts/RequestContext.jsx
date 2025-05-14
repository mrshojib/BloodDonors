
import React, { createContext, useContext, useState, useEffect } from 'react';

const RequestContext = createContext();

export function useRequests() {
  return useContext(RequestContext);
}

export function RequestProvider({ children }) {
  const [requests, setRequests] = useState(() => {
    const localData = localStorage.getItem('bloodRequests');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('bloodRequests', JSON.stringify(requests));
  }, [requests]);

  const addRequest = (requestData) => {
    const newRequest = {
      id: Date.now().toString(), // Simple unique ID
      ...requestData,
      createdAt: new Date().toISOString(),
      status: 'pending', // Initial status
    };
    setRequests(prevRequests => [newRequest, ...prevRequests]);
  };

  const updateRequestStatus = (requestId, status) => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status } : req
      )
    );
  };
  
  const getRequestsByStatus = (status) => {
    return requests.filter(req => req.status === status);
  };

  const getAllRequests = () => {
    return requests;
  };

  const value = {
    requests,
    addRequest,
    updateRequestStatus,
    getRequestsByStatus,
    getAllRequests,
  };

  return (
    <RequestContext.Provider value={value}>
      {children}
    </RequestContext.Provider>
  );
}
