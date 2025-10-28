import { useState, useEffect, useCallback } from 'react'

// REST API конфигурация
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'

export interface Case {
  id: string
  title: string
  client: string
  year: string
  description: string
  results: string[]
  technologies: string[]
  image_url?: string
  video_url?: string
  is_visible: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

// Вспомогательная функция для создания заголовков
const getHeaders = () => ({
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json'
})

export const useCasesRest = () => {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCases = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      console.log('🔄 CasesRest: Загружаем кейсы через REST API...')

      const url = `${SUPABASE_URL}/rest/v1/cases?is_visible=eq.true&order=sort_order.asc&select=*`

      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders()
      })

      console.log('📡 CasesRest: Ответ получен, статус:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ CasesRest: HTTP ошибка:', response.status, errorText)
        
        // Если таблица не существует, просто возвращаем пустой массив
        if (response.status === 404 || errorText.includes('relation') || errorText.includes('does not exist')) {
          console.log('📋 CasesRest: Таблица cases не существует, возвращаем пустой массив')
          setCases([])
          setError(null)
          return
        }
        
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data: Case[] = await response.json()
      console.log('✅ CasesRest: Загружено кейсов:', data.length)
      console.log('📋 CasesRest: Данные:', data)

      setCases(data || [])
    } catch (err) {
      console.error('❌ CasesRest: Ошибка загрузки кейсов:', err)
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(errorMessage)
      // Устанавливаем пустой массив при ошибке, чтобы не ломать интерфейс
      setCases([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Автоматическая загрузка при инициализации
  useEffect(() => {
    fetchCases()
  }, [fetchCases])

  return {
    cases,
    loading,
    error,
    refetch: fetchCases
  }
}

export default useCasesRest











