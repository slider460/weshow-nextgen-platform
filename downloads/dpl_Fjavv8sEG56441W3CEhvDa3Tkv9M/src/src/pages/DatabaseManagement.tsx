import React, { useState, useEffect } from 'react'
import { useSupabase } from '../contexts/SupabaseContext'
import { 
  useEquipmentCatalog, 
  useEquipmentCategories, 
  useUserEstimates,
  useArticles,
  useArticleCategories 
} from '../hooks/useWeShowData'
import { supabase } from '../config/supabase'

const DatabaseManagement: React.FC = () => {
  const { user } = useSupabase()
  const [activeTab, setActiveTab] = useState('equipment')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Данные
  const { equipment, loading: equipmentLoading, error: equipmentError } = useEquipmentCatalog()
  const { categories, loading: categoriesLoading } = useEquipmentCategories()
  const { estimates, loading: estimatesLoading } = useUserEstimates(user?.id)
  const { articles, loading: articlesLoading } = useArticles()
  const { categories: articleCategories, loading: articleCategoriesLoading } = useArticleCategories()

  // Статистика
  const [stats, setStats] = useState({
    totalEquipment: 0,
    totalCategories: 0,
    totalEstimates: 0,
    totalArticles: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [equipmentCount, categoriesCount, estimatesCount, articlesCount] = await Promise.all([
          supabase.from('equipment_catalog').select('*', { count: 'exact', head: true }),
          supabase.from('equipment_categories').select('*', { count: 'exact', head: true }),
          supabase.from('estimates').select('*', { count: 'exact', head: true }),
          supabase.from('articles').select('*', { count: 'exact', head: true })
        ])

        setStats({
          totalEquipment: equipmentCount.count || 0,
          totalCategories: categoriesCount.count || 0,
          totalEstimates: estimatesCount.count || 0,
          totalArticles: articlesCount.count || 0
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  const isManagerOrAdmin = user?.role === 'manager' || user?.role === 'admin'

  if (!user) {
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
          <h1>🔒 Доступ запрещен</h1>
          <p>Необходима авторизация для доступа к управлению базой данных</p>
        </div>
      </div>
    )
  }

  if (!isManagerOrAdmin) {
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
          <h1>🚫 Недостаточно прав</h1>
          <p>Только менеджеры и администраторы могут управлять базой данных</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '2rem',
          color: '#1e293b'
        }}>
          🗄️ Управление базой данных WeShow
        </h1>

        {/* Статистика */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#3b82f6', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
              {stats.totalEquipment}
            </h3>
            <p style={{ color: '#64748b', margin: 0 }}>Единиц оборудования</p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#10b981', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
              {stats.totalCategories}
            </h3>
            <p style={{ color: '#64748b', margin: 0 }}>Категорий</p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#f59e0b', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
              {stats.totalEstimates}
            </h3>
            <p style={{ color: '#64748b', margin: 0 }}>Смет</p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#8b5cf6', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
              {stats.totalArticles}
            </h3>
            <p style={{ color: '#64748b', margin: 0 }}>Статей</p>
          </div>
        </div>

        {/* Навигация по вкладкам */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'equipment', label: 'Оборудование', icon: '🔧' },
            { id: 'categories', label: 'Категории', icon: '📁' },
            { id: 'estimates', label: 'Сметы', icon: '📋' },
            { id: 'articles', label: 'Статьи', icon: '📝' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#3b82f6' : 'rgba(255,255,255,0.9)',
                color: activeTab === tab.id ? 'white' : '#1e293b',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Поиск */}
        <div style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Поиск..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '2px solid #e2e8f0',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        {/* Контент вкладок */}
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          {activeTab === 'equipment' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>
                Каталог оборудования
              </h2>
              {equipmentLoading ? (
                <p>Загрузка...</p>
              ) : equipmentError ? (
                <p style={{ color: '#ef4444' }}>Ошибка: {equipmentError.message}</p>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '1rem'
                }}>
                  {equipment
                    .filter(item => 
                      searchTerm === '' || 
                      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(item => (
                    <div key={item.id} style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      background: 'white'
                    }}>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                        {item.name}
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        {item.description}
                      </p>
                      <p style={{ fontWeight: 'bold', color: '#059669' }}>
                        {item.price_per_day.toLocaleString()} ₽/день
                      </p>
                      <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        На складе: {item.stock_quantity} шт.
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>
                Категории оборудования
              </h2>
              {categoriesLoading ? (
                <p>Загрузка...</p>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '1rem'
                }}>
                  {categories.map(category => (
                    <div key={category.id} style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      background: 'white'
                    }}>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                        {category.name}
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                        {category.description}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: '#3b82f6' }}>
                        /{category.slug}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'estimates' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>
                Сметы на аренду
              </h2>
              {estimatesLoading ? (
                <p>Загрузка...</p>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '1rem'
                }}>
                  {estimates.map(estimate => (
                    <div key={estimate.id} style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      background: 'white'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>
                          Смета #{estimate.id.slice(-8)}
                        </h3>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.8rem',
                          background: estimate.status === 'confirmed' ? '#dcfce7' : 
                                     estimate.status === 'pending_review' ? '#fef3c7' : '#f3f4f6',
                          color: estimate.status === 'confirmed' ? '#166534' : 
                                 estimate.status === 'pending_review' ? '#92400e' : '#374151'
                        }}>
                          {estimate.status}
                        </span>
                      </div>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        {estimate.event_date ? new Date(estimate.event_date).toLocaleDateString() : 'Дата не указана'}
                      </p>
                      <p style={{ fontWeight: 'bold', color: '#059669' }}>
                        {estimate.total_amount.toLocaleString()} ₽
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'articles' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>
                Статьи блога
              </h2>
              {articlesLoading ? (
                <p>Загрузка...</p>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '1rem'
                }}>
                  {articles
                    .filter(article => 
                      searchTerm === '' || 
                      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      article.preview_text?.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(article => (
                    <div key={article.id} style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      background: 'white'
                    }}>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                        {article.title}
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        {article.preview_text}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: '#3b82f6' }}>
                          👁️ {article.views_count}
                        </span>
                        <span style={{
                          fontSize: '0.8rem',
                          color: article.is_published ? '#059669' : '#6b7280'
                        }}>
                          {article.is_published ? 'Опубликовано' : 'Черновик'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DatabaseManagement
