import { useQuery } from '@tanstack/react-query';
import { supabase } from '../config/supabase';

const fetchArticles = async () => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      article_categories (
        id,
        name,
        slug
      ),
      users (
        id,
        name
      )
    `)
    .order('published_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Хук для получения статей по категории
export const useArticlesByCategory = (categoryId?: string) => {
  return useQuery({
    queryKey: ['articles', 'category', categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          article_categories (
            id,
            name,
            slug
          ),
          users (
            id,
            name
          )
        `)
        .eq('category_id', categoryId)
        .order('published_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
  });
};

// Хук для получения статьи по ID
export const useArticle = (id?: string) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          article_categories (
            id,
            name,
            slug
          ),
          users (
            id,
            name
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 30, // 30 minutes
    cacheTime: 1000 * 60 * 60 * 12, // 12 hours
  });
};

// Хук для поиска статей
export const useSearchArticles = (searchTerm: string) => {
  return useQuery({
    queryKey: ['articles', 'search', searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          article_categories (
            id,
            name,
            slug
          ),
          users (
            id,
            name
          )
        `)
        .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
        .order('published_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    enabled: searchTerm.trim().length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};
