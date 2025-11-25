// Типы для системы аутентификации WeShow NextGen Platform
import { User as SupabaseUser } from '@supabase/supabase-js';

export type User = SupabaseUser;

export interface UserProfile {
  id: string;
  full_name: string;
  company_name: string;
  phone?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'admin' | 'manager' | 'client';

export interface Quote {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: QuoteStatus;
  total_amount: number;
  equipment_items: EquipmentItem[];
  created_at: string;
  updated_at: string;
}

export type QuoteStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface EquipmentItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  category?: string;
}

export interface QuoteTemplate {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  equipment_items: EquipmentItem[];
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: SignUpData) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export interface SignUpData {
  full_name: string;
  company_name: string;
  phone?: string;
  role?: UserRole;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
}

// Статусы заявок с переводами
export const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  pending: 'На рассмотрении',
  approved: 'Подтверждена',
  rejected: 'Отклонена',
  cancelled: 'Отменена'
};

// Роли пользователей с переводами
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Администратор',
  manager: 'Менеджер',
  client: 'Клиент'
};
