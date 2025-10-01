import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { UserProfile, AuthContextType, SignUpData, SignInData, ResetPasswordData } from '../types/auth';
import { supabase } from '../config/supabase';
import { logger } from '../utils/logger';

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
  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      logger.info('📥 fetchProfile called for userId:', userId);
      logger.debug('🔧 Starting database query...');
      
      const startTime = Date.now();
      const result = await supabase
        .from('user_profiles')
        .select('id, full_name, company_name, phone, role, created_at, updated_at')
        .eq('id', userId)
        .maybeSingle();
      
      const duration = Date.now() - startTime;
      logger.debug(`⏱️ Query completed in ${duration}ms`);
      logger.debug('📬 Response:', result);

      if (result.error) {
        logger.error('❌ Error fetching profile:', result.error);
        return null;
      }

      if (!result.data) {
        logger.warn('❌ No profile found for userId:', userId);
        return null;
      }

      logger.debug('✅ Profile fetched successfully:', result.data);
      
      // Приводим данные к правильному типу
      const profile: UserProfile = {
        id: result.data.id,
        full_name: result.data.full_name || '',
        company_name: result.data.company_name || '',
        phone: result.data.phone || undefined,
        role: result.data.role as 'admin' | 'manager' | 'client',
        created_at: result.data.created_at,
        updated_at: result.data.updated_at
      };
      
      logger.debug('✅ Profile mapped:', profile);
      return profile;
      
    } catch (error) {
      logger.error('❌ Exception in fetchProfile:', error);
      if (error instanceof Error) {
        logger.error('Exception message:', error.message);
        logger.error('Exception stack:', error.stack);
      }
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
      logger.error('Error signing up:', error);
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
      logger.error('Error signing in:', error);
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
      logger.error('Error signing in with Google:', error);
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
      logger.error('Error signing out:', error);
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
      logger.error('Error resetting password:', error);
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
      logger.error('Error updating profile:', error);
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
        logger.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    // Устанавливаем таймаут для принудительного завершения загрузки
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    initializeAuth();

    // Слушаем изменения состояния аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        logger.info('Auth state changed:', event, session);
        if (session?.user) {
          setUser(session.user as User);
          let userProfile = await fetchProfile(session.user.id);
          
          // Если профиль не найден (например, при Google авторизации), создаем его
          if (!userProfile) {
            logger.info('Profile not found, creating new profile for Google user');
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
                logger.error('Error creating profile:', error);
              } else {
                userProfile = data as UserProfile;
                logger.info('Profile created successfully:', userProfile);
              }
            } catch (error) {
              logger.error('Error creating profile:', error);
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

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  // Алиас для совместимости с AdminLogin
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      logger.info('🔐 Login attempt for:', email);
      
      const data = await signIn(email, password);
      logger.info('✅ Login successful, data:', data);
      
      if (!data || !data.user) {
        logger.error('❌ No user in response');
        return { success: false, error: 'Не удалось получить данные пользователя' };
      }
      
      logger.debug('👤 User ID:', data.user.id);
      logger.debug('📧 User Email:', data.user.email);
      
      // Загружаем профиль с таймаутом
      logger.debug('📥 Fetching user profile...');
      const userProfile = await fetchProfile(data.user.id);
      logger.debug('👤 User profile loaded:', userProfile);
      
      if (!userProfile) {
        logger.error('❌ Profile not found for user:', data.user.id);
        logger.error('❌ Check if user_profiles table has entry for this user');
        return { success: false, error: 'Профиль пользователя не найден. Обратитесь к администратору.' };
      }
      
      logger.debug('👤 Profile role:', userProfile.role);
      
      if (userProfile.role !== 'admin' && userProfile.role !== 'manager') {
        logger.error('❌ User role is not admin or manager:', userProfile.role);
        return { success: false, error: 'У вас нет прав доступа к админ-панели' };
      }
      
      // Устанавливаем состояние
      setUser(data.user as User);
      setProfile(userProfile);
      logger.info('✅ Login complete, user and profile set!');
      return { success: true };
      
    } catch (error) {
      logger.error('❌ Login error:', error);
      if (error instanceof Error) {
        logger.error('Error message:', error.message);
        logger.error('Error stack:', error.stack);
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Произошла неизвестная ошибка при входе' };
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    login,
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