import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

interface DiagnosticResult {
  test: string;
  status: 'success' | 'error' | 'pending';
  message: string;
  data?: any;
}

export const SupabaseDiagnostic: React.FC = () => {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (test: string, status: 'success' | 'error' | 'pending', message: string, data?: any) => {
    setResults(prev => [...prev, { test, status, message, data }]);
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    setResults([]);

    // Тест 1: Проверка подключения к Supabase
    addResult('Подключение к Supabase', 'pending', 'Проверяем подключение...');
    try {
      const { data, error } = await supabase.from('logos').select('count').limit(1);
      if (error) {
        addResult('Подключение к Supabase', 'error', `Ошибка: ${error.message}`, error);
      } else {
        addResult('Подключение к Supabase', 'success', 'Подключение установлено успешно', data);
      }
    } catch (err) {
      addResult('Подключение к Supabase', 'error', `Исключение: ${err}`, err);
    }

    // Тест 2: Проверка таблицы logos
    addResult('Таблица logos', 'pending', 'Проверяем таблицу logos...');
    try {
      const { data, error } = await supabase.from('logos').select('*').limit(5);
      if (error) {
        addResult('Таблица logos', 'error', `Ошибка: ${error.message}`, error);
      } else {
        addResult('Таблица logos', 'success', `Найдено ${data?.length || 0} записей`, data);
      }
    } catch (err) {
      addResult('Таблица logos', 'error', `Исключение: ${err}`, err);
    }

    // Тест 3: Проверка таблицы homepage_equipment
    addResult('Таблица homepage_equipment', 'pending', 'Проверяем таблицу homepage_equipment...');
    try {
      const { data, error } = await supabase.from('homepage_equipment').select('*').limit(5);
      if (error) {
        addResult('Таблица homepage_equipment', 'error', `Ошибка: ${error.message}`, error);
      } else {
        addResult('Таблица homepage_equipment', 'success', `Найдено ${data?.length || 0} записей`, data);
      }
    } catch (err) {
      addResult('Таблица homepage_equipment', 'error', `Исключение: ${err}`, err);
    }

    // Тест 4: Проверка таблицы user_profiles
    addResult('Таблица user_profiles', 'pending', 'Проверяем таблицу user_profiles...');
    try {
      const { data, error } = await supabase.from('user_profiles').select('*').limit(5);
      if (error) {
        addResult('Таблица user_profiles', 'error', `Ошибка: ${error.message}`, error);
      } else {
        addResult('Таблица user_profiles', 'success', `Найдено ${data?.length || 0} записей`, data);
      }
    } catch (err) {
      addResult('Таблица user_profiles', 'error', `Исключение: ${err}`, err);
    }

    // Тест 5: Проверка аутентификации
    addResult('Аутентификация', 'pending', 'Проверяем аутентификацию...');
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        addResult('Аутентификация', 'error', `Ошибка: ${error.message}`, error);
      } else {
        const status = session ? 'Активная сессия' : 'Нет активной сессии';
        addResult('Аутентификация', 'success', status, session);
      }
    } catch (err) {
      addResult('Аутентификация', 'error', `Исключение: ${err}`, err);
    }

    // Тест 6: Проверка REST API
    addResult('REST API', 'pending', 'Проверяем REST API...');
    try {
      const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
      const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/logos?select=*&limit=1`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        addResult('REST API', 'error', `HTTP ${response.status}: ${errorText}`, { status: response.status, text: errorText });
      } else {
        const data = await response.json();
        addResult('REST API', 'success', `REST API работает, получено ${data?.length || 0} записей`, data);
      }
    } catch (err) {
      addResult('REST API', 'error', `Исключение: ${err}`, err);
    }

    setIsRunning(false);
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🔍 Диагностика Supabase
          </h1>
          
          <div className="mb-6">
            <button
              onClick={runDiagnostics}
              disabled={isRunning}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? 'Запуск диагностики...' : 'Запустить диагностику заново'}
            </button>
          </div>

          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getStatusColor(result.status)}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{getStatusIcon(result.status)}</span>
                  <h3 className="font-semibold">{result.test}</h3>
                </div>
                <p className="text-sm">{result.message}</p>
                {result.data && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-medium">
                      Подробности
                    </summary>
                    <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>

          {results.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Рекомендации:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Если есть ошибки RLS - выполните SQL скрипты для исправления политик</li>
                <li>• Если нет данных в таблицах - добавьте тестовые данные</li>
                <li>• Если REST API не работает - проверьте API ключи</li>
                <li>• Если аутентификация не работает - проверьте настройки auth</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
