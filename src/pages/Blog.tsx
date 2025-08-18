import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Search, Filter, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import NewsletterSubscription from "@/components/NewsletterSubscription";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import AnimatedButton from "@/components/AnimatedButton";

const Blog = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Анимации для разных секций
  const heroAnimation = useScrollAnimation({ delay: 200 });
  const searchAnimation = useScrollAnimation({ delay: 400 });
  const postsAnimation = useScrollAnimation({ delay: 600 });

  const categories = [
    { id: "all", name: t('blog.categories.all'), count: 15 },
    { id: "ai", name: t('blog.categories.ai'), count: 4 },
    { id: "xr", name: t('blog.categories.xr'), count: 3 },
    { id: "sustainability", name: t('blog.categories.sustainability'), count: 3 },
    { id: "design", name: t('blog.categories.design'), count: 3 },
    { id: "multimedia", name: "Мультимедиа", count: 2 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "AI в мультимедиа: Революция в создании контента 2024",
      excerpt: "Как искусственный интеллект трансформирует индустрию мультимедиа, от генерации контента до персонализации пользовательского опыта.",
      category: "ai",
      author: "Александр Народецкий",
      date: "2024-01-20",
      readTime: "10 мин",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      tags: ["AI", "мультимедиа", "генерация контента", "персонализация", "2024"],
      content: "Искусственный интеллект становится движущей силой в мультимедийной индустрии. Современные AI-алгоритмы способны создавать уникальный визуальный контент, генерировать музыку и даже писать сценарии. Особенно впечатляют возможности в области персонализации - AI анализирует поведение пользователей и адаптирует контент под их предпочтения в реальном времени. Это открывает новые горизонты для интерактивных мероприятий и иммерсивных проекций."
    },
    {
      id: 2,
      title: "Как создать впечатляющий 3D-маппинг: Пошаговое руководство",
      excerpt: "Пошаговое руководство по созданию захватывающих 3D-маппинг проекций для ваших мероприятий и презентаций. От концепции до реализации.",
      category: "multimedia",
      author: "Святослав Дементьев",
      date: "2024-01-12",
      readTime: "12 мин",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png",
      tags: ["3D-маппинг", "визуализация", "мероприятия", "проекции", "творчество"],
      content: "3D-маппинг - это искусство превращения обычных поверхностей в живые, динамичные произведения искусства. Процесс создания начинается с тщательного анализа архитектуры объекта, разработки концепции и создания 3D-моделей. Ключевым фактором успеха является точная калибровка проекторов и синхронизация с аудио-визуальным контентом. Современные технологии позволяют создавать проекции на зданиях, скульптурах и даже движущихся объектах."
    },
    {
      id: 3,
      title: "Интерактивные решения для выставок: Привлечение внимания посетителей",
      excerpt: "Современные подходы к созданию интерактивных экспозиций, которые привлекают внимание и увеличивают вовлеченность посетителей на 300%.",
      category: "events",
      author: "Эдвард Семенов",
      date: "2024-01-10",
      readTime: "10 мин",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      tags: ["выставки", "интерактив", "вовлеченность", "экспозиции", "технологии"],
      content: "В современном мире традиционные выставки уже не могут конкурировать с цифровыми развлечениями. Интерактивные решения включают в себя сенсорные экраны, голографические дисплеи, VR-зоны и интерактивные игры. Особенно эффективны решения на основе Kinect-технологий, позволяющие посетителям взаимодействовать с контентом без физического контакта. Это не только увеличивает время пребывания на выставке, но и создает незабываемые впечатления."
    },
    {
      id: 4,
      title: "AR/VR в корпоративном обучении: Практические примеры внедрения",
      excerpt: "Практические примеры использования дополненной и виртуальной реальности для повышения эффективности корпоративного обучения на 150%.",
      category: "technology",
      author: "Алексей Осотов",
      date: "2024-01-08",
      readTime: "15 мин",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png",
      tags: ["AR/VR", "обучение", "корпорации", "эффективность", "инновации"],
      content: "Внедрение AR/VR технологий в корпоративное обучение открывает новые горизонты для развития персонала. Сотрудники могут практиковаться в безопасной виртуальной среде, моделировать сложные ситуации и получать мгновенную обратную связь. Особенно эффективны VR-симуляторы для технических специалистов, позволяющие отрабатывать навыки работы с оборудованием без риска повреждения дорогостоящих устройств. AR-решения помогают в обучении новых сотрудников, предоставляя контекстную информацию прямо в поле зрения."
    },
    {
      id: 5,
      title: "Планирование технического оснащения мероприятий: Ключевые аспекты",
      excerpt: "Ключевые аспекты планирования и реализации технического оснащения для мероприятий различного масштаба. От малых встреч до международных форумов.",
      category: "tips",
      author: "Денис Муратов",
      date: "2024-01-05",
      readTime: "18 мин",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      tags: ["планирование", "техника", "мероприятия", "организация", "проектирование"],
      content: "Успешное проведение любого мероприятия зависит от тщательного планирования технического оснащения. Процесс начинается с анализа требований клиента, оценки площадки и разработки технического задания. Критически важно учитывать акустику помещения, освещение и возможности электроснабжения. Современные системы управления позволяют централизованно контролировать все технические процессы, обеспечивая бесперебойную работу оборудования на протяжении всего мероприятия."
    },
    {
      id: 6,
      title: "LED-технологии: Настоящее и будущее визуальных эффектов",
      excerpt: "Анализ современных LED-решений и прогнозы развития технологий для создания ярких визуальных эффектов. От пиксельных панелей до гибких экранов.",
      category: "multimedia",
      author: "Илона Агафонова",
      date: "2024-01-03",
      readTime: "11 мин",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png",
      tags: ["LED", "технологии", "визуализация", "экраны", "инновации"],
      content: "LED-технологии продолжают эволюционировать, предлагая все более впечатляющие возможности для создания визуальных эффектов. Современные LED-панели обеспечивают разрешение до 8K, яркость до 10,000 нит и контрастность 1,000,000:1. Особенно перспективны гибкие LED-экраны, которые можно изгибать и формировать в любые геометрические фигуры. Это открывает новые возможности для создания иммерсивных пространств и интерактивных инсталляций."
    },
    {
      id: 7,
      title: "Креативное управление проектами: Как создать незабываемые впечатления",
      excerpt: "Секреты успешного управления креативными проектами в сфере мультимедиа. От идеи до реализации с максимальным эмоциональным воздействием.",
      category: "management",
      author: "Ксения Иншакова",
      date: "2024-01-02",
      readTime: "14 мин",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      tags: ["управление", "креатив", "проекты", "эмоции", "впечатления"],
      content: "Креативное управление проектами требует особого подхода, сочетающего художественное видение с четкой организацией процессов. Ключ к успеху - это понимание эмоциональных потребностей аудитории и создание проектов, которые не просто технически совершенны, но и эмоционально захватывающи. Важно уметь балансировать между творческой свободой и техническими ограничениями, создавая решения, которые превосходят ожидания клиентов и оставляют незабываемые впечатления."
    },
    {
      id: 8,
      title: "Маркетинговые коммуникации в digital-эпоху: Стратегии развития бренда",
      excerpt: "Современные стратегии маркетинговых коммуникаций для технологических компаний. Как создать узнаваемый бренд в цифровом мире.",
      category: "marketing",
      author: "Мария Овсянникова",
      date: "2024-01-01",
      readTime: "16 мин",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png",
      tags: ["маркетинг", "коммуникации", "брендинг", "digital", "стратегия"],
      content: "В эпоху цифровых технологий маркетинговые коммуникации претерпевают кардинальные изменения. Современные бренды должны не только демонстрировать технические возможности, но и создавать эмоциональную связь с аудиторией. Ключевыми факторами успеха становятся прозрачность, интерактивность и персонализация. Особенно важно использовать технологии как инструмент для рассказа истории бренда, создавая уникальный пользовательский опыт, который запоминается и формирует лояльность."
    },
    {
      id: 9,
      title: "XR технологии в образовании: Создание иммерсивного опыта обучения",
      excerpt: "Как дополненная и виртуальная реальность революционизируют образовательный процесс, делая обучение более эффективным и увлекательным.",
      category: "xr",
      author: "Эдвард Семенов",
      date: "2024-01-18",
      readTime: "12 мин",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      tags: ["XR", "образование", "VR", "AR", "иммерсивность"],
      content: "XR технологии открывают новые возможности в образовании, позволяя студентам погружаться в виртуальные миры и взаимодействовать с 3D-объектами. Особенно эффективны VR-симуляторы для технических дисциплин, где студенты могут практиковаться в безопасной среде. AR-решения помогают визуализировать сложные концепции, делая абстрактные понятия более понятными и доступными."
    },
    {
      id: 10,
      title: "Устойчивое развитие в мультимедиа: Экологичные решения для будущего",
      excerpt: "Инновационные подходы к созданию экологически устойчивых мультимедийных проектов, снижающих углеродный след и продвигающих зеленые технологии.",
      category: "sustainability",
      author: "Илона Агафонова",
      date: "2024-01-16",
      readTime: "14 мин",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png",
      tags: ["устойчивость", "экология", "зеленые технологии", "энергоэффективность"],
      content: "Устойчивое развитие становится приоритетом в мультимедийной индустрии. Современные LED-экраны потребляют на 40% меньше энергии, а новые проекционные технологии позволяют создавать впечатляющие визуальные эффекты с минимальным воздействием на окружающую среду. Особенно важно использование возобновляемых источников энергии и перерабатываемых материалов в производстве оборудования."
    },
    {
      id: 11,
      title: "Дизайн-мышление в мультимедиа: Создание проектов, ориентированных на пользователя",
      excerpt: "Применение принципов дизайн-мышления для создания мультимедийных проектов, которые не только технически совершенны, но и интуитивно понятны пользователям.",
      category: "design",
      author: "Ксения Иншакова",
      date: "2024-01-14",
      readTime: "11 мин",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      tags: ["дизайн-мышление", "UX", "пользовательский опыт", "интерактивность"],
      content: "Дизайн-мышление в мультимедиа начинается с понимания потребностей пользователей. Каждый проект должен решать реальные проблемы и создавать положительный эмоциональный опыт. Ключевые принципы включают эмпатию, итеративность и тестирование с реальными пользователями. Это позволяет создавать интерактивные решения, которые интуитивно понятны и приятны в использовании."
    },
    {
      id: 12,
      title: "AI-аналитика в мультимедиа: Как данные улучшают пользовательский опыт",
      excerpt: "Использование искусственного интеллекта для анализа поведения пользователей и оптимизации мультимедийного контента в реальном времени.",
      category: "ai",
      author: "Алексей Осотов",
      date: "2024-01-12",
      readTime: "13 мин",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png",
      tags: ["AI", "аналитика", "данные", "персонализация", "оптимизация"],
      content: "AI-аналитика революционизирует мультимедийную индустрию, позволяя создавать персонализированный контент на основе поведения пользователей. Машинное обучение анализирует паттерны взаимодействия и адаптирует контент в реальном времени, повышая вовлеченность и удовлетворенность пользователей. Это особенно важно для интерактивных выставок и корпоративных презентаций."
    },
    {
      id: 13,
      title: "Квантовые вычисления и мультимедиа: Будущее обработки данных",
      excerpt: "Перспективы применения квантовых вычислений в мультимедийной индустрии для создания сверхсложных визуальных эффектов и симуляций.",
      category: "ai",
      author: "Денис Муратов",
      date: "2024-01-10",
      readTime: "15 мин",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      tags: ["квантовые вычисления", "AI", "симуляции", "визуальные эффекты", "будущее"],
      content: "Квантовые вычисления открывают новые горизонты для мультимедийной индустрии. Квантовые алгоритмы способны обрабатывать огромные объемы данных за доли секунды, что позволяет создавать сверхреалистичные 3D-модели и симуляции. Особенно перспективны применения в области научной визуализации и интерактивных образовательных платформ."
    },
    {
      id: 14,
      title: "Биомиметический дизайн в мультимедиа: Природа как источник вдохновения",
      excerpt: "Как природные формы и процессы вдохновляют создание органичных и интуитивно понятных мультимедийных интерфейсов и инсталляций.",
      category: "design",
      author: "Мария Овсянникова",
      date: "2024-01-08",
      readTime: "12 мин",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png",
      tags: ["биомиметика", "дизайн", "природа", "интерфейсы", "интуитивность"],
      content: "Биомиметический дизайн в мультимедиа использует принципы, заимствованные у природы, для создания более естественных и интуитивных интерфейсов. Органические формы, плавные анимации и адаптивное поведение делают цифровые продукты более привлекательными и удобными в использовании. Это особенно важно для создания иммерсивных сред и интерактивных инсталляций."
    },
    {
      id: 15,
      title: "Цифровые двойники в мультимедиа: Создание виртуальных копий реальных объектов",
      excerpt: "Технологии создания цифровых двойников для мультимедийных проектов, позволяющих тестировать и оптимизировать решения в виртуальной среде.",
      category: "xr",
      author: "Святослав Дементьев",
      date: "2024-01-06",
      readTime: "14 мин",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      tags: ["цифровые двойники", "XR", "виртуализация", "тестирование", "оптимизация"],
      content: "Цифровые двойники позволяют создавать точные виртуальные копии реальных объектов и систем. В мультимедиа это открывает возможности для предварительного тестирования инсталляций, оптимизации производительности и создания интерактивных обучающих платформ. Особенно эффективно использование в корпоративном обучении и планировании сложных мероприятий."
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
        <section 
          ref={heroAnimation.elementRef}
          style={heroAnimation.animationStyle}
          className="bg-gradient-to-br from-blue-50 to-purple-50 py-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-60"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-6">
                📚 {t('blog.title')}
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                {t('blog.subtitle')}
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Делимся опытом, рассказываем о новых технологиях и даем практические советы 
                по созданию впечатляющих мультимедийных проектов
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section 
          ref={searchAnimation.elementRef}
          style={searchAnimation.animationStyle}
          className="py-12 bg-white border-b border-slate-200"
        >
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-4 text-slate-400" />
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
                  <AnimatedButton
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    hoverEffect="scale"
                    className="text-sm"
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2 bg-slate-100 text-slate-600">
                      {category.count}
                    </Badge>
                  </AnimatedButton>
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
                <AnimatedButton 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  hoverEffect="scale"
                  glow={true}
                >
                  Сбросить фильтры
                </AnimatedButton>
              </div>
            ) : (
              <div 
                ref={postsAnimation.elementRef}
                style={postsAnimation.animationStyle}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post, index) => (
                  <article 
                    key={post.id} 
                    className="group bg-white rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden card-hover-lift"
                  >
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
                        <AnimatedButton 
                          variant="ghost" 
                          size="sm" 
                          hoverEffect="slide"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          {t('btn.read-more')}
                        </AnimatedButton>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-16">
                <AnimatedButton 
                  size="lg" 
                  variant="outline" 
                  hoverEffect="lift"
                  glow={true}
                  className="px-8 py-4 text-lg"
                >
                  Загрузить еще
                </AnimatedButton>
              </div>
            )}
          </div>
        </section>



        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <NewsletterSubscription variant="hero" className="max-w-2xl mx-auto" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
