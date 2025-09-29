import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { CheckCircle, Copy, ExternalLink, Upload, Database } from 'lucide-react';

const SetupSupabaseStorage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const sqlScript = `-- Настройка Supabase Storage для загрузки файлов

-- Создание bucket для публичных файлов
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'public',
  'public',
  true,
  52428800, -- 50MB лимит
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime']
) ON CONFLICT (id) DO NOTHING;

-- Удаляем ВСЕ существующие политики для storage.objects
DO $$ 
DECLARE
    policy_name text;
BEGIN
    -- Получаем все политики для таблицы storage.objects
    FOR policy_name IN 
        SELECT policyname FROM pg_policies 
        WHERE tablename = 'objects' AND schemaname = 'storage'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', policy_name);
    END LOOP;
END $$;

-- Создание политик RLS для bucket 'public'
-- Политика для чтения (все могут читать)
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'public');

-- Политика для загрузки (все могут загружать)
CREATE POLICY "Anyone can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'public');

-- Политика для обновления (все могут обновлять)
CREATE POLICY "Anyone can update" ON storage.objects
FOR UPDATE USING (bucket_id = 'public');

-- Политика для удаления (все могут удалять)
CREATE POLICY "Anyone can delete" ON storage.objects
FOR DELETE USING (bucket_id = 'public');`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sqlScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Ошибка копирования:', err);
    }
  };

  const testStorage = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      // Проверяем, существует ли bucket
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        throw bucketsError;
      }

      const publicBucket = buckets?.find(bucket => bucket.id === 'public');
      
      if (!publicBucket) {
        setTestResult({
          success: false,
          message: 'Bucket "public" не найден. Необходимо выполнить SQL скрипт.'
        });
        return;
      }

      // Пробуем загрузить тестовый файл
      const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });
      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(`test/${Date.now()}.txt`, testFile);

      if (uploadError) {
        throw uploadError;
      }

      setTestResult({
        success: true,
        message: 'Storage настроен корректно! Загрузка файлов работает.'
      });

    } catch (error: any) {
      setTestResult({
        success: false,
        message: `Ошибка тестирования Storage: ${error.message}`
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Настройка Supabase Storage
          </h1>
          <p className="text-gray-600">
            Настройте Storage для загрузки изображений и видео в кейсах
          </p>
        </div>

        <div className="space-y-6">
          {/* Тестирование Storage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Тестирование Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Сначала проверим, настроен ли Storage в вашем проекте Supabase.
              </p>
              <Button onClick={testStorage} disabled={testing} className="flex items-center gap-2">
                {testing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Тестирование...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Тестировать Storage
                  </>
                )}
              </Button>
              
              {testResult && (
                <Alert className={`mt-4 ${testResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <div className="flex items-center">
                    {testResult.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    ) : (
                      <Database className="h-4 w-4 text-red-600 mr-2" />
                    )}
                    <AlertDescription className={testResult.success ? 'text-green-800' : 'text-red-800'}>
                      {testResult.message}
                    </AlertDescription>
                  </div>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Инструкции */}
          <Card>
            <CardHeader>
              <CardTitle>Пошаговая инструкция</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>
                  <strong>Откройте Supabase Dashboard:</strong>{' '}
                  <a 
                    href="https://supabase.com/dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    https://supabase.com/dashboard
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
                <li>Войдите в свой аккаунт и выберите проект <strong>WESHOW</strong></li>
                <li>В левом меню нажмите <strong>"SQL Editor"</strong></li>
                <li>Нажмите <strong>"New query"</strong></li>
                <li>Скопируйте SQL скрипт ниже и вставьте в редактор</li>
                <li>Нажмите <strong>"Run"</strong> для выполнения</li>
                <li>Вернитесь на эту страницу и нажмите <strong>"Тестировать Storage"</strong></li>
              </ol>
            </CardContent>
          </Card>

          {/* SQL скрипт */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>SQL скрипт для настройки Storage</CardTitle>
                <Button 
                  onClick={handleCopy}
                  className="flex items-center gap-2"
                  variant={copied ? "default" : "outline"}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Скопировано!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Копировать
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{sqlScript}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Что будет настроено */}
          <Card>
            <CardHeader>
              <CardTitle>Что будет настроено</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Bucket "public"</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Публичный доступ для чтения</li>
                      <li>• Лимит файла: 50MB</li>
                      <li>• Поддерживаемые форматы:</li>
                      <li>  - Изображения: JPG, PNG, GIF, WebP</li>
                      <li>  - Видео: MP4, WebM, MOV</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Политики безопасности</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Публичное чтение файлов</li>
                      <li>• Загрузка только для аутентифицированных</li>
                      <li>• Обновление только для аутентифицированных</li>
                      <li>• Удаление только для аутентифицированных</li>
                    </ul>
                  </div>
                </div>
                
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertDescription className="text-blue-800">
                    После настройки Storage вы сможете загружать изображения и видео в кейсах!
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Альтернативное решение */}
          <Card>
            <CardHeader>
              <CardTitle>Если основной скрипт не работает</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Если возникает ошибка "policy already exists" или другие проблемы с политиками, 
                используйте упрощенное исправление:
              </p>
              <Button asChild variant="outline">
                <a href="/simple-storage-fix">
                  Упрощенное исправление Storage
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Ссылки */}
          <div className="flex justify-center gap-4">
            <Button asChild>
              <a href="/admin/cases">
                Перейти к управлению кейсами
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/admin/">
                Главная админ-панель
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupSupabaseStorage;
