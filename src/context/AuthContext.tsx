
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes - in real app we'd validate with backend
    if (password.length < 6) {
      setIsLoading(false);
      throw new Error("Invalid credentials");
    }
    
    // Create mock user
    const newUser = {
      id: crypto.randomUUID(),
      email,
      name: email.split('@')[0],
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setIsLoading(false);
  };

  // Mock signup function - in a real app, this would call an API
  const signup = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes - in real app we'd validate with backend
    if (password.length < 6) {
      setIsLoading(false);
      throw new Error("Password must be at least 6 characters");
    }
    
    // Create mock user
    const newUser = {
      id: crypto.randomUUID(),
      email,
      name: name || email.split('@')[0],
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
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
