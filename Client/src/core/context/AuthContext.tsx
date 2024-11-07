import React, { createContext, useState, useEffect, useContext } from "react";
import { login } from "@/module/auth/login";
import { validateToken } from "@/module/auth/validateToken";
import { useCookies } from "react-cookie";
import { logout } from "@/module/auth/logout";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  loginUser: (
    username: string,
    password: string
  ) => Promise<{ message: string }>;
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
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (cookies.userToken) {
        const isValid = await validateToken();

        if (isValid) {
          setIsAuthenticated(true);
          const userData =
            typeof cookies.userData === "string"
              ? JSON.parse(cookies.userData)
              : cookies.userData;
          setUser(userData);
        } else {
          setIsAuthenticated(false);
          setUser(null);
          logoutUser();
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false); // Set loading to false after check completes
    };

    checkTokenValidity();
  }, [cookies.userToken, cookies.userData]);

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await login({ username, password });
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
      console.error("Login failed", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    await logout();
    removeCookie("userToken", { path: "/" });
    removeCookie("userData", { path: "/" });
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isMounted || loading) {
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
