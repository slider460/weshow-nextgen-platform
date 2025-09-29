import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useEquipmentCatalog, useArticles } from '../../hooks/useWeShowData'
import { supabase } from '../../config/supabase'
import { Estimate, Equipment, Article, User } from '../../types/database'
import BackToAdminButton from '../../components/admin/BackToAdminButton'

interface DashboardStats {
  newEstimatesToday: number
  totalEstimatesInProgress: number
  totalEquipment: number
  totalClients: number
  recentEstimates: Estimate[]
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState<DashboardStats>({
    newEstimatesToday: 0,
    totalEstimatesInProgress: 0,
    totalEquipment: 0,
    totalClients: 0,
    recentEstimates: []
  })
  const [loading, setLoading] = useState(true)
  const [estimateTotals, setEstimateTotals] = useState<Record<string, number>>({})

  const { equipment } = useEquipmentCatalog()
  const { articles } = useArticles()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Получаем статистику
        const today = new Date().toISOString().split('T')[0]
        
        const [
          newEstimatesTodayResult,
          totalEstimatesInProgressResult,
          totalEquipmentResult,
          totalClientsResult,
          recentEstimatesResult
        ] = await Promise.all([
          supabase
            .from('estimates')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', `${today}T00:00:00.000Z`),
          
          supabase
            .from('estimates')
            .select('*', { count: 'exact', head: true })
            .in('status', ['draft', 'pending_review']),
          
          supabase
            .from('equipment_catalog')
            .select('*', { count: 'exact', head: true })
            .not('id', 'is', null),
          
          supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('role', 'client'),
          
          supabase
            .from('estimates')
            .select(`
              *,
              users (
                id,
                name,
                company_name
              )
            `)
            .eq('status', 'pending_review')
            .order('created_at', { ascending: false })
            .limit(5)
        ])

        const recentEstimates = recentEstimatesResult.data || []
        
        // Рассчитываем суммы для каждой заявки
        const totals: Record<string, number> = {}
        for (const estimate of recentEstimates) {
          try {
            const { data: items } = await supabase
              .from('estimate_items')
              .select('quantity, price_at_creation')
              .eq('estimate_id', estimate.id)
            
            const total = items?.reduce((sum, item) => 
              sum + (item.quantity * item.price_at_creation), 0) || 0
            totals[estimate.id] = total
          } catch (error) {
            console.error('Error calculating total for estimate:', estimate.id, error)
            totals[estimate.id] = 0
          }
        }
        
        setEstimateTotals(totals)
        setStats({
          newEstimatesToday: newEstimatesTodayResult.count || 0,
          totalEstimatesInProgress: totalEstimatesInProgressResult.count || 0,
          totalEquipment: totalEquipmentResult.count || 0,
          totalClients: totalClientsResult.count || 0,
          recentEstimates
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review':
        return '#f59e0b'
      case 'confirmed':
        return '#10b981'
      case 'canceled':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending_review':
        return 'На рассмотрении'
      case 'confirmed':
        return 'Подтверждена'
      case 'canceled':
        return 'Отменена'
      case 'draft':
        return 'Черновик'
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '400px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p style={{ color: '#6b7280' }}>Загрузка данных...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Welcome Message */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        marginBottom: '2rem',
        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              margin: '0 0 0.5rem 0' 
            }}>
              Добро пожаловать, {user?.name}! 👋
            </h1>
            <p style={{ 
              fontSize: '1.1rem', 
              opacity: 0.9, 
              margin: 0 
            }}>
              Вот краткий обзор вашей операционной деятельности
            </p>
          </div>
          <BackToAdminButton variant="ghost" />
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{
              background: '#fef3c7',
              color: '#f59e0b',
              padding: '0.75rem',
              borderRadius: '0.75rem',
              fontSize: '1.5rem',
              marginRight: '1rem'
            }}>
              📋
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: '500' }}>
                Новых заявок сегодня
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {stats.newEstimatesToday}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{
              background: '#dbeafe',
              color: '#3b82f6',
              padding: '0.75rem',
              borderRadius: '0.75rem',
              fontSize: '1.5rem',
              marginRight: '1rem'
            }}>
              ⏳
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: '500' }}>
                В обработке
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {stats.totalEstimatesInProgress}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{
              background: '#dcfce7',
              color: '#10b981',
              padding: '0.75rem',
              borderRadius: '0.75rem',
              fontSize: '1.5rem',
              marginRight: '1rem'
            }}>
              🔧
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: '500' }}>
                Позиций в каталоге
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {stats.totalEquipment}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{
              background: '#f3e8ff',
              color: '#8b5cf6',
              padding: '0.75rem',
              borderRadius: '0.75rem',
              fontSize: '1.5rem',
              marginRight: '1rem'
            }}>
              👥
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: '500' }}>
                Зарегистрировано клиентов
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {stats.totalClients}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Estimates */}
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb',
          background: '#f8fafc'
        }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            color: '#1f2937',
            margin: 0
          }}>
            Последние заявки на рассмотрении
          </h2>
        </div>

        {stats.recentEstimates.length === 0 ? (
          <div style={{
            padding: '3rem',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <p style={{ fontSize: '1.1rem', margin: 0 }}>
              Нет заявок на рассмотрении
            </p>
          </div>
        ) : (
          <div>
            {stats.recentEstimates.map((estimate, index) => (
              <div
                key={estimate.id}
                style={{
                  padding: '1.5rem',
                  borderBottom: index < stats.recentEstimates.length - 1 ? '1px solid #e5e7eb' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '600', 
                      color: '#1f2937',
                      margin: '0 1rem 0 0'
                    }}>
                      {estimate.users?.name || 'Неизвестный клиент'}
                    </h3>
                    <span style={{
                      background: getStatusColor(estimate.status),
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {getStatusLabel(estimate.status)}
                    </span>
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    {estimate.users?.company_name && (
                      <span style={{ marginRight: '1rem' }}>
                        🏢 {estimate.users.company_name}
                      </span>
                    )}
                    {estimate.event_date && (
                      <span>
                        📅 {new Date(estimate.event_date).toLocaleDateString('ru-RU')}
                      </span>
                    )}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    Создана: {formatDate(estimate.created_at)}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ textAlign: 'right', marginRight: '1rem' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#059669' }}>
                      {estimateTotals[estimate.id] ? estimateTotals[estimate.id].toLocaleString() : '0'} ₽
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      Общая сумма
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      console.log('Просмотр заявки:', estimate.id);
                      const clientName = estimate.users?.name || 'Неизвестный клиент';
                      const companyName = estimate.users?.company_name || '';
                      alert(`Заявка #${estimate.id}\nКлиент: ${clientName}\nКомпания: ${companyName}\nДата: ${estimate.event_date}\nСтатус: ${estimate.status}`);
                    }}
                    style={{
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
                  >
                    Просмотреть
                  </button>
                </div>
              </div>
            ))}
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

export default AdminDashboard