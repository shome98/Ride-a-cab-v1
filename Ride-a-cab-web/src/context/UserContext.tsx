import React, { createContext, useState, ReactNode } from 'react';

interface User {
  _id: string;
  email: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserDataContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

const UserContext: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;