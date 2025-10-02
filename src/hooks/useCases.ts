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

      console.log('🔄 useCases: Загружаем кейсы через REST API...');

      // Используем REST API вместо Supabase клиента
      const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
      const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
      
      const url = `${SUPABASE_URL}/rest/v1/cases?select=*&is_visible=eq.true&order=sort_order.asc`;
      
      console.log('🔄 useCases: Делаем REST запрос...');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('🔄 useCases: Ответ получен, статус:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ useCases: HTTP ошибка:', response.status, errorText);
        
        // Если таблица не существует, просто возвращаем пустой массив
        if (errorText.includes('relation "public.cases" does not exist') ||
            errorText.includes('Could not find the table')) {
          console.log('📋 useCases: Таблица cases не существует, возвращаем пустой массив');
          setCases([]);
          setError(null);
          return;
        }
        
        setError(`HTTP ошибка ${response.status}: ${errorText}`);
        setCases([]);
        return;
      }

      const data = await response.json();
      console.log('✅ useCases: Кейсы загружены:', data);
      console.log('✅ useCases: Количество записей:', data?.length || 0);
      
      setCases(data || []);
    } catch (err) {
      console.error('❌ useCases: Ошибка загрузки кейсов:', err);
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
