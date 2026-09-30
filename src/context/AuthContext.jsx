import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      // Development fallback mode if Supabase env credentials are not set yet
      const savedMockUser = localStorage.getItem('baelit_demo_user');
      if (savedMockUser) {
        try {
          const parsed = JSON.parse(savedMockUser);
          setUser(parsed);
          setProfile(parsed);
        } catch {
          // ignore
        }
      }
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen to Auth State Changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.warn('Profile load error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    if (!isSupabaseConfigured()) {
      // Development mock fallback
      const mockUser = {
        id: 'demo-user-123',
        email,
        full_name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'user',
        is_demo: true,
      };
      localStorage.setItem('baelit_demo_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setProfile(mockUser);
      return { user: mockUser, error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signup = async (email, password, fullName) => {
    if (!isSupabaseConfigured()) {
      const mockUser = {
        id: 'demo-user-123',
        email,
        full_name: fullName || email.split('@')[0],
        role: 'user',
        is_demo: true,
      };
      localStorage.setItem('baelit_demo_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setProfile(mockUser);
      return { user: mockUser, error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    return { data, error };
  };

  const resetPassword = async (email) => {
    if (!isSupabaseConfigured()) {
      return { data: true, error: null };
    }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { data, error };
  };

  const logout = async () => {
    if (!isSupabaseConfigured()) {
      localStorage.removeItem('baelit_demo_user');
      setUser(null);
      setProfile(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates) => {
    if (!user) return { error: new Error('Not authenticated') };
    if (!isSupabaseConfigured()) {
      const updated = { ...profile, ...updates };
      setProfile(updated);
      localStorage.setItem('baelit_demo_user', JSON.stringify(updated));
      return { data: updated, error: null };
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (!error && data) {
      setProfile(data);
    }
    return { data, error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        login,
        signup,
        logout,
        resetPassword,
        updateProfile,
        isAdmin: profile?.role === 'admin',
        isConfigured: isSupabaseConfigured(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
