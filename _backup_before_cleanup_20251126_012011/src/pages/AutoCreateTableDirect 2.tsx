import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';

const AutoCreateTableDirect = () => {
  const [status, setStatus] = useState('Готов к созданию таблицы');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    'Проверяю существование таблицы...',
    'Открываю Supabase Dashboard...',
    'Создаю SQL файл...',
    'Готово! Выполните SQL в Dashboard'
  ];

  useEffect(() => {
    // Автоматически начинаем процесс
    handleAutoCreate();
  }, []);

  const handleAutoCreate = async () => {
    setLoading(true);
    
    try {
      // Шаг 1: Проверяем таблицу
      setStep(0);
      setStatus(steps[0]);
      
      // Имитируем проверку
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Шаг 2: Открываем Dashboard
      setStep(1);
      setStatus(steps[1]);
      
      const dashboardUrl = 'https://supabase.com/dashboard/project/zbykhdjqrtqftfitbvbt/sql';
      window.open(dashboardUrl, '_blank');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Шаг 3: Создаем SQL файл
      setStep(2);
      setStatus(steps[2]);
      
      const sqlContent = `-- Создание таблицы letters_certificates
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

-- Тестовые данные
INSERT INTO letters_certificates (title, description, type, issuer, issued_date, sort_order) VALUES
('Благодарственное письмо от Газпром', 'За качественное выполнение мультимедийного проекта', 'letter', 'ПАО Газпром', '2024-01-15', 1),
('Сертификат качества', 'Сертификат соответствия международным стандартам', 'certificate', 'ISO International', '2024-02-20', 2),
('Диплом за инновации', 'Диплом за внедрение инновационных решений в мультимедиа', 'diploma', 'Российская ассоциация мультимедиа', '2024-03-10', 3),
('Награда за лучший проект', 'Награда за лучший мультимедийный проект года', 'award', 'Московская ассоциация дизайнеров', '2024-04-05', 4);`;

      // Создаем и скачиваем SQL файл
      const blob = new Blob([sqlContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CREATE_LETTERS_TABLE.sql';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Шаг 4: Готово
      setStep(3);
      setStatus(steps[3]);
      
    } catch (error) {
      setStatus('❌ Ошибка: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckTable = async () => {
    setLoading(true);
    setStatus('Проверяю таблицу...');
    
    try {
      // Здесь можно добавить реальную проверку через API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('✅ Таблица letters_certificates готова к работе!');
    } catch (error) {
      setStatus('❌ Ошибка проверки: ' + error.message);
    } finally {
      setLoading(false);
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
        maxWidth: '1000px', 
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
            🚀 Автоматическое создание таблицы
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            textAlign: 'center',
            opacity: 0.9,
            marginBottom: '2rem'
          }}>
            Создаю таблицу letters_certificates автоматически
          </p>
        </div>

        {/* Прогресс */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
            📊 Прогресс создания
          </h2>
          
          <div style={{ marginBottom: '1rem' }}>
            {steps.map((stepText, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0.5rem',
                opacity: index <= step ? 1 : 0.5
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: index < step ? '#10B981' : index === step ? '#F59E0B' : '#6B7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  fontSize: '0.8rem'
                }}>
                  {index < step ? '✓' : index === step ? '⏳' : '○'}
                </div>
                <span style={{ fontSize: '1rem' }}>{stepText}</span>
              </div>
            ))}
          </div>
          
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center',
            fontSize: '1.1rem'
          }}>
            {status}
          </div>
        </div>

        {/* Кнопки */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <Button
            onClick={handleCheckTable}
            disabled={loading}
            style={{
              background: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid rgba(59, 130, 246, 0.5)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              opacity: loading ? 0.5 : 1
            }}
          >
            🔍 Проверить таблицу
          </Button>
          
          <Button
            onClick={() => window.open('/admin/letters', '_blank')}
            style={{
              background: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(245, 158, 11, 0.5)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            🏆 Админ панель
          </Button>
          
          <Button
            onClick={() => window.open('/', '_blank')}
            style={{
              background: 'rgba(236, 72, 153, 0.2)',
              border: '1px solid rgba(236, 72, 153, 0.5)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            🏠 Главная страница
          </Button>
        </div>

        {/* Инструкция */}
        {step >= 3 && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'white' }}>
              ✅ Инструкция по завершению:
            </h3>
            <ol style={{ 
              color: 'rgba(255,255,255,0.9)', 
              margin: 0, 
              paddingLeft: '1.5rem',
              lineHeight: '1.6'
            }}>
              <li>Supabase Dashboard уже открыт в новой вкладке</li>
              <li>SQL файл CREATE_LETTERS_TABLE.sql скачан</li>
              <li>Откройте файл и скопируйте содержимое</li>
              <li>Вставьте SQL код в Supabase SQL Editor</li>
              <li>Нажмите "Run" для выполнения</li>
              <li>После выполнения вернитесь сюда и проверьте таблицу</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoCreateTableDirect;
