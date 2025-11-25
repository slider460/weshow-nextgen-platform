import React, { useState } from 'react';
import { supabase } from '../config/supabase';

const SimpleDbTest: React.FC = () => {
  const [result, setResult] = useState<string>('Нажмите кнопку для тестирования');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const testConnection = async () => {
    setLoading(true);
    setResult('Загрузка...');
    
    try {
      console.log('===== НАЧАЛО ТЕСТА =====');
      console.log('1. Начинаем тест подключения к Supabase');
      
      // Проверяем настройки Supabase
      console.log('1.1. Supabase URL:', supabase.supabaseUrl);
      console.log('1.2. Supabase Key существует:', !!supabase.supabaseKey);
      
      const startTime = Date.now();
      
      // Пробуем простой запрос без сортировки
      console.log('2. Пробуем простой запрос...');
      const response = await supabase
        .from('logos')
        .select('*');
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log('3. Запрос выполнен за', duration, 'мс');
      console.log('4. Error:', response.error);
      console.log('5. Error details:', response.error?.details);
      console.log('6. Error hint:', response.error?.hint);
      console.log('7. Error code:', response.error?.code);
      console.log('8. Data:', response.data);
      console.log('9. Data length:', response.data?.length);
      console.log('===== КОНЕЦ ТЕСТА =====');
      
      if (response.error) {
        const errorMsg = `❌ ОШИБКА: ${response.error.message}\nКод: ${response.error.code}\nДетали: ${response.error.details || 'нет'}`;
        setResult(errorMsg);
        console.error('ОШИБКА:', response.error);
      } else {
        const count = response.data?.length || 0;
        setResult(`✅ УСПЕШНО! Загружено ${count} логотипов за ${duration}мс`);
        setData(response.data);
        console.log('УСПЕШНО! Данные:', response.data);
      }
      
    } catch (err) {
      console.error('ИСКЛЮЧЕНИЕ:', err);
      setResult(`❌ ИСКЛЮЧЕНИЕ: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f0f0f0',
      padding: '2rem',
      fontFamily: 'monospace'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          🧪 Простой тест базы данных
        </h1>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <button
            onClick={testConnection}
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.2rem',
              background: loading ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {loading ? '⏳ Загрузка...' : '🚀 Тест подключения к базе данных'}
          </button>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Результат:</h2>
          <div style={{
            padding: '1rem',
            background: '#f5f5f5',
            borderRadius: '4px',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            {result}
          </div>
        </div>

        {data && (
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '1rem' }}>Данные из базы:</h2>
            <div style={{
              background: '#1e1e1e',
              color: '#00ff00',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '400px'
            }}>
              <pre style={{ margin: 0, fontSize: '0.9rem' }}>
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
            
            <div style={{ marginTop: '1rem' }}>
              <h3>Карточки логотипов:</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                {data.map((logo: any, index: number) => (
                  <div
                    key={logo.id || index}
                    style={{
                      background: '#f9f9f9',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ 
                      fontSize: '2rem', 
                      marginBottom: '0.5rem',
                      background: logo.is_active ? '#4CAF50' : '#f44336',
                      color: 'white',
                      padding: '0.5rem',
                      borderRadius: '4px'
                    }}>
                      {logo.is_active ? '✅' : '❌'}
                    </div>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {logo.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      Category: {logo.category}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      Order: {logo.sort_order}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{
          background: '#fffacd',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '2rem',
          border: '2px solid #ffd700'
        }}>
          <h3 style={{ marginTop: 0 }}>📋 Инструкции:</h3>
          <ol style={{ lineHeight: '1.8' }}>
            <li>Нажмите кнопку "🚀 Тест подключения"</li>
            <li>Откройте консоль браузера (F12)</li>
            <li>Посмотрите на результат выше и данные ниже</li>
            <li>Если увидите "✅ УСПЕШНО" - данные загружаются!</li>
            <li>Если "❌ ОШИБКА" - проверьте настройки Supabase</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SimpleDbTest;
