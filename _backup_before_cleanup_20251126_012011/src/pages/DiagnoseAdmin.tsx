import React, { useState } from 'react'
import { supabase } from '../config/supabase'

const DiagnoseAdmin: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const diagnose = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const diagnosis: any = {}

      // 1. Проверяем все профили
      const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select('*')
      
      diagnosis.allProfiles = profiles || []
      diagnosis.profilesError = profilesError?.message

      // 2. Пробуем войти
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: 'admin@weshow.ru',
        password: 'password'
      })

      diagnosis.authSuccess = !authError
      diagnosis.authError = authError?.message
      diagnosis.userId = authData?.user?.id

      if (authData?.user) {
        // 3. Проверяем профиль этого пользователя
        const { data: userProfile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single()
        
        diagnosis.profileExists = !profileError
        diagnosis.profileError = profileError?.message
        diagnosis.profile = userProfile

        // 4. Если профиль не найден, пробуем создать
        if (profileError) {
          console.log('Профиль не найден, создаю...')
          const { data: newProfile, error: createError } = await supabase
            .from('user_profiles')
            .insert({
              id: authData.user.id,
              full_name: 'Администратор',
              company_name: 'WeShow',
              phone: '+7 (495) 580-75-37',
              role: 'admin'
            })
            .select()
            .single()
          
          diagnosis.profileCreated = !createError
          diagnosis.createError = createError?.message
          diagnosis.newProfile = newProfile
        }

        // Выходим
        await supabase.auth.signOut()
      }

      setResult(diagnosis)

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          🔍 Диагностика админа
        </h1>

        <button
          onClick={diagnose}
          disabled={loading}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '2rem'
          }}
        >
          {loading ? 'Проверка...' : '🔍 Запустить диагностику'}
        </button>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
          }}>
            ❌ {error}
          </div>
        )}

        {result && (
          <div style={{
            background: '#f9fafb',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Результаты:</h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>1. Все профили в базе ({result.allProfiles?.length || 0}):</strong>
              {result.allProfiles?.map((p: any, i: number) => (
                <div key={i} style={{ 
                  marginLeft: '1rem', 
                  padding: '0.5rem',
                  background: 'white',
                  marginTop: '0.5rem',
                  borderRadius: '0.25rem'
                }}>
                  <div>Email: {p.id}</div>
                  <div>Имя: {p.full_name}</div>
                  <div>Роль: <strong>{p.role}</strong></div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <strong>2. Вход admin@weshow.ru:</strong>
              <div style={{ marginLeft: '1rem' }}>
                {result.authSuccess ? '✅ Успешно' : `❌ Ошибка: ${result.authError}`}
              </div>
              {result.userId && (
                <div style={{ marginLeft: '1rem' }}>
                  User ID: {result.userId}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <strong>3. Профиль пользователя:</strong>
              <div style={{ marginLeft: '1rem' }}>
                {result.profileExists ? (
                  <div>
                    <div>✅ Профиль найден</div>
                    <div>Имя: {result.profile?.full_name}</div>
                    <div>Роль: <strong>{result.profile?.role}</strong></div>
                    <div>Компания: {result.profile?.company_name}</div>
                  </div>
                ) : (
                  <div>
                    <div>❌ Профиль НЕ найден</div>
                    <div>Ошибка: {result.profileError}</div>
                  </div>
                )}
              </div>
            </div>

            {result.profileCreated !== undefined && (
              <div style={{ marginBottom: '1rem' }}>
                <strong>4. Создание профиля:</strong>
                <div style={{ marginLeft: '1rem' }}>
                  {result.profileCreated ? (
                    <div>
                      <div>✅ Профиль создан</div>
                      <div>Роль: {result.newProfile?.role}</div>
                    </div>
                  ) : (
                    <div>
                      <div>❌ Ошибка создания</div>
                      <div>{result.createError}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: result.profileExists && result.profile?.role === 'admin' 
                ? '#f0fdf4' 
                : '#fef2f2',
              border: `1px solid ${
                result.profileExists && result.profile?.role === 'admin'
                  ? '#bbf7d0'
                  : '#fecaca'
              }`,
              borderRadius: '0.5rem'
            }}>
              <strong>Итог:</strong>
              <div style={{ marginTop: '0.5rem' }}>
                {result.profileExists && result.profile?.role === 'admin' ? (
                  '✅ Всё в порядке! Можете войти в админку.'
                ) : result.profileCreated ? (
                  '✅ Профиль создан! Теперь можете войти в админку.'
                ) : result.authError && result.authError.includes('Email not confirmed') ? (
                  <div>
                    <div>❌ Email не подтвержден.</div>
                    <a 
                      href="/fix-admin-email" 
                      style={{ 
                        color: '#dc2626', 
                        textDecoration: 'underline',
                        fontWeight: '600',
                        display: 'inline-block',
                        marginTop: '0.5rem'
                      }}
                    >
                      → Перейти к инструкции по исправлению
                    </a>
                  </div>
                ) : (
                  '❌ Проблема с профилем. Проверьте настройки RLS в Supabase.'
                )}
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
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

export default DiagnoseAdmin

