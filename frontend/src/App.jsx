import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import FacilitiesAssetsPage from './pages/FacilitiesAssetsPage';

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'glass text-white font-bold',
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resources" element={<FacilitiesAssetsPage />} />
      </Routes>
    </>
  );
}

export default App;
