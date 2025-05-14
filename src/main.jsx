
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@/index.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { RequestProvider } from '@/contexts/RequestContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RequestProvider>
          <App />
          <Toaster />
        </RequestProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
