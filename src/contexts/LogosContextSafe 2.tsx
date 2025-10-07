import React, { createContext, useContext, useReducer, useCallback, useMemo, ReactNode, useEffect } from 'react';

// Безопасная версия LogosContext без Supabase зависимостей
interface Logo {
  id: string;
  name: string;
  url: string;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
      return {
        ...state,
        logos: state.logos.filter(logo => logo.id !== action.payload)
      };
    case 'SET_SELECTED_LOGO':
      return { ...state, selectedLogo: action.payload };
    case 'SET_UPLOADING':
      return { ...state, isUploading: action.payload };
    case 'SET_UPLOAD_PROGRESS':
      return { ...state, uploadProgress: action.payload };
    case 'REORDER_LOGOS':
      const { fromIndex, toIndex } = action.payload;
      const newLogos = [...state.logos];
      const [movedLogo] = newLogos.splice(fromIndex, 1);
      newLogos.splice(toIndex, 0, movedLogo);
      return { ...state, logos: newLogos };
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
  logos: Logo[];
  isLoading: boolean;
  error: string | null;
  selectedLogo: Logo | null;
  isUploading: boolean;
  uploadProgress: number;
  fetchLogos: () => Promise<void>;
  addLogo: (logo: Omit<Logo, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateLogo: (id: string, updates: Partial<Logo>) => Promise<void>;
  deleteLogo: (id: string) => Promise<void>;
  setSelectedLogo: (logo: Logo | null) => void;
  reorderLogos: (fromIndex: number, toIndex: number) => void;
  toggleLogoActive: (id: string) => void;
  uploadLogo: (file: File) => Promise<void>;
  clearError: () => void;
}

const LogosContext = createContext<LogosContextType | undefined>(undefined);

interface LogosProviderProps {
  children: ReactNode;
}

export const LogosProvider: React.FC<LogosProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(logosReducer, initialState);

  // Безопасная загрузка логотипов (заглушка)
  const fetchLogos = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      console.log('LogosContextSafe: Загружаем логотипы (безопасный режим)...');
      
      // Заглушка - возвращаем пустой массив
      dispatch({ type: 'SET_LOGOS', payload: [] });
      
    } catch (error) {
      console.error('LogosContextSafe: Ошибка загрузки логотипов:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Ошибка загрузки логотипов' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Заглушки для остальных методов
  const addLogo = useCallback(async (logo: Omit<Logo, 'id' | 'created_at' | 'updated_at'>) => {
    console.log('LogosContextSafe: addLogo (заглушка)');
  }, []);

  const updateLogo = useCallback(async (id: string, updates: Partial<Logo>) => {
    console.log('LogosContextSafe: updateLogo (заглушка)');
  }, []);

  const deleteLogo = useCallback(async (id: string) => {
    console.log('LogosContextSafe: deleteLogo (заглушка)');
  }, []);

  const setSelectedLogo = useCallback((logo: Logo | null) => {
    dispatch({ type: 'SET_SELECTED_LOGO', payload: logo });
  }, []);

  const reorderLogos = useCallback((fromIndex: number, toIndex: number) => {
    dispatch({ type: 'REORDER_LOGOS', payload: { fromIndex, toIndex } });
  }, []);

  const toggleLogoActive = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_LOGO_ACTIVE', payload: id });
  }, []);

  const uploadLogo = useCallback(async (file: File) => {
    console.log('LogosContextSafe: uploadLogo (заглушка)');
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  // Загружаем логотипы при инициализации (безопасно)
  useEffect(() => {
    console.log('LogosContextSafe: Инициализация...');
    fetchLogos();
  }, [fetchLogos]);

  const value = useMemo(() => ({
    ...state,
    fetchLogos,
    addLogo,
    updateLogo,
    deleteLogo,
    setSelectedLogo,
    reorderLogos,
    toggleLogoActive,
    uploadLogo,
    clearError
  }), [state, fetchLogos, addLogo, updateLogo, deleteLogo, setSelectedLogo, reorderLogos, toggleLogoActive, uploadLogo, clearError]);

  return (
    <LogosContext.Provider value={value}>
      {children}
    </LogosContext.Provider>
  );
};

export const useLogos = (): LogosContextType => {
  const context = useContext(LogosContext);
  if (context === undefined) {
    throw new Error('useLogos must be used within a LogosProvider');
  }
  return context;
};


