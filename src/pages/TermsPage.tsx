import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, Shield, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Главная
            </Link>
            <span>/</span>
            <span className="text-slate-900">Условия использования</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Условия использования
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Пожалуйста, внимательно ознакомьтесь с условиями использования нашего сервиса
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-slate-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Последнее обновление: 1 января 2025
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="prose prose-slate max-w-none">
                
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-blue-600" />
                    1. Общие положения
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Настоящие Условия использования (далее — «Условия») регулируют отношения между 
                    пользователем (далее — «Пользователь») и компанией WESHOW (далее — «Компания») 
                    при использовании веб-сайта и предоставляемых услуг.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Используя наш сайт, вы соглашаетесь с данными условиями. Если вы не согласны 
                    с какими-либо положениями, пожалуйста, не используйте наш сервис.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-2 text-blue-600" />
                    2. Описание услуг
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    WESHOW предоставляет следующие услуги:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                    <li>Мультимедийные технологии и техническая интеграция</li>
                    <li>AV системы и проекционный маппинг</li>
                    <li>Организация корпоративных мероприятий</li>
                    <li>Аренда мультимедийного оборудования</li>
                    <li>Разработка интерактивных решений</li>
                    <li>Дизайн и брендинг</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    3. Права и обязанности пользователя
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Права пользователя:</h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-1">
                        <li>Получать качественные услуги в соответствии с договором</li>
                        <li>Получать консультации по вопросам использования услуг</li>
                        <li>Требовать соблюдения конфиденциальности персональных данных</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Обязанности пользователя:</h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-1">
                        <li>Предоставлять достоверную информацию</li>
                        <li>Соблюдать условия договора</li>
                        <li>Не использовать услуги в противоправных целях</li>
                        <li>Своевременно оплачивать предоставленные услуги</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    4. Интеллектуальная собственность
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Все материалы, размещенные на сайте, включая тексты, изображения, 
                    дизайн, логотипы, являются объектами интеллектуальной собственности 
                    компании WESHOW и защищены законодательством об авторском праве.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Использование материалов сайта без письменного разрешения запрещено.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    5. Ответственность
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Компания WESHOW не несет ответственности за:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                    <li>Временные технические сбои в работе сайта</li>
                    <li>Действия третьих лиц</li>
                    <li>Ущерб, причиненный неправильным использованием услуг</li>
                    <li>Невозможность использования услуг по техническим причинам</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    6. Изменение условий
                  </h2>
                  <p className="text-slate-700 leading-relaxed">
                    Компания оставляет за собой право изменять настоящие Условия в любое время. 
                    Изменения вступают в силу с момента их публикации на сайте. 
                    Продолжение использования услуг после внесения изменений означает 
                    согласие с новыми условиями.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    7. Контактная информация
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    По всем вопросам, связанным с настоящими Условиями, вы можете 
                    обращаться к нам:
                  </p>
                  <div className="bg-slate-50 rounded-lg p-6">
                    <p className="text-slate-700 mb-2">
                      <strong>Email:</strong> info@weshow.ru
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>Телефон:</strong> +7 (495) 123-45-67
                    </p>
                    <p className="text-slate-700">
                      <strong>Адрес:</strong> г. Москва, ул. Примерная, д. 123
                    </p>
                  </div>
                </section>

              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Связаться с нами
                <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;








