import React, { createContext, useEffect, ReactNode, useMemo } from "react";
import { io, Socket } from "socket.io-client";

// Define a default socket connection to prevent null values
const defaultSocket = io(`${import.meta.env.VITE_BASE_URL}`);

export const SocketContext = createContext<Socket>(defaultSocket);

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useMemo(() => io(`${import.meta.env.VITE_BASE_URL}`), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
