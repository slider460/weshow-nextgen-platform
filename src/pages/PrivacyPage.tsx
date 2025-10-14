import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, Mail } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPage: React.FC = () => {
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
            <span className="text-slate-900">Политика конфиденциальности</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Политика конфиденциальности
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Мы серьезно относимся к защите ваших персональных данных и соблюдаем 
              все требования законодательства о конфиденциальности
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-slate-500">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
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
                    <Lock className="w-6 h-6 mr-2 text-green-600" />
                    1. Общие положения
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок 
                    обработки персональных данных пользователей сайта WESHOW (далее — «Сайт») 
                    и описывает, как мы собираем, используем, храним и защищаем вашу информацию.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Используя наш сайт, вы соглашаетесь с условиями данной Политики. 
                    Если вы не согласны с какими-либо положениями, пожалуйста, 
                    не используйте наш сервис.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <Database className="w-6 h-6 mr-2 text-green-600" />
                    2. Какие данные мы собираем
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Персональные данные:</h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-1">
                        <li>Имя и фамилия</li>
                        <li>Адрес электронной почты</li>
                        <li>Номер телефона</li>
                        <li>Название компании</li>
                        <li>Адрес доставки (при необходимости)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Технические данные:</h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-1">
                        <li>IP-адрес</li>
                        <li>Тип браузера и операционной системы</li>
                        <li>Страницы, которые вы посещаете</li>
                        <li>Время и дата посещения</li>
                        <li>Источник перехода на сайт</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    3. Как мы используем ваши данные
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Мы используем собранные данные для следующих целей:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                    <li>Предоставления запрошенных услуг</li>
                    <li>Обработки заказов и платежей</li>
                    <li>Связи с вами по вопросам заказов</li>
                    <li>Улучшения качества наших услуг</li>
                    <li>Отправки маркетинговых материалов (с вашего согласия)</li>
                    <li>Соблюдения правовых требований</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    4. Передача данных третьим лицам
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Мы не продаем, не обмениваем и не передаем ваши персональные данные 
                    третьим лицам без вашего согласия, за исключением следующих случаев:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                    <li>Когда это необходимо для выполнения вашего заказа</li>
                    <li>Когда это требуется по закону</li>
                    <li>Для защиты наших прав и безопасности</li>
                    <li>С вашего явного согласия</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    5. Защита данных
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Мы применяем различные меры безопасности для защиты ваших персональных данных:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                    <li>Шифрование данных при передаче (SSL/TLS)</li>
                    <li>Регулярное обновление систем безопасности</li>
                    <li>Ограниченный доступ к персональным данным</li>
                    <li>Регулярное резервное копирование данных</li>
                    <li>Обучение сотрудников вопросам конфиденциальности</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    6. Ваши права
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    В соответствии с законодательством о защите персональных данных, 
                    вы имеете право:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                    <li>Получать информацию о том, какие данные мы о вас храним</li>
                    <li>Требовать исправления неточных данных</li>
                    <li>Требовать удаления ваших данных</li>
                    <li>Ограничить обработку ваших данных</li>
                    <li>Получать копию ваших данных в структурированном формате</li>
                    <li>Отозвать согласие на обработку данных</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    7. Cookies
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Наш сайт использует файлы cookie для улучшения пользовательского опыта. 
                    Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве 
                    и помогают нам анализировать использование сайта.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Вы можете настроить свой браузер для блокировки cookie, 
                    но это может повлиять на функциональность сайта.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    8. Изменения в Политике
                  </h2>
                  <p className="text-slate-700 leading-relaxed">
                    Мы можем обновлять данную Политику конфиденциальности время от времени. 
                    О любых изменениях мы будем уведомлять вас путем размещения новой версии 
                    на нашем сайте. Рекомендуем периодически проверять данную страницу.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <Mail className="w-6 h-6 mr-2 text-green-600" />
                    9. Контактная информация
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Если у вас есть вопросы по данной Политике конфиденциальности 
                    или вы хотите воспользоваться своими правами, свяжитесь с нами:
                  </p>
                  <div className="bg-slate-50 rounded-lg p-6">
                    <p className="text-slate-700 mb-2">
                      <strong>Email:</strong> privacy@weshow.ru
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
                className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
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

export default PrivacyPage;









