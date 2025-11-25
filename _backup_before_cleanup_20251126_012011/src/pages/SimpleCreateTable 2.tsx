import { useState } from 'react';
import { Button } from '../components/ui/button';

const SimpleCreateTable = () => {
  const [status, setStatus] = useState('Готов к созданию таблицы');
  const [loading, setLoading] = useState(false);

  const handleCreateTable = async () => {
    setLoading(true);
    setStatus('Создаю таблицу...');
    
    try {
      // Открываем Supabase Dashboard в новой вкладке
      window.open('https://supabase.com/dashboard/project/zbykhdjqrtqftfitbvbt/sql', '_blank');
      
      setStatus('✅ Открыт Supabase Dashboard. Скопируйте SQL код ниже и выполните его.');
    } catch (error) {
      setStatus('❌ Ошибка при открытии Dashboard');
    } finally {
      setLoading(false);
    }
  };

  const sqlCode = `-- Создание таблицы letters_certificates
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
            🚀 Создание таблицы letters_certificates
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            textAlign: 'center',
            opacity: 0.9,
            marginBottom: '2rem'
          }}>
            Простое создание таблицы через Supabase Dashboard
          </p>
        </div>

        {/* Статус */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📊 Статус</h2>
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '1rem',
            borderRadius: '0.5rem',
            fontSize: '1.1rem'
          }}>
            {status}
          </div>
        </div>

        {/* Кнопка создания */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <Button
            onClick={handleCreateTable}
            disabled={loading}
            style={{
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid rgba(34, 197, 94, 0.5)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1.2rem',
              fontWeight: '500',
              opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? '⏳ Открываю...' : '🚀 Открыть Supabase Dashboard'}
          </Button>
        </div>

        {/* SQL код */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'white' }}>
            📋 SQL код для выполнения в Supabase Dashboard:
          </h3>
          <pre style={{
            background: 'rgba(0,0,0,0.5)',
            padding: '1rem',
            borderRadius: '0.5rem',
            overflow: 'auto',
            fontSize: '0.9rem',
            lineHeight: '1.4',
            color: '#e2e8f0',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {sqlCode}
          </pre>
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '0.5rem',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              💡 <strong>Инструкция:</strong> Скопируйте SQL код выше, откройте Supabase Dashboard, 
              перейдите в раздел SQL Editor и выполните код. После этого вернитесь сюда и проверьте результат.
            </p>
          </div>
        </div>

        {/* Ссылки */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Button
            onClick={() => window.open('/test-letters-table', '_blank')}
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
            🧪 Проверить таблицу
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
              fontWeight: '500',
              textDecoration: 'none'
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
              fontWeight: '500',
              textDecoration: 'none'
            }}
          >
            🏠 Главная страница
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SimpleCreateTable;
