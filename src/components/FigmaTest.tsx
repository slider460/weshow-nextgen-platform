import React from 'react';

const FigmaTest = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '2rem',
          color: '#1e293b'
        }}>
          🎨 Figma Test - Простая версия
        </h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {/* Карточка 1 */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '1.5rem',
            padding: '2rem',
            color: 'white',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              КОМПЛЕКСНАЯ АРЕНДА
            </h3>
            <p style={{ opacity: 0.9, marginBottom: '1rem' }}>
              Цена аренды включает доставку, монтаж и сопровождение
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              display: 'inline-block',
              fontSize: '0.875rem'
            }}>
              Подробнее →
            </div>
          </div>

          {/* Карточка 2 */}
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '1.5rem',
            padding: '2rem',
            color: 'white',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              SHOW<br />REEL
            </h3>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}>
              ▶️
            </div>
          </div>

          {/* Карточка 3 */}
          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '1.5rem',
            padding: '2rem',
            color: 'white',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              ВДНХ
            </h3>
            <p style={{ opacity: 0.9, marginBottom: '1rem' }}>
              стенд Самарской области<br />
              на выставке-форуме<br />
              «Россия»
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              display: 'inline-block',
              fontSize: '0.875rem'
            }}>
              посмотреть →
            </div>
          </div>
        </div>

        <div style={{ 
          marginTop: '3rem', 
          textAlign: 'center',
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b' }}>
            Статус: Работает! ✅
          </h2>
          <p style={{ color: '#64748b' }}>
            Если вы видите эту страницу, значит компонент загружается корректно
          </p>
        </div>
      </div>
    </div>
  );
};

export default FigmaTest;



