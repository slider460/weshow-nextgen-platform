import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const TestLettersTable = () => {
  const [status, setStatus] = useState<string>('Проверка...');
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const testConnection = async () => {
      try {
        setStatus('Подключение к Supabase...');
        
        // Проверяем подключение к базе данных
        const { data: testData, error: testError } = await supabase
          .from('letters_certificates')
          .select('*')
          .limit(1);

        if (testError) {
          if (testError.message.includes('relation "letters_certificates" does not exist')) {
            setError('Таблица letters_certificates не существует. Создайте её в Supabase Dashboard.');
            setStatus('Ошибка: таблица не найдена');
          } else if (testError.message.includes('permission denied')) {
            setError('Нет прав доступа к таблице letters_certificates.');
            setStatus('Ошибка: нет прав доступа');
          } else {
            setError(testError.message);
            setStatus('Ошибка: ' + testError.message);
          }
        } else {
          setStatus('✅ Подключение успешно!');
          setData(testData || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setStatus('Ошибка: ' + (err instanceof Error ? err.message : 'Неизвестная ошибка'));
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      color: 'white'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          🧪 Тест таблицы letters_certificates
        </h1>

        <div style={{
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Статус:</h2>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>{status}</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Ошибка:</h3>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        {data.length > 0 && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.2)',
            border: '1px solid rgba(34, 197, 94, 0.5)',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Данные в таблице:</h3>
            <p style={{ margin: 0 }}>Найдено записей: {data.length}</p>
          </div>
        )}

        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginTop: '1rem'
        }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Инструкции:</h3>
          <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>Откройте Supabase Dashboard</li>
            <li>Перейдите в SQL Editor</li>
            <li>Выполните SQL из файла СОЗДАНИЕ_ТАБЛИЦЫ_ПИСЕМ_И_ГРАМОТ.md</li>
            <li>Обновите эту страницу</li>
          </ol>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            🔄 Обновить
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestLettersTable;
