import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../config/supabase';
import { LetterCertificate, LetterCertificateInsert, LetterCertificateUpdate } from '../types/database';

// Fallback данные для демонстрации
const getFallbackLetters = (): LetterCertificate[] => [
  {
    id: 'fallback-1',
    title: 'Благодарственное письмо от Министерства Туризма Самарской области',
    issuer: 'Министерство туризма Самарской области',
    description: 'За высокий профессионализм, личный вклад в подготовку и проведение региональной выставки «Самара»',
    type: 'letter',
    issued_date: '2025-02-01',
    document_url: '/testimonials/pdf/museum-samara-thank-you.pdf',
    is_visible: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'fallback-2',
    title: 'Благодарственное письмо от ТРЦ Саларис',
    issuer: 'АО "ЛАУТ"',
    description: 'Благодарственное письмо по результату годовых проектов',
    type: 'letter',
    issued_date: '2018-04-01',
    document_url: '/testimonials/pdf/salaris-thank-you.pdf',
    is_visible: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'fallback-3',
    title: 'Технический продакшн',
    issuer: 'Премия событийный индустрии "Многогранность"',
    description: '1 место в номинации Технический продакшн/продюсирование',
    type: 'award',
    issued_date: '2024-01-01',
    document_url: '/testimonials/pdf/event-industry-award.pdf',
    is_visible: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'fallback-4',
    title: 'Поставщик технических инновационных продуктов',
    issuer: 'Премия событийной индустрии "Многогранность"',
    description: '1 место в номинации Поставщик технических инновационных продуктов',
    type: 'award',
    issued_date: '2024-01-01',
    document_url: '/testimonials/pdf/technical-innovations-award.pdf',
    is_visible: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

// Функция для получения писем и грамот
const fetchLetters = async (): Promise<LetterCertificate[]> => {
  try {
    console.log('🔄 fetchLetters: Загружаем письма и грамоты...');

    const { data, error } = await supabase
      .from('letters_certificates')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('❌ fetchLetters: Ошибка Supabase:', error);
      throw new Error(error.message);
    }

    console.log('✅ fetchLetters: Письма и грамоты загружены:', data);
    return data || [];
  } catch (error) {
    console.error('❌ fetchLetters: Ошибка API:', error);
    // Возвращаем fallback данные при ошибке
    return getFallbackLetters();
  }
};

// Функция для получения всех писем (включая скрытые) для админ панели
const fetchAllLetters = async (): Promise<LetterCertificate[]> => {
  try {
    console.log('🔄 fetchAllLetters: Загружаем все письма...');

    const { data, error } = await supabase
      .from('letters_certificates')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('❌ fetchAllLetters: Ошибка Supabase:', error);
      throw new Error(error.message);
    }

    console.log('✅ fetchAllLetters: Все письма загружены:', data);
    return data || [];
  } catch (error) {
    console.error('❌ fetchAllLetters: Ошибка API:', error);
    // Возвращаем fallback данные при ошибке
    return getFallbackLetters();
  }
};

// Функция для добавления письма
const addLetter = async (letter: LetterCertificateInsert): Promise<LetterCertificate> => {
  const { data, error } = await supabase
    .from('letters_certificates')
    .insert(letter)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Функция для обновления письма
const updateLetter = async ({ id, updates }: { id: string; updates: LetterCertificateUpdate }): Promise<LetterCertificate> => {
  const { data, error } = await supabase
    .from('letters_certificates')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Функция для удаления письма
const deleteLetter = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('letters_certificates')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};

// Основные хуки
export const useLettersCertificates = () => {
  return useQuery({
    queryKey: ['letters-certificates'],
    queryFn: fetchLetters,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    retry: 2,
    throwOnError: false,
  });
};

export const useAllLettersCertificates = () => {
  return useQuery({
    queryKey: ['letters-certificates', 'all'],
    queryFn: fetchAllLetters,
    staleTime: 1000 * 60 * 30, // 30 minutes
    cacheTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 2,
    throwOnError: false,
  });
};

export const useAddLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addLetter,
    onSuccess: () => {
      // Инвалидируем кэш после добавления
      queryClient.invalidateQueries({ queryKey: ['letters-certificates'] });
    },
  });
};

export const useUpdateLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLetter,
    onSuccess: () => {
      // Инвалидируем кэш после обновления
      queryClient.invalidateQueries({ queryKey: ['letters-certificates'] });
    },
  });
};

export const useDeleteLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLetter,
    onSuccess: () => {
      // Инвалидируем кэш после удаления
      queryClient.invalidateQueries({ queryKey: ['letters-certificates'] });
    },
  });
};
