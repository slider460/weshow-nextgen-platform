import React from 'react'

const TestPage: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div>
        <h1>🎉 Сайт работает!</h1>
        <p style={{ fontSize: '1rem', marginTop: '1rem', opacity: 0.8 }}>
          Если вы видите это сообщение, значит React и Vite работают корректно
        </p>
        <div style={{ marginTop: '2rem', fontSize: '1rem' }}>
          <p>Проверьте следующие ссылки:</p>
          <div style={{ marginTop: '1rem' }}>
            <a 
              href="/admin" 
              style={{ 
                color: 'white', 
                textDecoration: 'underline',
                marginRight: '1rem'
              }}
            >
              Админ-панель
            </a>
            <a 
              href="/supabase-test" 
              style={{ 
                color: 'white', 
                textDecoration: 'underline'
              }}
            >
              Тест Supabase
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestPage