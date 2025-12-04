import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Минимальная версия для диагностики
function TestApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Тестовая страница</h1>
            <p>Если вы видите это, значит базовая настройка работает</p>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default TestApp;






