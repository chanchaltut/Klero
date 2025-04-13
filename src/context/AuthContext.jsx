// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext(null);

// Auth provider component
export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    // Try to load users from localStorage
    const savedUsers = localStorage.getItem('klero_users');
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }
    
    // Default users with main admin
    return {
      'admin@klero.com': {
        email: 'admin@klero.com',
        password: 'admin123',
        role: 'admin',
        isActive: true,
        firstName: 'Admin',
        lastName: 'User'
      }
    };
  });
  
  const [currentUser, setCurrentUser] = useState(() => {
    // Try to load current user from localStorage
    const savedUser = localStorage.getItem('klero_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('klero_users', JSON.stringify(users));
  }, [users]);
  
  // Save current user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('klero_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('klero_current_user');
    }
  }, [currentUser]);
  
  // Auth methods
  const login = (email, password) => {
    // Check if user exists and credentials match
    const user = users[email];
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    
    if (user.password !== password) {
      return { success: false, message: 'Invalid password' };
    }
    
    if (!user.isActive) {
      return { success: false, message: 'Account is deactivated' };
    }
    
    // Set current user
    setCurrentUser({
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    });
    
    return { 
      success: true, 
      message: 'Login successful', 
      user: {
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      }
    };
  };
  
  const logout = () => {
    setCurrentUser(null);
    return { success: true, message: 'Logout successful' };
  };
  
  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };
  
  // Admin functions
  const createUser = (adminEmail, adminPassword, userData) => {
    // Verify admin credentials
    if (!verifyAdminCredentials(adminEmail, adminPassword)) {
      return { success: false, message: 'Invalid admin credentials' };
    }
    
    const { email, password, firstName, lastName, role = 'user' } = userData;
    
    // Check if user already exists
    if (users[email]) {
      return { success: false, message: 'User already exists' };
    }
    
    // Create new user
    setUsers(prevUsers => ({
      ...prevUsers,
      [email]: {
        email,
        password,
        firstName,
        lastName,
        role,
        isActive: true
      }
    }));
    
    return { success: true, message: `User ${email} created successfully` };
  };
  
  const changePassword = (adminEmail, adminPassword, targetEmail, newPassword) => {
    // Verify admin credentials
    if (!verifyAdminCredentials(adminEmail, adminPassword)) {
      return { success: false, message: 'Invalid admin credentials' };
    }
    
    // Check if target user exists
    if (!users[targetEmail]) {
      return { success: false, message: 'Target user does not exist' };
    }
    
    // Change password
    setUsers(prevUsers => ({
      ...prevUsers,
      [targetEmail]: {
        ...prevUsers[targetEmail],
        password: newPassword
      }
    }));
    
    // Log out user if it's the current user
    if (currentUser?.email === targetEmail) {
      logout();
    }
    
    return { success: true, message: `Password for ${targetEmail} updated successfully` };
  };
  
  const deactivateUser = (adminEmail, adminPassword, targetEmail) => {
    // Verify admin credentials
    if (!verifyAdminCredentials(adminEmail, adminPassword)) {
      return { success: false, message: 'Invalid admin credentials' };
    }
    
    // Check if target user exists
    if (!users[targetEmail]) {
      return { success: false, message: 'Target user does not exist' };
    }
    
    // Cannot deactivate main admin
    if (users[targetEmail].role === 'admin' && Object.keys(users).filter(email => users[email].role === 'admin').length === 1) {
      return { success: false, message: 'Cannot deactivate the only admin user' };
    }
    
    // Deactivate user
    setUsers(prevUsers => ({
      ...prevUsers,
      [targetEmail]: {
        ...prevUsers[targetEmail],
        isActive: false
      }
    }));
    
    // Log out user if it's the current user
    if (currentUser?.email === targetEmail) {
      logout();
    }
    
    return { success: true, message: `User ${targetEmail} deactivated successfully` };
  };
  
  // Activate user
  const activateUser = (adminEmail, adminPassword, targetEmail) => {
    // Verify admin credentials
    if (!verifyAdminCredentials(adminEmail, adminPassword)) {
      return { success: false, message: 'Invalid admin credentials' };
    }
    
    // Check if target user exists
    if (!users[targetEmail]) {
      return { success: false, message: 'Target user does not exist' };
    }
    
    // Activate user
    setUsers(prevUsers => ({
      ...prevUsers,
      [targetEmail]: {
        ...prevUsers[targetEmail],
        isActive: true
      }
    }));
    
    return { success: true, message: `User ${targetEmail} activated successfully` };
  };
  
  const listUsers = (adminEmail, adminPassword) => {
    // Verify admin credentials
    if (!verifyAdminCredentials(adminEmail, adminPassword)) {
      return { success: false, message: 'Invalid admin credentials' };
    }
    
    // Create a list of users (without passwords)
    const userList = Object.keys(users).map(email => ({
      email,
      firstName: users[email].firstName,
      lastName: users[email].lastName,
      role: users[email].role,
      isActive: users[email].isActive
    }));
    
    return { success: true, users: userList };
  };
  
  // Helper function to verify admin credentials
  const verifyAdminCredentials = (email, password) => {
    return users[email] && users[email].password === password && users[email].role === 'admin';
  };

  // Context value
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: isAdmin(),
    login,
    logout,
    createUser,
    changePassword,
    deactivateUser,
    activateUser,
    listUsers
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}