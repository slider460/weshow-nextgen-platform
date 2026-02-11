import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const NotFound = () => {
  useEffect(() => {
    console.error('404: попытка перехода на несуществующий маршрут');
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <SEOHead
        title="Страница не найдена — WESHOW"
        description="Запрашиваемая страница не существует."
        url="https://weshow.su/404"
        noIndex
      />
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <p className="text-xl text-slate-600 mb-8">Страница не найдена</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          На главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
