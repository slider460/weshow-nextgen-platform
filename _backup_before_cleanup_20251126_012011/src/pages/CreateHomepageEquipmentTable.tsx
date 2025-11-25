import React, { useState } from 'react'
import { supabase } from '../config/supabase'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Textarea } from '../components/ui/textarea'
import { Check, X, Copy, Database, AlertCircle } from 'lucide-react'

const CreateHomepageEquipmentTable = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<'ready' | 'creating' | 'inserting' | 'complete'>('ready')

  const sqlScript = `-- Создание таблицы для блоков оборудования на главной странице
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

-- Создание индексов
CREATE INDEX IF NOT EXISTS idx_homepage_equipment_sort_order ON homepage_equipment(sort_order);
CREATE INDEX IF NOT EXISTS idx_homepage_equipment_visible ON homepage_equipment(is_visible);

-- Вставка начальных данных
INSERT INTO homepage_equipment (title, description, icon, gradient, link, is_visible, sort_order) VALUES
('Кинетический экран', 'Движущиеся интерактивные поверхности', 'Monitor', 'gradient-card-purple', '/services/kinetic-screen', true, 1),
('Матричный экран', 'Многосегментные LED дисплеи', 'Monitor', 'gradient-card-blue', '/services/matrix-screen', true, 2),
('Прозрачный экран', 'Полупрозрачные дисплеи', 'Eye', 'gradient-card-cyan', '/services/transparent-screen', true, 3),
('Информационные панели', 'Цифровые вывески', 'Monitor', 'gradient-card-dark', '/services/info-panels', true, 4),
('Проектора (от 10000 люмен)', 'Высокояркостная проекция', 'Projector', 'gradient-card-purple', '/services/projectors', true, 5),
('Гибкий неон', 'Эластичная LED подсветка', 'Zap', 'gradient-card-blue', '/services/flexible-neon', true, 6)
ON CONFLICT DO NOTHING;

-- Включение RLS (Row Level Security)
ALTER TABLE homepage_equipment ENABLE ROW LEVEL SECURITY;

-- Создание политик RLS для анонимного доступа (только чтение)
CREATE POLICY "Allow anonymous read access" ON homepage_equipment
    FOR SELECT USING (true);

-- Создание политик RLS для аутентифицированных пользователей (полный доступ)
CREATE POLICY "Allow authenticated full access" ON homepage_equipment
    FOR ALL USING (auth.role() = 'authenticated');

-- Создание функции для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Создание триггера для автоматического обновления updated_at
DROP TRIGGER IF EXISTS update_homepage_equipment_updated_at ON homepage_equipment;
CREATE TRIGGER update_homepage_equipment_updated_at
    BEFORE UPDATE ON homepage_equipment
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();`

  const executeSQL = async () => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)
      setStep('creating')

      // Попробуем выполнить SQL через RPC
      const { error: rpcError } = await supabase.rpc('exec_sql', {
        sql: sqlScript
      })

      if (rpcError) {
        console.log('RPC exec_sql не доступна, попробуем создать таблицу через обычные запросы')
        
        // Попробуем создать таблицу через обычные запросы
        const { error: tableError } = await supabase
          .from('homepage_equipment')
          .select('id')
          .limit(1)

        if (tableError && tableError.code === 'PGRST116') {
          throw new Error('Таблица не существует. Необходимо создать её вручную в Supabase Dashboard.')
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

        if (insertError) {
          throw insertError
        }
      }

      setStep('complete')
      setSuccess('Таблица и данные успешно созданы! Теперь можно управлять блоками оборудования.')

    } catch (err) {
      console.error('Ошибка выполнения SQL:', err)
      setError(err instanceof Error ? err.message : 'Ошибка выполнения SQL')
      setStep('ready')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sqlScript)
      setSuccess('SQL скрипт скопирован в буфер обмена!')
    } catch (err) {
      console.error('Ошибка копирования:', err)
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Создание таблицы homepage_equipment
          </h1>
          <p className="text-gray-600">
            Создание таблицы и начальных данных для управления блоками оборудования
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SQL скрипт */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-600" />
                SQL скрипт для создания таблицы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={sqlScript}
                  readOnly
                  rows={20}
                  className="font-mono text-sm"
                />
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Копировать SQL
                  </Button>
                  <Button 
                    onClick={executeSQL} 
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Database className="w-4 h-4 mr-2" />
                    {loading ? 'Выполнение...' : 'Выполнить SQL'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Инструкции и статус */}
          <div className="space-y-6">
            {/* Статус выполнения */}
            <Card>
              <CardHeader>
                <CardTitle>Статус выполнения</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    {getStepIcon('ready')}
                    <span className={step === 'ready' ? 'text-blue-600 font-medium' : 'text-gray-600'}>
                      Готовность к выполнению
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {getStepIcon('creating')}
                    <span className={step === 'creating' ? 'text-blue-600 font-medium' : 'text-gray-600'}>
                      Создание таблицы
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {getStepIcon('inserting')}
                    <span className={step === 'inserting' ? 'text-blue-600 font-medium' : 'text-gray-600'}>
                      Вставка данных
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {getStepIcon('complete')}
                    <span className={step === 'complete' ? 'text-green-600 font-medium' : 'text-gray-600'}>
                      Завершено
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    <h3 className="font-medium text-gray-900 mb-2">Автоматическое создание:</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Нажмите "Выполнить SQL" для автоматического создания таблицы и данных.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Ручное создание:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                      <li>Откройте <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Supabase Dashboard</a></li>
                      <li>Перейдите в раздел <strong>SQL Editor</strong></li>
                      <li>Нажмите "Копировать SQL" выше</li>
                      <li>Вставьте скрипт в редактор</li>
                      <li>Нажмите <strong>Run</strong></li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Уведомления */}
            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center text-red-700">
                    <X className="w-5 h-5 mr-2" />
                    <div>
                      <p className="font-medium">Ошибка</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {success && (
              <Card className="border-green-200 bg-green-50">
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

            {/* Ссылки */}
            <div className="space-y-2">
              <a
                href="/admin/homepage-equipment"
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Управление блоками оборудования
              </a>
              <a
                href="/"
                className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Главная страница
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateHomepageEquipmentTable
