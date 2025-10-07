import React, { createContext, useContext, useReducer, useCallback, useMemo, ReactNode, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { Logo, LogoInsert, LogoUpdate, LogoCategory } from '../types/database';
import { logger } from '../utils/logger';

interface LogosState {
  logos: Logo[];
  isLoading: boolean;
  error: string | null;
  selectedLogo: Logo | null;
  isUploading: boolean;
  uploadProgress: number;
}

type LogosAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOGOS'; payload: Logo[] }
  | { type: 'ADD_LOGO'; payload: Logo }
  | { type: 'UPDATE_LOGO'; payload: { id: string; updates: Partial<Logo> } }
  | { type: 'DELETE_LOGO'; payload: string }
  | { type: 'SET_SELECTED_LOGO'; payload: Logo | null }
  | { type: 'SET_UPLOADING'; payload: boolean }
  | { type: 'SET_UPLOAD_PROGRESS'; payload: number }
  | { type: 'REORDER_LOGOS'; payload: { fromIndex: number; toIndex: number } }
  | { type: 'TOGGLE_LOGO_ACTIVE'; payload: string };

const initialState: LogosState = {
  logos: [],
  isLoading: false,
  error: null,
  selectedLogo: null,
  isUploading: false,
  uploadProgress: 0
};

function logosReducer(state: LogosState, action: LogosAction): LogosState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOGOS':
      return { ...state, logos: action.payload };
    case 'ADD_LOGO':
      return { 
        ...state, 
        logos: [...state.logos, action.payload]
      };
    case 'UPDATE_LOGO':
      return {
        ...state,
        logos: state.logos.map(logo => 
          logo.id === action.payload.id 
            ? { ...logo, ...action.payload.updates }
            : logo
        )
      };
    case 'DELETE_LOGO':
      const filteredLogos = state.logos.filter(logo => logo.id !== action.payload);
      console.log('LogosReducer: Удаление логотипа', action.payload, 'Было:', state.logos.length, 'Стало:', filteredLogos.length);
      return {
        ...state,
        logos: filteredLogos
      };
    case 'SET_SELECTED_LOGO':
      return { ...state, selectedLogo: action.payload };
    case 'SET_UPLOADING':
      return { ...state, isUploading: action.payload };
    case 'SET_UPLOAD_PROGRESS':
      return { ...state, uploadProgress: action.payload };
    case 'REORDER_LOGOS':
      const newLogos = [...state.logos];
      const [removed] = newLogos.splice(action.payload.fromIndex, 1);
      newLogos.splice(action.payload.toIndex, 0, removed);
      return {
        ...state,
        logos: newLogos.map((logo, index) => ({ ...logo, sort_order: index + 1 }))
      };
    case 'TOGGLE_LOGO_ACTIVE':
      return {
        ...state,
        logos: state.logos.map(logo =>
          logo.id === action.payload 
            ? { ...logo, is_active: !logo.is_active }
            : logo
        )
      };
    default:
      return state;
  }
}

interface LogosContextType {
  state: LogosState;
  addLogo: (logo: LogoInsert) => Promise<void>;
  updateLogo: (id: string, updates: LogoUpdate) => Promise<void>;
  deleteLogo: (id: string) => Promise<void>;
  selectLogo: (logo: Logo | null) => void;
  reorderLogos: (fromIndex: number, toIndex: number) => Promise<void>;
  toggleLogoActive: (id: string) => Promise<void>;
  uploadLogo: (file: File, logoData: Omit<LogoInsert, 'logo_url'>) => Promise<void>;
  getActiveLogos: () => Logo[];
  getLogosByCategory: (category: LogoCategory) => Logo[];
  getLogoById: (id: string) => Logo | undefined;
  clearError: () => void;
  fetchLogos: () => Promise<void>;
  forceRefresh: () => Promise<void>;
}

const LogosContext = createContext<LogosContextType | undefined>(undefined);

export function LogosProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(logosReducer, initialState);
  
  // Очищаем localStorage при инициализации
  useEffect(() => {
    // Очищаем все данные логотипов из localStorage
    try {
      localStorage.removeItem('logos');
      localStorage.removeItem('logos_data');
      localStorage.removeItem('logos_state');
      
      // Очищаем все ключи, которые могут содержать данные логотипов
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes('logo') || key.includes('Logos')) {
          localStorage.removeItem(key);
        }
      });
      logger.debug('LogosContextDB: localStorage очищен от старых данных');
      
      // Принудительно очищаем кэш браузера
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
        logger.debug('LogosContextDB: Кэш браузера очищен');
      }
    } catch (error) {
      logger.warn('LogosContextDB: Ошибка очистки localStorage:', error);
    }
  }, []);
  
  // Загружаем логотипы при инициализации
  useEffect(() => {
    logger.info('LogosContextDB: Инициализация - загружаем логотипы...');
    fetchLogos();
  }, []);

  const fetchLogos = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      logger.info('🔄 LogosContextDB: Начинаем загрузку логотипов из Supabase...');

      // Принудительно очищаем кэш и загружаем свежие данные
      const { data, error } = await supabase
        .from('logos')
        .select('*')
        .order('sort_order', { ascending: true });

      logger.info('📡 LogosContextDB: Ответ от Supabase получен');
      logger.info('📊 LogosContextDB: error:', error);
      logger.info('📊 LogosContextDB: data:', data);
      logger.info('📊 LogosContextDB: data type:', typeof data);
      logger.info('📊 LogosContextDB: data is array:', Array.isArray(data));

      if (error) {
        logger.error('❌ Ошибка загрузки логотипов:', error);
        logger.error('❌ Код ошибки:', error.code);
        logger.error('❌ Сообщение:', error.message);
        logger.error('❌ Детали:', error.details);
        dispatch({ type: 'SET_ERROR', payload: 'Ошибка загрузки логотипов' });
        return;
      }

      logger.info('✅ LogosContextDB: Загружено логотипов из Supabase:', data?.length || 0);
      logger.debug('📋 LogosContextDB: Данные логотипов:', data);
      
      // Проверяем, не было ли локальных изменений (например, удалений)
      const currentLogos = state.logos;
      const newLogos = data || [];
      
      // Если количество логотипов уменьшилось локально, не перезаписываем
      // Но если количество увеличилось (добавление), то обновляем
      if (currentLogos.length > newLogos.length) {
        logger.debug('LogosContextDB: Пропускаем загрузку - есть локальные изменения (удаление)');
        return;
      }
      
      logger.debug('LogosContextDB: Обновляем данные из базы:', {
        current: currentLogos.length,
        new: newLogos.length,
        difference: newLogos.length - currentLogos.length
      });
      
      dispatch({ type: 'SET_LOGOS', payload: newLogos });
    } catch (err) {
      logger.error('Ошибка загрузки логотипов:', err);
      dispatch({ type: 'SET_ERROR', payload: 'Ошибка загрузки логотипов' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);
  
  const addLogo = useCallback(async (logo: Omit<Logo, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      const { data, error } = await supabase
        .from('logos')
        .insert([logo])
        .select()
        .single();

      if (error) {
        console.error('Ошибка добавления логотипа:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Ошибка добавления логотипа' });
        return;
      }

      dispatch({ type: 'ADD_LOGO', payload: data });
      console.log('LogosContextDB: Логотип добавлен, данные синхронизированы');
      
      // Немедленно обновляем данные из базы для синхронизации
      setTimeout(() => {
        console.log('LogosContextDB: Принудительное обновление после добавления...');
        fetchLogos();
      }, 100);
    } catch (err) {
      console.error('Ошибка добавления логотипа:', err);
      dispatch({ type: 'SET_ERROR', payload: 'Ошибка добавления логотипа' });
    }
  }, [fetchLogos]);
  
  const updateLogo = useCallback(async (id: string, updates: Partial<Logo>) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      const { error } = await supabase
        .from('logos')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Ошибка обновления логотипа:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Ошибка обновления логотипа' });
        return;
      }

      dispatch({ type: 'UPDATE_LOGO', payload: { id, updates } });
      console.log('LogosContextDB: Логотип обновлен, данные синхронизированы');
      
      // Немедленно обновляем данные из базы для синхронизации
      setTimeout(() => {
        console.log('LogosContextDB: Принудительное обновление после изменения...');
        fetchLogos();
      }, 100);
    } catch (err) {
      console.error('Ошибка обновления логотипа:', err);
      dispatch({ type: 'SET_ERROR', payload: 'Ошибка обновления логотипа' });
    }
  }, [fetchLogos]);
  
  const deleteLogo = useCallback(async (id: string) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      const { error } = await supabase
        .from('logos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Ошибка удаления логотипа:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Ошибка удаления логотипа' });
        return;
      }

      dispatch({ type: 'DELETE_LOGO', payload: id });
      console.log('LogosContextDB: Логотип удален, данные синхронизированы');
      
      // НЕ обновляем данные из базы после удаления, чтобы избежать возврата удаленных логотипов
    } catch (err) {
      console.error('Ошибка удаления логотипа:', err);
      dispatch({ type: 'SET_ERROR', payload: 'Ошибка удаления логотипа' });
    }
  }, []);
  
  const selectLogo = useCallback((logo: Logo | null) => {
    dispatch({ type: 'SET_SELECTED_LOGO', payload: logo });
  }, []);
  
  const reorderLogos = useCallback(async (fromIndex: number, toIndex: number) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      // Обновляем локальное состояние
      dispatch({ type: 'REORDER_LOGOS', payload: { fromIndex, toIndex } });

      // Получаем обновленный список
      const newLogos = [...state.logos];
      const [removed] = newLogos.splice(fromIndex, 1);
      newLogos.splice(toIndex, 0, removed);
      const reorderedLogos = newLogos.map((logo, index) => ({ ...logo, sort_order: index + 1 }));

      // Обновляем в базе данных
      for (const logo of reorderedLogos) {
        await supabase
          .from('logos')
          .update({ sort_order: logo.sort_order })
          .eq('id', logo.id);
      }
    } catch (err) {
      console.error('Ошибка изменения порядка:', err);
      dispatch({ type: 'SET_ERROR', payload: 'Ошибка изменения порядка' });
    }
  }, [state.logos]);
  
  const toggleLogoActive = useCallback(async (id: string) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      const logo = state.logos.find(l => l.id === id);
      if (!logo) return;

      const { error } = await supabase
        .from('logos')
        .update({ is_active: !logo.is_active })
        .eq('id', id);

      if (error) {
        console.error('Ошибка изменения статуса:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Ошибка изменения статуса' });
        return;
      }

      dispatch({ type: 'TOGGLE_LOGO_ACTIVE', payload: id });
      console.log('LogosContextDB: Статус логотипа изменен, данные синхронизированы');
      
      // Немедленно обновляем данные из базы для синхронизации
      setTimeout(() => {
        console.log('LogosContextDB: Принудительное обновление после изменения статуса...');
        fetchLogos();
      }, 100);
    } catch (err) {
      console.error('Ошибка изменения статуса:', err);
      dispatch({ type: 'SET_ERROR', payload: 'Ошибка изменения статуса' });
    }
  }, [state.logos, fetchLogos]);
  
  const uploadLogo = useCallback(async (file: File, logoData: Omit<Logo, 'id' | 'logo_url' | 'created_at' | 'updated_at'>) => {
    // Валидация файла
    if (!file) {
      dispatch({ type: 'SET_ERROR', payload: 'Файл не выбран' });
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      dispatch({ type: 'SET_ERROR', payload: 'Неподдерживаемый формат файла. Используйте JPG, PNG или SVG' });
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      dispatch({ type: 'SET_ERROR', payload: 'Файл слишком большой. Максимальный размер: 5MB' });
      return;
    }

    dispatch({ type: 'SET_UPLOADING', payload: true });
    dispatch({ type: 'SET_UPLOAD_PROGRESS', payload: 0 });
    dispatch({ type: 'SET_ERROR', payload: null });
    
    try {
      // Имитация прогресса загрузки
      const totalSteps = 10;
      for (let i = 0; i <= totalSteps; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        const progress = Math.round((i / totalSteps) * 100);
        dispatch({ type: 'SET_UPLOAD_PROGRESS', payload: progress });
      }
      
      // Загружаем файл в Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);

      // Добавляем логотип в базу данных
      await addLogo({
        ...logoData,
        logo_url: data.publicUrl
      });
      
      dispatch({ type: 'SET_ERROR', payload: null });
      console.log('LogosContextDB: Логотип загружен, данные синхронизированы');
      
      // Немедленно обновляем данные из базы для синхронизации
      setTimeout(() => {
        console.log('LogosContextDB: Принудительное обновление после загрузки...');
        fetchLogos();
      }, 100);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки логотипа';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Error uploading logo:', error);
    } finally {
      dispatch({ type: 'SET_UPLOADING', payload: false });
      dispatch({ type: 'SET_UPLOAD_PROGRESS', payload: 0 });
    }
  }, [addLogo]);
  
  const getActiveLogos = useCallback(() => {
    const allLogos = state.logos;
    const activeLogos = allLogos.filter(logo => logo.is_active);
    const sortedLogos = activeLogos.sort((a, b) => a.sort_order - b.sort_order);
    
    console.log('LogosContextDB: Все логотипы:', allLogos.length, allLogos);
    console.log('LogosContextDB: Активные логотипы:', activeLogos.length, activeLogos);
    console.log('LogosContextDB: Отсортированные логотипы:', sortedLogos.length, sortedLogos);
    
    return sortedLogos;
  }, [state.logos]);
  
  const getLogosByCategory = useCallback((category: Logo['category']) => {
    return state.logos.filter(logo => logo.category === category && logo.is_active);
  }, [state.logos]);
  
  const getLogoById = useCallback((id: string) => {
    return state.logos.find(logo => logo.id === id);
  }, [state.logos]);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  const forceRefresh = useCallback(async () => {
    console.log('LogosContextDB: Принудительное обновление данных...');
    // Сначала очищаем локальное состояние
    dispatch({ type: 'SET_LOGOS', payload: [] });
    // Затем загружаем свежие данные
    await fetchLogos();
  }, [fetchLogos]);
  
  const value = useMemo(() => ({
    state,
    addLogo,
    updateLogo,
    deleteLogo,
    selectLogo,
    reorderLogos,
    toggleLogoActive,
    uploadLogo,
    getActiveLogos,
    getLogosByCategory,
    getLogoById,
    clearError,
    fetchLogos,
    forceRefresh
  }), [
    state,
    addLogo,
    updateLogo,
    deleteLogo,
    selectLogo,
    reorderLogos,
    toggleLogoActive,
    uploadLogo,
    getActiveLogos,
    getLogosByCategory,
    getLogoById,
    clearError,
    fetchLogos,
    forceRefresh
  ]);
  
  return (
    <LogosContext.Provider value={value}>
      {children}
    </LogosContext.Provider>
  );
}

export function useLogos() {
  const context = useContext(LogosContext);
  if (context === undefined) {
    throw new Error('useLogos must be used within a LogosProvider');
  }
  return context;
}
