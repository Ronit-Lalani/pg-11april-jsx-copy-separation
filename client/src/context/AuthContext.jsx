import { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    if (!isClient) return;

    const checkAuthStatus = async () => {
      try {
        const res = await fetch('/api/user/me', { credentials: 'include' });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuthStatus();
  }, [isClient]);

  const login = async (email, password, rememberMe = false) => {
    try {
      const res = await apiRequest('POST', '/api/auth/login', {
        email,
        password,
        rememberMe
      });

      const userData = await res.json();
      setUser(userData);
      setIsAuthenticated(true);

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      queryClient.invalidateQueries({ queryKey: ['/api/user/me'] });
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signup = async (email, password, userData = {}) => {
    try {
      const res = await apiRequest('POST', '/api/auth/signup', {
        email,
        password,
        ...userData
      });

      const newUser = await res.json();
      setUser(newUser);
      setIsAuthenticated(true);

      toast({
        title: "Registration successful",
        description: "Your account has been created!",
      });

      queryClient.invalidateQueries({ queryKey: ['/api/user/me'] });
      return newUser;
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please check your information and try again",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout', {});
      setIsAuthenticated(false);
      setUser(null);

      toast({
        title: "Logout successful",
        description: "You have been logged out successfully",
      });

      queryClient.invalidateQueries({ queryKey: ['/api/user/me'] });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
