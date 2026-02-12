import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, Mail, FileText, UserCheck, Globe, Clock, Users, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead
        title="Политика конфиденциальности — WESHOW"
        description="Политика конфиденциальности WESHOW: порядок обработки персональных данных в соответствии с Федеральным законом №152-ФЗ «О персональных данных»."
        url="https://weshow.su/privacy"
      />
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
              Политика в отношении обработки персональных данных в соответствии
              с Федеральным законом от 27.07.2006 №152-ФЗ «О персональных данных»
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-slate-500">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                Дата вступления в силу: 12 февраля 2026 г.
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="prose prose-slate max-w-none">

                {/* 1. Общие положения */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-green-600" />
                    1. Общие положения
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок
                    обработки и защиты персональных данных физических лиц (далее — «Субъекты персональных данных»),
                    которые используют сайт <strong>weshow.su</strong> (далее — «Сайт»), принадлежащий
                    компании WESHOW (далее — «Оператор»).
                  </p>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Политика разработана в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ
                    «О персональных данных» и иными нормативными правовыми актами Российской Федерации
                    в области защиты персональных данных.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Используя Сайт и/или предоставляя свои персональные данные через формы обратной связи,
                    Субъект персональных данных даёт своё согласие на обработку данных в соответствии
                    с настоящей Политикой. Если вы не согласны с условиями Политики, вам следует
                    прекратить использование Сайта.
                  </p>
                </section>

                {/* 2. Сведения об Операторе */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-2 text-green-600" />
                    2. Сведения об Операторе
                  </h2>
                  <div className="bg-slate-50 rounded-lg p-6">
                    <p className="text-slate-700 mb-2">
                      <strong>Наименование:</strong> WESHOW
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>Адрес:</strong> г. Москва, ул. Рочдельская, 14А
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>Email:</strong>{' '}
                      <a href="mailto:info@weshow.su" className="text-blue-600 hover:underline">info@weshow.su</a>
                    </p>
                    <p className="text-slate-700">
                      <strong>Телефон:</strong>{' '}
                      <a href="tel:+74955807537" className="text-blue-600 hover:underline">+7 (495) 580-75-37</a>
                    </p>
                  </div>
                </section>

                {/* 3. Основные понятия */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <Lock className="w-6 h-6 mr-2 text-green-600" />
                    3. Основные понятия
                  </h2>
                  <ul className="list-disc list-inside text-slate-700 space-y-3">
                    <li>
                      <strong>Персональные данные</strong> — любая информация, относящаяся прямо
                      или косвенно к определённому или определяемому физическому лицу (субъекту
                      персональных данных).
                    </li>
                    <li>
                      <strong>Обработка персональных данных</strong> — любое действие (операция)
                      или совокупность действий, совершаемых с использованием средств автоматизации
                      или без них с персональными данными, включая сбор, запись, систематизацию,
                      накопление, хранение, уточнение (обновление, изменение), извлечение, использование,
                      передачу (распространение, предоставление, доступ), обезличивание, блокирование,
                      удаление, уничтожение.
                    </li>
                    <li>
                      <strong>Оператор</strong> — лицо, самостоятельно или совместно с другими лицами
                      организующее и/или осуществляющее обработку персональных данных, а также определяющее
                      цели обработки персональных данных.
                    </li>
                    <li>
                      <strong>Конфиденциальность персональных данных</strong> — обязательное для соблюдения
                      требование не допускать распространения персональных данных без согласия субъекта
                      или наличия иного законного основания.
                    </li>
                  </ul>
                </section>

                {/* 4. Какие данные мы собираем */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <Database className="w-6 h-6 mr-2 text-green-600" />
                    4. Перечень обрабатываемых персональных данных
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">
                        4.1. Данные, предоставляемые Субъектом добровольно:
                      </h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">
                        <li>Фамилия, имя, отчество</li>
                        <li>Адрес электронной почты (email)</li>
                        <li>Номер телефона</li>
                        <li>Название компании / организации</li>
                        <li>Содержание сообщений, отправленных через формы обратной связи</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">
                        4.2. Данные, собираемые автоматически при посещении Сайта:
                      </h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">
                        <li>IP-адрес</li>
                        <li>Тип и версия браузера</li>
                        <li>Тип и версия операционной системы</li>
                        <li>Разрешение экрана устройства</li>
                        <li>Источник перехода на Сайт (referrer)</li>
                        <li>Информация о посещённых страницах и совершённых действиях</li>
                        <li>Дата и время посещения</li>
                        <li>Данные файлов cookie и аналогичных технологий</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 5. Цели обработки */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    5. Цели обработки персональных данных
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Оператор обрабатывает персональные данные Субъекта для следующих целей:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                    <li>Обработка входящих запросов и заявок для консультирования и оказания услуг</li>
                    <li>Связь с Субъектом по вопросам предоставления услуг, включая телефонные звонки, электронную почту и мессенджеры</li>
                    <li>Подготовка и направление коммерческих предложений по запросу Субъекта</li>
                    <li>Заключение и исполнение договоров на оказание услуг</li>
                    <li>Направление информационных и маркетинговых рассылок (при наличии согласия Субъекта)</li>
                    <li>Улучшение качества Сайта и его содержимого, анализ пользовательского опыта</li>
                    <li>Выполнение обязательств, предусмотренных законодательством Российской Федерации</li>
                  </ul>
                </section>

                {/* 6. Правовые основания */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    6. Правовые основания обработки персональных данных
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Обработка персональных данных осуществляется на следующих правовых основаниях:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                    <li>Согласие Субъекта персональных данных (ст. 6, п. 1, пп. 1 ФЗ-152)</li>
                    <li>Исполнение договора, стороной которого является Субъект (ст. 6, п. 1, пп. 5 ФЗ-152)</li>
                    <li>Осуществление прав и законных интересов Оператора или третьих лиц (ст. 6, п. 1, пп. 7 ФЗ-152)</li>
                  </ul>
                </section>

                {/* 7. Передача третьим лицам */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    7. Передача персональных данных третьим лицам
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Оператор не продаёт, не обменивает и не передаёт персональные данные третьим лицам
                    без законного основания. Передача допускается в следующих случаях:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4 ml-4">
                    <li>С явного согласия Субъекта персональных данных</li>
                    <li>По требованию уполномоченных органов государственной власти РФ на основаниях и в порядке, установленных законодательством</li>
                    <li>Для исполнения обязательств Оператора перед Субъектом, включая привлечение подрядчиков и партнёров для оказания услуг</li>
                    <li>Для защиты прав и законных интересов Оператора в случаях, предусмотренных законодательством</li>
                  </ul>
                  <p className="text-slate-700 leading-relaxed">
                    При передаче данных третьим лицам Оператор обеспечивает их надлежащую защиту
                    и конфиденциальность путём заключения соответствующих соглашений.
                  </p>
                </section>

                {/* 8. Защита данных */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <Lock className="w-6 h-6 mr-2 text-green-600" />
                    8. Меры по защите персональных данных
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Оператор принимает необходимые и достаточные организационные и технические меры
                    для защиты персональных данных от неправомерного или случайного доступа, уничтожения,
                    изменения, блокирования, копирования, распространения, а также от иных неправомерных
                    действий с ними:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                    <li>Использование защищённого протокола передачи данных SSL/TLS (HTTPS)</li>
                    <li>Ограничение доступа к персональным данным строго определённым кругом лиц</li>
                    <li>Регулярное обновление и мониторинг систем безопасности</li>
                    <li>Хранение данных на защищённых серверах, расположенных на территории Российской Федерации</li>
                    <li>Инструктирование сотрудников, имеющих доступ к персональным данным</li>
                  </ul>
                </section>

                {/* 9. Права субъектов */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <UserCheck className="w-6 h-6 mr-2 text-green-600" />
                    9. Права Субъекта персональных данных
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    В соответствии с законодательством Российской Федерации Субъект персональных данных имеет право:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4 ml-4">
                    <li>Получать информацию, касающуюся обработки его персональных данных (ст. 14 ФЗ-152)</li>
                    <li>Требовать уточнения, блокирования или уничтожения данных, если они являются неполными, устаревшими, неточными, незаконно полученными или не являются необходимыми для заявленной цели обработки</li>
                    <li>Отозвать согласие на обработку персональных данных путём направления письменного заявления Оператору</li>
                    <li>Обжаловать действия или бездействие Оператора в уполномоченный орган по защите прав субъектов персональных данных (Роскомнадзор) или в судебном порядке</li>
                    <li>Отказаться от получения маркетинговых рассылок, перейдя по ссылке отписки в любом из полученных писем</li>
                  </ul>
                  <p className="text-slate-700 leading-relaxed">
                    Для реализации своих прав Субъект может обратиться к Оператору по электронной почте{' '}
                    <a href="mailto:info@weshow.su" className="text-blue-600 hover:underline">info@weshow.su</a>{' '}
                    или по адресу: г. Москва, ул. Рочдельская, 14А. Запрос будет рассмотрен в течение
                    30 (тридцати) дней с момента получения.
                  </p>
                </section>

                {/* 10. Файлы cookie */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-green-600" />
                    10. Файлы cookie и аналогичные технологии
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Сайт использует файлы cookie — небольшие текстовые файлы, которые сохраняются
                    на устройстве пользователя. Мы используем следующие виды cookie:
                  </p>
                  <div className="space-y-4 mb-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-1">Необходимые cookie</h4>
                      <p className="text-slate-600 text-sm">
                        Обеспечивают корректную работу Сайта. Без них Сайт не может функционировать надлежащим образом.
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-1">Аналитические cookie</h4>
                      <p className="text-slate-600 text-sm">
                        Помогают нам понять, как пользователи взаимодействуют с Сайтом, что позволяет
                        улучшать его работу и содержание. Могут использоваться сервисы веб-аналитики
                        (например, Яндекс.Метрика).
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-1">Маркетинговые cookie</h4>
                      <p className="text-slate-600 text-sm">
                        Используются для показа релевантной рекламы и оценки эффективности рекламных кампаний.
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Вы можете в любое время изменить настройки файлов cookie в вашем браузере,
                    включая блокировку или удаление cookie. Обращаем внимание, что отключение
                    cookie может повлиять на функциональность Сайта.
                  </p>
                </section>

                {/* 11. Сроки хранения */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-green-600" />
                    11. Сроки обработки и хранения персональных данных
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Персональные данные обрабатываются и хранятся Оператором в течение срока,
                    необходимого для достижения целей обработки, если иной срок не установлен
                    законодательством Российской Федерации.
                  </p>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Условием прекращения обработки персональных данных может являться:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                    <li>Достижение целей обработки персональных данных</li>
                    <li>Истечение срока действия согласия Субъекта</li>
                    <li>Отзыв согласия Субъектом персональных данных</li>
                    <li>Выявление неправомерной обработки персональных данных</li>
                    <li>Требование законодательства Российской Федерации</li>
                  </ul>
                </section>

                {/* 12. Трансграничная передача */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    12. Трансграничная передача персональных данных
                  </h2>
                  <p className="text-slate-700 leading-relaxed">
                    Оператор обеспечивает хранение персональных данных на территории Российской Федерации
                    в соответствии с требованиями ст. 18 ФЗ-152. Трансграничная передача персональных
                    данных на территории иностранных государств осуществляется только в случаях,
                    предусмотренных законодательством, и при условии обеспечения надлежащей защиты
                    прав субъектов персональных данных.
                  </p>
                </section>

                {/* 13. Данные несовершеннолетних */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2 text-green-600" />
                    13. Обработка данных несовершеннолетних
                  </h2>
                  <p className="text-slate-700 leading-relaxed">
                    Сайт не предназначен для использования лицами, не достигшими 18 лет.
                    Оператор намеренно не собирает персональные данные несовершеннолетних.
                    Если вам стало известно, что несовершеннолетний предоставил нам свои персональные
                    данные, просим незамедлительно связаться с нами по адресу{' '}
                    <a href="mailto:info@weshow.su" className="text-blue-600 hover:underline">info@weshow.su</a>.
                  </p>
                </section>

                {/* 14. Изменения в Политике */}
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    14. Изменения в Политике конфиденциальности
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Оператор вправе вносить изменения в настоящую Политику. Новая редакция Политики
                    вступает в силу с момента её размещения на Сайте по адресу{' '}
                    <a href="https://weshow.su/privacy" className="text-blue-600 hover:underline">weshow.su/privacy</a>,
                    если иное не предусмотрено новой редакцией.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Продолжение использования Сайта после внесения изменений означает ваше согласие
                    с новой редакцией Политики. Рекомендуем периодически проверять данную страницу
                    на предмет обновлений.
                  </p>
                </section>

                {/* 15. Контактная информация */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                    <Mail className="w-6 h-6 mr-2 text-green-600" />
                    15. Контактная информация
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    По всем вопросам, связанным с обработкой персональных данных, реализацией прав
                    Субъектов или положениями настоящей Политики, вы можете обратиться к Оператору:
                  </p>
                  <div className="bg-slate-50 rounded-lg p-6">
                    <p className="text-slate-700 mb-3">
                      <strong>Email:</strong>{' '}
                      <a href="mailto:info@weshow.su" className="text-blue-600 hover:underline">info@weshow.su</a>
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Телефон:</strong>{' '}
                      <a href="tel:+74955807537" className="text-blue-600 hover:underline">+7 (495) 580-75-37</a>
                    </p>
                    <p className="text-slate-700">
                      <strong>Почтовый адрес:</strong> г. Москва, ул. Рочдельская, 14А
                    </p>
                  </div>
                </section>

                {/* Дополнительная информация */}
                <section className="border-t border-slate-200 pt-8 mt-8">
                  <p className="text-slate-500 text-sm text-center">
                    Уполномоченным органом по защите прав субъектов персональных данных является
                    Федеральная служба по надзору в сфере связи, информационных технологий и массовых
                    коммуникаций (Роскомнадзор){' '}
                    <a
                      href="https://rkn.gov.ru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      rkn.gov.ru
                    </a>
                  </p>
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
