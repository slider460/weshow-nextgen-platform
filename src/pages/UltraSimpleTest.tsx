import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const UltraSimpleTest: React.FC = () => {
  const [result, setResult] = useState<string>('Нажмите кнопку для тестирования');
  const [loading, setLoading] = useState(false);

  const testWithTimeout = async () => {
    setLoading(true);
    setResult('Загрузка...');
    
    try {
      console.log('===== УЛЬТРА ПРОСТОЙ ТЕСТ =====');
      
      // Создаем клиент
      const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
      
      console.log('1. Создаем клиент...');
      const client = createClient(supabaseUrl, supabaseKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
      
      console.log('2. Выполняем запрос с таймаутом...');
      
      // Создаем Promise с таймаутом
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Таймаут: запрос выполнялся более 10 секунд')), 10000);
      });
      
      const queryPromise = client
        .from('logos')
        .select('count(*)')
        .limit(1);
      
      const response = await Promise.race([queryPromise, timeoutPromise]);
      
      console.log('3. Ответ получен:', response);
      
      if (response.error) {
        setResult(`❌ ОШИБКА: ${response.error.message}\nКод: ${response.error.code}`);
        console.error('ОШИБКА:', response.error);
      } else {
        setResult(`✅ УСПЕШНО! Подключение работает`);
        console.log('УСПЕШНО!', response);
      }
      
    } catch (err) {
      console.error('ИСКЛЮЧЕНИЕ:', err);
      setResult(`❌ ИСКЛЮЧЕНИЕ: ${err instanceof Error ? err.message : String(err)}`);
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
        maxWidth: '600px', 
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '1.5rem', 
          textAlign: 'center',
          color: '#1f2937'
        }}>
          ⚡ Ультра простой тест
        </h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={testWithTimeout}
            disabled={loading}
            style={{
              display: 'block',
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: loading ? '#6b7280' : '#ef4444',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            {loading ? '⏳ Тестируем с таймаутом...' : '⚡ Тест с таймаутом (10 сек)'}
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

        <div style={{
          backgroundColor: '#fef3c7',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #f59e0b'
        }}>
          <strong>ℹ️ Особенности:</strong><br />
          • Таймаут 10 секунд<br />
          • Запрос только количества записей<br />
          • Минимальная нагрузка на базу<br />
          • Отключена аутентификация
        </div>
      </div>
    </div>
  );
};

export default UltraSimpleTest;
