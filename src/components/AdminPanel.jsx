// src/components/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function AdminPanel() {
  const { currentUser, createUser, changePassword, deactivateUser, activateUser, listUsers } = useAuth();
  const [adminPassword, setAdminPassword] = useState('');
  const [verified, setVerified] = useState(false);
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [activeTab, setActiveTab] = useState('listUsers');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'user'
  });
  
  const [changePasswordData, setChangePasswordData] = useState({
    targetEmail: '',
    newPassword: ''
  });

  // Load users on component mount
  useEffect(() => {
    if (verified) {
      refreshUserList();
    }
  }, [verified]);
  
  // Handle admin verification
  const handleVerify = () => {
    if (!adminPassword) {
      showMessage('Please enter your admin password', 'error');
      return;
    }
    
    const result = listUsers(currentUser.email, adminPassword);
    
    if (result.success) {
      setUserList(result.users);
      setVerified(true);
      setMessage('');
    } else {
      showMessage(result.message, 'error');
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordData(prev => ({ ...prev, [name]: value }));
  };
  
  // Create new user
  const handleCreateUser = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      showMessage('All fields are required', 'error');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showMessage('Please enter a valid email address', 'error');
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      showMessage('Password must be at least 6 characters long', 'error');
      return;
    }
    
    const result = createUser(currentUser.email, adminPassword, formData);
    
    if (result.success) {
      // Reset form
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: 'user'
      });
      
      // Refresh user list
      refreshUserList();
      showMessage(result.message, 'success');
    } else {
      showMessage(result.message, 'error');
    }
  };
  
  // Change user password
  const handleChangePassword = (e) => {
    e.preventDefault();
    
    const { targetEmail, newPassword } = changePasswordData;
    
    if (!targetEmail || !newPassword) {
      showMessage('All fields are required', 'error');
      return;
    }

    // Validate password strength
    if (newPassword.length < 6) {
      showMessage('Password must be at least 6 characters long', 'error');
      return;
    }
    
    const result = changePassword(currentUser.email, adminPassword, targetEmail, newPassword);
    
    if (result.success) {
      // Reset form
      setChangePasswordData({
        targetEmail: '',
        newPassword: ''
      });
      
      showMessage(result.message, 'success');
    } else {
      showMessage(result.message, 'error');
    }
  };
  
  // Deactivate user
  const handleDeactivateUser = (email) => {
    if (window.confirm(`Are you sure you want to deactivate user ${email}?`)) {
      const result = deactivateUser(currentUser.email, adminPassword, email);
      
      if (result.success) {
        // Refresh user list
        refreshUserList();
        showMessage(result.message, 'success');
      } else {
        showMessage(result.message, 'error');
      }
    }
  };

  // Activate user
  const handleActivateUser = (email) => {
    if (window.confirm(`Are you sure you want to activate user ${email}?`)) {
      const result = activateUser(currentUser.email, adminPassword, email);
      
      if (result.success) {
        // Refresh user list
        refreshUserList();
        showMessage(result.message, 'success');
      } else {
        showMessage(result.message, 'error');
      }
    }
  };
  
  // Refresh user list
  const refreshUserList = () => {
    const result = listUsers(currentUser.email, adminPassword);
    
    if (result.success) {
      setUserList(result.users);
    }
  };
  
  // Helper to show message
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    
    // Clear message after 5 seconds
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  // Filter users based on search term
  const filteredUsers = userList.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (!verified) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Admin Verification</h2>
        {message && (
          <div className={`p-4 mb-4 rounded-lg ${messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
        <div className="flex gap-4">
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter your admin password"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-custom-500 focus:border-custom-500"
          />
          <button
            onClick={handleVerify}
            className="px-4 py-2 bg-custom-600 text-white rounded-md hover:bg-custom-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-500"
          >
            Verify
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      
      {message && (
        <div className={`p-4 mb-4 rounded-lg ${messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('listUsers')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'listUsers'
                ? 'border-custom-500 text-custom-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            User List
          </button>
          <button
            onClick={() => setActiveTab('createUser')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'createUser'
                ? 'border-custom-500 text-custom-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Create User
          </button>
          <button
            onClick={() => setActiveTab('changePassword')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'changePassword'
                ? 'border-custom-500 text-custom-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Change Password
          </button>
        </nav>
      </div>
      
      {/* User List Tab */}
      {activeTab === 'listUsers' && (
        <div>
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium">User List</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-500"
              />
              <button 
                onClick={refreshUserList}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
              >
                Refresh
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.email}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => user.isActive ? handleDeactivateUser(user.email) : handleActivateUser(user.email)}
                        className={`mr-2 ${
                          user.isActive 
                            ? 'text-red-600 hover:text-red-800' 
                            : 'text-green-600 hover:text-green-800'
                        }`}
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Create User Tab */}
      {activeTab === 'createUser' && (
        <form onSubmit={handleCreateUser} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-custom-500 focus:border-custom-500"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-custom-500 focus:border-custom-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-custom-500 focus:border-custom-500"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-custom-500 focus:border-custom-500"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-500 focus:border-custom-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-custom-600 hover:bg-custom-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-500"
            >
              Create User
            </button>
          </div>
        </form>
      )}
      
      {/* Change Password Tab */}
      {activeTab === 'changePassword' && (
        <form onSubmit={handleChangePassword}>
          <div className="space-y-6">
            <div>
              <label htmlFor="targetEmail" className="block text-sm font-medium text-gray-700">
                User Email
              </label>
              <select
                id="targetEmail"
                name="targetEmail"
                value={changePasswordData.targetEmail}
                onChange={handlePasswordInputChange}
                required
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-500 focus:border-custom-500"
              >
                <option value="">Select a user</option>
                {userList.map(user => (
                  <option key={user.email} value={user.email}>
                    {user.email} ({user.firstName} {user.lastName})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                required
                value={changePasswordData.newPassword}
                onChange={handlePasswordInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-custom-500 focus:border-custom-500"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-custom-600 hover:bg-custom-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-500"
            >
              Change Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdminPanel;