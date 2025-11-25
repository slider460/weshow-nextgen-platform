import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { logger } from '../../utils/logger'

const AdminLogin: React.FC = () => {
  const { user, profile, login, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Перенаправление если уже авторизован
  useEffect(() => {
    if (user && profile && (profile.role === 'admin' || profile.role === 'manager')) {
      navigate('/admin/')
    }
  }, [user, profile, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    logger.info('🚀 Form submitted, attempting login...')

    try {
      const result = await login(email, password)
      logger.info('📊 Login result:', result)
      
      if (result.success) {
        logger.info('✅ Login successful, navigating to /admin/')
        navigate('/admin/')
      } else {
        logger.warn('❌ Login failed:', result.error)
        setError(result.error || 'Неверный email или пароль. Проверьте правильность данных.')
      }
    } catch (err) {
      logger.error('❌ Login exception:', err)
      setError(`Произошла ошибка при входе: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`)
    } finally {
      logger.debug('🏁 Login process finished')
      setIsSubmitting(false)
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
          <p>Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '3rem',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        width: '100%',
        maxWidth: '400px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1e293b',
            marginBottom: '0.5rem'
          }}>
            WeShow
          </div>
          <div style={{
            fontSize: '1.2rem',
            color: '#60a5fa',
            fontWeight: '600'
          }}>
            Админ-панель
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              placeholder="admin@weshow.ru"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
              }
            }}
          >
            {isSubmitting ? 'Вход...' : 'Войти в админ-панель'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8fafc',
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            fontSize: '0.8rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Демо-доступ:
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            <div>👤 Администратор: admin@weshow.ru</div>
            <div>👤 Менеджер: manager@weshow.ru</div>
            <div>🔑 Пароль: password</div>
          </div>
        </div>

        {/* Back to Site */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a
            href="/"
            style={{
              color: '#60a5fa',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            ← Вернуться на сайт
          </a>
        </div>
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

export default AdminLogin