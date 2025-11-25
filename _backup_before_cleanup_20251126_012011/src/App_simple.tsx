import React from 'react';

const App = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 WESHOW - Полное приложение</h1>
      <p>Добро пожаловать на сайт WESHOW!</p>
      <p>Время загрузки: {new Date().toLocaleTimeString()}</p>
      <nav style={{ marginTop: '20px' }}>
        <a href="/" style={{ marginRight: '20px' }}>Главная</a>
        <a href="/services" style={{ marginRight: '20px' }}>Услуги</a>
        <a href="/portfolio" style={{ marginRight: '20px' }}>Портфолио</a>
        <a href="/contact">Контакты</a>
      </nav>
      <section style={{ marginTop: '30px' }}>
        <h2>Наши услуги</h2>
        <ul>
          <li>Мультимедийные решения</li>
          <li>3D-маппинг</li>
          <li>Интерактивные инсталляции</li>
          <li>Техническая поддержка</li>
        </ul>
      </section>
    </div>
  );
};

export default App;