import React from 'react';

const AppSimple = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1>Простое приложение работает!</h1>
      <p>Если вы видите это, React работает корректно.</p>
      <a href="/test-minimal">Тест минимальный</a>
    </div>
  );
};

export default AppSimple;