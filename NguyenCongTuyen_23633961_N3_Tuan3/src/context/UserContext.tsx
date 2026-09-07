import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  name: string;
  email: string;
  avatar: string; 
};

type UserContextType = {
  user: User | null; 
  updateUser: (name: string, email: string, avatar: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

const DEFAULT_USER: User = {
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  avatar: 'https://unsplash.com', 
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(DEFAULT_USER);

  const updateUser = (name: string, email: string, avatar: string) => {
    setUser({ name, email, avatar });
  };

  const logout = () => {
    setUser(null); 
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser phải được sử dụng bên trong UserProvider');
  }
  return context;
}
