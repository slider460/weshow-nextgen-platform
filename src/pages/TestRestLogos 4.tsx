import React from 'react';
import { useLogos } from '../contexts/LogosContextDB';

const TestRestLogos: React.FC = () => {
  const { state, getActiveLogos, forceRefresh } = useLogos();

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
          🚀 Тест REST API контекста
        </h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={forceRefresh}
            disabled={state.loading}
            style={{
              display: 'block',
              width: '100%',
              padding: '1rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: state.loading ? '#6b7280' : '#10b981',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: state.loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            {state.loading ? '⏳ Загрузка...' : '🔄 Обновить данные'}
          </button>
        </div>

        <div style={{
          backgroundColor: '#f8fafc',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#1f2937' }}>Статус:</h3>
          <div style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
            <div>Загрузка: {state.loading ? '✅ Да' : '❌ Нет'}</div>
            <div>Ошибка: {state.error || '❌ Нет'}</div>
            <div>Всего логотипов: {state.logos.length}</div>
            <div>Активных логотипов: {getActiveLogos().length}</div>
            <div>Последнее обновление: {state.lastUpdated?.toLocaleTimeString() || 'Никогда'}</div>
          </div>
        </div>

        {state.error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #fca5a5'
          }}>
            <strong>❌ Ошибка:</strong><br />
            {state.error}
          </div>
        )}

        {state.logos.length > 0 && (
          <div style={{
            backgroundColor: '#ecfdf5',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #a7f3d0'
          }}>
            <strong>✅ Загруженные логотипы:</strong>
            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {state.logos.map((logo) => (
                <div key={logo.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  padding: '1rem',
                  border: logo.is_active ? '2px solid #10b981' : '2px solid #e5e7eb'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{logo.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Категория: {logo.category}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Активен: {logo.is_active ? '✅ Да' : '❌ Нет'}
                  </div>
                  {logo.logo_url && (
                    <img 
                      src={logo.logo_url} 
                      alt={logo.name}
                      style={{ 
                        maxWidth: '100%', 
                        height: '40px', 
                        objectFit: 'contain',
                        backgroundColor: '#f9fafb',
                        padding: '0.25rem',
                        borderRadius: '0.25rem'
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{
          backgroundColor: '#eff6ff',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #93c5fd'
        }}>
          <strong>ℹ️ Информация:</strong><br />
          • Использует REST API вместо Supabase клиента<br />
          • Нативный fetch с правильными заголовками<br />
          • Автоматическая загрузка при инициализации<br />
          • Фильтрация активных логотипов
        </div>
      </div>
    </div>
  );
};

export default TestRestLogos;
