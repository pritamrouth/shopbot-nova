
import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error('VITE_SUPABASE_URL is not defined');
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('VITE_SUPABASE_ANON_KEY is not defined');
}

// Get environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for auth
export const signUp = async (email: string, password: string, name?: string, isAdmin = false) => {
  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        name: name || email.split('@')[0],
        isAdmin,
      }
    }
  });

  if (error) {
    throw error;
  }

  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return null;
  }

  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Check if the current user is an admin
export const isUserAdmin = (user: any) => {
  // Check if this is our default admin email
  if (user?.email === "pritamrouth2003@gmail.com") {
    return true;
  }
  // Also check the metadata (for compatibility with existing logic)
  return user?.user_metadata?.isAdmin === true;
};
