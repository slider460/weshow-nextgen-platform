import React, { useState } from 'react'
import { supabase } from '../config/supabase'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Check, X, Database, AlertCircle, RefreshCw } from 'lucide-react'

const QuickSetupHomepageEquipment = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<'ready' | 'checking' | 'creating' | 'complete'>('ready')

  const quickSetup = async () => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)
      setStep('checking')

      // Сначала проверяем, существует ли таблица
      const { data: existingData, error: checkError } = await supabase
        .from('homepage_equipment')
        .select('id')
        .limit(1)

      if (checkError) {
        if (checkError.code === 'PGRST116') {
          // Таблица не существует, создаем данные напрямую
          setStep('creating')
          
          const initialData = [
            {
              title: 'Кинетический экран',
              description: 'Движущиеся интерактивные поверхности',
              icon: 'Monitor',
              gradient: 'gradient-card-purple',
              link: '/services/kinetic-screen',
              is_visible: true,
              sort_order: 1
            },
            {
              title: 'Матричный экран',
              description: 'Многосегментные LED дисплеи',
              icon: 'Monitor',
              gradient: 'gradient-card-blue',
              link: '/services/matrix-screen',
              is_visible: true,
              sort_order: 2
            },
            {
              title: 'Прозрачный экран',
              description: 'Полупрозрачные дисплеи',
              icon: 'Eye',
              gradient: 'gradient-card-cyan',
              link: '/services/transparent-screen',
              is_visible: true,
              sort_order: 3
            },
            {
              title: 'Информационные панели',
              description: 'Цифровые вывески',
              icon: 'Monitor',
              gradient: 'gradient-card-dark',
              link: '/services/info-panels',
              is_visible: true,
              sort_order: 4
            },
            {
              title: 'Проектора (от 10000 люмен)',
              description: 'Высокояркостная проекция',
              icon: 'Projector',
              gradient: 'gradient-card-purple',
              link: '/services/projectors',
              is_visible: true,
              sort_order: 5
            },
            {
              title: 'Гибкий неон',
              description: 'Эластичная LED подсветка',
              icon: 'Zap',
              gradient: 'gradient-card-blue',
              link: '/services/flexible-neon',
              is_visible: true,
              sort_order: 6
            }
          ]

          // Пробуем вставить данные
          const { error: insertError } = await supabase
            .from('homepage_equipment')
            .insert(initialData)

          if (insertError) {
            throw new Error(`Ошибка вставки данных: ${insertError.message}. Возможно, таблица не существует.`)
          }

          setStep('complete')
          setSuccess('Данные успешно созданы! Таблица была создана автоматически.')
        } else {
          throw checkError
        }
      } else {
        // Таблица существует, проверяем данные
        if (existingData && existingData.length > 0) {
          setStep('complete')
          setSuccess('Таблица уже существует и содержит данные!')
        } else {
          setStep('creating')
          
          // Вставляем данные в существующую таблицу
          const initialData = [
            {
              title: 'Кинетический экран',
              description: 'Движущиеся интерактивные поверхности',
              icon: 'Monitor',
              gradient: 'gradient-card-purple',
              link: '/services/kinetic-screen',
              is_visible: true,
              sort_order: 1
            },
            {
              title: 'Матричный экран',
              description: 'Многосегментные LED дисплеи',
              icon: 'Monitor',
              gradient: 'gradient-card-blue',
              link: '/services/matrix-screen',
              is_visible: true,
              sort_order: 2
            },
            {
              title: 'Прозрачный экран',
              description: 'Полупрозрачные дисплеи',
              icon: 'Eye',
              gradient: 'gradient-card-cyan',
              link: '/services/transparent-screen',
              is_visible: true,
              sort_order: 3
            },
            {
              title: 'Информационные панели',
              description: 'Цифровые вывески',
              icon: 'Monitor',
              gradient: 'gradient-card-dark',
              link: '/services/info-panels',
              is_visible: true,
              sort_order: 4
            },
            {
              title: 'Проектора (от 10000 люмен)',
              description: 'Высокояркостная проекция',
              icon: 'Projector',
              gradient: 'gradient-card-purple',
              link: '/services/projectors',
              is_visible: true,
              sort_order: 5
            },
            {
              title: 'Гибкий неон',
              description: 'Эластичная LED подсветка',
              icon: 'Zap',
              gradient: 'gradient-card-blue',
              link: '/services/flexible-neon',
              is_visible: true,
              sort_order: 6
            }
          ]

          const { error: insertError } = await supabase
            .from('homepage_equipment')
            .insert(initialData)

          if (insertError) {
            throw insertError
          }

          setStep('complete')
          setSuccess('Данные успешно добавлены в существующую таблицу!')
        }
      }

    } catch (err) {
      console.error('Ошибка быстрой настройки:', err)
      setError(err instanceof Error ? err.message : 'Ошибка настройки')
      setStep('ready')
    } finally {
      setLoading(false)
    }
  }

  const getStepIcon = (stepName: string) => {
    if (step === stepName && loading) {
      return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    }
    if (step === 'complete' && ['checking', 'creating'].includes(stepName)) {
      return <Check className="w-5 h-5 text-green-500" />
    }
    if (step === 'ready' && stepName === 'ready') {
      return <Database className="w-5 h-5 text-blue-500" />
    }
    return <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Быстрая настройка блоков оборудования
          </h1>
          <p className="text-gray-600">
            Автоматическое создание таблицы и данных для управления блоками оборудования
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2 text-green-600" />
              Автоматическая настройка
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {getStepIcon('ready')}
                <span className={step === 'ready' ? 'text-blue-600 font-medium' : 'text-gray-600'}>
                  Готовность к настройке
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                {getStepIcon('checking')}
                <span className={step === 'checking' ? 'text-blue-600 font-medium' : 'text-gray-600'}>
                  Проверка существования таблицы
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                {getStepIcon('creating')}
                <span className={step === 'creating' ? 'text-blue-600 font-medium' : 'text-gray-600'}>
                  Создание данных
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                {getStepIcon('complete')}
                <span className={step === 'complete' ? 'text-green-600 font-medium' : 'text-gray-600'}>
                  Настройка завершена
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button 
                onClick={quickSetup} 
                disabled={loading || step === 'complete'}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {loading ? 'Настройка...' : step === 'complete' ? 'Настройка завершена' : 'Быстрая настройка'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Уведомления */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center text-red-700">
                <X className="w-5 h-5 mr-2" />
                <div>
                  <p className="font-medium">Ошибка настройки</p>
                  <p className="text-sm">{error}</p>
                  <p className="text-sm mt-2">
                    Возможно, нужно создать таблицу вручную в Supabase Dashboard.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {success && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center text-green-700">
                <Check className="w-5 h-5 mr-2" />
                <div>
                  <p className="font-medium">Успешно!</p>
                  <p className="text-sm">{success}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Инструкции для ручного создания */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
              Если автоматическая настройка не работает
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Создайте таблицу вручную:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>Откройте <a href="https://supabase.com/dashboard/project/zbykhdjqrtqftfitbvbt/sql" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Supabase SQL Editor</a></li>
                  <li>Скопируйте и выполните этот SQL скрипт:</li>
                </ol>
                <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                  <code className="text-sm">
                    CREATE TABLE homepage_equipment (<br/>
                    &nbsp;&nbsp;id UUID DEFAULT gen_random_uuid() PRIMARY KEY,<br/>
                    &nbsp;&nbsp;title VARCHAR(255) NOT NULL,<br/>
                    &nbsp;&nbsp;description TEXT,<br/>
                    &nbsp;&nbsp;icon VARCHAR(50) DEFAULT 'Monitor',<br/>
                    &nbsp;&nbsp;gradient VARCHAR(50) DEFAULT 'gradient-card-purple',<br/>
                    &nbsp;&nbsp;link VARCHAR(255) DEFAULT '',<br/>
                    &nbsp;&nbsp;is_visible BOOLEAN DEFAULT true,<br/>
                    &nbsp;&nbsp;sort_order INTEGER DEFAULT 0,<br/>
                    &nbsp;&nbsp;created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),<br/>
                    &nbsp;&nbsp;updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()<br/>
                    );
                  </code>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  После создания таблицы нажмите "Быстрая настройка" снова.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ссылки */}
        <div className="text-center space-y-4">
          <div className="space-x-4">
            <a
              href="/admin/homepage-equipment"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Управление блоками
            </a>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Главная страница
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickSetupHomepageEquipment
