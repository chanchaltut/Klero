import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ManageTeam from '../components/ManageTeam';
import Requests from '../components/Requests';
import Contacts from '../components/Contacts';
import RequestContacts from '../components/RequestContacts';
import Chat from '../components/Chat';

// Custom SVG Icons
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ContactsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
  </svg>
);

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const LogOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get the active section from the URL or default to manageTeam
  const getActiveSection = () => {
    const path = location.pathname.split('/').pop();
    return path || 'manageTeam';
  };

  const [activeSection, setActiveSection] = useState(getActiveSection());

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { id: 'manageTeam', label: 'Manage Team', icon: <UsersIcon /> },
    { id: 'requests', label: 'Email Requests', icon: <EmailIcon /> },
    { id: 'contacts', label: 'Contacts', icon: <ContactsIcon /> },
    { id: 'requestContacts', label: 'Request & Contacts', icon: <LinkIcon /> }
  ];

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    navigate(`/dashboard/${sectionId}`);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'manageTeam':
        return <ManageTeam />;
      case 'requests':
        return <Requests />;
      case 'contacts':
        return <Contacts />;
      case 'requestContacts':
        return <RequestContacts />;
      default:
        return <ManageTeam />;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 flex flex-col w-full">
        {/* Header */}
        <header className="bg-white shadow w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {currentUser?.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOutIcon />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu Button */}
        <div className="md:hidden fixed top-4 right-4 z-20">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-white p-2 rounded-md shadow"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full px-2 sm:px-4 lg:px-6 py-4">
          <div className="flex gap-4 h-[calc(100vh-8rem)] w-full">
            {/* Navigation */}
            <nav className={`
              fixed md:relative top-0 left-0 h-full w-48 
              bg-white shadow-lg md:shadow-none
              transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
              md:transform-none transition-transform duration-200 ease-in-out
              z-10 md:z-0
            `}>
              <div className="p-3 space-y-2 h-full overflow-y-auto">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`
                      w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm
                      transition-colors duration-200 text-left
                      ${activeSection === item.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* Content Area */}
            <div className="flex-1 bg-white rounded-lg shadow p-4 overflow-y-auto overflow-x-auto w-full min-w-0">
              {renderContent()}
            </div>
          </div>
        </main>

        {/* Chat Component */}
        <Chat />
      </div>
    </DndProvider>
  );
};

export default DashboardPage;
