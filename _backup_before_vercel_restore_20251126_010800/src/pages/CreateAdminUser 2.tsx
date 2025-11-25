import React, { useState } from 'react'
import { supabase } from '../config/supabase'

const CreateAdminUser: React.FC = () => {
  const [email, setEmail] = useState('admin@weshow.ru')
  const [password, setPassword] = useState('password')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const createAdminUser = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    try {
      // 1. Создаем пользователя в Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: 'Администратор',
            company_name: 'WeShow',
            phone: '+7 (495) 580-75-37',
            role: 'admin'
          }
        }
      })

      if (authError) {
        throw authError
      }

      if (!authData.user) {
        throw new Error('Пользователь не был создан')
      }

      // 2. Создаем профиль в таблице user_profiles
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          full_name: 'Администратор',
          company_name: 'WeShow',
          phone: '+7 (495) 580-75-37',
          role: 'admin'
        })

      if (profileError) {
        console.error('Profile creation error:', profileError)
        // Не прерываем выполнение, так как пользователь уже создан
      }

      setMessage(`✅ Пользователь ${email} успешно создан!`)
      console.log('Admin user created:', authData.user)

    } catch (error: any) {
      console.error('Error creating admin user:', error)
      setError(`Ошибка: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const createManagerUser = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    try {
      // 1. Создаем менеджера в Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: 'manager@weshow.ru',
        password: 'password',
        options: {
          data: {
            full_name: 'Менеджер',
            company_name: 'WeShow',
            phone: '+7 (495) 580-75-37',
            role: 'manager'
          }
        }
      })

      if (authError) {
        throw authError
      }

      if (!authData.user) {
        throw new Error('Пользователь не был создан')
      }

      // 2. Создаем профиль в таблице user_profiles
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          full_name: 'Менеджер',
          company_name: 'WeShow',
          phone: '+7 (495) 580-75-37',
          role: 'manager'
        })

      if (profileError) {
        console.error('Profile creation error:', profileError)
      }

      setMessage(`✅ Менеджер manager@weshow.ru успешно создан!`)
      console.log('Manager user created:', authData.user)

    } catch (error: any) {
      console.error('Error creating manager user:', error)
      setError(`Ошибка: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('count')
        .limit(1)

      if (error) {
        throw error
      }

      setMessage('✅ Подключение к Supabase работает!')
    } catch (error: any) {
      console.error('Connection test error:', error)
      setError(`Ошибка подключения: ${error.message}`)
    } finally {
      setLoading(false)
    }
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
        maxWidth: '600px'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#1e293b',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          🔧 Создание тестовых пользователей
        </h1>

        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={testConnection}
            disabled={loading}
            style={{
              width: '100%',
              background: '#10b981',
              color: 'white',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '1rem'
            }}
          >
            {loading ? 'Тестирование...' : '🧪 Тест подключения к Supabase'}
          </button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Email администратора
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
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
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={createAdminUser}
            disabled={loading}
            style={{
              flex: 1,
              background: loading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Создание...' : '👤 Создать админа'}
          </button>

          <button
            onClick={createManagerUser}
            disabled={loading}
            style={{
              flex: 1,
              background: loading ? '#9ca3af' : '#8b5cf6',
              color: 'white',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Создание...' : '👤 Создать менеджера'}
          </button>
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
            ❌ {error}
          </div>
        )}

        {message && (
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#166534',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}>
            {message}
          </div>
        )}

        <div style={{
          background: '#f8fafc',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            📋 Инструкция:
          </h3>
          <ol style={{ fontSize: '0.9rem', color: '#6b7280', paddingLeft: '1.5rem' }}>
            <li>Сначала нажмите "Тест подключения"</li>
            <li>Затем создайте администратора</li>
            <li>После этого создайте менеджера</li>
            <li>Перейдите на страницу входа в админку</li>
          </ol>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="/admin/login"
            style={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            → Перейти к входу в админку
          </a>
        </div>
      </div>
    </div>
  )
}

export default CreateAdminUser
