import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../config/supabase'
import { Estimate, EstimateItem, User } from '../../types/database'
import BackToAdminButton from '../../components/admin/BackToAdminButton'

interface EstimateWithUser extends Estimate {
  users: User
  estimate_items: (EstimateItem & {
    equipment_catalog: {
      id: string
      name: string
      main_image_url: string | null
    }
  })[]
}

const EstimatesManagement: React.FC = () => {
  const { user } = useAuth()
  const [estimates, setEstimates] = useState<EstimateWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEstimate, setSelectedEstimate] = useState<EstimateWithUser | null>(null)

  useEffect(() => {
    fetchEstimates()
  }, [statusFilter])

  const fetchEstimates = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('estimates')
        .select(`
          *,
          users (
            id,
            name,
            company_name,
            email,
            phone_number
          ),
          estimate_items (
            id,
            quantity,
            price_at_creation,
            equipment_catalog (
              id,
              name,
              main_image_url
            )
          )
        `)
        .order('created_at', { ascending: false })

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }

      const { data, error: fetchError } = await query

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setEstimates(data || [])
      }
    } catch (err) {
      setError('Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }

  const updateEstimateStatus = async (estimateId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('estimates')
        .update({ status: newStatus })
        .eq('id', estimateId)

      if (error) {
        setError(error.message)
      } else {
        fetchEstimates()
        setSelectedEstimate(null)
      }
    } catch (err) {
      setError('Ошибка обновления статуса')
    }
  }

  const deleteEstimate = async (estimateId: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту заявку?')) return

    try {
      const { error } = await supabase
        .from('estimates')
        .delete()
        .eq('id', estimateId)

      if (error) {
        setError(error.message)
      } else {
        fetchEstimates()
        setSelectedEstimate(null)
      }
    } catch (err) {
      setError('Ошибка удаления заявки')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review':
        return '#f59e0b'
      case 'confirmed':
        return '#10b981'
      case 'canceled':
        return '#ef4444'
      case 'draft':
        return '#6b7280'
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredEstimates = estimates.filter(estimate => {
    const matchesSearch = 
      estimate.users.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.users.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

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
          <p style={{ color: '#6b7280' }}>Загрузка заявок...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#1f2937',
            margin: '0 0 0.5rem 0'
          }}>
            Управление заявками
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Всего заявок: {estimates.length}
          </p>
        </div>
        <BackToAdminButton />
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        border: '1px solid #e5e7eb',
        marginBottom: '2rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Статус
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              outline: 'none',
              minWidth: '150px'
            }}
          >
            <option value="all">Все статусы</option>
            <option value="draft">Черновик</option>
            <option value="pending_review">На рассмотрении</option>
            <option value="confirmed">Подтверждена</option>
            <option value="canceled">Отменена</option>
          </select>
        </div>

        <div style={{ flex: 1, minWidth: '300px' }}>
          <label style={{
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Поиск
          </label>
          <input
            type="text"
            placeholder="Поиск по клиенту, компании или ID заявки..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {/* Estimates Table */}
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        {filteredEstimates.length === 0 ? (
          <div style={{
            padding: '3rem',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <p style={{ fontSize: '1.1rem', margin: 0 }}>
              {searchTerm ? 'Заявки не найдены' : 'Нет заявок'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f8fafc' }}>
                <tr>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    ID заявки
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Клиент
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Дата мероприятия
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Статус
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Сумма
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEstimates.map((estimate, index) => (
                  <tr
                    key={estimate.id}
                    style={{
                      borderBottom: index < filteredEstimates.length - 1 ? '1px solid #e5e7eb' : 'none',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                  >
                    <td style={{ padding: '1rem' }}>
                      <code style={{
                        background: '#f1f5f9',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.8rem',
                        color: '#475569'
                      }}>
                        #{estimate.id.slice(-8)}
                      </code>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1f2937' }}>
                          {estimate.users.name}
                        </div>
                        {estimate.users.company_name && (
                          <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                            {estimate.users.company_name}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {estimate.event_date ? (
                        new Date(estimate.event_date).toLocaleDateString('ru-RU')
                      ) : (
                        <span style={{ color: '#9ca3af' }}>Не указана</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        background: getStatusColor(estimate.status),
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {getStatusLabel(estimate.status)}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: '600', color: '#059669' }}>
                        {estimate.total_amount.toLocaleString()} ₽
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => setSelectedEstimate(estimate)}
                          style={{
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          Просмотреть
                        </button>
                        <button
                          onClick={() => deleteEstimate(estimate.id)}
                          style={{
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          Удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Estimate Detail Modal */}
      {selectedEstimate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#1f2937',
                margin: 0
              }}>
                Заявка #{selectedEstimate.id.slice(-8)}
              </h2>
              <button
                onClick={() => setSelectedEstimate(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '1.5rem' }}>
              {/* Client Info */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Информация о клиенте
                </h3>
                <div style={{
                  background: '#f8fafc',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      Имя
                    </div>
                    <div style={{ fontWeight: '600' }}>{selectedEstimate.users.name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      Компания
                    </div>
                    <div>{selectedEstimate.users.company_name || 'Не указана'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      Email
                    </div>
                    <div>{selectedEstimate.users.email}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      Телефон
                    </div>
                    <div>{selectedEstimate.users.phone_number || 'Не указан'}</div>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Детали мероприятия
                </h3>
                <div style={{
                  background: '#f8fafc',
                  padding: '1rem',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>Дата:</strong> {selectedEstimate.event_date ? 
                      new Date(selectedEstimate.event_date).toLocaleDateString('ru-RU') : 
                      'Не указана'
                    }
                  </div>
                  {selectedEstimate.client_notes && (
                    <div>
                      <strong>Примечания:</strong> {selectedEstimate.client_notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Estimate Items */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Состав сметы
                </h3>
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '0.5rem',
                  overflow: 'hidden'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#e2e8f0' }}>
                      <tr>
                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>Оборудование</th>
                        <th style={{ padding: '0.75rem', textAlign: 'center' }}>Количество</th>
                        <th style={{ padding: '0.75rem', textAlign: 'right' }}>Цена за сутки</th>
                        <th style={{ padding: '0.75rem', textAlign: 'right' }}>Итого</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEstimate.estimate_items.map((item, index) => (
                        <tr key={item.id} style={{
                          borderTop: index > 0 ? '1px solid #e5e7eb' : 'none'
                        }}>
                          <td style={{ padding: '0.75rem' }}>
                            {item.equipment_catalog.name}
                          </td>
                          <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                            {item.quantity}
                          </td>
                          <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                            {item.price_at_creation.toLocaleString()} ₽
                          </td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '600' }}>
                            {(item.quantity * item.price_at_creation).toLocaleString()} ₽
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot style={{ background: '#e2e8f0' }}>
                      <tr>
                        <td colSpan={3} style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>
                          Общая сумма:
                        </td>
                        <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold', fontSize: '1.1rem' }}>
                          {selectedEstimate.total_amount.toLocaleString()} ₽
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Status Management */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {selectedEstimate.status !== 'confirmed' && (
                  <button
                    onClick={() => updateEstimateStatus(selectedEstimate.id, 'confirmed')}
                    style={{
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 2rem',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      minWidth: '150px'
                    }}
                  >
                    ✅ Подтвердить заявку
                  </button>
                )}
                {selectedEstimate.status !== 'pending_review' && (
                  <button
                    onClick={() => updateEstimateStatus(selectedEstimate.id, 'pending_review')}
                    style={{
                      background: '#f59e0b',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 2rem',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      minWidth: '150px'
                    }}
                  >
                    ⏳ Взять в работу
                  </button>
                )}
                {selectedEstimate.status !== 'canceled' && (
                  <button
                    onClick={() => updateEstimateStatus(selectedEstimate.id, 'canceled')}
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 2rem',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      minWidth: '150px'
                    }}
                  >
                    ❌ Отменить
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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

export default EstimatesManagement
