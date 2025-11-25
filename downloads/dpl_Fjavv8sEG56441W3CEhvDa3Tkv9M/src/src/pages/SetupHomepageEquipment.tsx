import React, { useState } from 'react'
import { supabase } from '../config/supabase'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Check, X, Database, AlertCircle } from 'lucide-react'

const SetupHomepageEquipment = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<'ready' | 'creating' | 'inserting' | 'complete'>('ready')

  const setupDatabase = async () => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)
      setStep('creating')

      // Создаем таблицу
      const { error: tableError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS homepage_equipment (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            icon VARCHAR(50) NOT NULL DEFAULT 'Monitor',
            gradient VARCHAR(50) NOT NULL DEFAULT 'gradient-card-purple',
            link VARCHAR(255) NOT NULL DEFAULT '',
            is_visible BOOLEAN NOT NULL DEFAULT true,
            sort_order INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      })

      if (tableError) {
        // Если функция exec_sql не существует, попробуем создать таблицу через обычные запросы
        console.log('exec_sql не доступна, используем альтернативный метод')
        
        // Создаем таблицу через обычный запрос (может не работать без прав)
        const { error: createError } = await supabase
          .from('homepage_equipment')
          .select('id')
          .limit(1)

        if (createError && createError.code === 'PGRST116') {
          // Таблица не существует, попробуем создать через SQL
          throw new Error('Необходимо создать таблицу homepage_equipment в Supabase Dashboard')
        }
      }

      setStep('inserting')

      // Проверяем, есть ли уже данные
      const { data: existingData } = await supabase
        .from('homepage_equipment')
        .select('id')
        .limit(1)

      if (!existingData || existingData.length === 0) {
        // Вставляем начальные данные
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

        if (insertError) throw insertError
      }

      setStep('complete')
      setSuccess('База данных успешно настроена! Блоки оборудования готовы к редактированию.')

    } catch (err) {
      console.error('Ошибка настройки базы данных:', err)
      setError(err instanceof Error ? err.message : 'Ошибка настройки базы данных')
      setStep('ready')
    } finally {
      setLoading(false)
    }
  }

  const getStepIcon = (stepName: string) => {
    if (step === stepName && loading) {
      return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    }
    if (step === 'complete' && ['creating', 'inserting'].includes(stepName)) {
      return <Check className="w-5 h-5 text-green-500" />
    }
    if (step === 'ready' && stepName === 'ready') {
      return <Database className="w-5 h-5 text-blue-500" />
    }
    return <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Настройка блоков оборудования
          </h1>
          <p className="text-gray-600">
            Создание таблицы и начальных данных для управления блоками оборудования на главной странице
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2 text-blue-600" />
              Настройка базы данных
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
                {getStepIcon('creating')}
                <span className={step === 'creating' ? 'text-blue-600 font-medium' : 'text-gray-600'}>
                  Создание таблицы homepage_equipment
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                {getStepIcon('inserting')}
                <span className={step === 'inserting' ? 'text-blue-600 font-medium' : 'text-gray-600'}>
                  Вставка начальных данных
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
                onClick={setupDatabase} 
                disabled={loading || step === 'complete'}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Настройка...' : step === 'complete' ? 'Настройка завершена' : 'Настроить базу данных'}
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
                    Возможно, нужно создать таблицу вручную в Supabase Dashboard или выполнить SQL скрипт.
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

        {/* Инструкции */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
              Инструкции
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Если автоматическая настройка не работает:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>Откройте Supabase Dashboard</li>
                  <li>Перейдите в раздел SQL Editor</li>
                  <li>Выполните SQL скрипт из файла <code className="bg-gray-100 px-1 rounded">create_homepage_equipment_table.sql</code></li>
                  <li>Обновите эту страницу</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">После настройки:</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                  <li>Перейдите в админ-панель: <a href="/admin/homepage-equipment" className="text-blue-600 hover:underline">/admin/homepage-equipment</a></li>
                  <li>Редактируйте блоки оборудования</li>
                  <li>Изменения сразу отобразятся на главной странице</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ссылки */}
        <div className="mt-8 text-center">
          <div className="space-x-4">
            <a
              href="/admin/homepage-equipment"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
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

export default SetupHomepageEquipment
