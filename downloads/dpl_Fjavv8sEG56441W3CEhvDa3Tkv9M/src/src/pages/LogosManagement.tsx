import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LogosManager from '../components/LogosManager';

const LogosManagement = React.memo(() => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Управление логотипами
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Добавляйте, редактируйте и упорядочивайте логотипы ваших партнеров и клиентов. 
              Используйте drag & drop для изменения порядка отображения.
            </p>
          </div>
          
          <LogosManager />
        </div>
      </main>
      <Footer />
    </div>
  );
});

export default LogosManagement;
