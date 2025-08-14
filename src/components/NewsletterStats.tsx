import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Mail, Globe, TrendingUp, BarChart3 } from 'lucide-react';
import { useNewsletterAPI } from '@/api/newsletter';
import { useLanguage } from '@/contexts/LanguageContext';

const NewsletterStats = () => {
  const { t } = useLanguage();
  const { getSubscriberStats } = useNewsletterAPI();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getSubscriberStats();
        setStats(data);
      } catch (error) {
        console.error('Ошибка при загрузке статистики:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [getSubscriberStats]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-8 bg-slate-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Статистика подписчиков
        </h2>
        <p className="text-slate-600">
          Аналитика аудитории и эффективность рассылок
        </p>
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Всего подписчиков</p>
                <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Активные</p>
                <p className="text-3xl font-bold text-green-900">{stats.active}</p>
              </div>
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Языки</p>
                <p className="text-3xl font-bold text-purple-900">
                  {Object.keys(stats.byLanguage).length}
                </p>
              </div>
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Категории</p>
                <p className="text-3xl font-bold text-orange-900">
                  {Object.keys(stats.byCategory).length}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Детальная статистика */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* По языкам */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              Распределение по языкам
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.byLanguage).map(([language, count]) => (
                <div key={language} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {language === 'ru' ? '🇷🇺 Русский' : '🇺🇸 English'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(count as number / stats.active) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-700 w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* По категориям */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Популярные категории
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.byCategory)
                .sort(([,a], [,b]) => (b as number) - (a as number))
                .slice(0, 5)
                .map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {category === 'ai' ? '🤖 AI' :
                         category === 'xr' ? '🥽 XR' :
                         category === 'sustainability' ? '🌱 Устойчивость' :
                         category === 'design' ? '🎨 Дизайн' :
                         category === 'multimedia' ? '📺 Мультимедиа' : category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(count as number / stats.active) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-700 w-8 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Информация о росте */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">
              Рост аудитории
            </h3>
          </div>
          <p className="text-slate-600 mb-4">
            Наша аудитория постоянно растет, и мы стремимся предоставлять 
            качественный контент по всем интересующим вас темам
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              AI технологии
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              XR решения
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Устойчивое развитие
            </Badge>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              Современный дизайн
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterStats;
