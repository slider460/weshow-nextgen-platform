import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Тестовая страница: шапка с контактами (email, телефон, адрес).
 * Маршрут: /test-header
 */
const TestHeaderPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Тестовая страница
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            Шапка с контактами: email, телефон и адрес в правой части (вместо кнопки «Получить консультацию»).
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestHeaderPage;
