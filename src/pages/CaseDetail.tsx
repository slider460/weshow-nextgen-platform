import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { localCases, LocalCase } from '../data/cases';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { ArrowLeft, Play, Calendar, Award } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState<LocalCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const foundCase = localCases.find(c => c.id === id);
      setCaseData(foundCase || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Кейс не найден</h1>
          <Button onClick={() => navigate('/portfolio')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться к портфолио
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: caseData.image_url ? `url(${caseData.image_url})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
            <div className="text-white max-w-3xl">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20 mb-4"
                onClick={() => navigate('/portfolio')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к портфолио
              </Button>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{caseData.title}</h1>
              
              <div className="flex flex-wrap gap-4 items-center">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  <Calendar className="w-4 h-4 mr-1" />
                  {caseData.year}
                </Badge>
                <span className="text-white/80">{caseData.client}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">О проекте</h2>
                    <p className="text-gray-600 leading-relaxed">{caseData.description}</p>
                  </CardContent>
                </Card>

                {/* Video */}
                {caseData.video_url && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Видео проекта</h2>
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                        <video 
                          controls 
                          className="w-full h-full"
                          poster={caseData.image_url}
                        >
                          <source src={caseData.video_url} type="video/mp4" />
                        </video>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Results */}
                {caseData.results && caseData.results.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">
                        <Award className="w-6 h-6 inline mr-2 text-yellow-500" />
                        Результаты
                      </h2>
                      <ul className="space-y-3">
                        {caseData.results.map((result, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-600">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Technologies */}
                {caseData.technologies && caseData.technologies.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-4">Технологии</h3>
                      <div className="flex flex-wrap gap-2">
                        {caseData.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline">{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTA */}
                <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-3">Хотите похожий проект?</h3>
                    <p className="text-white/80 mb-4 text-sm">
                      Свяжитесь с нами для обсуждения вашего проекта
                    </p>
                    <Button 
                      variant="secondary" 
                      className="w-full"
                      onClick={() => navigate('/contact')}
                    >
                      Связаться с нами
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseDetail;
