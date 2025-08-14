import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight, ExternalLink, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "WeShow запускает новый отдел AR/VR разработки",
      excerpt: "Компания расширяет свои возможности в области дополненной и виртуальной реальности, нанимая команду экспертов для создания инновационных решений.",
      category: "Компания",
      author: "Пресс-служба WeShow",
      date: "2024-01-20",
      readTime: "3 мин",
      image: "/public/placeholder.svg",
      tags: ["AR/VR", "развитие", "команда"],
      isFeatured: true
    },
    {
      id: 2,
      title: "Мы выиграли тендер на оснащение выставки 'Иннопром-2024'",
      excerpt: "WeShow стала официальным партнером крупнейшей промышленной выставки России, обеспечив техническое оснащение всех павильонов.",
      category: "Проекты",
      author: "Анна Соколова",
      date: "2024-01-18",
      readTime: "5 мин",
      image: "/public/placeholder.svg",
      tags: ["выставка", "тендер", "Иннопром"],
      isFeatured: false
    },
    {
      id: 3,
      title: "Новые технологии в мультимедийном оборудовании 2024",
      excerpt: "Обзор последних инноваций в области LED-технологий, проекционного оборудования и интерактивных решений.",
      category: "Технологии",
      author: "Дмитрий Козлов",
      date: "2024-01-15",
      readTime: "7 мин",
      image: "/public/placeholder.svg",
      tags: ["технологии", "оборудование", "инновации"],
      isFeatured: false
    },
    {
      id: 4,
      title: "Мы открыли представительство в Санкт-Петербурге",
      excerpt: "Расширяя географию присутствия, WeShow открывает офис в Северной столице для обслуживания клиентов Северо-Западного региона.",
      category: "Компания",
      author: "Пресс-служба WeShow",
      date: "2024-01-12",
      readTime: "4 мин",
      image: "/public/placeholder.svg",
      tags: ["расширение", "Санкт-Петербург", "регионы"],
      isFeatured: false
    },
    {
      id: 5,
      title: "Успешное завершение проекта для Samsung",
      excerpt: "Команда WeShow реализовала масштабный мультимедийный проект для Samsung, включающий 3D-маппинг и интерактивные инсталляции.",
      category: "Проекты",
      author: "Мария Сидорова",
      date: "2024-01-10",
      readTime: "6 мин",
      image: "/public/placeholder.svg",
      tags: ["Samsung", "3D-маппинг", "проект"],
      isFeatured: false
    },
    {
      id: 6,
      title: "Мы получили сертификат ISO 9001:2015",
      excerpt: "WeShow подтвердила соответствие международным стандартам качества, что гарантирует высокий уровень обслуживания клиентов.",
      category: "Компания",
      author: "Пресс-служба WeShow",
      date: "2024-01-08",
      readTime: "3 мин",
      image: "/public/placeholder.svg",
      tags: ["сертификация", "качество", "ISO"],
      isFeatured: false
    }
  ];

  const industryNews = [
    {
      title: "Рынок мультимедийных технологий вырос на 25% в 2023 году",
      source: "TechCrunch",
      date: "2024-01-19",
      url: "#"
    },
    {
      title: "Новые стандарты для LED-дисплеев в 2024",
      source: "Display Daily",
      date: "2024-01-17",
      url: "#"
    },
    {
      title: "AR/VR технологии в корпоративном секторе",
      source: "VentureBeat",
      date: "2024-01-15",
      url: "#"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const featuredNews = newsItems.find(item => item.isFeatured);
  const regularNews = newsItems.filter(item => !item.isFeatured);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-60"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-6">
                📰 Новости
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Новости компании и
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  индустрии
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Будьте в курсе последних событий, проектов и технологических достижений 
                WeShow и мультимедийной индустрии
              </p>
            </div>
          </div>
        </section>

        {/* Featured News */}
        {featuredNews && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Главная новость
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Самое важное событие недели, которое стоит вашего внимания
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 border border-slate-200/50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-200/50 to-purple-200/50 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-white text-2xl font-bold">WS</span>
                        </div>
                        <p className="text-slate-600 font-medium">WeShow News</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {featuredNews.category}
                      </Badge>
                      <div className="flex items-center space-x-2 text-sm text-slate-500">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(featuredNews.date)}</span>
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold text-slate-900 leading-tight">
                      {featuredNews.title}
                    </h3>

                    <p className="text-lg text-slate-600 leading-relaxed">
                      {featuredNews.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {featuredNews.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-600">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-2 text-sm text-slate-500">
                        <User className="h-4 w-4" />
                        <span>{featuredNews.author}</span>
                      </div>
                      <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Читать полностью
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Regular News */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Последние новости
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Все важные события и обновления компании
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularNews.map((news) => (
                <article key={news.id} className="bg-white rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  {/* Image */}
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-white text-xl font-bold">WS</span>
                        </div>
                        <p className="text-slate-600 font-medium">WeShow News</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category and Date */}
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-xs">
                        {news.category}
                      </Badge>
                      <div className="flex items-center space-x-2 text-xs text-slate-500">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(news.date)}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {news.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {news.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {news.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Author and Read More */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center space-x-2 text-sm text-slate-500">
                        <User className="h-4 w-4" />
                        <span>{news.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        Читать
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-16">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                Загрузить еще
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Industry News */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Новости индустрии
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Самые интересные события и тренды в мире мультимедийных технологий
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {industryNews.map((news, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-blue-700">Индустрия</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2">
                    {news.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <span>{news.source}</span>
                    <span>{formatDate(news.date)}</span>
                  </div>
                  
                  <a 
                    href={news.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Читать на {news.source}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Подпишитесь на новости
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Получайте уведомления о новых проектах, технологиях и событиях WeShow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="px-6 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 bg-white/20 text-white placeholder:text-white/70"
              />
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10">
                Подписаться
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default News;
