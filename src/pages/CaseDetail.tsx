import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { ArrowLeft, Play, ExternalLink, Calendar, Users, Award, Star, Image as ImageIcon, Video, Download } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

interface CaseData {
  id: string;
  title: string;
  client: string;
  year: number;
  description: string;
  detailed_description?: string;
  image_url?: string;
  gallery_images?: string[];
  gallery_videos?: string[];
  results: string[];
  technologies_used?: string[];
  project_duration?: string;
  team_size?: number;
  budget_range?: string;
  challenges?: string;
  solutions?: string;
  project_scope?: string;
  client_feedback?: string;
  awards?: string[];
  case_study_url?: string;
  featured?: boolean;
}

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchCaseData();
    }
  }, [id]);

  const fetchCaseData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('cases')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Ошибка загрузки кейса:', fetchError);
        setError('Кейс не найден');
        return;
      }

      // Обрабатываем results
      let results = [];
      if (Array.isArray(data.results)) {
        results = data.results;
      } else if (typeof data.results === 'string' && data.results.trim()) {
        try {
          const parsed = JSON.parse(data.results);
          if (Array.isArray(parsed)) {
            results = parsed;
          } else {
            results = data.results.split(/[\n,;]/).map(r => r.trim()).filter(r => r.length > 0);
          }
        } catch {
          results = data.results.split(/[\n,;]/).map(r => r.trim()).filter(r => r.length > 0);
        }
      }

      setCaseData({
        ...data,
        results
      });
    } catch (err) {
      console.error('Ошибка загрузки кейса:', err);
      setError('Произошла ошибка при загрузке кейса');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Загрузка кейса...</p>
        </div>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Кейс не найден</h1>
          <p className="text-slate-600 mb-6">{error || 'Запрашиваемый кейс не существует'}</p>
          <Button onClick={() => navigate('/portfolio')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться к портфолио
          </Button>
        </div>
      </div>
    );
  }

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
                  {caseData.featured && (
                    <Badge variant="default" className="text-sm bg-yellow-500">
                      <Star className="w-3 h-3 mr-1" />
                      Рекомендуемый
                    </Badge>
                  )}
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
                    <span className="text-sm">{caseData.project_duration || '3-6 месяцев'}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{caseData.team_size || 5} человек</span>
                  </div>
                  {caseData.budget_range && (
                    <div className="flex items-center text-slate-600">
                      <span className="text-sm">Бюджет: {caseData.budget_range}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Play className="mr-2 h-4 w-4" />
                    Смотреть презентацию
                  </Button>
                  {caseData.case_study_url && (
                    <Button variant="outline" size="lg" asChild>
                      <a href={caseData.case_study_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Кейс-стади
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="relative">
                <img
                  src={caseData.image_url || '/placeholder.svg'}
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
                {caseData.detailed_description || caseData.description}
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
              {caseData.challenges && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Вызовы</h3>
                    <p className="text-slate-600">{caseData.challenges}</p>
                  </CardContent>
                </Card>
              )}

              {caseData.solutions && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Решения</h3>
                    <p className="text-slate-600">{caseData.solutions}</p>
                  </CardContent>
                </Card>
              )}

              {caseData.project_scope && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Область проекта</h3>
                    <p className="text-slate-600">{caseData.project_scope}</p>
                  </CardContent>
                </Card>
              )}
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
      {caseData.technologies_used && caseData.technologies_used.length > 0 && (
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
      )}

      {/* Gallery */}
      {(caseData.gallery_images && caseData.gallery_images.length > 0) || 
       (caseData.gallery_videos && caseData.gallery_videos.length > 0) ? (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Галерея</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Images */}
                {caseData.gallery_images?.map((image, index) => (
                  <div 
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedImage(image)}
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

                {/* Videos */}
                {caseData.gallery_videos?.map((video, index) => (
                  <div 
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <video
                      src={video}
                      className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
                      poster={caseData.image_url}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                      <Video className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Fallback to main image */
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Галерея</h2>
              <div className="relative group cursor-pointer" onClick={() => setSelectedImage(caseData.image_url || '')}>
                <img
                  src={caseData.image_url || '/placeholder.svg'}
                  alt={caseData.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-2xl flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Client Feedback */}
      {caseData.client_feedback && (
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
      )}

      {/* Awards */}
      {caseData.awards && caseData.awards.length > 0 && (
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
      )}

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

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Галерея"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <video
              src={selectedVideo}
              controls
              className="max-w-full max-h-full rounded-lg"
              autoPlay
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
              onClick={() => setSelectedVideo(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseDetail;
