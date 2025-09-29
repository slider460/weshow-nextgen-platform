import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 WESHOW - Полное приложение с роутингом</h1>
      <p>Добро пожаловать на сайт WESHOW!</p>
      <p>Время загрузки: {new Date().toLocaleTimeString()}</p>
      
      <nav style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <a href="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Главная</a>
        <a href="/services" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Услуги</a>
        <a href="/portfolio" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Портфолио</a>
        <a href="/contact" style={{ textDecoration: 'none', color: '#333' }}>Контакты</a>
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

const ServicesPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Услуги WESHOW</h1>
      <p>Мы предлагаем широкий спектр мультимедийных решений</p>
      
      <nav style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <a href="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Главная</a>
        <a href="/services" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Услуги</a>
        <a href="/portfolio" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Портфолио</a>
        <a href="/contact" style={{ textDecoration: 'none', color: '#333' }}>Контакты</a>
      </nav>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Наши услуги включают:</h2>
        <ul>
          <li>Проекционный маппинг</li>
          <li>Интерактивные дисплеи</li>
          <li>AR/VR решения</li>
          <li>Техническое оснащение мероприятий</li>
        </ul>
      </div>
    </div>
  );
};

const PortfolioPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Портфолио WESHOW</h1>
      <p>Наши лучшие проекты</p>
      
      <nav style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <a href="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Главная</a>
        <a href="/services" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Услуги</a>
        <a href="/portfolio" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Портфолио</a>
        <a href="/contact" style={{ textDecoration: 'none', color: '#333' }}>Контакты</a>
      </nav>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Примеры наших работ:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h3>Проект 1</h3>
            <p>3D-маппинг для корпоративного мероприятия</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h3>Проект 2</h3>
            <p>Интерактивная инсталляция для выставки</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h3>Проект 3</h3>
            <p>AR-приложение для торгового центра</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Контакты WESHOW</h1>
      <p>Свяжитесь с нами для обсуждения вашего проекта</p>
      
      <nav style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <a href="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Главная</a>
        <a href="/services" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Услуги</a>
        <a href="/portfolio" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Портфолио</a>
        <a href="/contact" style={{ textDecoration: 'none', color: '#333' }}>Контакты</a>
      </nav>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Как с нами связаться:</h2>
        <div style={{ marginTop: '20px' }}>
          <p><strong>Телефон:</strong> +7 (495) 123-45-67</p>
          <p><strong>Email:</strong> info@weshow.ru</p>
          <p><strong>Адрес:</strong> Москва, ул. Примерная, д. 123</p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


