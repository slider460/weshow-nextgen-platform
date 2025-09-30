import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export interface Case {
  id: string;
  title: string;
  client: string;
  year: string;
  description: string;
  results: string[];
  technologies: string[];
  image_url?: string;
  video_url?: string;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const useCases = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Безопасная инициализация
  useEffect(() => {
    // Небольшая задержка, чтобы избежать проблем с инициализацией
    const timer = setTimeout(() => {
      fetchCases();
    }, 100);

    // Принудительное завершение загрузки через 3 секунды
    const timeout = setTimeout(() => {
      console.log('Принудительное завершение загрузки кейсов');
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timeout);
    };
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Загружаем кейсы...');

      // Проверяем, что supabase инициализирован
      if (!supabase) {
        console.log('Supabase не инициализирован, возвращаем пустой массив');
        setCases([]);
        setError(null);
        return;
      }

      // Проверяем, существует ли таблица cases
      const { data, error: fetchError } = await supabase
        .from('cases')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true });

      if (fetchError) {
        console.error('Ошибка Supabase:', fetchError);
        // Если таблица не существует, просто возвращаем пустой массив
        if (fetchError.message.includes('relation "public.cases" does not exist') ||
            fetchError.message.includes('Could not find the table')) {
          console.log('Таблица cases не существует, возвращаем пустой массив');
          setCases([]);
          setError(null);
          return;
        }
        throw fetchError;
      }

      console.log('Кейсы загружены:', data);
      setCases(data || []);
    } catch (err) {
      console.error('Ошибка загрузки кейсов:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      // Устанавливаем пустой массив при ошибке, чтобы не ломать интерфейс
      setCases([]);
    } finally {
      setLoading(false);
    }
  };


  return {
    cases,
    loading,
    error,
    refetch: fetchCases
  };
};

export default useCases;
