import React, { useEffect, useState } from 'react';
import { useLogos } from '../contexts/LogosContextDB';
import { supabase } from '../config/supabase';
import { logger } from '../utils/logger';

const TestLogosLoad: React.FC = () => {
  const { state, getActiveLogos, forceRefresh } = useLogos();
  const [directDbData, setDirectDbData] = useState<any>(null);
  const [isLoadingDirect, setIsLoadingDirect] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загружаем данные напрямую из базы для сравнения
  const loadDirectFromDb = async () => {
    setIsLoadingDirect(true);
    setError(null);
    
    try {
      console.log('🔍 ТЕСТ: Загружаем логотипы напрямую из базы данных...');
      logger.info('🔍 Загружаем логотипы напрямую из базы данных...');
      
      const { data, error } = await supabase
        .from('logos')
        .select('*')
        .order('sort_order', { ascending: true });
      
      console.log('📡 ТЕСТ: Ответ получен');
      console.log('📊 ТЕСТ: error:', error);
      console.log('📊 ТЕСТ: data:', data);
      console.log('📊 ТЕСТ: data length:', data?.length);
      
      if (error) {
        console.error('❌ ТЕСТ: Ошибка прямой загрузки:', error);
        logger.error('❌ Ошибка прямой загрузки:', error);
        setError(`Ошибка базы данных: ${error.message}`);
        return;
      }
      
      console.log('✅ ТЕСТ: Данные загружены напрямую, количество:', data?.length);
      logger.info('✅ Данные загружены напрямую:', data);
      setDirectDbData(data);
      
    } catch (err) {
      console.error('❌ ТЕСТ: Исключение при прямой загрузке:', err);
      logger.error('❌ Исключение при прямой загрузке:', err);
      setError(`Исключение: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
    } finally {
      setIsLoadingDirect(false);
    }
  };

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    loadDirectFromDb();
  }, []);

  const activeLogos = getActiveLogos();

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '2rem',
          color: '#1e293b'
        }}>
          🧪 Тест загрузки логотипов из базы данных
        </h1>

        {/* Статус контекста */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b' }}>
            📊 Статус LogosContextDB
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>Загрузка</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: state.isLoading ? '#f59e0b' : '#10b981' }}>
                {state.isLoading ? '⏳ Загружается' : '✅ Загружено'}
              </div>
            </div>
            
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>Всего логотипов</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b' }}>
                {state.logos.length}
              </div>
            </div>
            
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>Активных логотипов</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b' }}>
                {activeLogos.length}
              </div>
            </div>
            
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>Ошибка</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: state.error ? '#ef4444' : '#10b981' }}>
                {state.error ? '❌ Есть' : '✅ Нет'}
              </div>
            </div>
          </div>
          
          {state.error && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.5rem',
              color: '#dc2626'
            }}>
              <strong>Ошибка контекста:</strong> {state.error}
            </div>
          )}
        </div>

        {/* Прямая загрузка из базы */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>
              🔗 Прямая загрузка из базы данных
            </h2>
            <button
              onClick={loadDirectFromDb}
              disabled={isLoadingDirect}
              style={{
                background: isLoadingDirect ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                cursor: isLoadingDirect ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              {isLoadingDirect ? '⏳ Загрузка...' : '🔄 Обновить'}
            </button>
          </div>
          
          {error && (
            <div style={{
              marginBottom: '1rem',
              padding: '1rem',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.5rem',
              color: '#dc2626'
            }}>
              <strong>Ошибка:</strong> {error}
            </div>
          )}
          
          {directDbData && (
            <div>
              <div style={{ fontSize: '1rem', color: '#64748b', marginBottom: '0.5rem' }}>
                Загружено записей: <strong>{directDbData.length}</strong>
              </div>
              <pre style={{
                background: '#f8fafc',
                padding: '1rem',
                borderRadius: '0.5rem',
                overflow: 'auto',
                fontSize: '0.8rem',
                border: '1px solid #e2e8f0'
              }}>
                {JSON.stringify(directDbData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Логотипы из контекста */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>
              🎨 Логотипы из контекста
            </h2>
            <button
              onClick={() => forceRefresh()}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              🔄 Принудительное обновление
            </button>
          </div>
          
          {activeLogos.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: '#64748b'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Логотипы не найдены
              </div>
              <div>Проверьте подключение к базе данных и наличие данных</div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {activeLogos.map((logo, index) => (
                <div
                  key={logo.id}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏢</div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{logo.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    ID: {logo.id}<br />
                    Активен: {logo.is_active ? '✅' : '❌'}<br />
                    Категория: {logo.category || 'не указана'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Инструкции */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '1rem',
          padding: '1.5rem',
          color: '#1e40af'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            📋 Инструкции по диагностике
          </h3>
          <ol style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
            <li>Откройте консоль браузера (F12) для просмотра логов</li>
            <li>Нажмите "🔄 Обновить" для прямой загрузки из базы</li>
            <li>Нажмите "🔄 Принудительное обновление" для обновления контекста</li>
            <li>Если данные не загружаются, проверьте файл <code>check_logos_database.sql</code></li>
            <li>Убедитесь, что таблица <code>logos</code> существует и содержит данные</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestLogosLoad;
