import React, { createContext, useContext, useReducer, useCallback, useEffect, ReactNode } from 'react';
import { Logo } from '../types/database';

// REST API конфигурация
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

interface LogosState {
  logos: Logo[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

type LogosAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOGOS'; payload: Logo[] }
  | { type: 'SET_LAST_UPDATED'; payload: Date };

const initialState: LogosState = {
  logos: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const logosReducer = (state: LogosState, action: LogosAction): LogosState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_LOGOS':
      return { 
        ...state, 
        logos: action.payload, 
        loading: false, 
        error: null,
        lastUpdated: new Date()
      };
    case 'SET_LAST_UPDATED':
      return { ...state, lastUpdated: action.payload };
    default:
      return state;
  }
};

interface LogosContextType {
  state: LogosState;
  fetchLogos: () => Promise<void>;
  getActiveLogos: () => Logo[];
  forceRefresh: () => Promise<void>;
}

const LogosContext = createContext<LogosContextType | undefined>(undefined);

export const LogosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(logosReducer, initialState);

  const fetchLogos = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      console.log('🔄 LogosContextRest: Начинаем загрузку через REST API...');

      const response = await fetch(`${SUPABASE_URL}/rest/v1/logos?select=*&order=sort_order.asc`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 LogosContextRest: Ответ получен, статус:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ LogosContextRest: HTTP ошибка:', response.status, errorText);
        dispatch({ type: 'SET_ERROR', payload: `HTTP ${response.status}: ${errorText}` });
        return;
      }

      const data: Logo[] = await response.json();
      console.log('✅ LogosContextRest: Загружено логотипов:', data.length);
      console.log('📋 LogosContextRest: Данные:', data);

      dispatch({ type: 'SET_LOGOS', payload: data });

    } catch (error) {
      console.error('❌ LogosContextRest: Ошибка загрузки:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Неизвестная ошибка' 
      });
    }
  }, []);

  const getActiveLogos = useCallback(() => {
    return state.logos.filter(logo => logo.is_active);
  }, [state.logos]);

  const forceRefresh = useCallback(async () => {
    await fetchLogos();
  }, [fetchLogos]);

  // Автоматическая загрузка при инициализации
  useEffect(() => {
    fetchLogos();
  }, [fetchLogos]);

  const value: LogosContextType = {
    state,
    fetchLogos,
    getActiveLogos,
    forceRefresh,
  };

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
