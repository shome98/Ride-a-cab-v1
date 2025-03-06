import { createContext, useState, ReactNode } from 'react';

interface Captain {
  _id: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  email: string;
  vehicle: {
    color: string;
    plate: string;
    capacity: number;
    vehicleType: string;
  };
}

interface CaptainContextType {
  captain: Captain | null;
  setCaptain: (captain: Captain | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  updateCaptain: (captainData: Captain) => void;
}

export const CaptainDataContext = createContext<CaptainContextType | null>(null);

interface CaptainProviderProps {
  children: ReactNode;
}

const CaptainContext: React.FC<CaptainProviderProps> = ({ children }) => {
  const [captain, setCaptain] = useState<Captain | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCaptain = (captainData: Captain) => {
    setCaptain(captainData);
  };

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;