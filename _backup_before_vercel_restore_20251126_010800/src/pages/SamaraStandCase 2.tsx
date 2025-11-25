import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { ArrowLeft, Play, ExternalLink, Calendar, Users, Award, Star, Image as ImageIcon, Video, Download, MapPin, Building } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

const SamaraStandCase = () => {
  const navigate = useNavigate();

  const caseData = {
    id: 'samara-stand',
    title: 'Стенд Самарской области на выставке-форуме «Россия»',
    client: 'Правительство Самарской области',
    year: 2024,
    description: 'Создание интерактивного стенда Самарской области на крупнейшей выставке-форуме «Россия» в ВДНХ с использованием современных мультимедийных технологий',
    detailed_description: 'Проект включал в себя создание полноценного интерактивного стенда площадью 200 кв.м для представления Самарской области на выставке-форуме «Россия» в ВДНХ. Стенд был оснащен интерактивными панелями, LED-экранами, проекционными системами и инновационными технологиями для демонстрации достижений региона.',
    image_url: '/portfolio/samara-stand-main.jpg',
    gallery_images: [
      '/portfolio/samara-stand-main.jpg',
      '/portfolio/samara-stand-main 2.jpg',
      '/portfolio/samara-interactive.jpg',
      '/portfolio/samara-exhibition-1.jpg',
      '/portfolio/samara-booth.jpg',
      '/portfolio/russia-exhibition.jpg',
      '/portfolio/regions-presentation.jpg'
    ],
    results: [
      'Более 50,000 посетителей за время выставки',
      'Увеличение узнаваемости региона на 40%',
      'Высокие оценки от руководства области',
      'Привлечение 15+ потенциальных инвесторов',
      'Положительные отзывы от федеральных СМИ'
    ],
    technologies_used: [
      'LED-видеостены',
      'Интерактивные панели',
      'Проекционные системы',
      '3D-визуализация',
      'Системы управления контентом',
      'Звуковое сопровождение',
      'Световые эффекты'
    ],
    project_duration: '2 месяца',
    team_size: 12,
    budget_range: '2-5 млн руб',
    challenges: 'Создание уникального дизайна стенда, который бы выделялся среди других регионов, при этом отражал специфику и достижения Самарской области. Необходимо было интегрировать множество интерактивных элементов в ограниченном пространстве.',
    solutions: 'Разработали модульную систему стенда с возможностью быстрой трансформации пространства. Использовали комбинацию LED-экранов и проекционных технологий для создания иммерсивного опыта. Создали интерактивную карту региона с демонстрацией ключевых проектов.',
    project_scope: 'Полный цикл разработки: от концепции и дизайна до технической реализации и сопровождения во время выставки. Включал создание контента, программирование интерактивных элементов, монтаж и настройку оборудования.',
    client_feedback: 'Проект превзошел все наши ожидания. Стенд стал одним из самых посещаемых на выставке, а интерактивные технологии помогли эффективно представить достижения региона. Команда WESHOW проявила высокий профессионализм и креативность.',
    awards: [
      'Лучший региональный стенд выставки-форума «Россия» 2024',
      'Приз зрительских симпатий',
      'Диплом за инновационные решения'
    ],
    featured: true
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => navigate('/portfolio')}
              className="mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться к портфолио
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Badge variant="secondary" className="text-sm">
                    {caseData.year}
                  </Badge>
                  <Badge variant="default" className="text-sm bg-yellow-500">
                    <Star className="w-3 h-3 mr-1" />
                    Рекомендуемый
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    <Building className="w-3 h-3 mr-1" />
                    Выставка
                  </Badge>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                  {caseData.title}
                </h1>
                
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  {caseData.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center text-slate-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{caseData.project_duration}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{caseData.team_size} человек</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">ВДНХ, Москва</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Play className="mr-2 h-4 w-4" />
                    Смотреть презентацию
                  </Button>
                  <Button variant="outline" size="lg">
                    <Download className="mr-2 h-4 w-4" />
                    Скачать кейс
                  </Button>
                </div>
              </div>

              <div className="relative">
                <img
                  src={caseData.image_url}
                  alt={caseData.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">О проекте</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 leading-relaxed mb-6">
                {caseData.detailed_description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Детали проекта</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Вызовы</h3>
                  <p className="text-slate-600">{caseData.challenges}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Решения</h3>
                  <p className="text-slate-600">{caseData.solutions}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Область проекта</h3>
                  <p className="text-slate-600">{caseData.project_scope}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Результаты</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseData.results.map((result, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                  <p className="text-slate-600">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Технологии</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {caseData.technologies_used.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Галерея</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseData.gallery_images.map((image, index) => (
                <div 
                  key={index}
                  className="relative group cursor-pointer"
                >
                  <img
                    src={image}
                    alt={`Галерея ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Feedback */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Отзыв клиента</h2>
            <blockquote className="text-xl text-slate-600 italic leading-relaxed">
              "{caseData.client_feedback}"
            </blockquote>
            <cite className="block mt-6 text-slate-500">
              — {caseData.client}
            </cite>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Награды</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseData.awards.map((award, index) => (
                <div key={index} className="flex items-center p-4 bg-yellow-50 rounded-lg">
                  <Award className="w-6 h-6 text-yellow-600 mr-4" />
                  <span className="text-slate-700">{award}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Хотите похожий проект?</h2>
            <p className="text-xl text-slate-300 mb-12">
              Свяжитесь с нами для обсуждения вашего проекта
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Обсудить проект
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900">
                <Download className="mr-2 h-4 w-4" />
                Скачать презентацию
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SamaraStandCase;
