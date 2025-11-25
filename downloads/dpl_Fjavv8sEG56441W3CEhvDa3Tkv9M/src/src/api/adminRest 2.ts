// REST API функции для админ панели
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.KOCzZQGNqpGmuXxhuCjAtUPcD8qHr9Alti_uVejrRFs'

// Функция для загрузки данных через REST API
async function fetchFromSupabase(table: string, params: string = '') {
  try {
    const url = `${SUPABASE_URL}/rest/v1/${table}${params ? '?' + params : ''}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Ошибка загрузки данных из ${table}:`, error)
    throw error
  }
}

// Функция для отправки данных через REST API (используем service role для записи)
async function sendToSupabase(table: string, method: 'POST' | 'PUT' | 'DELETE', data?: any, params?: string) {
  try {
    const url = `${SUPABASE_URL}/rest/v1/${table}${params ? '?' + params : ''}`
    
    const response = await fetch(url, {
      method: method,
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : undefined
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    // Проверяем, есть ли контент для парсинга
    const text = await response.text()
    if (!text) {
      return null // Пустой ответ для DELETE операций
    }
    
    return JSON.parse(text)
  } catch (error) {
    console.error(`Ошибка отправки данных в ${table}:`, error)
    throw error
  }
}

// Функции для работы с homepage_equipment
export async function getHomepageEquipment() {
  try {
    return await fetchFromSupabase('homepage_equipment', 'order=sort_order.asc')
  } catch (error) {
    console.error('Ошибка загрузки оборудования:', error)
    return []
  }
}

export async function createHomepageEquipment(data: any) {
  try {
    return await sendToSupabase('homepage_equipment', 'POST', data)
  } catch (error) {
    console.error('Ошибка создания оборудования:', error)
    throw error
  }
}

export async function updateHomepageEquipment(id: string, data: any) {
  try {
    return await sendToSupabase('homepage_equipment', 'PUT', data, `id=eq.${id}`)
  } catch (error) {
    console.error('Ошибка обновления оборудования:', error)
    throw error
  }
}

export async function deleteHomepageEquipment(id: string) {
  try {
    return await sendToSupabase('homepage_equipment', 'DELETE', undefined, `id=eq.${id}`)
  } catch (error) {
    console.error('Ошибка удаления оборудования:', error)
    throw error
  }
}

// Функции для работы с cases (используем отдельный клиент для админ операций)
import { createClient } from '@supabase/supabase-js'
import { supabase as globalSupabase } from '../config/supabase'

// Создаем клиент с service role для операций записи
const adminSupabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function getCases() {
  try {
    // Для чтения используем глобальный клиент (с аутентификацией пользователя)
    const { data, error } = await globalSupabase
      .from('cases')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Ошибка загрузки кейсов:', error)
    return []
  }
}

export async function createCase(data: any) {
  try {
    // Для записи используем админ клиент с service role
    const { data: result, error } = await adminSupabase
      .from('cases')
      .insert(data)
      .select()
    
    if (error) throw error
    return result
  } catch (error) {
    console.error('Ошибка создания кейса:', error)
    throw error
  }
}

export async function updateCase(id: string, data: any) {
  try {
    // Для записи используем админ клиент с service role
    const { data: result, error } = await adminSupabase
      .from('cases')
      .update(data)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return result
  } catch (error) {
    console.error('Ошибка обновления кейса:', error)
    throw error
  }
}

export async function deleteCase(id: string) {
  try {
    // Для записи используем админ клиент с service role
    const { error } = await adminSupabase
      .from('cases')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return null
  } catch (error) {
    console.error('Ошибка удаления кейса:', error)
    throw error
  }
}

// Функции для работы с estimates
export async function getEstimates() {
  try {
    return await fetchFromSupabase('estimates', 'order=created_at.desc')
  } catch (error) {
    console.error('Ошибка загрузки заявок:', error)
    return []
  }
}

export async function getEstimatesStats() {
  try {
    const estimates = await fetchFromSupabase('estimates')
    
    const totalEstimates = estimates.length
    const pendingEstimates = estimates.filter((e: any) => e.status === 'pending_review').length
    const confirmedEstimates = estimates.filter((e: any) => e.status === 'confirmed').length
    
    return {
      totalEstimates,
      pendingEstimates,
      confirmedEstimates,
      recentEstimates: estimates.slice(0, 5)
    }
  } catch (error) {
    console.error('Ошибка загрузки статистики заявок:', error)
    return {
      totalEstimates: 0,
      pendingEstimates: 0,
      confirmedEstimates: 0,
      recentEstimates: []
    }
  }
}

// Функции для работы с equipment_catalog
export async function getEquipmentCatalog() {
  try {
    return await fetchFromSupabase('equipment_catalog')
  } catch (error) {
    console.error('Ошибка загрузки каталога оборудования:', error)
    return []
  }
}

// Функции для работы с users
export async function getUsers() {
  try {
    return await fetchFromSupabase('users')
  } catch (error) {
    console.error('Ошибка загрузки пользователей:', error)
    return []
  }
}
