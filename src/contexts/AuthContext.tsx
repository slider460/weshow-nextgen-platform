import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { UserProfile, AuthContextType, SignUpData, SignInData, ResetPasswordData } from '../types/auth';
import { supabase } from '../config/supabase';

// Создаем алиас для избежания конфликтов типов
type User = SupabaseUser;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Загрузка профиля пользователя
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Регистрация
  const signUp = async (email: string, password: string, userData: SignUpData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            company_name: userData.company_name,
            phone: userData.phone || '',
            role: userData.role || 'client'
          }
        }
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  // Вход
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  // Вход через Google
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/profile`
        }
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  // Выход
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Восстановление пароля
  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  // Обновление профиля
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      // Обновляем локальное состояние
      if (profile) {
        setProfile({ ...profile, ...data });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Инициализация аутентификации
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user as User);
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    // Устанавливаем таймаут для принудительного завершения загрузки
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    initializeAuth();

    return () => clearTimeout(timeout);

    // Слушаем изменения состояния аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user as User);
          let userProfile = await fetchProfile(session.user.id);
          
          // Если профиль не найден (например, при Google авторизации), создаем его
          if (!userProfile) {
            console.log('Profile not found, creating new profile for Google user');
            try {
              const { data, error } = await supabase
                .from('user_profiles')
                .insert({
                  id: session.user.id,
                  full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Пользователь',
                  company_name: session.user.user_metadata?.company_name || 'Не указано',
                  phone_number: session.user.user_metadata?.phone_number || null,
                  role: 'client'
                })
                .select()
                .single();

              if (error) {
                console.error('Error creating profile:', error);
              } else {
                userProfile = data as UserProfile;
                console.log('Profile created successfully:', userProfile);
              }
            } catch (error) {
              console.error('Error creating profile:', error);
            }
          }
          
          setProfile(userProfile);
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};