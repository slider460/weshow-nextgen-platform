import React from 'react'

const AdminDebug: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem',
      background: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          color: '#1f2937', 
          marginBottom: '2rem',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          🔧 Диагностика админ панели
        </h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#374151', marginBottom: '1rem' }}>✅ Статус системы</h2>
          <div style={{ 
            background: '#f0f9ff', 
            padding: '1rem', 
            borderRadius: '8px',
            border: '1px solid #0ea5e9'
          }}>
            <p style={{ margin: 0, color: '#0c4a6e' }}>
              <strong>React:</strong> Загружен ✅<br/>
              <strong>TypeScript:</strong> Работает ✅<br/>
              <strong>Роутинг:</strong> Настроен ✅<br/>
              <strong>Стили:</strong> Применены ✅
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#374151', marginBottom: '1rem' }}>🔗 Быстрые ссылки</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <a 
              href="/admin/" 
              style={{ 
                display: 'block',
                padding: '1rem',
                background: '#3b82f6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '500'
              }}
            >
              🎛️ Главная админ панель
            </a>
            <a 
              href="/admin/news" 
              style={{ 
                display: 'block',
                padding: '1rem',
                background: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '500'
              }}
            >
              📰 Управление новостями
            </a>
            <a 
              href="/admin/blog" 
              style={{ 
                display: 'block',
                padding: '1rem',
                background: '#8b5cf6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '500'
              }}
            >
              📝 Управление блогом
            </a>
            <a 
              href="/test-api" 
              style={{ 
                display: 'block',
                padding: '1rem',
                background: '#f59e0b',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '500'
              }}
            >
              🧪 Тест API
            </a>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#374151', marginBottom: '1rem' }}>📊 Информация о системе</h2>
          <div style={{ 
            background: '#f9fafb', 
            padding: '1rem', 
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ margin: 0, color: '#6b7280' }}>
              <strong>URL:</strong> {window.location.href}<br/>
              <strong>User Agent:</strong> {navigator.userAgent}<br/>
              <strong>Время загрузки:</strong> {new Date().toLocaleString()}<br/>
              <strong>Порт:</strong> {window.location.port || '80/443'}
            </p>
          </div>
        </div>

        <div>
          <h2 style={{ color: '#374151', marginBottom: '1rem' }}>🚀 Следующие шаги</h2>
          <ol style={{ color: '#6b7280', lineHeight: '1.6' }}>
            <li>Проверьте консоль браузера на наличие ошибок (F12)</li>
            <li>Убедитесь, что все зависимости загружены</li>
            <li>Проверьте работу Supabase подключения</li>
            <li>Протестируйте создание новостей и статей</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default AdminDebug
