import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_ADMIN = {
  email: 'crafty23jay@gmail.com',
  password: 'admin123',
  name: 'Crafty Jay'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolioUser');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  useEffect(() => {
    // Initialize default admin credentials if not exists
    if (typeof window !== 'undefined' && !localStorage.getItem('adminCredentials')) {
      localStorage.setItem('adminCredentials', JSON.stringify({
        email: DEFAULT_ADMIN.email,
        password: DEFAULT_ADMIN.password,
        name: DEFAULT_ADMIN.name
      }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const credentials = JSON.parse(localStorage.getItem('adminCredentials') || '{}');
    
    if (email === credentials.email && password === credentials.password) {
      const userData = { email: credentials.email, name: credentials.name };
      setUser(userData);
      localStorage.setItem('portfolioUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('portfolioUser');
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    const credentials = JSON.parse(localStorage.getItem('adminCredentials') || '{}');
    
    if (currentPassword !== credentials.password) {
      return false;
    }
    
    const updatedCredentials = {
      ...credentials,
      password: newPassword
    };
    localStorage.setItem('adminCredentials', JSON.stringify(updatedCredentials));
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updatePassword,
      isAuthenticated: !!user 
    }}>
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
