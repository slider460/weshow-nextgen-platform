import React from 'react'
import { useSupabase } from '../../contexts/SupabaseContext'

const AdminTest: React.FC = () => {
  const { user, loading } = useSupabase()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      padding: '2rem'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '2rem',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          🔧 Тест админ-панели
        </h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <h2>Статус загрузки:</h2>
          <p style={{ fontSize: '1.2rem' }}>
            {loading ? '⏳ Загрузка...' : '✅ Загружено'}
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2>Пользователь:</h2>
          {user ? (
            <div>
              <p><strong>Имя:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Роль:</strong> {user.role}</p>
              <p><strong>ID:</strong> {user.id}</p>
            </div>
          ) : (
            <p>❌ Пользователь не авторизован</p>
          )}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2>Права доступа:</h2>
          {user ? (
            <div>
              {user.role === 'admin' && <p>✅ Администратор - полный доступ</p>}
              {user.role === 'manager' && <p>✅ Менеджер - доступ к контенту</p>}
              {user.role === 'client' && <p>❌ Клиент - доступ запрещен</p>}
            </div>
          ) : (
            <p>❌ Неизвестно</p>
          )}
        </div>

        <div style={{ marginTop: '2rem' }}>
          <a
            href="/admin"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              display: 'inline-block',
              marginRight: '1rem'
            }}
          >
            Перейти в админку
          </a>
          <a
            href="/admin/login"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Страница входа
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminTest
