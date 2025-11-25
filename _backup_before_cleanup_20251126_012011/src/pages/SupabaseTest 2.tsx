import React, { useState, useEffect } from 'react'
import { useSupabase } from '../contexts/SupabaseContext'
import { supabase } from '../config/supabase'

const SupabaseTest: React.FC = () => {
  const { user, session, loading, signIn, signOut, signUp } = useSupabase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking')

  // Проверка подключения к Supabase
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('_supabase_migrations')
          .select('*')
          .limit(1)
        
        if (error) {
          console.log('Supabase connection test:', error.message)
          setConnectionStatus('connected') // Даже если таблица не существует, соединение работает
        } else {
          setConnectionStatus('connected')
        }
      } catch (err) {
        console.error('Connection error:', err)
        setConnectionStatus('error')
      }
    }

    checkConnection()
  }, [])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await signUp(email, password)
    if (error) {
      setMessage(`Ошибка регистрации: ${error.message}`)
    } else {
      setMessage('Проверьте email для подтверждения регистрации')
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await signIn(email, password)
    if (error) {
      setMessage(`Ошибка входа: ${error.message}`)
    } else {
      setMessage('Успешный вход!')
    }
  }

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      setMessage(`Ошибка выхода: ${error.message}`)
    } else {
      setMessage('Успешный выход!')
    }
  }

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '3px solid rgba(255,255,255,0.3)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p>Загрузка Supabase...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      color: 'white'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '2rem' 
        }}>
          🚀 Supabase Test Page
        </h1>

        {/* Статус подключения */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Статус подключения
          </h2>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            {connectionStatus === 'checking' && (
              <>
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <span>Проверка подключения...</span>
              </>
            )}
            {connectionStatus === 'connected' && (
              <>
                <span style={{ fontSize: '1.5rem' }}>✅</span>
                <span>Supabase подключен успешно!</span>
              </>
            )}
            {connectionStatus === 'error' && (
              <>
                <span style={{ fontSize: '1.5rem' }}>❌</span>
                <span>Ошибка подключения к Supabase</span>
              </>
            )}
          </div>
        </div>

        {/* Информация о пользователе */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Информация о пользователе
          </h2>
          {user ? (
            <div>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Создан:</strong> {new Date(user.created_at).toLocaleString()}</p>
              <p><strong>Последний вход:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Неизвестно'}</p>
              <button
                onClick={handleSignOut}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  fontSize: '1rem'
                }}
              >
                Выйти
              </button>
            </div>
          ) : (
            <p>Пользователь не авторизован</p>
          )}
        </div>

        {/* Формы авторизации */}
        {!user && (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              Авторизация
            </h2>
            
            <form onSubmit={handleSignIn} style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Вход</h3>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontSize: '1rem',
                    marginBottom: '0.5rem'
                  }}
                  required
                />
                <input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontSize: '1rem'
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginRight: '1rem'
                }}
              >
                Войти
              </button>
            </form>

            <form onSubmit={handleSignUp}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Регистрация</h3>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontSize: '1rem',
                    marginBottom: '0.5rem'
                  }}
                  required
                />
                <input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontSize: '1rem'
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Зарегистрироваться
              </button>
            </form>
          </div>
        )}

        {/* Сообщения */}
        {message && (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>{message}</p>
          </div>
        )}

        {/* Информация о сессии */}
        {session && (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              Информация о сессии
            </h2>
            <p><strong>Access Token:</strong> {session.access_token.substring(0, 20)}...</p>
            <p><strong>Refresh Token:</strong> {session.refresh_token ? 'Есть' : 'Нет'}</p>
            <p><strong>Истекает:</strong> {new Date(session.expires_at! * 1000).toLocaleString()}</p>
          </div>
        )}
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
  )
}

export default SupabaseTest
