import React, { createContext, useState, useEffect, useContext } from "react";
import { login } from "@/api/auth/login";
import { useCookies } from "react-cookie";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<{ message: string }>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "userToken",
    "userData",
  ]);
  const [user, setUser] = useState<any>(cookies.userData || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.userToken);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await login({ email, password });
      setUser(response.user);
      setIsAuthenticated(true);

      setCookie("userToken", response.access_token, {
        path: "/",
        maxAge: 3600,
      });
      setCookie("userData", JSON.stringify(response.user), {
        path: "/",
        maxAge: 3600,
      });
      return { message: response.message };
    } catch (error: any) {
      // console.error("Login failed", error.response?.data.error);
      throw error;
    }
  };

  const logoutUser = () => {
    removeCookie("userToken", { path: "/" });
    removeCookie("userData", { path: "/" });
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
