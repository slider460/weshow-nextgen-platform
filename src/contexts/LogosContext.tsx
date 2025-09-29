import React, { createContext, useContext, useReducer, useCallback, useMemo, ReactNode } from 'react';

interface Logo {
  id: string;
  name: string;
  logoUrl: string;
  logoFile?: File;
  website?: string;
  description?: string;
  category: 'banking' | 'energy' | 'telecom' | 'tech' | 'aviation' | 'other';
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

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

// ✅ Context7 оптимизация: функции для работы с localStorage
const STORAGE_KEY = 'weshow-logos';

const loadLogosFromStorage = (): Logo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Преобразуем строки дат обратно в объекты Date
      return parsed.map((logo: any) => ({
        ...logo,
        createdAt: new Date(logo.createdAt),
        updatedAt: new Date(logo.updatedAt)
      }));
    }
  } catch (error) {
    console.error('Error loading logos from storage:', error);
  }
  return initialState.logos;
};

const saveLogosToStorage = (logos: Logo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logos));
  } catch (error) {
    console.error('Error saving logos to storage:', error);
  }
};

function logosReducer(state: LogosState, action: LogosAction): LogosState {
  let newState: LogosState;
  
  switch (action.type) {
    case 'SET_LOADING':
      newState = { ...state, isLoading: action.payload };
      break;
    case 'SET_ERROR':
      newState = { ...state, error: action.payload };
      break;
    case 'SET_LOGOS':
      newState = { ...state, logos: action.payload };
      break;
    case 'ADD_LOGO':
      newState = { 
        ...state, 
        logos: [...state.logos, { ...action.payload, order: state.logos.length + 1 }]
      };
      break;
    case 'UPDATE_LOGO':
      newState = {
        ...state,
        logos: state.logos.map(logo => 
          logo.id === action.payload.id 
            ? { ...logo, ...action.payload.updates, updatedAt: new Date() }
            : logo
        )
      };
      break;
    case 'DELETE_LOGO':
      newState = {
        ...state,
        logos: state.logos.filter(logo => logo.id !== action.payload)
      };
      break;
    case 'SET_SELECTED_LOGO':
      newState = { ...state, selectedLogo: action.payload };
      break;
    case 'SET_UPLOADING':
      newState = { ...state, isUploading: action.payload };
      break;
    case 'SET_UPLOAD_PROGRESS':
      newState = { ...state, uploadProgress: action.payload };
      break;
    case 'REORDER_LOGOS':
      const newLogos = [...state.logos];
      const [removed] = newLogos.splice(action.payload.fromIndex, 1);
      newLogos.splice(action.payload.toIndex, 0, removed);
      newState = {
        ...state,
        logos: newLogos.map((logo, index) => ({ ...logo, order: index + 1 }))
      };
      break;
    case 'TOGGLE_LOGO_ACTIVE':
      newState = {
        ...state,
        logos: state.logos.map(logo =>
          logo.id === action.payload 
            ? { ...logo, isActive: !logo.isActive, updatedAt: new Date() }
            : logo
        )
      };
      break;
    default:
      return state;
  }
  
  // ✅ Context7 оптимизация: автоматически сохраняем в localStorage при изменениях
  if (action.type !== 'SET_LOADING' && action.type !== 'SET_ERROR' && action.type !== 'SET_UPLOADING' && action.type !== 'SET_UPLOAD_PROGRESS' && action.type !== 'SET_SELECTED_LOGO') {
    saveLogosToStorage(newState.logos);
  }
  
  return newState;
}

interface LogosContextType {
  state: LogosState;
  addLogo: (logo: Omit<Logo, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => void;
  updateLogo: (id: string, updates: Partial<Logo>) => void;
  deleteLogo: (id: string) => void;
  selectLogo: (logo: Logo | null) => void;
  reorderLogos: (fromIndex: number, toIndex: number) => void;
  toggleLogoActive: (id: string) => void;
  uploadLogo: (file: File, logoData: Omit<Logo, 'id' | 'logoUrl' | 'createdAt' | 'updatedAt' | 'order'>) => Promise<void>;
  getActiveLogos: () => Logo[];
  getLogosByCategory: (category: Logo['category']) => Logo[];
  getLogoById: (id: string) => Logo | undefined;
  clearError: () => void;
  exportLogos: () => void;
  importLogos: (file: File) => Promise<void>;
  resetToDefaults: () => void;
}

const LogosContext = createContext<LogosContextType | undefined>(undefined);

export function LogosProvider({ children }: { children: ReactNode }) {
  // ✅ Context7 оптимизация: загружаем данные из localStorage при инициализации
  const [state, dispatch] = useReducer(logosReducer, {
    ...initialState,
    logos: loadLogosFromStorage()
  });
  
  const addLogo = useCallback((logo: Omit<Logo, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => {
    const newLogo: Logo = {
      ...logo,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      order: state.logos.length + 1
    };
    dispatch({ type: 'ADD_LOGO', payload: newLogo });
  }, [state.logos.length]);
  
  const updateLogo = useCallback((id: string, updates: Partial<Logo>) => {
    dispatch({ type: 'UPDATE_LOGO', payload: { id, updates } });
  }, []);
  
  const deleteLogo = useCallback((id: string) => {
    dispatch({ type: 'DELETE_LOGO', payload: id });
  }, []);
  
  const selectLogo = useCallback((logo: Logo | null) => {
    dispatch({ type: 'SET_SELECTED_LOGO', payload: logo });
  }, []);
  
  const reorderLogos = useCallback((fromIndex: number, toIndex: number) => {
    dispatch({ type: 'REORDER_LOGOS', payload: { fromIndex, toIndex } });
  }, []);
  
  const toggleLogoActive = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_LOGO_ACTIVE', payload: id });
  }, []);
  
  const uploadLogo = useCallback(async (file: File, logoData: Omit<Logo, 'id' | 'logoUrl' | 'createdAt' | 'updatedAt' | 'order'>) => {
    // ✅ Context7 оптимизация: валидация файла
    if (!file) {
      dispatch({ type: 'SET_ERROR', payload: 'Файл не выбран' });
      return;
    }

    // Проверяем тип файла
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      dispatch({ type: 'SET_ERROR', payload: 'Неподдерживаемый формат файла. Используйте JPG, PNG или SVG' });
      return;
    }

    // Проверяем размер файла (максимум 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      dispatch({ type: 'SET_ERROR', payload: 'Файл слишком большой. Максимальный размер: 5MB' });
      return;
    }

    dispatch({ type: 'SET_UPLOADING', payload: true });
    dispatch({ type: 'SET_UPLOAD_PROGRESS', payload: 0 });
    dispatch({ type: 'SET_ERROR', payload: null });
    
    try {
      // ✅ Context7 оптимизация: имитация загрузки с реальным прогрессом
      const totalSteps = 10;
      for (let i = 0; i <= totalSteps; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        const progress = Math.round((i / totalSteps) * 100);
        dispatch({ type: 'SET_UPLOAD_PROGRESS', payload: progress });
      }
      
      // ✅ Context7 оптимизация: создаем URL для загруженного файла
      const logoUrl = URL.createObjectURL(file);
      
      // ✅ Context7 оптимизация: добавляем логотип с валидацией
      if (!logoData.name.trim()) {
        throw new Error('Название логотипа обязательно');
      }
      
      addLogo({
        ...logoData,
        logoUrl,
        name: logoData.name.trim()
      });
      
      dispatch({ type: 'SET_ERROR', payload: null });
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
    return state.logos.filter(logo => logo.isActive).sort((a, b) => a.order - b.order);
  }, [state.logos]);
  
  const getLogosByCategory = useCallback((category: Logo['category']) => {
    return state.logos.filter(logo => logo.category === category && logo.isActive);
  }, [state.logos]);
  
  const getLogoById = useCallback((id: string) => {
    return state.logos.find(logo => logo.id === id);
  }, [state.logos]);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  // ✅ Context7 оптимизация: функции для экспорта и импорта данных
  const exportLogos = useCallback(() => {
    try {
      const dataStr = JSON.stringify(state.logos, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `weshow-logos-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting logos:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Ошибка экспорта данных' });
    }
  }, [state.logos]);

  const importLogos = useCallback(async (file: File) => {
    try {
      const text = await file.text();
      const importedLogos = JSON.parse(text);
      
      // Валидация импортированных данных
      if (!Array.isArray(importedLogos)) {
        throw new Error('Неверный формат файла');
      }
      
      // Преобразуем даты и добавляем недостающие поля
      const validatedLogos = importedLogos.map((logo: any) => ({
        id: logo.id || Date.now().toString(),
        name: logo.name || 'Неизвестная компания',
        logoUrl: logo.logoUrl || '/placeholder.svg',
        category: logo.category || 'other',
        isActive: logo.isActive !== undefined ? logo.isActive : true,
        order: logo.order || 1,
        website: logo.website || '',
        description: logo.description || '',
        createdAt: logo.createdAt ? new Date(logo.createdAt) : new Date(),
        updatedAt: new Date()
      }));
      
      dispatch({ type: 'SET_LOGOS', payload: validatedLogos });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      console.error('Error importing logos:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Ошибка импорта данных. Проверьте формат файла.' });
    }
  }, []);

  const resetToDefaults = useCallback(() => {
    if (window.confirm('Вы уверены, что хотите сбросить все логотипы к значениям по умолчанию? Это действие нельзя отменить.')) {
      dispatch({ type: 'SET_LOGOS', payload: initialState.logos });
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);
  
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
    exportLogos,
    importLogos,
    resetToDefaults
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
    exportLogos,
    importLogos,
    resetToDefaults
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
