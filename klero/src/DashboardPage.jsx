import React, { useState } from 'react';

// Custom SVG Icons
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const SmartphoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const LogOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const SidebarItem = ({ icon: Icon, label, section }) => (
    <button 
      className={`
        flex items-center p-2 w-full text-sm 
        ${activeSection === section 
          ? 'bg-[#e6f2ff] text-[#3b82f6]' 
          : 'text-gray-600 hover:bg-gray-100'
        }
      `}
      onClick={() => {
        setActiveSection(section);
        setIsMobileMenuOpen(false);
      }}
    >
      <span className="mr-2">{Icon}</span>
      {label}
    </button>
  );

  return (
    <div className="flex flex-col md:flex-row w-screen min-h-screen bg-[#f8fafc] font-sans">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-20 bg-white shadow-sm p-4 flex justify-between items-center">
        <img src="/Klero IMG.png" alt="Klero" className="h-8" />
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar for Desktop and Mobile */}
      <div className={`
        fixed inset-0 z-10 md:relative 
        ${isMobileMenuOpen ? 'block' : 'hidden'} 
        md:block md:w-[250px] 
        bg-white border-r shadow-sm overflow-y-auto
      `}>
        <div className="sticky top-0 bg-white z-10 p-4 border-b hidden md:block">
          <div className="flex items-center mb-4">
            <img src="/Klero IMG.png" alt="Klero" className="w-full h-auto" />
          </div>
        </div>
        
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-xs text-gray-400 mb-2 uppercase">PROXY NETWORKS</h3>
            <div className="space-y-1">
              <SidebarItem icon={<DashboardIcon />} label="Dashboard" section="dashboard" />
              <SidebarItem icon={<GlobeIcon />} label="International" section="international" />
              <SidebarItem icon={<SmartphoneIcon />} label="Proxy Mobile" section="mobile" />
              <SidebarItem icon={<MapPinIcon />} label="Static" section="static" />
              <SidebarItem icon={<HomeIcon />} label="Residential" section="residential" />
            </div>
          </div>

          <div>
            <h3 className="text-xs text-gray-400 mb-2 uppercase">API ACCESS</h3>
            <div className="space-y-1">
              <SidebarItem icon={<CodeIcon />} label="API Management" section="api-management" />
              <SidebarItem icon={<BookIcon />} label="Documentation" section="documentation" />
            </div>
          </div>

          <div>
            <h3 className="text-xs text-gray-400 mb-2 uppercase">YOUR ACCOUNT</h3>
            <div className="space-y-1">
              <SidebarItem icon={<CreditCardIcon />} label="Add Funds" section="add-funds" />
              <SidebarItem icon={<SettingsIcon />} label="Settings" section="settings" />
              <SidebarItem icon={<LogOutIcon />} label="Logout" section="logout" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#a5d6a7] rounded-lg p-4">
            <h4 className="text-sm font-bold text-white mb-2">Active Orders</h4>
            <p className="text-2xl font-bold text-white">0</p>
          </div>
          <div className="bg-[#81d4fa] rounded-lg p-4">
            <h4 className="text-sm font-bold text-white mb-2">Total Orders</h4>
            <p className="text-2xl font-bold text-white">0</p>
          </div>
          <div className="bg-[#f57082] rounded-lg p-4">
            <h4 className="text-sm font-bold text-white mb-2">Account Balance</h4>
            <p className="text-2xl font-bold text-white">$0.00</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Proxy Orders</h2>
          <p className="text-gray-500 mb-4">You don't have any active proxies. Get started here.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="bg-[#3b82f6] text-white p-3 rounded-lg">
              Mobile Proxy Plans
            </button>
            <button className="border border-[#3b82f6] text-[#3b82f6] p-3 rounded-lg">
              Residential Proxy Access
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4">Terminated & Inactive Orders</h2>
          <p className="text-gray-500">No inactive orders.</p>
        </div>
      </div>

      {/* Support Chat */}
      <button className="fixed bottom-6 right-6 bg-[#3b82f6] text-white p-3 rounded-full shadow-lg z-20">
        <MessageIcon />
      </button>
    </div>
  );
};

export default Dashboard;