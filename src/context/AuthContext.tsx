import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initialize demo account if no users exist
    const usersJSON = localStorage.getItem('petgram_users');
    if (!usersJSON) {
      const demoUser = {
        id: 'demo-user-1',
        username: 'PetLover',
        email: 'demo@petgram.com',
        password: 'demo123',
      };
      localStorage.setItem('petgram_users', JSON.stringify([demoUser]));
    }

    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('petgram_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // Get existing users from localStorage
      const usersJSON = localStorage.getItem('petgram_users');
      const users = usersJSON ? JSON.parse(usersJSON) : [];

      // Check if email already exists
      if (users.find((u: any) => u.email === email)) {
        alert('Email already registered');
        return false;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password, // In real app, this would be hashed
      };

      // Save to users list
      users.push(newUser);
      localStorage.setItem('petgram_users', JSON.stringify(users));

      // Log in the user
      const userSession = { id: newUser.id, username, email };
      setUser(userSession);
      localStorage.setItem('petgram_user', JSON.stringify(userSession));

      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get users from localStorage
      const usersJSON = localStorage.getItem('petgram_users');
      const users = usersJSON ? JSON.parse(usersJSON) : [];

      // Find user with matching credentials
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!foundUser) {
        alert('Invalid email or password');
        return false;
      }

      // Set user session
      const userSession = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      };
      setUser(userSession);
      localStorage.setItem('petgram_user', JSON.stringify(userSession));

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('petgram_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}