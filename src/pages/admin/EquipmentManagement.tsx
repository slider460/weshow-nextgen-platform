import React, { useState, useEffect } from 'react'
import { useSupabase } from '../../contexts/SupabaseContext'
import { useEquipmentCatalog, useEquipmentCategories } from '../../hooks/useWeShowData'
import { supabase } from '../../config/supabase'
import { Equipment, EquipmentCategory, EquipmentInsert, EquipmentUpdate } from '../../types/database'
import BackToAdminButton from '../../components/admin/BackToAdminButton'

const EquipmentManagement: React.FC = () => {
  const { user } = useSupabase()
  const { equipment, loading: equipmentLoading, refetch: refetchEquipment } = useEquipmentCatalog()
  const { categories, loading: categoriesLoading } = useEquipmentCategories()
  
  const [showForm, setShowForm] = useState(false)
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState<Partial<EquipmentInsert>>({
    name: '',
    description: '',
    specifications: {},
    price_per_day: 0,
    category_id: '',
    stock_quantity: 0,
    is_active: true
  })

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      specifications: {},
      price_per_day: 0,
      category_id: '',
      stock_quantity: 0,
      is_active: true
    })
    setEditingEquipment(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      if (editingEquipment) {
        // Update existing equipment
        const { error } = await supabase
          .from('equipment_catalog')
          .update(formData as EquipmentUpdate)
          .eq('id', editingEquipment.id)

        if (error) {
          setError(error.message)
        } else {
          setSuccess('Оборудование успешно обновлено')
          refetchEquipment()
          resetForm()
        }
      } else {
        // Create new equipment
        const { error } = await supabase
          .from('equipment_catalog')
          .insert(formData as EquipmentInsert)

        if (error) {
          setError(error.message)
        } else {
          setSuccess('Оборудование успешно добавлено')
          refetchEquipment()
          resetForm()
        }
      }
    } catch (err) {
      setError('Ошибка сохранения оборудования')
    }
  }

  const handleEdit = (equipment: Equipment) => {
    setEditingEquipment(equipment)
    setFormData({
      name: equipment.name,
      description: equipment.description || '',
      specifications: equipment.specifications || {},
      price_per_day: equipment.price_per_day,
      category_id: equipment.category_id || '',
      stock_quantity: equipment.stock_quantity,
      is_active: equipment.is_active
    })
    setShowForm(true)
  }

  const handleDelete = async (equipmentId: string) => {
    if (!confirm('Вы уверены, что хотите удалить это оборудование?')) return

    try {
      const { error } = await supabase
        .from('equipment_catalog')
        .delete()
        .eq('id', equipmentId)

      if (error) {
        setError(error.message)
      } else {
        setSuccess('Оборудование успешно удалено')
        refetchEquipment()
      }
    } catch (err) {
      setError('Ошибка удаления оборудования')
    }
  }

  const handleSpecChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value
      }
    }))
  }

  const addSpecField = () => {
    const key = prompt('Введите название характеристики:')
    if (key) {
      handleSpecChange(key, '')
    }
  }

  const removeSpecField = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications }
      delete newSpecs[key]
      return {
        ...prev,
        specifications: newSpecs
      }
    })
  }

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || item.category_id === categoryFilter
    
    return matchesSearch && matchesCategory
  })

  if (equipmentLoading || categoriesLoading) {
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
          <p style={{ color: '#6b7280' }}>Загрузка оборудования...</p>
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
            Каталог оборудования
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Всего позиций: {equipment.length}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <BackToAdminButton />
          <button
          onClick={() => setShowForm(true)}
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)'
          }}
        >
          + Добавить оборудование
        </button>
        </div>
      </div>

      {/* Messages */}
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

      {success && (
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          color: '#166534',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem'
        }}>
          {success}
        </div>
      )}

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
            Категория
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              outline: 'none',
              minWidth: '150px'
            }}
          >
            <option value="all">Все категории</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
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
            placeholder="Поиск по названию или описанию..."
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

      {/* Equipment Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {filteredEquipment.map(item => (
          <div
            key={item.id}
            style={{
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)'
            }}
          >
            {/* Image */}
            <div style={{
              height: '200px',
              background: item.main_image_url ? 
                `url(${item.main_image_url}) center/cover` : 
                'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              color: '#9ca3af'
            }}>
              {!item.main_image_url && '🔧'}
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: 0,
                  flex: 1
                }}>
                  {item.name}
                </h3>
                <span style={{
                  background: item.is_active ? '#dcfce7' : '#f3f4f6',
                  color: item.is_active ? '#166534' : '#6b7280',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  marginLeft: '0.5rem'
                }}>
                  {item.is_active ? 'Активно' : 'Неактивно'}
                </span>
              </div>

              {item.description && (
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                  lineHeight: '1.5'
                }}>
                  {item.description}
                </p>
              )}

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                    Цена за сутки
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#059669' }}>
                    {item.price_per_day.toLocaleString()} ₽
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                    На складе
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                    {item.stock_quantity} шт.
                  </div>
                </div>
              </div>

              {/* Specifications */}
              {item.specifications && Object.keys(item.specifications).length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Характеристики:
                  </div>
                  <div style={{ fontSize: '0.8rem' }}>
                    {Object.entries(item.specifications).slice(0, 2).map(([key, value]) => (
                      <div key={key} style={{ marginBottom: '0.25rem' }}>
                        <strong>{key}:</strong> {value}
                      </div>
                    ))}
                    {Object.keys(item.specifications).length > 2 && (
                      <div style={{ color: '#9ca3af' }}>
                        +{Object.keys(item.specifications).length - 2} еще...
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleEdit(item)}
                  style={{
                    flex: 1,
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
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
            maxWidth: '600px',
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
                {editingEquipment ? 'Редактировать оборудование' : 'Добавить оборудование'}
              </h2>
              <button
                onClick={resetForm}
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
            <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Название оборудования *
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
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

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Категория
                </label>
                <select
                  value={formData.category_id || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                >
                  <option value="">Выберите категорию</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Описание
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
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
                  Цена аренды за сутки (₽) *
                </label>
                <input
                  type="number"
                  value={formData.price_per_day || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, price_per_day: Number(e.target.value) }))}
                  required
                  min="0"
                  step="0.01"
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

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Количество на складе
                </label>
                <input
                  type="number"
                  value={formData.stock_quantity || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: Number(e.target.value) }))}
                  min="0"
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

              {/* Specifications */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <label style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Технические характеристики
                  </label>
                  <button
                    type="button"
                    onClick={addSpecField}
                    style={{
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    + Добавить
                  </button>
                </div>
                <div style={{
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  background: '#f8fafc'
                }}>
                  {Object.entries(formData.specifications || {}).map(([key, value]) => (
                    <div key={key} style={{
                      display: 'flex',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      alignItems: 'center'
                    }}>
                      <input
                        type="text"
                        value={key}
                        onChange={(e) => {
                          const newKey = e.target.value
                          const newSpecs = { ...formData.specifications }
                          delete newSpecs[key]
                          newSpecs[newKey] = value
                          setFormData(prev => ({ ...prev, specifications: newSpecs }))
                        }}
                        placeholder="Название характеристики"
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.25rem',
                          fontSize: '0.9rem'
                        }}
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleSpecChange(key, e.target.value)}
                        placeholder="Значение"
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.25rem',
                          fontSize: '0.9rem'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecField(key)}
                        style={{
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem',
                          borderRadius: '0.25rem',
                          cursor: 'pointer'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {Object.keys(formData.specifications || {}).length === 0 && (
                    <div style={{
                      color: '#9ca3af',
                      fontSize: '0.9rem',
                      textAlign: 'center',
                      padding: '1rem'
                    }}>
                      Нажмите "Добавить" для создания характеристик
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={formData.is_active || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>
                    Опубликовать на сайте
                  </span>
                </label>
              </div>

              {/* Form Actions */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end'
              }}>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {editingEquipment ? 'Обновить' : 'Добавить'}
                </button>
              </div>
            </form>
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

export default EquipmentManagement
