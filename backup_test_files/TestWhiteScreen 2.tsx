import React from 'react';

const TestWhiteScreen: React.FC = () => {
  console.log('TestWhiteScreen component is rendering');
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333' }}>Тест белого экрана</h1>
      <p>Если вы видите этот текст, то React работает!</p>
      <div style={{ 
        backgroundColor: '#4F46E5', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        ✅ Компонент загружен успешно
      </div>
    </div>
  );
};

export default TestWhiteScreen;
