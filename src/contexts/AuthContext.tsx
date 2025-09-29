import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../config/supabase'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'client'
  company_name?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Проверяем, есть ли сохраненный пользователь в localStorage
    const savedUser = localStorage.getItem('weshow_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('weshow_user')
      }
    } else {
      // Временно устанавливаем тестового пользователя для разработки
      const testUser: User = {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'Тестовый менеджер',
        email: 'manager@weshow.ru',
        role: 'manager',
        company_name: 'WESHOW'
      }
      setUser(testUser)
      localStorage.setItem('weshow_user', JSON.stringify(testUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Простая проверка для демо
      if (password === 'password' && (email === 'admin@weshow.ru' || email === 'manager@weshow.ru')) {
        const demoUser = {
          id: email === 'admin@weshow.ru' ? '00000000-0000-0000-0000-000000000001' : '00000000-0000-0000-0000-000000000002',
          name: email === 'admin@weshow.ru' ? 'Администратор' : 'Менеджер',
          email,
          role: email === 'admin@weshow.ru' ? 'admin' : 'manager' as 'admin' | 'manager',
          company_name: 'WESHOW'
        }
        
        setUser(demoUser)
        localStorage.setItem('weshow_user', JSON.stringify(demoUser))
        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return false
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('weshow_user')
  }

  const value = {
    user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}