import { useState, useEffect } from 'react';
import { localCases, LocalCase } from '../data/cases';

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
  created_at?: string;
  updated_at?: string;
}

export const useCases = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Имитируем загрузку для совместимости с существующим кодом
    const timer = setTimeout(() => {
      try {
        // Преобразуем LocalCase в Case формат
        const formattedCases: Case[] = localCases
          .filter(c => c.is_visible)
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((localCase): Case => ({
            id: localCase.id,
            title: localCase.title,
            client: localCase.client,
            year: localCase.year,
            description: localCase.description,
            results: localCase.results,
            technologies: localCase.technologies,
            image_url: localCase.image_url,
            video_url: localCase.video_url,
            is_visible: localCase.is_visible,
            sort_order: localCase.sort_order,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }));
        
        setCases(formattedCases);
        console.log('✅ useCases: Локальные кейсы загружены:', formattedCases.length);
      } catch (err) {
        console.error('❌ useCases: Ошибка загрузки локальных кейсов:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setCases([]);
      } finally {
        setLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const fetchCases = () => {
    // Просто обновляем данные из локального массива
    const formattedCases: Case[] = localCases
      .filter(c => c.is_visible)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((localCase): Case => ({
        id: localCase.id,
        title: localCase.title,
        client: localCase.client,
        year: localCase.year,
        description: localCase.description,
        results: localCase.results,
        technologies: localCase.technologies,
        image_url: localCase.image_url,
        video_url: localCase.video_url,
        is_visible: localCase.is_visible,
        sort_order: localCase.sort_order,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
    
    setCases(formattedCases);
  };

  return {
    cases,
    loading,
    error,
    refetch: fetchCases
  };
};

export default useCases;
