import React, { createContext, useState, useEffect, useContext } from "react";
import { login } from "@/module/auth/login";
import { validateToken } from "@/module/auth/validateToken";
import { useCookies } from "react-cookie";
import { logout } from "@/module/auth/logout";
import { oAuthLogin } from "@/module/auth/aoauthLogin";
import { useRefreshToken } from "@/module/auth/refreshToken";

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
    "refreshToken",
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
      if (cookies.userToken || cookies.refreshToken) {
        const isValid = await validateToken();
        if (isValid) {
          setIsAuthenticated(true);
          setUser(isValid.user);
        } else {
          const refreshed = await attemptTokenRefresh();
          if (!refreshed) {
            setIsAuthenticated(false);
            setUser(null);
            await logoutUser();
          }
        }
      } else {
        try {
          const userData = await oAuthLogin();
          if (userData) {
            setIsAuthenticated(true);
            setCookie("userToken", userData.accessToken, {
              path: "/",
              maxAge: 2 * 60 * 1000, // 1 hour expiry
            });
            setCookie("refreshToken", userData.refreshToken, {
              path: "/",
              maxAge: 7 * 24 * 60 * 60, // 7 days expiry
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
  }, [cookies.userToken, cookies.userData, cookies.refreshToken]);

  const attemptTokenRefresh = async () => {
    try {
      if (cookies.refreshToken) {
        const response = await useRefreshToken({
          refreshToken: cookies.refreshToken,
        });
        if (response?.accessToken) {
          setCookie("userToken", response.accessToken, {
            path: "/",
            maxAge: 2 * 60 * 1000,
          });
          setCookie("refreshToken", response.refreshToken, {
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
          });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Token refresh failed", error);
      return false;
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await login({ username, password });
      setUser(response.user);
      setIsAuthenticated(true);
      setCookie("userToken", response.accessToken, {
        path: "/",
        maxAge: 2 * 60 * 1000, // 1 hour
      });
      setCookie("refreshToken", response.refreshToken, {
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      return { message: response.message };
    } catch (error: any) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    await logout({ refreshToken: cookies.refreshToken });
    removeCookie("userToken", { path: "/" });
    removeCookie("refreshToken", { path: "/" });
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
