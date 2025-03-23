import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/hydraproxy-logo.svg';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would handle logout properly
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="bg-white w-64 fixed h-full border-r border-gray-200 flex flex-col">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <img src={logo} alt="HydraProxy" className="h-8" />
        </div>

        <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
          <div className="px-4 mb-5">
            <a href="#" className="flex items-center text-indigo-600 font-medium">
              <svg className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" />
              </svg>
              Dashboard
            </a>
          </div>

          <div className="px-4 mb-3">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
              PROXY NETWORKS
            </h3>
          </div>

          <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            International Proxy Mobile
          </a>

          <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h3zm7 0a2 2 0 012 2v10a2 2 0 01-2 2h-3a2 2 0 01-2-2V4a2 2 0 012-2h3z" />
            </svg>
            Mobile
          </a>

          <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
            </svg>
            Static
          </a>

          <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Residential
          </a>

          <div className="px-4 mt-6 mb-3">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
              API ACCESS
            </h3>
          </div>

          <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" />
            </svg>
            API Management
          </a>

          <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Documentation
          </a>

          <div className="px-4 mt-6 mb-3">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
              APP & TOOLS
            </h3>
          </div>

          <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            HydraHeaders
          </a>

          <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            IP Checker
          </a>

          <div className="px-4 mt-6 mb-3">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
              YOUR ACCOUNT
            </h3>
          </div>

          <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            Add Funds
          </a>

          <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Settings
          </a>

          <a href="#" onClick={handleLogout} className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 2V2l5 5h-5z" clipRule="evenodd" />
            </svg>
            Logout
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="ml-64 flex-1">
        <div className="py-6 px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Active Orders Card */}
            <div className="bg-green-200 rounded-lg overflow-hidden shadow">
              <div className="p-4 bg-green-300 text-center text-xl font-semibold">
                Active Orders
              </div>
              <div className="p-8 text-center text-5xl font-bold">
                0
              </div>
            </div>

            {/* Total Orders Card */}
            <div className="bg-blue-200 rounded-lg overflow-hidden shadow">
              <div className="p-4 bg-blue-300 text-center text-xl font-semibold">
                Total Orders
              </div>
              <div className="p-8 text-center text-5xl font-bold">
                0
              </div>
            </div>

            {/* Account Balance Card */}
            <div className="bg-red-200 rounded-lg overflow-hidden shadow">
              <div className="p-4 bg-red-300 text-center text-xl font-semibold">
                Account Balance
              </div>
              <div className="p-8 text-center text-5xl font-bold">
                $0.00
              </div>
            </div>
          </div>

          {/* Proxy Orders Section */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-800">Proxy Orders</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600">You don't have any active proxies. Get started here.</p>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center justify-center py-3 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700">
                <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 2a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h3zm7 0a2 2 0 012 2v10a2 2 0 01-2 2h-3a2 2 0 01-2-2V4a2 2 0 012-2h3z" />
                </svg>
                Mobile Proxy Plans
              </button>
              <button className="flex items-center justify-center py-3 bg-white border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50">
                <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Residential Proxy Access
              </button>
            </div>
          </div>

          {/* Terminated & Inactive Orders */}
          <div className="bg-white shadow rounded-lg">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-800">Terminated & Inactive Orders</h2>
            </div>
            <div className="p-6">
              {/* This would contain the terminated orders table, empty for now */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;