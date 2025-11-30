import React, { createContext, useContext, useEffect, useState } from "react";
import { isTestUser } from "../utils/adminTestUsers.ts";

type Role = "admin" | "manager" | "client";

interface MockUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

interface MockProfile {
  id: string;
  full_name: string;
  company_name: string;
  phone?: string;
  role: Role;
  created_at: string;
  updated_at: string;
}

interface AuthContextValue {
  user: MockUser | null;
  profile: MockProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, data?: Partial<MockProfile>) => Promise<{ success: boolean }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<MockProfile>) => Promise<void>;
}

const STORAGE_KEY = "weshow-auth-mock";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const createMockData = (email: string, overrides?: Partial<MockProfile>) => {
  const baseName = email.split("@")[0] || "Пользователь";
  const now = new Date().toISOString();

  const user: MockUser = {
    id: `mock-${Date.now()}`,
    email,
    name: baseName,
    role: overrides?.role || "client",
  };

  const profile: MockProfile = {
    id: user.id,
    full_name: overrides?.full_name || baseName,
    company_name: overrides?.company_name || "WeShow Client",
    phone: overrides?.phone,
    role: overrides?.role || "client",
    created_at: now,
    updated_at: now,
  };

  return { user, profile };
};

const persistState = (user: MockUser | null, profile: MockProfile | null) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, profile }));
};

const restoreState = (): { user: MockUser | null; profile: MockProfile | null } => {
  if (typeof window === "undefined") {
    return { user: null, profile: null };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, profile: null };
    const parsed = JSON.parse(raw);
    return {
      user: parsed.user || null,
      profile: parsed.profile || null,
    };
  } catch {
    return { user: null, profile: null };
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [profile, setProfile] = useState<MockProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { user: storedUser, profile: storedProfile } = restoreState();
    setUser(storedUser);
    setProfile(storedProfile);
    setLoading(false);
  }, []);

  const handleAuth = (email: string, overrides?: Partial<MockProfile>) => {
    const data = createMockData(email, overrides);
    setUser(data.user);
    setProfile(data.profile);
    persistState(data.user, data.profile);
    return data;
  };

  const signIn = async (email: string, _password: string) => {
    handleAuth(email);
    return { success: true };
  };

  const signUp = async (email: string, _password: string, data?: Partial<MockProfile>) => {
    handleAuth(email, data);
    return { success: true };
  };

  const login = async (email: string, password: string) => {
    const testUser = isTestUser(email, password);

    if (testUser) {
      handleAuth(email, {
        full_name: testUser.name,
        company_name: testUser.company_name,
        role: testUser.role as Role,
      });
      return { success: true };
    }

    await signIn(email, password);
    return { success: true };
  };

  const signInWithGoogle = async () => {
    handleAuth("google-user@weshow.local", {
      full_name: "Google User",
      company_name: "WeShow",
    });
    return { success: true };
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    persistState(null, null);
  };

  const resetPassword = async (_email: string) => {
    return;
  };

  const updateProfile = async (data: Partial<MockProfile>) => {
    if (!profile) return;
    const updatedProfile = { ...profile, ...data, updated_at: new Date().toISOString() };
    setProfile(updatedProfile);
    persistState(user, updatedProfile);
  };

  const value: AuthContextValue = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    login,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

