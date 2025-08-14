import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  GraduationCap, 
  Heart, 
  Zap, 
  Globe, 
  ArrowRight,
  Mail,
  Phone,
  Linkedin
} from "lucide-react";

const Careers = () => {
  const openPositions = [
    {
      id: 1,
      title: "Frontend Developer (React)",
      department: "Разработка",
      location: "Москва",
      type: "Полная занятость",
      experience: "2+ лет",
      description: "Разработка современных веб-приложений с использованием React, TypeScript и современных технологий.",
      requirements: [
        "Опыт работы с React 2+ лет",
        "Знание TypeScript, JavaScript ES6+",
        "Опыт с Redux, React Router",
        "Понимание принципов REST API"
      ],
      benefits: [
        "Конкурентная зарплата",
        "Гибкий график работы",
        "Удаленная работа",
        "Профессиональное развитие"
      ]
    },
    {
      id: 2,
      title: "3D Artist / Motion Designer",
      department: "Дизайн",
      location: "Москва",
      type: "Полная занятость",
      experience: "3+ лет",
      description: "Создание 3D-моделей, анимаций и визуальных эффектов для мультимедийных проектов.",
      requirements: [
        "Опыт работы с Cinema 4D, Blender",
        "Знание After Effects, Premiere Pro",
        "Понимание принципов 3D-моделирования",
        "Портфолио работ"
      ],
      benefits: [
        "Творческая работа",
        "Современное оборудование",
        "Участие в интересных проектах",
        "Обучение новым технологиям"
      ]
    },
    {
      id: 3,
      title: "Технический специалист",
      department: "Техподдержка",
      location: "Москва",
      type: "Полная занятость",
      experience: "1+ лет",
      description: "Техническое сопровождение мероприятий, настройка и обслуживание мультимедийного оборудования.",
      requirements: [
        "Техническое образование",
        "Опыт работы с аудио/видео оборудованием",
        "Знание принципов работы проекторов, LED-панелей",
        "Готовность к командировкам"
      ],
      benefits: [
        "Стабильная работа",
        "Командировки по России",
        "Карьерный рост",
        "Премии за проекты"
      ]
    },
    {
      id: 4,
      title: "Project Manager",
      department: "Управление проектами",
      location: "Москва",
      type: "Полная занятость",
      experience: "3+ лет",
      description: "Управление мультимедийными проектами от концепции до реализации.",
      requirements: [
        "Опыт управления проектами 3+ лет",
        "Знание методологий Agile/Scrum",
        "Опыт работы в сфере мероприятий",
        "Отличные коммуникативные навыки"
      ],
      benefits: [
        "Высокая зарплата",
        "Управление крупными проектами",
        "Работа с известными брендами",
        "Бонусы за результат"
      ]
    }
  ];

  const companyValues = [
    {
      icon: Heart,
      title: "Забота о команде",
      description: "Мы ценим каждого сотрудника и создаем комфортные условия для работы и развития"
    },
    {
      icon: Zap,
      title: "Инновации",
      description: "Постоянно изучаем новые технологии и внедряем их в наши проекты"
    },
    {
      icon: Users,
      title: "Командная работа",
      description: "Вместе мы достигаем большего. Поддерживаем друг друга и делимся знаниями"
    },
    {
      icon: Globe,
      title: "Глобальное мышление",
      description: "Работаем с клиентами по всему миру и создаем решения международного уровня"
    }
  ];

  const benefits = [
    "🏠 Гибкий график работы",
    "💻 Современное оборудование",
    "📚 Обучение и развитие",
    "🏥 ДМС и страховка",
    "🎯 Премии за результат",
    "🌍 Возможность командировок",
    "🎉 Корпоративные мероприятия",
    "📈 Карьерный рост"
  ];

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
                🚀 Карьера
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Присоединяйтесь к
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  команде профессионалов
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Мы ищем талантливых людей, которые хотят создавать инновационные 
                мультимедийные решения и развиваться вместе с нами
              </p>
              <Button size="lg" className="px-8 py-4 text-lg font-semibold">
                Посмотреть вакансии
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Наши ценности
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Мы строим нашу культуру на основе принципов, которые помогают нам 
                создавать лучшие продукты и развиваться как команда
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Что мы предлагаем
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Мы заботимся о наших сотрудниках и создаем условия для их 
                профессионального и личного роста
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-2xl mb-3">{benefit.split(' ')[0]}</div>
                  <p className="text-slate-700 font-medium">
                    {benefit.split(' ').slice(1).join(' ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Открытые вакансии
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Присоединяйтесь к нашей команде и участвуйте в создании 
                инновационных мультимедийных решений
              </p>
            </div>

            <div className="space-y-6">
              {openPositions.map((position) => (
                <Card key={position.id} className="hover:shadow-lg transition-all duration-300 border-slate-200/50">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl text-slate-900 mb-2">
                          {position.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-3 mb-3">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {position.department}
                          </Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {position.type}
                          </Badge>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {position.experience}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{position.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{position.type}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Briefcase className="h-4 w-4" />
                            <span>{position.experience}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="lg:self-start">
                        Откликнуться
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-700 mb-6">
                      {position.description}
                    </CardDescription>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          Требования
                        </h4>
                        <ul className="space-y-2">
                          {position.requirements.map((req, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm text-slate-600">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                          <Heart className="h-4 w-4 mr-2" />
                          Преимущества
                        </h4>
                        <ul className="space-y-2">
                          {position.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm text-slate-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact HR */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Не нашли подходящую вакансию?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Отправьте нам свое резюме, и мы свяжемся с вами, когда появится подходящая позиция
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10">
                <Mail className="mr-2 h-5 w-5" />
                Отправить резюме
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                Связаться с HR
              </Button>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-4">
                Контакты HR-отдела
              </h3>
              <div className="flex flex-col sm:flex-row gap-6 justify-center text-white/90">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>hr@weshow.ru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>+7 (495) 580-75-37</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
