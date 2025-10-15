import React, { useState, useEffect } from 'react'
import { getEquipment, getCategories } from '../api/equipment'
import { supabase } from '../config/supabase'

const EquipmentTest: React.FC = () => {
  const [equipment, setEquipment] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        
        // Загружаем оборудование и категории
        const [equipmentData, categoriesData] = await Promise.all([
          getEquipment(),
          getCategories()
        ])
        
        setEquipment(equipmentData)
        setCategories(categoriesData)
        setError(null)
      } catch (err) {
        console.error('Ошибка загрузки данных:', err)
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const addTestData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Сначала добавляем категории, если их нет
      const { data: existingCategories } = await supabase
        .from('equipment_categories')
        .select('slug')
        .in('slug', ['projectors', 'audio', 'lighting', 'video'])
      
      const existingSlugs = existingCategories?.map(c => c.slug) || []
      
      // Добавляем недостающие категории
      const categoriesToAdd = [
        { name: 'Проекционное оборудование', slug: 'projectors', description: 'Проекторы, экраны и аксессуары для презентаций' },
        { name: 'Аудиооборудование', slug: 'audio', description: 'Микрофоны, колонки, микшеры и звуковое оборудование' },
        { name: 'Световое оборудование', slug: 'lighting', description: 'Прожекторы, стробоскопы, лазеры и световые эффекты' },
        { name: 'Видеооборудование', slug: 'video', description: 'Камеры, видеомикшеры, мониторы и видеотехника' }
      ].filter(cat => !existingSlugs.includes(cat.slug))
      
      if (categoriesToAdd.length > 0) {
        const { error: categoryError } = await supabase
          .from('equipment_categories')
          .insert(categoriesToAdd)
        
        if (categoryError) {
          console.error('Ошибка добавления категорий:', categoryError)
          setError('Ошибка добавления категорий: ' + categoryError.message)
          return
        }
      }
      
      // Получаем ID категорий
      const { data: categoriesData } = await supabase
        .from('equipment_categories')
        .select('id, name, slug')
        .in('slug', ['projectors', 'audio', 'lighting', 'video'])
      
      if (categoriesData && categoriesData.length > 0) {
        // Добавляем тестовое оборудование
        const equipmentData = [
          {
            name: 'Проектор Panasonic PT-RZ970',
            description: '4K лазерный проектор 10,000 лм, идеален для больших залов и конференций',
            price_per_day: 15000,
            stock_quantity: 3,
            category_id: categoriesData.find(c => c.slug === 'projectors')?.id
          },
          {
            name: 'Микрофон Shure SM58',
            description: 'Вокальный микрофон, классика для выступлений',
            price_per_day: 2000,
            stock_quantity: 6,
            category_id: categoriesData.find(c => c.slug === 'audio')?.id
          },
          {
            name: 'Прожектор Chauvet DJ Intimidator Spot 355 IRC',
            description: 'RGBW прожектор с лазером, DMX управление',
            price_per_day: 8000,
            stock_quantity: 2,
            category_id: categoriesData.find(c => c.slug === 'lighting')?.id
          },
          {
            name: 'Камера Sony HXR-NX100',
            description: '4K видеокамера с 20x зумом, профессиональная',
            price_per_day: 15000,
            stock_quantity: 2,
            category_id: categoriesData.find(c => c.slug === 'video')?.id
          }
        ]
        
        const { error: equipmentError } = await supabase
          .from('equipment_catalog')
          .insert(equipmentData)
        
        if (equipmentError) {
          console.error('Ошибка добавления оборудования:', equipmentError)
          setError('Ошибка добавления оборудования: ' + equipmentError.message)
          return
        }
        
        // Перезагружаем данные
        const [equipmentDataNew, categoriesDataNew] = await Promise.all([
          getEquipment(),
          getCategories()
        ])
        
        setEquipment(equipmentDataNew)
        setCategories(categoriesDataNew)
        setError(null)
      }
      
    } catch (err) {
      console.error('Ошибка добавления тестовых данных:', err)
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false)
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
          <p>Загрузка данных...</p>
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
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '2rem' 
        }}>
          🛠️ Тест оборудования из Supabase
        </h1>

        {/* Кнопка добавления тестовых данных */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <button
            onClick={addTestData}
            disabled={loading}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Добавление...' : 'Добавить тестовые данные'}
          </button>
        </div>

        {/* Ошибки */}
        {error && (
          <div style={{
            background: 'rgba(255,0,0,0.2)',
            border: '1px solid rgba(255,0,0,0.5)',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>❌ {error}</p>
          </div>
        )}

        {/* Статистика */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Статистика
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{equipment.length}</div>
              <div>Единиц оборудования</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{categories.length}</div>
              <div>Категорий</div>
            </div>
          </div>
        </div>

        {/* Категории */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Категории оборудования
          </h2>
          {categories.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {categories.map((category) => (
                <div key={category.id} style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{category.name}</h3>
                  <p style={{ margin: '0 0 0.5rem 0', opacity: 0.8 }}>{category.slug}</p>
                  <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>{category.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Категории не найдены</p>
          )}
        </div>

        {/* Оборудование */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Оборудование
          </h2>
          {equipment.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {equipment.map((item) => (
                <div key={item.id} style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{item.name}</h3>
                  <p style={{ margin: '0 0 0.5rem 0', opacity: 0.8 }}>{item.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                      {item.price_per_day}₽/день
                    </span>
                    <span style={{ opacity: 0.7 }}>
                      В наличии: {item.stock_quantity}
                    </span>
                  </div>
                  {item.equipment_categories && (
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>
                      Категория: {item.equipment_categories.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>Оборудование не найдено</p>
          )}
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

export default EquipmentTest
