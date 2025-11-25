import { useState } from 'react';
import { setupLettersCertificatesTable, checkTableExists } from '../api/supabaseAdmin';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const AutoCreateLettersTable = () => {
  const [status, setStatus] = useState<string>('Готов к созданию таблицы');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleCreateTable = async () => {
    setLoading(true);
    setStatus('Создаю таблицу letters_certificates...');
    
    try {
      const result = await setupLettersCertificatesTable();
      setResult(result);
      
      if (result.success) {
        setStatus('✅ Таблица успешно создана!');
      } else {
        setStatus('❌ Ошибка при создании таблицы');
      }
    } catch (error) {
      setStatus('❌ Критическая ошибка');
      setResult({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Неизвестная ошибка' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckTable = async () => {
    setLoading(true);
    setStatus('Проверяю существование таблицы...');
    
    try {
      const { exists, error } = await checkTableExists('letters_certificates');
      
      if (error) {
        setStatus('❌ Ошибка при проверке таблицы');
        setResult({ success: false, message: error.message });
      } else if (exists) {
        setStatus('✅ Таблица letters_certificates существует');
        setResult({ success: true, message: 'Таблица найдена и готова к использованию' });
      } else {
        setStatus('📋 Таблица letters_certificates не найдена');
        setResult({ success: false, message: 'Таблица не существует. Нажмите "Создать таблицу" для создания.' });
      }
    } catch (error) {
      setStatus('❌ Ошибка при проверке');
      setResult({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Неизвестная ошибка' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      color: 'white'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            🚀 Автоматическое создание таблицы
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            textAlign: 'center',
            opacity: 0.9,
            marginBottom: '2rem'
          }}>
            Создайте таблицу letters_certificates одним кликом через API
          </p>
        </div>

        {/* Статус */}
        <Card style={{ 
          background: 'rgba(255,255,255,0.1)', 
          backdropFilter: 'blur(10px)', 
          border: '1px solid rgba(255,255,255,0.2)',
          marginBottom: '2rem'
        }}>
          <CardHeader>
            <CardTitle style={{ color: 'white', fontSize: '1.5rem' }}>
              📊 Статус
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '1rem',
              borderRadius: '0.5rem',
              fontSize: '1.1rem',
              textAlign: 'center'
            }}>
              {status}
            </div>
          </CardContent>
        </Card>

        {/* Результат */}
        {result && (
          <Card style={{ 
            background: result.success ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
            backdropFilter: 'blur(10px)', 
            border: `1px solid ${result.success ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            marginBottom: '2rem'
          }}>
            <CardHeader>
              <CardTitle style={{ 
                color: 'white', 
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {result.success ? '✅' : '❌'} Результат
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'white', margin: 0 }}>
                {result.message}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Кнопки действий */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <Button
            onClick={handleCheckTable}
            disabled={loading}
            style={{
              background: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid rgba(59, 130, 246, 0.5)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              opacity: loading ? 0.5 : 1
            }}
          >
            🔍 Проверить таблицу
          </Button>
          
          <Button
            onClick={handleCreateTable}
            disabled={loading}
            style={{
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid rgba(34, 197, 94, 0.5)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? '⏳ Создаю...' : '🚀 Создать таблицу'}
          </Button>
        </div>

        {/* Ссылки */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Button
            onClick={() => window.open('/test-letters-table', '_blank')}
            style={{
              background: 'rgba(168, 85, 247, 0.2)',
              border: '1px solid rgba(168, 85, 247, 0.5)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              textDecoration: 'none'
            }}
          >
            🧪 Тестировать подключение
          </Button>
          
          <Button
            onClick={() => window.open('/admin/letters', '_blank')}
            style={{
              background: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(245, 158, 11, 0.5)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              textDecoration: 'none'
            }}
          >
            🏆 Админ панель
          </Button>
          
          <Button
            onClick={() => window.open('/', '_blank')}
            style={{
              background: 'rgba(236, 72, 153, 0.2)',
              border: '1px solid rgba(236, 72, 153, 0.5)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              textDecoration: 'none'
            }}
          >
            🏠 Главная страница
          </Button>
        </div>

        {/* Информация */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'white' }}>
            💡 Что происходит при создании таблицы?
          </h3>
          <ul style={{ 
            color: 'rgba(255,255,255,0.8)', 
            margin: 0, 
            paddingLeft: '1.5rem',
            textAlign: 'left',
            lineHeight: '1.6'
          }}>
            <li>Создается таблица letters_certificates с полной структурой</li>
            <li>Настраиваются индексы для оптимизации запросов</li>
            <li>Включается Row Level Security (RLS)</li>
            <li>Создаются политики безопасности</li>
            <li>Добавляется функция автоматического обновления даты</li>
            <li>Вставляются тестовые данные</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AutoCreateLettersTable;
