import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;