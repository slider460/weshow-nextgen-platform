import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ContentAdaptation = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-center mb-8">Адаптация контента</h1>
          <p className="text-center text-slate-600">Страница в разработке</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContentAdaptation;
