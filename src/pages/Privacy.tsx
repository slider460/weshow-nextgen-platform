import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-12 text-center">
              Политика конфиденциальности
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Общие положения</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Настоящая Политика конфиденциальности определяет порядок обработки персональных данных пользователей сайта WESHOW.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Сбор информации</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Мы собираем следующие типы информации:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2">
                    <li>Контактные данные (имя, email, телефон)</li>
                    <li>Информация о компании</li>
                    <li>Данные о проектах и требованиях</li>
                    <li>Техническая информация о посещении сайта</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Использование информации</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Собранная информация используется для:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2">
                    <li>Связи с клиентами и обработки заявок</li>
                    <li>Предоставления услуг и поддержки</li>
                    <li>Улучшения качества сервиса</li>
                    <li>Отправки информационных материалов</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Защита данных</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Мы применяем современные технические и организационные меры для защиты персональных данных от несанкционированного доступа, изменения или уничтожения.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Контакты</h2>
                  <p className="text-slate-600 leading-relaxed">
                    По вопросам обработки персональных данных обращайтесь по адресу: info@weshow.ru
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;