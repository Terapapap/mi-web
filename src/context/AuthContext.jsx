import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId) => {
    if (!userId) {
      setIsPremium(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        setIsPremium(false);
      } else {
        const premiumStatus = data?.is_premium || false;
        setIsPremium(premiumStatus);
        localStorage.setItem('isPremiumUser', premiumStatus);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      setIsPremium(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setIsPremium(false);
      }
      setLoading(false);
    });

    const getInitialSession = async () => {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        if (initialSession?.user) {
            await fetchProfile(initialSession.user.id);
        } else {
            setIsPremium(localStorage.getItem('isPremiumUser') === 'true');
        }
        setLoading(false);
    };
    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);
  
  const value = {
    session,
    user,
    isPremium,
    refreshProfile: () => fetchProfile(user?.id),
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: async () => {
      await supabase.auth.signOut();
      localStorage.removeItem('isPremiumUser');
      setIsPremium(false);
    },
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};