import Header from "../components/Header";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-12 text-center">
              Условия использования
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Принятие условий</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Используя сайт WESHOW, вы соглашаетесь с настоящими условиями использования.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Использование сайта</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Сайт предназначен для:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2">
                    <li>Ознакомления с услугами компании</li>
                    <li>Отправки заявок на сотрудничество</li>
                    <li>Получения информации о проектах</li>
                    <li>Связи с представителями компании</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Ограничения</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Запрещается:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2">
                    <li>Использование сайта в незаконных целях</li>
                    <li>Попытки несанкционированного доступа</li>
                    <li>Распространение вредоносного ПО</li>
                    <li>Нарушение работы сайта</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Интеллектуальная собственность</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Все материалы сайта защищены авторским правом и являются собственностью компании WESHOW или её партнёров.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Изменения условий</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Компания оставляет за собой право изменять настоящие условия без предварительного уведомления.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Контакты</h2>
                  <p className="text-slate-600 leading-relaxed">
                    По вопросам условий использования обращайтесь по адресу: info@weshow.ru
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

export default Terms;