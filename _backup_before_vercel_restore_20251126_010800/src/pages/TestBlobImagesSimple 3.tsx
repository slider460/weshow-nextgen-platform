import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';

const TestBlobImagesSimple: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string, isError = false) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testDatabaseConnection = async () => {
    try {
      addResult('🔍 Тестируем подключение к базе данных...');
      
      // Простая проверка подключения
      const response = await fetch('/api/health');
      if (response.ok) {
        addResult('✅ Подключение к базе данных работает');
      } else {
        addResult('❌ Ошибка подключения к базе данных', true);
      }
    } catch (error) {
      addResult(`❌ Ошибка: ${error}`, true);
    }
  };

  const testImageUpload = () => {
    addResult('📤 Тестируем загрузку изображения...');
    
    // Создаем тестовый файл
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Рисуем простой тест
      ctx.fillStyle = '#4F46E5';
      ctx.fillRect(0, 0, 100, 100);
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.fillText('TEST', 25, 55);
      
      // Конвертируем в blob
      canvas.toBlob((blob) => {
        if (blob) {
          addResult(`✅ Тестовое изображение создано: ${blob.size} байт`);
          
          // Конвертируем в base64
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result as string;
            addResult(`✅ Base64 конвертация работает: ${base64.length} символов`);
          };
          reader.readAsDataURL(blob);
        } else {
          addResult('❌ Ошибка создания тестового изображения', true);
        }
      }, 'image/png');
    } else {
      addResult('❌ Ошибка создания canvas', true);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Тест системы BLOB изображений</CardTitle>
            <p className="text-gray-600">
              Проверяем компоненты системы хранения изображений в БД
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Инструкции */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Перед тестированием выполните:</strong>
                <ol className="mt-2 ml-4 list-decimal space-y-1">
                  <li>SQL скрипт <code>create_images_table.sql</code> в Supabase</li>
                  <li>Проверьте, что таблица <code>images</code> создана</li>
                  <li>Убедитесь, что политики RLS настроены</li>
                </ol>
              </AlertDescription>
            </Alert>

            {/* Кнопки тестирования */}
            <div className="flex gap-4">
              <Button onClick={testDatabaseConnection}>
                Тест подключения к БД
              </Button>
              <Button onClick={testImageUpload} variant="outline">
                Тест создания изображения
              </Button>
              <Button onClick={clearResults} variant="outline">
                Очистить результаты
              </Button>
            </div>

            {/* Результаты тестирования */}
            {testResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Результаты тестирования</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {testResults.map((result, index) => (
                      <div key={index} className="text-sm font-mono">
                        {result}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Следующие шаги */}
            <Card>
              <CardHeader>
                <CardTitle>Следующие шаги</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">1. Создайте таблицу images:</h4>
                  <p className="text-sm text-gray-600">
                    Выполните SQL скрипт <code>create_images_table.sql</code> в Supabase SQL Editor
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">2. Проверьте создание таблицы:</h4>
                  <p className="text-sm text-gray-600">
                    В Supabase Dashboard → Database → Tables должна появиться таблица <code>images</code>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">3. Протестируйте загрузку:</h4>
                  <p className="text-sm text-gray-600">
                    После создания таблицы перейдите на <code>/test-blob-images</code> для полного тестирования
                  </p>
                </div>
              </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestBlobImagesSimple;
