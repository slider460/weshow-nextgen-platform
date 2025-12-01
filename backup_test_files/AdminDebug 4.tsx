import React from 'react';

const AdminDebug: React.FC = () => {
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
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '3rem',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        width: '100%',
        maxWidth: '600px',
        color: '#1e293b',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: '#1e293b'
        }}>
          🔧 Админка работает!
        </h1>
        
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
          Если вы видите эту страницу, значит админка загружается корректно.
        </p>
        
        <div style={{
          background: '#f8fafc',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            <strong>Статус:</strong> ✅ Компоненты React работают<br/>
            <strong>Роутинг:</strong> ✅ React Router работает<br/>
            <strong>Стили:</strong> ✅ CSS загружается
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
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
            Перейти к логину
          </a>
          
          <a 
            href="/" 
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
            На главную
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDebug;
