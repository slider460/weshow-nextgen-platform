import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.KOCzZQGNqpGmuXxhuCjAtUPcD8qHr9Alti_uVejrRFs';

const adminSupabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const TestImageUpload: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setLogs(prev => [...prev, logMessage]);
    console.log(logMessage);
  };

  const clearLogs = () => {
    setLogs([]);
    setResult('');
    setError('');
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');
    setResult('');
    addLog('🖼️ Начинаем загрузку изображения...');

    try {
      addLog(`📁 Файл: ${file.name}, размер: ${file.size} байт, тип: ${file.type}`);

      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        throw new Error('Выбранный файл не является изображением');
      }

      // Проверяем размер файла (максимум 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Размер файла превышает 10MB');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `test-${Date.now()}.${fileExt}`;
      const filePath = `cases/images/${fileName}`;

      addLog(`📂 Путь для загрузки: ${filePath}`);

      // Загружаем файл
      addLog('📤 Загружаем файл в Supabase Storage...');
      const { data: uploadData, error: uploadError } = await adminSupabase.storage
        .from('public')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      addLog(`✅ Файл загружен: ${JSON.stringify(uploadData)}`);

      // Получаем публичный URL
      addLog('🔗 Получаем публичный URL...');
      const { data: urlData } = adminSupabase.storage
        .from('public')
        .getPublicUrl(filePath);

      addLog(`🌐 Публичный URL: ${urlData.publicUrl}`);

      // Тестируем загрузку изображения
      addLog('🧪 Тестируем загрузку изображения в браузере...');
      const testImage = new Image();
      
      await new Promise((resolve, reject) => {
        testImage.onload = () => {
          addLog('✅ Изображение успешно загружается в браузере');
          resolve(true);
        };
        testImage.onerror = () => {
          addLog('❌ Ошибка загрузки изображения в браузере');
          reject(new Error('Изображение не загружается'));
        };
        testImage.src = urlData.publicUrl;
      });

      setResult(`✅ Изображение успешно загружено!\nURL: ${urlData.publicUrl}\nРазмер: ${file.size} байт`);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      addLog(`❌ Ошибка: ${errorMessage}`);
      setError(`❌ Ошибка загрузки: ${errorMessage}`);
      console.error('Ошибка загрузки изображения:', err);
    } finally {
      setLoading(false);
      addLog('🏁 Загрузка завершена');
    }
  };

  const testStorageConnection = async () => {
    setLoading(true);
    setError('');
    setResult('');
    addLog('🔍 Тестируем подключение к Supabase Storage...');

    try {
      // Проверяем доступные buckets
      addLog('📦 Получаем список buckets...');
      const { data: buckets, error: bucketsError } = await adminSupabase.storage.listBuckets();

      if (bucketsError) {
        throw bucketsError;
      }

      addLog(`✅ Найдено buckets: ${buckets.length}`);
      buckets.forEach(bucket => {
        addLog(`  - ${bucket.name} (${bucket.public ? 'публичный' : 'приватный'})`);
      });

      const publicBucket = buckets.find(b => b.name === 'public');
      if (!publicBucket) {
        throw new Error('Bucket "public" не найден');
      }

      addLog('✅ Bucket "public" найден');

      // Проверяем содержимое bucket
      addLog('📁 Получаем содержимое bucket "public"...');
      const { data: files, error: filesError } = await adminSupabase.storage
        .from('public')
        .list('cases/images', { limit: 5 });

      if (filesError) {
        addLog(`⚠️ Ошибка получения файлов: ${filesError.message}`);
      } else {
        addLog(`📋 Найдено файлов: ${files?.length || 0}`);
        files?.forEach(file => {
          addLog(`  - ${file.name} (${file.metadata?.size || 'неизвестный размер'})`);
        });
      }

      setResult('✅ Подключение к Storage работает корректно');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      addLog(`❌ Ошибка: ${errorMessage}`);
      setError(`❌ Ошибка подключения: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Тест загрузки изображений
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">
              Выберите изображение для загрузки
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={loading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
            />
          </div>

          <button
            onClick={testStorageConnection}
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Тестируем...' : 'Тест подключения'}
          </button>

          <button
            onClick={clearLogs}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Очистить логи
          </button>
        </div>

        {loading && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-3"></div>
              <p className="text-yellow-800">Выполняется тест...</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Результаты */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Результаты</h3>
            
            {result && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <pre className="text-green-800 whitespace-pre-wrap text-sm">{result}</pre>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <pre className="text-red-800 whitespace-pre-wrap text-sm">{error}</pre>
              </div>
            )}
          </div>

          {/* Логи */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Логи выполнения</h3>
            <div className="bg-gray-900 text-green-400 rounded-lg p-4 h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-500">Логи появятся после выполнения тестов</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="text-sm font-mono mb-1">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Инструкции по диагностике
          </h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Выберите изображение для загрузки (JPG, PNG, GIF)</li>
            <li>• Проверьте консоль браузера на наличие ошибок</li>
            <li>• Убедитесь, что Supabase Storage настроен правильно</li>
            <li>• Проверьте права доступа Service Role ключа</li>
            <li>• Убедитесь, что bucket "public" существует</li>
            <li>• Проверьте сетевые запросы в DevTools</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestImageUpload;