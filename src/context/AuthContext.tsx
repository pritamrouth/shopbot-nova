
import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { signIn, signUp, signOut, getCurrentUser, supabase, isUserAdmin } from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string, isAdmin?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setIsAdmin(isUserAdmin(currentUser));
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const updatedUser = session?.user || null;
        setUser(updatedUser);
        setIsAdmin(isUserAdmin(updatedUser));
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { user } = await signIn(email, password);
      setUser(user);
      setIsAdmin(isUserAdmin(user));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name?: string, isAdmin = false) => {
    setIsLoading(true);
    try {
      const { user } = await signUp(email, password, name, isAdmin);
      setUser(user);
      setIsAdmin(isUserAdmin(user));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin,
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
