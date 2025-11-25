import React, { useState } from 'react'

const FixAdminEmail: React.FC = () => {
  const [copied, setCopied] = useState(false)

  const sqlScript = `-- 🔧 Исправление admin@weshow.ru

-- 1. Подтверждаем email (БЕЗ confirmed_at!)
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'admin@weshow.ru';

-- 2. Создаем профиль
INSERT INTO public.user_profiles (id, full_name, company_name, phone, role)
SELECT 
  id,
  'Администратор',
  'WeShow',
  '+7 (495) 580-75-37',
  'admin'
FROM auth.users
WHERE email = 'admin@weshow.ru'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';

-- 3. Проверяем результат
SELECT 
  au.id,
  au.email,
  au.email_confirmed_at IS NOT NULL as email_confirmed,
  up.full_name,
  up.role
FROM auth.users au
LEFT JOIN public.user_profiles up ON au.id = up.id
WHERE au.email = 'admin@weshow.ru';`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          🔧 Исправление проблемы "Email not confirmed"
        </h1>

        <div style={{
          background: '#fef2f2',
          border: '2px solid #fecaca',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.2rem', color: '#dc2626', marginBottom: '0.5rem' }}>
            ❌ Проблема обнаружена
          </h2>
          <p style={{ color: '#991b1b' }}>
            Email пользователя admin@weshow.ru не подтвержден, поэтому вход невозможен.
          </p>
        </div>

        <div style={{
          background: '#f0fdf4',
          border: '2px solid #86efac',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.2rem', color: '#16a34a', marginBottom: '1rem' }}>
            ✅ Решение
          </h2>
          
          <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>
              <strong>Откройте Supabase SQL Editor:</strong>
              <br />
              <a 
                href="https://supabase.com/dashboard" 
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#3b82f6', textDecoration: 'underline' }}
              >
                https://supabase.com/dashboard
              </a>
              <br />
              → Выберите ваш проект
              <br />
              → В левом меню нажмите <strong>SQL Editor</strong> (значок 🗄️)
            </li>
            <li style={{ marginTop: '1rem' }}>
              <strong>Скопируйте SQL скрипт:</strong>
              <br />
              <button
                onClick={copyToClipboard}
                style={{
                  background: copied ? '#10b981' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                {copied ? '✅ Скопировано!' : '📋 Копировать SQL'}
              </button>
            </li>
            <li style={{ marginTop: '1rem' }}>
              <strong>Вставьте скрипт в SQL Editor</strong> и нажмите <strong>Run</strong> (или Ctrl+Enter)
            </li>
            <li style={{ marginTop: '1rem' }}>
              <strong>Проверьте результат:</strong> должна появиться таблица с данными админа
            </li>
          </ol>
        </div>

        <div style={{
          background: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          marginBottom: '2rem',
          maxHeight: '400px',
          overflow: 'auto',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <strong>SQL Скрипт:</strong>
            <button
              onClick={copyToClipboard}
              style={{
                background: 'transparent',
                border: '1px solid #d1d5db',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}
            >
              Копировать
            </button>
          </div>
          <pre style={{ 
            margin: 0, 
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            {sqlScript}
          </pre>
        </div>

        <div style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#1e40af' }}>
            📝 Альтернативный способ (через настройки Supabase)
          </h3>
          <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8', color: '#1e40af' }}>
            <li>Откройте <strong>Authentication → Providers → Email</strong></li>
            <li>Отключите опцию <strong>"Confirm email"</strong></li>
            <li>Нажмите <strong>Save</strong></li>
            <li>Вернитесь на страницу создания админа и создайте пользователя заново</li>
          </ol>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a
            href="/diagnose-admin"
            style={{
              background: '#8b5cf6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-block'
            }}
          >
            🔍 Проверить результат
          </a>
          <a
            href="/admin/login"
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-block'
            }}
          >
            → Войти в админку
          </a>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#fefce8',
          border: '1px solid #fef08a',
          borderRadius: '0.5rem',
          fontSize: '0.9rem'
        }}>
          <strong>💡 Совет:</strong> После выполнения SQL скрипта страница диагностики должна показать "✅ Всё в порядке!"
        </div>
      </div>
    </div>
  )
}

export default FixAdminEmail

