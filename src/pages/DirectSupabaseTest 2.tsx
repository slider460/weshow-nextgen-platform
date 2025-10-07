import React, { useState } from 'react';

// Импортируем Supabase напрямую, без контекстов
import { createClient } from '@supabase/supabase-js';

// Создаем клиент напрямую с fallback значениями
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

const DirectSupabaseTest: React.FC = () => {
  const [result, setResult] = useState<string>('Нажмите кнопку для тестирования');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testDirectConnection = async () => {
    setLoading(true);
    setResult('Загрузка...');
    setError(null);
    setData(null);
    
    try {
      console.log('===== ПРЯМОЙ ТЕСТ SUPABASE =====');
      console.log('1. Создаем новый клиент Supabase...');
      
      // Создаем новый клиент каждый раз
      const directClient = createClient(supabaseUrl, supabaseKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
      
      console.log('2. URL:', supabaseUrl);
      console.log('3. Key существует:', !!supabaseKey);
      
      const startTime = Date.now();
      
      console.log('4. Выполняем запрос...');
      const response = await directClient
        .from('logos')
        .select('id, name, logo_url, is_active')
        .limit(5);
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log('5. Запрос выполнен за', duration, 'мс');
      console.log('6. Response:', response);
      
      if (response.error) {
        const errorMsg = `❌ ОШИБКА: ${response.error.message}\nКод: ${response.error.code}\nДетали: ${response.error.details || 'нет'}`;
        setResult(errorMsg);
        setError(response.error.message);
        console.error('ОШИБКА:', response.error);
      } else {
        const count = response.data?.length || 0;
        setResult(`✅ УСПЕШНО! Загружено ${count} логотипов за ${duration}мс`);
        setData(response.data);
        console.log('УСПЕШНО! Данные:', response.data);
      }
      
    } catch (err) {
      console.error('ИСКЛЮЧЕНИЕ:', err);
      const errorMsg = `❌ ИСКЛЮЧЕНИЕ: ${err instanceof Error ? err.message : String(err)}`;
      setResult(errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
      console.log('===== КОНЕЦ ТЕСТА =====');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f0f0f0',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          marginBottom: '1.5rem', 
          textAlign: 'center',
          color: '#1f2937'
        }}>
          🔧 Прямой тест Supabase (без контекстов)
        </h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={testDirectConnection}
            disabled={loading}
            style={{
              display: 'block',
              width: '100%',
              padding: '1rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: loading ? '#6b7280' : '#22c55e',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            {loading ? '⏳ Тестируем...' : '🚀 Прямой тест Supabase'}
          </button>
        </div>

        <div style={{
          backgroundColor: '#f8fafc',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          border: '1px solid #e2e8f0',
          whiteSpace: 'pre-line',
          fontFamily: 'monospace',
          fontSize: '0.9rem'
        }}>
          <strong>Результат:</strong><br />
          {result}
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #fca5a5'
          }}>
            <strong>❌ Ошибка:</strong><br />
            {error}
          </div>
        )}

        {data && data.length > 0 && (
          <div style={{
            backgroundColor: '#ecfdf5',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #a7f3d0'
          }}>
            <strong>✅ Данные:</strong><br />
            {JSON.stringify(data, null, 2)}
          </div>
        )}

        <div style={{
          backgroundColor: '#eff6ff',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #93c5fd'
        }}>
          <strong>ℹ️ Информация:</strong><br />
          • Этот тест создает новый клиент Supabase каждый раз<br />
          • Не использует React контексты<br />
          • Ограничивает запрос 5 записями для быстроты<br />
          • Отключает автообновление токенов
        </div>
      </div>
    </div>
  );
};

export default DirectSupabaseTest;
