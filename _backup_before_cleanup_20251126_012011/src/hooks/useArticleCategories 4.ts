import { useQuery } from '@tanstack/react-query';
import { supabase } from '../config/supabase';

const fetchArticleCategories = async () => {
  const { data, error } = await supabase
    .from('article_categories')
    .select('*')
    .order('name');

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useArticleCategories = () => {
  return useQuery({
    queryKey: ['article-categories'],
    queryFn: fetchArticleCategories,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};
