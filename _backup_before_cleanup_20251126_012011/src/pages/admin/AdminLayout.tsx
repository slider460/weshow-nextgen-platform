import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, profile, loading, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Проверка прав доступа
  useEffect(() => {
    if (!loading && (!user || !profile || (profile.role !== 'admin' && profile.role !== 'manager'))) {
      navigate('/admin/login')
    }
  }, [user, profile, loading, navigate])

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
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
          <p>Загрузка админ-панели...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile || (profile.role !== 'admin' && profile.role !== 'manager')) {
    return null
  }

  const menuItems = [
    { id: 'management', label: 'Управление', icon: '🎛️', path: '/admin/' },
    { id: 'dashboard', label: 'Дашборд', icon: '📊', path: '/admin/dashboard' },
    { id: 'estimates', label: 'Заявки', icon: '📋', path: '/simple-estimates' },
    { id: 'equipment', label: 'Каталог оборудования', icon: '🔧', path: '/admin/equipment' },
    { id: 'equipment-blocks', label: 'Блоки оборудования', icon: '🎬', path: '/admin/equipment-blocks' },
    { id: 'services-blocks', label: 'Блоки услуг', icon: '🚀', path: '/admin/services-blocks' },
    { id: 'cases', label: 'Кейсы', icon: '💼', path: '/admin/cases' },
    { id: 'letters', label: 'Письма и грамоты', icon: '🏆', path: '/admin/letters' },
    { id: 'solutions', label: 'Комплексные решения', icon: '🎯', path: '/admin/solutions' },
    { id: 'articles', label: 'Статьи', icon: '📝', path: '/admin/articles' },
    { id: 'users', label: 'Пользователи', icon: '👥', path: '/admin/users' }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8fafc',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '280px' : '80px',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        transition: 'width 0.3s ease',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        zIndex: 1000
      }}>
        {/* Logo */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: sidebarOpen ? '1.5rem' : '1.2rem',
            fontWeight: 'bold',
            color: '#60a5fa'
          }}>
            {sidebarOpen ? 'WeShow Admin' : 'WS'}
          </div>
        </div>

        {/* Menu Items */}
        <nav style={{ padding: '1rem 0' }}>
          {menuItems.map(item => (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                background: isActive(item.path) ? 'rgba(96, 165, 250, 0.2)' : 'transparent',
                borderRight: isActive(item.path) ? '3px solid #60a5fa' : '3px solid transparent',
                transition: 'all 0.3s ease',
                marginBottom: '0.25rem'
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <span style={{ 
                fontSize: '1.2rem', 
                marginRight: sidebarOpen ? '0.75rem' : '0',
                minWidth: '20px'
              }}>
                {item.icon}
              </span>
              {sidebarOpen && (
                <span style={{ 
                  fontSize: '0.9rem',
                  fontWeight: isActive(item.path) ? '600' : '400'
                }}>
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* User Info */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          right: '1rem',
          padding: '1rem',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '0.5rem',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ 
            fontSize: '0.8rem', 
            color: '#94a3b8',
            marginBottom: '0.5rem'
          }}>
            {sidebarOpen ? 'Пользователь' : ''}
          </div>
          <div style={{ 
            fontSize: '0.9rem', 
            fontWeight: '600',
            marginBottom: '0.25rem'
          }}>
            {sidebarOpen ? (profile.full_name || user.email?.split('@')[0] || 'Пользователь') : (profile.full_name || user.email || 'U').charAt(0)}
          </div>
          <div style={{ 
            fontSize: '0.7rem', 
            color: '#60a5fa',
            textTransform: 'uppercase'
          }}>
            {sidebarOpen ? profile.role : profile.role.charAt(0)}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: sidebarOpen ? '280px' : '80px',
        flex: 1,
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Header */}
        <header style={{
          background: 'white',
          borderBottom: '1px solid #e2e8f0',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                color: '#64748b'
              }}
            >
              ☰
            </button>
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#1e293b',
              margin: 0
            }}>
              {menuItems.find(item => isActive(item.path))?.label || 'Админ-панель'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={handleSignOut}
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              Выйти
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
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

export default AdminLayout