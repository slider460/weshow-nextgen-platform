import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSimple: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      {/* Простой заголовок */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>WESHOW Админка</h1>
        <div>
          <span style={{ marginRight: '1rem' }}>
            Привет, {user?.name || 'Администратор'}!
          </span>
          <button
            onClick={logout}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            Выйти
          </button>
        </div>
      </div>

      {/* Основной контент */}
      <div style={{ padding: '2rem' }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '1rem',
          padding: '2rem',
          color: '#1e293b',
          marginBottom: '2rem'
        }}>
          <h2 style={{ marginTop: 0, color: '#1e293b' }}>
            🎉 Админка работает!
          </h2>
          <p>
            Упрощенная версия админки загружается без ошибок.
          </p>
          
          <div style={{
            background: '#f8fafc',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginTop: '1rem'
          }}>
            <h3 style={{ marginTop: 0 }}>Информация о пользователе:</h3>
            <p><strong>ID:</strong> {user?.id || 'Не определен'}</p>
            <p><strong>Имя:</strong> {user?.name || 'Не определено'}</p>
            <p><strong>Email:</strong> {user?.email || 'Не определен'}</p>
            <p><strong>Роль:</strong> {user?.role || 'Не определена'}</p>
            <p><strong>Компания:</strong> {user?.company_name || 'Не определена'}</p>
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '1rem',
          padding: '2rem',
          color: '#1e293b'
        }}>
          <h3 style={{ marginTop: 0 }}>Быстрые ссылки:</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a 
              href="/admin/login" 
              style={{
                background: '#3b82f6',
                color: 'white',
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Страница входа
            </a>
            
            <a 
              href="/services/equipment-calculation" 
              style={{
                background: '#10b981',
                color: 'white',
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Расчет оборудования
            </a>
            
            <a 
              href="/" 
              style={{
                background: '#6b7280',
                color: 'white',
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Главная страница
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSimple;
