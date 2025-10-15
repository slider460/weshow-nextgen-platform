import React, { useState, useEffect } from 'react';
import { getNews, getNewsStats, getNewsCategories } from '../api/newsRest';
import { useCasesRest } from '../hooks/useCasesRest';
import { getEquipment, getEquipmentStats, getEquipmentCategories } from '../api/equipmentRest';

const TestRestApi: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [newsStats, setNewsStats] = useState<any>(null);
  const [newsCategories, setNewsCategories] = useState<string[]>([]);
  const [equipment, setEquipment] = useState<any[]>([]);
  const [equipmentStats, setEquipmentStats] = useState<any>(null);
  const [equipmentCategories, setEquipmentCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { cases, loading: casesLoading, error: casesError } = useCasesRest();

  const testNewsApi = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔄 TestRestApi: Тестируем REST API для новостей...');
      
      // Тестируем загрузку новостей
      const newsData = await getNews({ limit: 5 });
      setNews(newsData);
      
      // Тестируем статистику
      const stats = await getNewsStats();
      setNewsStats(stats);
      
      // Тестируем категории
      const categories = await getNewsCategories();
      setNewsCategories(categories);
      
      console.log('✅ TestRestApi: Все тесты новостей прошли успешно');
      
    } catch (err) {
      console.error('❌ TestRestApi: Ошибка тестирования новостей:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testNewsApi();
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f0f0f0',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
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
          🚀 Тест REST API для всех модулей
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Новости */}
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ margin: '0 0 1rem 0', color: '#1f2937' }}>📰 Новости</h2>
            
            <button
              onClick={testNewsApi}
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: loading ? '#6b7280' : '#3b82f6',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '1rem'
              }}
            >
              {loading ? '⏳ Тестируем...' : '🔄 Обновить новости'}
            </button>

            {error && (
              <div style={{
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}>
                ❌ {error}
              </div>
            )}

            <div style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
              <div><strong>Загрузка:</strong> {loading ? '✅ Да' : '❌ Нет'}</div>
              <div><strong>Новостей загружено:</strong> {news.length}</div>
              <div><strong>Категорий:</strong> {newsCategories.length}</div>
            </div>

            {newsStats && (
              <div style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
                <strong>Статистика:</strong>
                <div>Всего: {newsStats.total}</div>
                <div>Опубликовано: {newsStats.published}</div>
                <div>Черновиков: {newsStats.draft}</div>
                <div>Архивных: {newsStats.archived}</div>
                <div>Рекомендуемых: {newsStats.featured}</div>
              </div>
            )}

            {news.length > 0 && (
              <div>
                <strong>Последние новости:</strong>
                {news.slice(0, 3).map((item, index) => (
                  <div key={index} style={{
                    fontSize: '0.8rem',
                    margin: '0.5rem 0',
                    padding: '0.5rem',
                    backgroundColor: 'white',
                    borderRadius: '0.25rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                    <div style={{ color: '#6b7280' }}>Статус: {item.status}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Кейсы */}
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ margin: '0 0 1rem 0', color: '#1f2937' }}>💼 Кейсы</h2>
            
            <div style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
              <div><strong>Загрузка:</strong> {casesLoading ? '✅ Да' : '❌ Нет'}</div>
              <div><strong>Кейсов загружено:</strong> {cases.length}</div>
              {casesError && (
                <div style={{ color: '#dc2626', fontSize: '0.8rem' }}>
                  ❌ {casesError}
                </div>
              )}
            </div>

            {cases.length > 0 && (
              <div>
                <strong>Доступные кейсы:</strong>
                {cases.slice(0, 3).map((item, index) => (
                  <div key={index} style={{
                    fontSize: '0.8rem',
                    margin: '0.5rem 0',
                    padding: '0.5rem',
                    backgroundColor: 'white',
                    borderRadius: '0.25rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                    <div style={{ color: '#6b7280' }}>Клиент: {item.client}</div>
                    <div style={{ color: '#6b7280' }}>Год: {item.year}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{
          backgroundColor: '#eff6ff',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #93c5fd',
          marginTop: '2rem'
        }}>
          <strong>ℹ️ Информация:</strong><br />
          • Тестирует REST API для новостей и кейсов<br />
          • Использует нативный fetch вместо Supabase клиента<br />
          • Автоматическая загрузка при инициализации<br />
          • Проверяет все основные операции (чтение, статистика, категории)
        </div>
      </div>
    </div>
  );
};

export default TestRestApi;
