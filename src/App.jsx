import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } 
      />
      {/* Catch-all route to redirect to login if no match */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;