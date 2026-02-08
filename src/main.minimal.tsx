// Минимальная версия для диагностики
import React from 'react'
import { createRoot } from 'react-dom/client'

const MinimalApp = () => {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', fontSize: '32px' }}>Минимальный тест</h1>
      <p style={{ color: '#666', fontSize: '18px' }}>
        Если вы видите это, React работает!
      </p>
      <p style={{ color: '#999', fontSize: '14px', marginTop: '20px' }}>
        Время загрузки: {new Date().toLocaleTimeString()}
      </p>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(<MinimalApp />)
} else {
  console.error('Root element not found!')
}










