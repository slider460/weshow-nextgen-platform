import React, { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Alert, AlertDescription } from '../components/ui/alert'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

export default function TestEstimatesPage() {
  const [estimates, setEstimates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<any>(null)

  useEffect(() => {
    fetchEstimates()
  }, [])

  const fetchEstimates = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('estimates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) {
        setError(`Ошибка загрузки: ${error.message}`)
      } else {
        setEstimates(data || [])
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const testRLS = async () => {
    try {
      console.log('🧪 Тестируем RLS для estimates...')
      
      // Сначала получаем существующего пользователя
      const { data: users } = await supabase
        .from('users')
        .select('id')
        .limit(1)

      if (!users || users.length === 0) {
        setTestResult({
          canInsert: false,
          insertError: 'Нет пользователей в таблице users'
        })
        return
      }

      // Пробуем добавить тестовую запись с существующим user_id
      const { data: insertData, error: insertError } = await supabase
        .from('estimates')
        .insert([{
          user_id: users[0].id, // Используем существующий user_id
          status: 'draft',
          event_date: new Date().toISOString().split('T')[0],
          client_notes: 'Тест RLS для estimates'
        }])
        .select()

      setTestResult({
        canInsert: !insertError,
        insertError: insertError?.message,
        insertData
      })

      if (insertError) {
        console.log('⚠️ RLS блокирует estimates:', insertError.message)
      } else {
        console.log('✅ RLS для estimates работает')
        // Удаляем тестовую запись
        if (insertData?.[0]?.id) {
          await supabase
            .from('estimates')
            .delete()
            .eq('id', insertData[0].id)
        }
      }

    } catch (err: any) {
      setTestResult({
        canInsert: false,
        insertError: err.message
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧪 Тестирование страницы estimates
          </h1>
          <p className="text-gray-600">
            Проверка работы таблицы estimates и RLS политик
          </p>
        </div>

        <div className="space-y-6">
          {/* Тест RLS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Тест RLS для estimates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={testRLS} className="mb-4">
                Запустить тест RLS
              </Button>

              {testResult && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {testResult.canInsert ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span>Добавление записей: {testResult.canInsert ? 'Работает' : 'Заблокировано RLS'}</span>
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

          {/* Список estimates */}
          <Card>
            <CardHeader>
              <CardTitle>📋 Список estimates</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Загрузка...</div>
              ) : error ? (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    Найдено записей: {estimates.length}
                  </div>
                  
                  {estimates.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Нет данных в таблице estimates
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {estimates.map((estimate) => (
                        <div key={estimate.id} className="p-4 border rounded-lg bg-white">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">ID: {estimate.id}</div>
                              <div className="text-sm text-gray-600">
                                Статус: {estimate.status}
                              </div>
                              <div className="text-sm text-gray-600">
                                Дата события: {estimate.event_date}
                              </div>
                              {estimate.client_notes && (
                                <div className="text-sm text-gray-600 mt-1">
                                  Заметки: {estimate.client_notes}
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(estimate.created_at).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Инструкции */}
          <Card>
            <CardHeader>
              <CardTitle>📋 Инструкции по исправлению</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Если RLS блокирует estimates:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                    <li>Откройте Supabase Dashboard</li>
                    <li>Перейдите в SQL Editor</li>
                    <li>Выполните SQL скрипт для отключения RLS estimates</li>
                    <li>Обновите эту страницу</li>
                  </ol>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">SQL для исправления:</h4>
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap">
{`ALTER TABLE estimates DISABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own estimates" ON estimates;
DROP POLICY IF EXISTS "Users can create estimates" ON estimates;
DROP POLICY IF EXISTS "Users can update own estimates" ON estimates;
DROP POLICY IF EXISTS "Managers can view all estimates" ON estimates;
DROP POLICY IF EXISTS "Managers can update all estimates" ON estimates;
DROP POLICY IF EXISTS "Public read access for estimates" ON estimates;
DROP POLICY IF EXISTS "Admins can manage estimates" ON estimates;`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
