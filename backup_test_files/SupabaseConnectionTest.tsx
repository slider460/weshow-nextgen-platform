import React, { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'

const SupabaseConnectionTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'success' | 'error'>('testing')
  const [errorMessage, setErrorMessage] = useState('')
  const [projectInfo, setProjectInfo] = useState<any>(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setConnectionStatus('testing')
      
      // Тест 1: Проверка подключения к Supabase
      const { data: { session }, error: authError } = await supabase.auth.getSession()
      
      if (authError) {
        throw new Error(`Auth error: ${authError.message}`)
      }

      // Тест 2: Проверка доступа к нашим таблицам
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('count')
        .limit(1)

      const { data: equipment, error: equipmentError } = await supabase
        .from('equipment_catalog')
        .select('count')
        .limit(1)

      if (usersError || equipmentError) {
        throw new Error(`Database error: ${usersError?.message || equipmentError?.message}`)
      }

      setProjectInfo({
        session: session ? 'Authenticated' : 'Not authenticated',
        databaseStatus: 'Connected',
        tables: ['users', 'equipment_catalog', 'estimates', 'articles']
      })

      setConnectionStatus('success')
    } catch (error: any) {
      console.error('Connection test failed:', error)
      setErrorMessage(error.message)
      setConnectionStatus('error')
    }
  }

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
        color: '#1e293b'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          textAlign: 'center',
          color: '#1e293b'
        }}>
          🔗 Тест подключения к Supabase
        </h1>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Статус подключения:</h2>
          
          {connectionStatus === 'testing' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              background: '#f3f4f6',
              borderRadius: '0.5rem'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid #3b82f6',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <span>Проверка подключения...</span>
            </div>
          )}

          {connectionStatus === 'success' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              background: '#d1fae5',
              borderRadius: '0.5rem',
              color: '#065f46'
            }}>
              <span style={{ fontSize: '1.5rem' }}>✅</span>
              <span>Подключение успешно!</span>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              background: '#fee2e2',
              borderRadius: '0.5rem',
              color: '#dc2626'
            }}>
              <span style={{ fontSize: '1.5rem' }}>❌</span>
              <div>
                <div>Ошибка подключения</div>
                <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {errorMessage}
                </div>
              </div>
            </div>
          )}
        </div>

        {projectInfo && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Информация о проекте:</h2>
            <div style={{
              background: '#f8fafc',
              padding: '1rem',
              borderRadius: '0.5rem',
              fontSize: '0.9rem'
            }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Статус аутентификации:</strong> {projectInfo.session}
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>База данных:</strong> {projectInfo.databaseStatus}
              </div>
              <div>
                <strong>Доступные таблицы:</strong>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  {projectInfo.tables.map((table: string, index: number) => (
                    <li key={index}>{table}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={testConnection}
            style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
          >
            🔄 Повторить тест
          </button>
          
          <a
            href="/admin/login"
            style={{
              background: '#10b981',
              color: 'white',
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              display: 'inline-block'
            }}
          >
            🚀 Перейти в админку
          </a>
        </div>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  )
}

export default SupabaseConnectionTest
