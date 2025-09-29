// TypeScript типы для базы данных WeShow
// Автоматически генерируемые типы для Supabase

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          password_hash: string
          company_name: string | null
          phone_number: string | null
          role: 'client' | 'manager' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          password_hash: string
          company_name?: string | null
          phone_number?: string | null
          role?: 'client' | 'manager' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          password_hash?: string
          company_name?: string | null
          phone_number?: string | null
          role?: 'client' | 'manager' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      equipment_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      equipment_catalog: {
        Row: {
          id: string
          name: string
          description: string | null
          specifications: Json | null
          main_image_url: string | null
          price_per_day: number
          category_id: string | null
          stock_quantity: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          specifications?: Json | null
          main_image_url?: string | null
          price_per_day: number
          category_id?: string | null
          stock_quantity?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          specifications?: Json | null
          main_image_url?: string | null
          price_per_day?: number
          category_id?: string | null
          stock_quantity?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_catalog_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "equipment_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      estimates: {
        Row: {
          id: string
          user_id: string
          status: 'draft' | 'pending_review' | 'confirmed' | 'canceled'
          event_date: string | null
          client_notes: string | null
          total_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'draft' | 'pending_review' | 'confirmed' | 'canceled'
          event_date?: string | null
          client_notes?: string | null
          total_amount?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'draft' | 'pending_review' | 'confirmed' | 'canceled'
          event_date?: string | null
          client_notes?: string | null
          total_amount?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "estimates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      estimate_items: {
        Row: {
          id: string
          estimate_id: string
          equipment_id: string
          quantity: number
          price_at_creation: number
          created_at: string
        }
        Insert: {
          id?: string
          estimate_id: string
          equipment_id: string
          quantity?: number
          price_at_creation: number
          created_at?: string
        }
        Update: {
          id?: string
          estimate_id?: string
          equipment_id?: string
          quantity?: number
          price_at_creation?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "estimate_items_estimate_id_fkey"
            columns: ["estimate_id"]
            isOneToOne: false
            referencedRelation: "estimates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_items_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment_catalog"
            referencedColumns: ["id"]
          }
        ]
      }
      article_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          preview_text: string | null
          cover_image_url: string | null
          category_id: string | null
          author_id: string | null
          is_published: boolean
          views_count: number
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          preview_text?: string | null
          cover_image_url?: string | null
          category_id?: string | null
          author_id?: string | null
          is_published?: boolean
          views_count?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          preview_text?: string | null
          cover_image_url?: string | null
          category_id?: string | null
          author_id?: string | null
          is_published?: boolean
          views_count?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "article_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      cases: {
        Row: {
          id: string
          title: string
          description: string
          client: string
          year: string
          image_url: string | null
          video_url: string | null
          results: string[] | null
          technologies: string[] | null
          is_visible: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          client: string
          year: string
          image_url?: string | null
          video_url?: string | null
          results?: string[] | null
          technologies?: string[] | null
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          client?: string
          year?: string
          image_url?: string | null
          video_url?: string | null
          results?: string[] | null
          technologies?: string[] | null
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      homepage_equipment: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string | null
          is_visible: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url?: string | null
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string | null
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      services_blocks: {
        Row: {
          id: string
          title: string
          description: string
          icon: string | null
          is_visible: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon?: string | null
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string | null
          is_visible?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      logos: {
        Row: {
          id: string
          name: string
          logo_url: string
          website: string | null
          description: string | null
          category: 'banking' | 'energy' | 'telecom' | 'tech' | 'aviation' | 'other'
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url: string
          website?: string | null
          description?: string | null
          category?: 'banking' | 'energy' | 'telecom' | 'tech' | 'aviation' | 'other'
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string
          website?: string | null
          description?: string | null
          category?: 'banking' | 'energy' | 'telecom' | 'tech' | 'aviation' | 'other'
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string | null
      }
      increment_article_views: {
        Args: {
          article_uuid: string
        }
        Returns: undefined
      }
      is_manager_or_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean | null
      }
      update_estimate_total: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_updated_at_column: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Удобные типы для использования в приложении
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Типы для конкретных таблиц
export type User = Tables<'users'>
export type EquipmentCategory = Tables<'equipment_categories'>
export type Equipment = Tables<'equipment_catalog'>
export type Estimate = Tables<'estimates'>
export type EstimateItem = Tables<'estimate_items'>
export type ArticleCategory = Tables<'article_categories'>
export type Article = Tables<'articles'>
export type Logo = Tables<'logos'>

// Типы для вставки данных
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type EquipmentInsert = Database['public']['Tables']['equipment_catalog']['Insert']
export type EstimateInsert = Database['public']['Tables']['estimates']['Insert']
export type EstimateItemInsert = Database['public']['Tables']['estimate_items']['Insert']
export type ArticleInsert = Database['public']['Tables']['articles']['Insert']
export type LogoInsert = Database['public']['Tables']['logos']['Insert']

// Типы для обновления данных
export type UserUpdate = Database['public']['Tables']['users']['Update']
export type EquipmentUpdate = Database['public']['Tables']['equipment_catalog']['Update']
export type EstimateUpdate = Database['public']['Tables']['estimates']['Update']
export type EstimateItemUpdate = Database['public']['Tables']['estimate_items']['Update']
export type ArticleUpdate = Database['public']['Tables']['articles']['Update']
export type LogoUpdate = Database['public']['Tables']['logos']['Update']

// Типы для спецификаций оборудования
export interface EquipmentSpecifications {
  resolution?: string
  brightness?: string
  contrast?: string
  weight?: string
  pixel_pitch?: string
  refresh_rate?: string
  viewing_angle?: string
  type?: string
  частотный_диапазон?: string
  чувствительность?: string
  импеданс?: string
  [key: string]: string | undefined
}

// Типы для ролей пользователей
export type UserRole = 'client' | 'manager' | 'admin'

// Типы для статусов смет
export type EstimateStatus = 'draft' | 'pending_review' | 'confirmed' | 'canceled'

// Типы для категорий логотипов
export type LogoCategory = 'banking' | 'energy' | 'telecom' | 'tech' | 'aviation' | 'other'
