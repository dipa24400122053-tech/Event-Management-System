import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  signup: (fullName: string, email: string, username: string, password: string, role: 'user' | 'admin') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = (fullName: string, email: string, username: string, password: string, role: 'user' | 'admin'): boolean => {
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if username or email already exists
    const existingUser = users.find((u: any) => u.username === username || u.email === email);
    if (existingUser) {
      return false;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      fullName,
      email,
      username,
      password, // In a real app, this would be hashed
      role
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return true;
  };

  const login = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.username === username && u.password === password);
    
    if (foundUser) {
      const loggedInUser = {
        id: foundUser.id,
        fullName: foundUser.fullName,
        email: foundUser.email,
        username: foundUser.username,
        role: foundUser.role
      };
      setUser(loggedInUser);
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
