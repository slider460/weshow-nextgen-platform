import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../config/supabase';
import { LetterCertificate, LetterCertificateInsert, LetterCertificateUpdate } from '../types/database';

export const useLettersCertificates = () => {
  const [letters, setLetters] = useState<LetterCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка всех писем и грамот
  const fetchLetters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 useLettersCertificates: Начинаем загрузку данных...');
      
      const { data, error } = await supabase
        .from('letters_certificates')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true });

      console.log('📊 useLettersCertificates: Ответ от Supabase:', { data, error });

      if (error) {
        console.error('❌ useLettersCertificates: Ошибка Supabase:', error);
        throw error;
      }
      
      console.log('✅ useLettersCertificates: Данные загружены успешно:', data);
      setLetters(data || []);
    } catch (err) {
      console.error('❌ Ошибка при загрузке писем и грамот:', err);
      if (err instanceof Error) {
        if (err.message.includes('relation "letters_certificates" does not exist')) {
          console.log('📋 useLettersCertificates: Таблица не существует');
          setError('Таблица letters_certificates не найдена. Создайте таблицу в Supabase Dashboard.');
        } else if (err.message.includes('permission denied')) {
          console.log('🔒 useLettersCertificates: Нет прав доступа');
          setError('Нет прав доступа к таблице letters_certificates.');
        } else if (err.message.includes('Таймаут')) {
          console.log('⏰ useLettersCertificates: Таймаут');
          setError('Превышено время ожидания загрузки данных. Попробуйте обновить страницу.');
        } else {
          console.log('❓ useLettersCertificates: Неизвестная ошибка:', err.message);
          setError(err.message);
        }
      } else {
        console.log('❓ useLettersCertificates: Неизвестная ошибка (не Error)');
        setError('Неизвестная ошибка при загрузке данных');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Добавление нового письма/грамоты
  const addLetter = async (letter: LetterCertificateInsert) => {
    try {
      const { data, error } = await supabase
        .from('letters_certificates')
        .insert(letter)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setLetters(prev => [...prev, data]);
      return data;
    } catch (err) {
      console.error('Ошибка при добавлении письма/грамоты:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      throw err;
    }
  };

  // Обновление письма/грамоты
  const updateLetter = async (id: string, updates: LetterCertificateUpdate) => {
    try {
      const { data, error } = await supabase
        .from('letters_certificates')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setLetters(prev => prev.map(letter => letter.id === id ? data : letter));
      return data;
    } catch (err) {
      console.error('Ошибка при обновлении письма/грамоты:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      throw err;
    }
  };

  // Удаление письма/грамоты
  const deleteLetter = async (id: string) => {
    try {
      const { error } = await supabase
        .from('letters_certificates')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setLetters(prev => prev.filter(letter => letter.id !== id));
    } catch (err) {
      console.error('Ошибка при удалении письма/грамоты:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      throw err;
    }
  };

  // Загрузка всех писем и грамот (включая скрытые) для админ панели
  const fetchAllLetters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('letters_certificates')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        throw error;
      }
      setLetters(data || []);
    } catch (err) {
      console.error('❌ Ошибка при загрузке всех писем и грамот:', err);
      if (err instanceof Error) {
        if (err.message.includes('Таймаут')) {
          setError('Превышено время ожидания загрузки данных. Попробуйте обновить страницу.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Неизвестная ошибка');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLetters();
  }, [fetchLetters]);

  return {
    letters,
    loading,
    error,
    fetchLetters,
    fetchAllLetters,
    addLetter,
    updateLetter,
    deleteLetter
  };
};

export default useLettersCertificates;
