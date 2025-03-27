import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication state
    localStorage.removeItem('isAuthenticated');
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800">Dashboard</span>
            </div>
            <div>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Active Orders</h2>
            <p className="text-4xl font-bold text-blue-600">0</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Total Orders</h2>
            <p className="text-4xl font-bold text-green-600">0</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account Balance</h2>
            <p className="text-4xl font-bold text-red-600">$0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;