import React, { createContext, useState, useEffect, useContext } from "react";
import { login } from "@/module/auth/login";
import { validateToken } from "@/module/auth/validateToken";
import { useCookies } from "react-cookie";
import { logout } from "@/module/auth/logout";
import { oAuthLogin } from "@/module/auth/aoauthLogin";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (cookies.userToken) {
        const isValid = await validateToken();

        if (isValid) {
          setIsAuthenticated(true);
          setUser(isValid.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
          await logoutUser(); // Ensure tokens are cleared
        }
      } else {
        try {
          // Attempt OAuth login if no valid token exists
          const userData = await oAuthLogin();
          if (userData) {
            setIsAuthenticated(true);

            // Save tokens to cookies
            setCookie("userToken", userData.accessToken, {
              path: "/",
              maxAge: 3600,
            });
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.error("OAuth login failed", error);
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkTokenValidity();
  }, [cookies.userToken, cookies.userData]);

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await login({ username, password });
      setUser(response.user);
      setIsAuthenticated(true);

      setCookie("userToken", response.accessToken, {
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
