import React from 'react';
import { useAdmin } from '@/contexts/admin/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  Calendar, 
  Users, 
  Target,
  BarChart3,
  PieChart,
  Activity,
  Star,
  Plus,
  Settings
} from 'lucide-react';

const PortfolioStats: React.FC = () => {
  const { state } = useAdmin();

  const stats = {
    totalItems: state.portfolioItems.length,
    publishedItems: state.portfolioItems.filter(item => item.status === 'published').length,
    draftItems: state.portfolioItems.filter(item => item.status === 'draft').length,
    archivedItems: state.portfolioItems.filter(item => item.status === 'archived').length,
    totalViews: state.portfolioItems.reduce((sum, item) => sum + item.views, 0),
    totalLikes: state.portfolioItems.reduce((sum, item) => sum + item.likes, 0),
    featuredItems: state.portfolioItems.filter(item => item.featured).length,
  };

  const topCategories = state.categories.map(category => ({
    ...category,
    count: state.portfolioItems.filter(item => item.category === category.name).length,
  })).sort((a, b) => b.count - a.count);

  const topProjects = [...state.portfolioItems]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const recentActivity = [
    { action: 'Создан проект', item: 'Интерактивная выставка', user: 'admin', timestamp: new Date('2024-01-20') },
    { action: 'Обновлен проект', item: 'Samsung Event', user: 'admin', timestamp: new Date('2024-01-18') },
    { action: 'Опубликован проект', item: 'Музейная экспозиция', user: 'admin', timestamp: new Date('2024-01-15') },
  ];

  const monthlyViews = [
    { month: 'Янв', views: 1200 },
    { month: 'Фев', views: 1800 },
    { month: 'Мар', views: 2100 },
    { month: 'Апр', views: 1900 },
    { month: 'Май', views: 2400 },
    { month: 'Июн', views: 2800 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Опубликован';
      case 'draft':
        return 'Черновик';
      case 'archived':
        return 'Архив';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего проектов</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalItems}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.publishedItems} опубликовано
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Просмотры</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% с прошлого месяца
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Лайки</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLikes}</div>
            <p className="text-xs text-muted-foreground">
              +8% с прошлого месяца
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Избранные</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featuredItems}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.featuredItems / stats.totalItems) * 100)}% от общего
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Статусы проектов */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Статусы проектов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor('published')}>
                    {getStatusText('published')}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {stats.publishedItems} проектов
                  </span>
                </div>
                <div className="text-sm font-medium">
                  {Math.round((stats.publishedItems / stats.totalItems) * 100)}%
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${(stats.publishedItems / stats.totalItems) * 100}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor('draft')}>
                    {getStatusText('draft')}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {stats.draftItems} проектов
                  </span>
                </div>
                <div className="text-sm font-medium">
                  {Math.round((stats.draftItems / stats.totalItems) * 100)}%
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${(stats.draftItems / stats.totalItems) * 100}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor('archived')}>
                    {getStatusText('archived')}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {stats.archivedItems} проектов
                  </span>
                </div>
                <div className="text-sm font-medium">
                  {Math.round((stats.archivedItems / stats.totalItems) * 100)}%
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-500 h-2 rounded-full" 
                  style={{ width: `${(stats.archivedItems / stats.totalItems) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Топ категорий
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCategories.slice(0, 5).map((category, index) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{category.count}</span>
                    <span className="text-xs text-gray-400">
                      {Math.round((category.count / stats.totalItems) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Топ проектов и активность */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Топ проектов по просмотрам
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProjects.map((project, index) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{project.title}</div>
                      <div className="text-xs text-gray-500">{project.category}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">{project.views.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">просмотров</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Последняя активность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.action}</div>
                    <div className="text-xs text-gray-600">{activity.item}</div>
                    <div className="text-xs text-gray-400">
                      {activity.user} • {activity.timestamp.toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* График просмотров */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Динамика просмотров по месяцам
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyViews.map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div 
                  className="w-12 bg-blue-500 rounded-t-sm transition-all hover:bg-blue-600"
                  style={{ height: `${(item.views / 3000) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-600">{item.month}</span>
                <span className="text-xs font-medium">{item.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Быстрые действия */}
      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div className="font-medium">Создать проект</div>
              <div className="text-sm text-gray-500">Добавить новый проект</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="font-medium">Просмотр сайта</div>
              <div className="text-sm text-gray-500">Открыть основной сайт</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <div className="font-medium">Настройки</div>
              <div className="text-sm text-gray-500">Конфигурация системы</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioStats;
