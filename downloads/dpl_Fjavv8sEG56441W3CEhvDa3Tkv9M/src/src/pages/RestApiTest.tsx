import React, { useState } from 'react';

const RestApiTest: React.FC = () => {
  const [result, setResult] = useState<string>('Нажмите кнопку для тестирования');
  const [loading, setLoading] = useState(false);

  const testRestApi = async () => {
    setLoading(true);
    setResult('Загрузка...');
    
    try {
      console.log('===== REST API ТЕСТ =====');
      
      const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
      
      console.log('1. Тестируем REST API напрямую...');
      
      // Создаем запрос с таймаутом
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(`${supabaseUrl}/rest/v1/logos?select=count`, {
        method: 'GET',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'count=exact'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log('2. Ответ получен:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Ошибка HTTP:', response.status, errorText);
        setResult(`❌ HTTP ОШИБКА: ${response.status} ${response.statusText}\nДетали: ${errorText}`);
        return;
      }
      
      const data = await response.json();
      console.log('3. Данные:', data);
      
      setResult(`✅ REST API РАБОТАЕТ! Статус: ${response.status}\nДанные: ${JSON.stringify(data, null, 2)}`);
      
    } catch (err) {
      console.error('ИСКЛЮЧЕНИЕ:', err);
      if (err instanceof Error && err.name === 'AbortError') {
        setResult(`❌ ТАЙМАУТ: Запрос выполнялся более 15 секунд`);
      } else {
        setResult(`❌ ИСКЛЮЧЕНИЕ: ${err instanceof Error ? err.message : String(err)}`);
      }
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
          🌐 REST API тест
        </h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={testRestApi}
            disabled={loading}
            style={{
              display: 'block',
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: loading ? '#6b7280' : '#3b82f6',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            {loading ? '⏳ Тестируем REST API...' : '🌐 Тест REST API (15 сек)'}
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
          backgroundColor: '#eff6ff',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #93c5fd'
        }}>
          <strong>ℹ️ Особенности:</strong><br />
          • Использует нативный fetch API<br />
          • Таймаут 15 секунд<br />
          • Прямой запрос к REST API Supabase<br />
          • Обходит все JavaScript библиотеки<br />
          • Проверяет сетевую доступность
        </div>
      </div>
    </div>
  );
};

export default RestApiTest;
























