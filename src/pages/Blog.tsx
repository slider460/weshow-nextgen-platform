import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight, Search, Filter, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Все", count: 12 },
    { id: "multimedia", name: "Мультимедиа", count: 4 },
    { id: "technology", name: "Технологии", count: 3 },
    { id: "events", name: "Мероприятия", count: 3 },
    { id: "tips", name: "Советы", count: 2 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Тренды мультимедийных технологий 2024",
      excerpt: "Обзор самых перспективных технологий в области мультимедиа, которые изменят индустрию развлечений и бизнеса в 2024 году.",
      category: "technology",
      author: "Александр Петров",
      date: "2024-01-15",
      readTime: "5 мин",
      image: "/public/placeholder.svg",
      tags: ["технологии", "тренды", "мультимедиа"]
    },
    {
      id: 2,
      title: "Как создать впечатляющий 3D-маппинг",
      excerpt: "Пошаговое руководство по созданию захватывающих 3D-маппинг проекций для ваших мероприятий и презентаций.",
      category: "multimedia",
      author: "Мария Сидорова",
      date: "2024-01-12",
      readTime: "8 мин",
      image: "/public/placeholder.svg",
      tags: ["3D-маппинг", "визуализация", "мероприятия"]
    },
    {
      id: 3,
      title: "Интерактивные решения для выставок",
      excerpt: "Современные подходы к созданию интерактивных экспозиций, которые привлекают внимание и увеличивают вовлеченность посетителей.",
      category: "events",
      author: "Дмитрий Козлов",
      date: "2024-01-10",
      readTime: "6 мин",
      image: "/public/placeholder.svg",
      tags: ["выставки", "интерактив", "вовлеченность"]
    },
    {
      id: 4,
      title: "AR/VR в корпоративном обучении",
      excerpt: "Практические примеры использования дополненной и виртуальной реальности для повышения эффективности корпоративного обучения.",
      category: "technology",
      author: "Елена Волкова",
      date: "2024-01-08",
      readTime: "7 мин",
      image: "/public/placeholder.svg",
      tags: ["AR/VR", "обучение", "корпорации"]
    },
    {
      id: 5,
      title: "Планирование технического оснащения мероприятий",
      excerpt: "Ключевые аспекты планирования и реализации технического оснащения для мероприятий различного масштаба.",
      category: "tips",
      author: "Сергей Морозов",
      date: "2024-01-05",
      readTime: "10 мин",
      image: "/public/placeholder.svg",
      tags: ["планирование", "техника", "мероприятия"]
    },
    {
      id: 6,
      title: "LED-технологии: настоящее и будущее",
      excerpt: "Анализ современных LED-решений и прогнозы развития технологий для создания ярких визуальных эффектов.",
      category: "multimedia",
      author: "Анна Соколова",
      date: "2024-01-03",
      readTime: "6 мин",
      image: "/public/placeholder.svg",
      tags: ["LED", "технологии", "визуализация"]
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
                📚 Блог
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Полезные статьи и
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  экспертные мнения
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Делимся опытом, рассказываем о новых технологиях и даем практические советы 
                по созданию впечатляющих мультимедийных проектов
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Поиск по статьям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-50 border-slate-200 focus:bg-white"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="text-sm"
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2 bg-slate-100 text-slate-600">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Статьи не найдены
                </h3>
                <p className="text-slate-600 mb-6">
                  Попробуйте изменить параметры поиска или категорию
                </p>
                <Button onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}>
                  Сбросить фильтры
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="group bg-white rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                    {/* Image */}
                    <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-white text-xl font-bold">WS</span>
                          </div>
                          <p className="text-slate-600 font-medium">WeShow Blog</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category and Date */}
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="text-xs">
                          {categories.find(c => c.id === post.category)?.name}
                        </Badge>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Author and Read More */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center space-x-2 text-sm text-slate-500">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
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
            )}

            {/* Load More */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-16">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  Загрузить еще
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Подпишитесь на обновления
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Получайте уведомления о новых статьях, полезных советах и эксклюзивных материалах
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Ваш email"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
              />
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/20 bg-white/10">
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

export default Blog;
