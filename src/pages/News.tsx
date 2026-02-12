import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Tag, 
  Eye, 
  Share2, 
  Bookmark,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  ArrowRight,
  Clock,
  MapPin
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const News = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddNews, setShowAddNews] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsForm, setNewsForm] = useState({
    title: "",
    content: "",
    category: "",
    author: "",
    image: "",
    tags: ""
  });

  // Новости (в реальном проекте будут загружаться с сервера)
  const [news, setNews] = useState([
    {
      id: 1,
      title: "WESHOW запускает новую платформу мультимедийных решений",
      content: "Мы рады представить нашу новую платформу, которая объединяет все наши услуги в единую экосистему. Платформа включает в себя интерактивные дисплеи, AR/VR решения, 3D маппинг и многое другое.",
      excerpt: "Новая платформа объединяет все услуги WESHOW в единую экосистему с интерактивными дисплеями, AR/VR решениями и 3D маппингом...",
      category: "Технологии",
      author: "Команда WESHOW",
      date: "2024-01-15",
      image: "/src/assets/hero-bg.jpg",
      tags: ["платформа", "мультимедиа", "инновации"],
      views: 1247,
      featured: true
    },
    {
      id: 2,
      title: "Успешный запуск проекта для ВДНХ",
      content: "Наша команда успешно реализовала масштабный проект для ВДНХ, создав интерактивную экспозицию с использованием передовых технологий. Проект получил высокую оценку от руководства выставки.",
      excerpt: "Масштабный проект для ВДНХ с интерактивной экспозицией и передовыми технологиями получил высокую оценку...",
      category: "Проекты",
      author: "Александр Петров",
      date: "2024-01-10",
      image: "/src/assets/office-building.jpg",
      tags: ["ВДНХ", "интерактив", "экспозиция"],
      views: 892,
      featured: false
    },
    {
      id: 3,
      title: "WESHOW расширяет команду разработчиков",
      content: "В связи с ростом проектов мы ищем талантливых разработчиков для нашей команды. Мы предлагаем интересные задачи, современные технологии и отличные условия для профессионального роста.",
      excerpt: "WESHOW расширяет команду разработчиков, предлагая интересные задачи и отличные условия для роста...",
      category: "Карьера",
      author: "HR отдел",
      date: "2024-01-08",
      image: "/src/assets/team-work.jpg",
      tags: ["карьера", "разработка", "команда"],
      views: 567,
      featured: false
    },
    {
      id: 4,
      title: "Новые технологии в 3D маппинге",
      content: "Мы внедрили новейшие технологии в области 3D маппинга, что позволяет создавать еще более впечатляющие визуальные эффекты. Наши клиенты теперь могут получить уникальные проекции на любых поверхностях.",
      excerpt: "Внедрение новейших технологий 3D маппинга для создания впечатляющих визуальных эффектов на любых поверхностях...",
      category: "Технологии",
      author: "Техническая команда",
      date: "2024-01-05",
      image: "/src/assets/hero-bg.jpg",
      tags: ["3D маппинг", "визуальные эффекты", "технологии"],
      views: 743,
      featured: false
    },
    {
      id: 5,
      title: "WESHOW на международной выставке",
      content: "Наша компания приняла участие в международной выставке мультимедийных технологий, где представила свои инновационные решения. Мы получили множество положительных отзывов и новых партнерств.",
      excerpt: "Участие в международной выставке мультимедийных технологий с представлением инновационных решений...",
      category: "События",
      author: "Маркетинг команда",
      date: "2024-01-03",
      image: "/src/assets/office-building.jpg",
      tags: ["выставка", "международная", "партнерства"],
      views: 456,
      featured: false
    }
  ]);

  const categories = [
    { value: "all", label: "Все категории" },
    { value: "technologies", label: "Технологии" },
    { value: "projects", label: "Проекты" },
    { value: "career", label: "Карьера" },
    { value: "events", label: "События" },
    { value: "company", label: "Компания" }
  ];

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add new news
    const newNews = {
      id: news.length + 1,
      title: newsForm.title,
      content: newsForm.content,
      excerpt: newsForm.content.substring(0, 150) + "...",
      category: newsForm.category,
      author: newsForm.author,
      date: new Date().toISOString().split('T')[0],
      image: newsForm.image || "/src/assets/hero-bg.jpg",
      tags: newsForm.tags.split(',').map(tag => tag.trim()),
      views: 0,
      featured: false
    };
    
    setNews([newNews, ...news]);
    
    toast({
      title: "Новость добавлена!",
      description: "Ваша новость успешно опубликована"
    });
    
    setNewsForm({
      title: "", content: "", category: "", author: "", image: "", tags: ""
    });
    setShowAddNews(false);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setNewsForm(prev => ({ ...prev, [field]: value }));
  };

  const deleteNews = (id: number) => {
    setNews(news.filter(item => item.id !== id));
    toast({
      title: "Новость удалена",
      description: "Новость была успешно удалена"
    });
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || 
                           item.category.toLowerCase() === selectedCategory.toLowerCase();
    
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
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 border border-purple-200 text-sm font-medium text-purple-700 mb-6">
              📰 Новости WESHOW
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Будьте в курсе
              <span className="text-gradient bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                наших событий
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              Узнавайте первыми о новых проектах, технологиях и достижениях команды WESHOW. 
              Мы делимся всем, что происходит в мире мультимедийных инноваций.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={() => setShowAddNews(true)}
              >
                <Plus className="mr-2 h-5 w-5" />
                Добавить новость
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg"
                onClick={() => document.getElementById('news-grid')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Читать новости
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Поиск по новостям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-80"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-slate-600">
              Найдено: {filteredNews.length} новостей
            </div>
          </div>
        </div>
      </section>

      {/* Add News Modal */}
      {showAddNews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Добавить новость</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddNews(false)}
              >
                ✕
              </Button>
            </div>
            
            <form onSubmit={handleNewsSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Заголовок *</Label>
                <Input
                  id="title"
                  required
                  value={newsForm.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="mt-2"
                  placeholder="Введите заголовок новости"
                />
              </div>
              
              <div>
                <Label htmlFor="content">Содержание *</Label>
                <Textarea
                  id="content"
                  required
                  rows={6}
                  value={newsForm.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  className="mt-2"
                  placeholder="Напишите содержание новости"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Категория *</Label>
                  <Select value={newsForm.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Технологии">Технологии</SelectItem>
                      <SelectItem value="Проекты">Проекты</SelectItem>
                      <SelectItem value="Карьера">Карьера</SelectItem>
                      <SelectItem value="События">События</SelectItem>
                      <SelectItem value="Компания">Компания</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="author">Автор *</Label>
                  <Input
                    id="author"
                    required
                    value={newsForm.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    className="mt-2"
                    placeholder="Имя автора"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image">URL изображения</Label>
                  <Input
                    id="image"
                    type="url"
                    value={newsForm.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    className="mt-2"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tags">Теги</Label>
                  <Input
                    id="tags"
                    value={newsForm.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    className="mt-2"
                    placeholder="тег1, тег2, тег3"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Публикация...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Опубликовать
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddNews(false)}
                >
                  Отмена
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* News Grid Section */}
      <section id="news-grid" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {item.featured && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600">
                      Главная
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="h-8 w-8 p-0"
                        onClick={() => deleteNews(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{item.category}</Badge>
                    <span className="text-sm text-slate-500">•</span>
                    <span className="text-sm text-slate-500">{formatDate(item.date)}</span>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-purple-600 transition-colors duration-300">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {item.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {item.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {item.views}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Сохранить
                    </Button>
                    <Button className="flex-1" variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Поделиться
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredNews.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                Новости не найдены
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
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Подпишитесь на новости
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Получайте уведомления о новых статьях, проектах и событиях WESHOW
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Ваш email"
                className="flex-1"
              />
              <Button>
                Подписаться
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;
