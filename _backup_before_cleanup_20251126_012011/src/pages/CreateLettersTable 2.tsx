import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const CreateLettersTable = () => {
  const [copied, setCopied] = useState(false);

  const sqlCode = `-- Создание таблицы letters_certificates
CREATE TABLE letters_certificates (
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

-- Создание индексов
CREATE INDEX idx_letters_certificates_type ON letters_certificates(type);
CREATE INDEX idx_letters_certificates_visible ON letters_certificates(is_visible);
CREATE INDEX idx_letters_certificates_sort ON letters_certificates(sort_order);

-- Включение RLS
ALTER TABLE letters_certificates ENABLE ROW LEVEL SECURITY;

-- Политики безопасности
CREATE POLICY "Anyone can view visible letters and certificates" ON letters_certificates
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Admins can manage letters and certificates" ON letters_certificates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Функция обновления
CREATE OR REPLACE FUNCTION update_letters_certificates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер
CREATE TRIGGER update_letters_certificates_updated_at
  BEFORE UPDATE ON letters_certificates
  FOR EACH ROW
  EXECUTE FUNCTION update_letters_certificates_updated_at();

-- Тестовые данные
INSERT INTO letters_certificates (title, description, type, issuer, issued_date, sort_order) VALUES
('Благодарственное письмо от Газпром', 'За качественное выполнение мультимедийного проекта', 'letter', 'ПАО Газпром', '2024-01-15', 1),
('Сертификат качества', 'Сертификат соответствия международным стандартам', 'certificate', 'ISO International', '2024-02-20', 2),
('Диплом за инновации', 'Диплом за внедрение инновационных решений в мультимедиа', 'diploma', 'Российская ассоциация мультимедиа', '2024-03-10', 3),
('Награда за лучший проект', 'Награда за лучший мультимедийный проект года', 'award', 'Московская ассоциация дизайнеров', '2024-04-05', 4);`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sqlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Ошибка при копировании:', err);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      color: 'white'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            🗄️ Создание таблицы letters_certificates
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            textAlign: 'center',
            opacity: 0.9,
            marginBottom: '2rem'
          }}>
            Выполните следующие шаги для создания таблицы в Supabase
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Инструкции */}
          <Card style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <CardHeader>
              <CardTitle style={{ color: 'white', fontSize: '1.5rem' }}>
                📋 Пошаговая инструкция
              </CardTitle>
              <CardDescription style={{ color: 'rgba(255,255,255,0.8)' }}>
                Следуйте этим шагам для создания таблицы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol style={{ 
                listStyle: 'decimal', 
                paddingLeft: '1.5rem',
                lineHeight: '1.8',
                color: 'white'
              }}>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Откройте Supabase Dashboard</strong>
                  <br />
                  <a 
                    href="https://supabase.com/dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#60a5fa', textDecoration: 'underline' }}
                  >
                    https://supabase.com/dashboard
                  </a>
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Выберите проект</strong>
                  <br />
                  <code style={{ background: 'rgba(0,0,0,0.3)', padding: '0.2rem 0.5rem', borderRadius: '0.3rem' }}>
                    zbykhdjqrtqftfitbvbt
                  </code>
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Перейдите в SQL Editor</strong>
                  <br />
                  В левом меню найдите "SQL Editor"
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Скопируйте SQL код</strong>
                  <br />
                  Нажмите кнопку "Копировать SQL" справа
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Выполните SQL</strong>
                  <br />
                  Вставьте код в редактор и нажмите "Run"
                </li>
                <li>
                  <strong>Проверьте результат</strong>
                  <br />
                  Перейдите на страницу тестирования
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* SQL код */}
          <Card style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardTitle style={{ color: 'white', fontSize: '1.5rem' }}>
                  💻 SQL код
                </CardTitle>
                <Button 
                  onClick={copyToClipboard}
                  style={{
                    background: copied ? '#10b981' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  {copied ? '✅ Скопировано!' : '📋 Копировать SQL'}
                </Button>
              </div>
              <CardDescription style={{ color: 'rgba(255,255,255,0.8)' }}>
                Скопируйте и выполните этот код в Supabase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '1rem',
                borderRadius: '0.5rem',
                overflow: 'auto',
                fontSize: '0.8rem',
                lineHeight: '1.4',
                color: '#e2e8f0',
                maxHeight: '400px'
              }}>
                {sqlCode}
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Кнопки действий */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          marginTop: '2rem'
        }}>
          <Button
            onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              textDecoration: 'none'
            }}
          >
            🚀 Открыть Supabase Dashboard
          </Button>
          
          <Button
            onClick={() => window.open('/test-letters-table', '_blank')}
            style={{
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid rgba(34, 197, 94, 0.5)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              textDecoration: 'none'
            }}
          >
            🧪 Тестировать подключение
          </Button>
          
          <Button
            onClick={() => window.open('/admin/letters', '_blank')}
            style={{
              background: 'rgba(168, 85, 247, 0.2)',
              border: '1px solid rgba(168, 85, 247, 0.5)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              textDecoration: 'none'
            }}
          >
            🏆 Админ панель
          </Button>
        </div>

        {/* Статус */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'white' }}>
            📊 После создания таблицы
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>
            Блок "Благодарственные письма и грамоты" появится на главной странице, 
            а в админ панели будет доступно управление документами
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateLettersTable;
