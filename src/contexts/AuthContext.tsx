import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types/auth";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("tix_user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData: User, token: string) => {
    setUser(userData);

    localStorage.setItem("tix_user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("tix_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tix_user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
