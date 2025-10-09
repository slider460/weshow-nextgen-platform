import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Простая тестовая страница
const TestPage = () => (
  <div style={{ padding: '20px' }}>
    <h1>Тестовая страница</h1>
    <p>Если вы видите эту страницу, значит JavaScript работает!</p>
    <a href="/">Главная</a> | <a href="/test">Тест</a>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TestPage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;




