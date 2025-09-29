import React, { useState } from 'react'
import { supabase } from '../config/supabase'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Alert, AlertDescription } from '../components/ui/alert'
import { CheckCircle, XCircle, AlertTriangle, Copy, ExternalLink } from 'lucide-react'

export default function FixHomepageEquipmentRLS() {
  const [step, setStep] = useState<'ready' | 'testing' | 'fixing' | 'complete' | 'error'>('ready')
  const [error, setError] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<any>(null)

  const testRLS = async () => {
    setStep('testing')
    setError(null)
    
    try {
      // Проверяем, можем ли мы читать данные
      const { data: readData, error: readError } = await supabase
        .from('homepage_equipment')
        .select('id, title')
        .limit(1)

      if (readError) {
        throw new Error(`Ошибка чтения: ${readError.message}`)
      }

      // Пробуем добавить тестовую запись
      const { data: insertData, error: insertError } = await supabase
        .from('homepage_equipment')
        .insert([{
          title: 'Тест RLS',
          description: 'Тестовая запись для проверки RLS',
          icon: 'Monitor',
          gradient: 'gradient-card-purple',
          link: '/test',
          is_visible: false,
          sort_order: 9999
        }])
        .select()

      setTestResult({
        canRead: !readError,
        canInsert: !insertError,
        readData,
        insertData,
        insertError: insertError?.message
      })

      if (insertError) {
        setStep('error')
        setError(`RLS блокирует добавление: ${insertError.message}`)
      } else {
        setStep('complete')
        // Удаляем тестовую запись
        if (insertData?.[0]?.id) {
          await supabase
            .from('homepage_equipment')
            .delete()
            .eq('id', insertData[0].id)
        }
      }

    } catch (err: any) {
      setStep('error')
      setError(err.message)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const openSupabaseDashboard = () => {
    window.open('https://supabase.com/dashboard/project/zbykhdjqrtqftfitbvbt/sql', '_blank')
  }

  const rlsFixSQL = `-- ИСПРАВЛЕНИЕ RLS ПОЛИТИК ДЛЯ HOMEPAGE_EQUIPMENT
-- Удаляем существующие политики
DROP POLICY IF EXISTS "Allow anonymous read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow authenticated full access" ON homepage_equipment;

-- Создаем новые политики
-- 1. Политика для чтения - все могут читать
CREATE POLICY "Public read access for homepage_equipment" ON homepage_equipment
    FOR SELECT USING (true);

-- 2. Политика для записи - только аутентифицированные пользователи
CREATE POLICY "Authenticated users can manage homepage_equipment" ON homepage_equipment
    FOR ALL USING (
        auth.uid() IS NOT NULL
    );

-- Сообщение об успешном исправлении
SELECT 'RLS политики для homepage_equipment исправлены!' as status;`

  const disableRLSSQL = `-- ВРЕМЕННОЕ ОТКЛЮЧЕНИЕ RLS ДЛЯ HOMEPAGE_EQUIPMENT
ALTER TABLE homepage_equipment DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики
DROP POLICY IF EXISTS "Allow anonymous read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow authenticated full access" ON homepage_equipment;
DROP POLICY IF EXISTS "Public read access for homepage_equipment" ON homepage_equipment;
DROP POLICY IF EXISTS "Authenticated users can manage homepage_equipment" ON homepage_equipment;

-- Сообщение об успешном отключении
SELECT 'RLS для homepage_equipment отключен для тестирования!' as status;`

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔧 Исправление RLS ошибки
          </h1>
          <p className="text-gray-600">
            Диагностика и исправление проблемы с Row Level Security для таблицы homepage_equipment
          </p>
        </div>

        <div className="space-y-6">
          {/* Диагностика */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Диагностика RLS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Сначала проверим, в чем именно проблема с RLS политиками.
              </p>
              
              <Button 
                onClick={testRLS}
                disabled={step === 'testing'}
                className="w-full"
              >
                {step === 'testing' ? 'Проверяем...' : 'Запустить диагностику'}
              </Button>

              {testResult && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    {testResult.canRead ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span>Чтение данных: {testResult.canRead ? 'Работает' : 'Не работает'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {testResult.canInsert ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span>Добавление данных: {testResult.canInsert ? 'Работает' : 'Заблокировано RLS'}</span>
                  </div>

                  {testResult.insertError && (
                    <Alert className="mt-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Ошибка RLS:</strong> {testResult.insertError}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Решение 1: Исправление RLS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Решение 1: Исправление RLS политик (рекомендуется)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Создаем правильные RLS политики для таблицы homepage_equipment.
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">SQL скрипт для исправления:</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(rlsFixSQL)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Копировать
                    </Button>
                  </div>
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-x-auto">
                    {rlsFixSQL}
                  </pre>
                </div>

                <Button 
                  onClick={openSupabaseDashboard}
                  className="w-full"
                  variant="outline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Открыть Supabase Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Решение 2: Отключение RLS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Решение 2: Временное отключение RLS (для тестирования)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Полностью отключаем RLS для таблицы. Подходит только для разработки.
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">SQL скрипт для отключения RLS:</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(disableRLSSQL)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Копировать
                    </Button>
                  </div>
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-x-auto">
                    {disableRLSSQL}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Инструкции */}
          <Card>
            <CardHeader>
              <CardTitle>📋 Пошаговые инструкции</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Нажмите "Запустить диагностику" выше</li>
                <li>Если диагностика показывает проблему с RLS, выберите одно из решений</li>
                <li>Нажмите "Копировать" для нужного SQL скрипта</li>
                <li>Нажмите "Открыть Supabase Dashboard"</li>
                <li>Вставьте скопированный SQL в SQL Editor</li>
                <li>Нажмите "Run" для выполнения</li>
                <li>Вернитесь на эту страницу и обновите её</li>
                <li>Попробуйте добавить блок оборудования в админ-панели</li>
              </ol>
            </CardContent>
          </Card>

          {/* Результат */}
          {step === 'complete' && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Отлично!</strong> RLS работает корректно. Проблема решена.
              </AlertDescription>
            </Alert>
          )}

          {step === 'error' && error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Обнаружена проблема:</strong> {error}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
