import React, { useState } from 'react';

const CreateTableSimple: React.FC = () => {
  const [status, setStatus] = useState<string>('Готов к созданию таблицы');
  const [isCreating, setIsCreating] = useState(false);

  const sqlContent = `-- Простое создание таблицы letters_certificates
-- Выполните этот код в Supabase SQL Editor

-- 1. Создаем таблицу
CREATE TABLE IF NOT EXISTS letters_certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  document_url TEXT,
  type VARCHAR(50) NOT NULL CHECK (type IN ('letter', 'certificate', 'award', 'diploma')),
  issuer VARCHAR(255) NOT NULL,
  issued_date DATE,
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Включаем RLS
ALTER TABLE letters_certificates ENABLE ROW LEVEL SECURITY;

-- 3. Создаем политики безопасности
CREATE POLICY "Anyone can view visible letters and certificates" 
ON letters_certificates FOR SELECT 
USING (is_visible = true);

CREATE POLICY "Service role can manage letters and certificates" 
ON letters_certificates FOR ALL 
USING (true);

-- 4. Добавляем тестовые данные
INSERT INTO letters_certificates (title, description, type, issuer, issued_date, sort_order) VALUES
('Благодарственное письмо от Газпром', 'За качественное выполнение мультимедийного проекта', 'letter', 'ПАО Газпром', '2024-01-15', 1),
('Сертификат качества', 'Сертификат соответствия международным стандартам', 'certificate', 'ISO International', '2024-02-20', 2),
('Диплом за инновации', 'Диплом за внедрение инновационных решений в мультимедиа', 'diploma', 'Российская ассоциация мультимедиа', '2024-03-10', 3),
('Награда за лучший проект', 'Награда за лучший мультимедийный проект года', 'award', 'Московская ассоциация дизайнеров', '2024-04-05', 4);

-- 5. Создаем функцию для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Создаем триггер
DROP TRIGGER IF EXISTS update_letters_certificates_updated_at ON letters_certificates;
CREATE TRIGGER update_letters_certificates_updated_at
  BEFORE UPDATE ON letters_certificates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Готово! Таблица создана с тестовыми данными`;

  const openSupabaseSQL = () => {
    window.open('https://supabase.com/dashboard/project/zbykhdjqrtqftfitbvbt/sql', '_blank');
  };

  const downloadSQL = () => {
    const blob = new Blob([sqlContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CREATE_LETTERS_TABLE_SIMPLE.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlContent);
    setStatus('SQL скопирован в буфер обмена!');
    setTimeout(() => setStatus('Готов к созданию таблицы'), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">
            🚀 Быстрое создание таблицы letters_certificates
          </h1>
          
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">📋 Инструкция:</h2>
            <ol className="list-decimal list-inside space-y-2 text-blue-700">
              <li>Нажмите "Открыть Supabase SQL Editor"</li>
              <li>Скопируйте SQL код (кнопка "Копировать SQL")</li>
              <li>Вставьте код в SQL Editor</li>
              <li>Нажмите "Run" для выполнения</li>
              <li>Проверьте результат</li>
            </ol>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={openSupabaseSQL}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔗 Открыть Supabase SQL Editor
            </button>
            
            <button
              onClick={copyToClipboard}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              📋 Копировать SQL
            </button>
            
            <button
              onClick={downloadSQL}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              💾 Скачать SQL файл
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-3">SQL код для выполнения:</h3>
            <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{sqlContent}</code>
            </pre>
          </div>

          <div className="p-4 bg-slate-100 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Статус:</h3>
            <p className="text-slate-600">{status}</p>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Важно:</h3>
            <ul className="list-disc list-inside space-y-1 text-yellow-700">
              <li>Убедитесь, что вы находитесь в правильном проекте Supabase</li>
              <li>После выполнения SQL проверьте, что таблица создалась</li>
              <li>Если возникнут ошибки, проверьте права доступа</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTableSimple;
