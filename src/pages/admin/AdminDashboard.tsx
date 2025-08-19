import React, { useState } from 'react';
import { AdminProvider, useAdmin } from '@/contexts/admin/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye, 
  Edit, 
  Trash2, 
  Settings,
  BarChart3,
  Users,
  Image,
  Calendar,
  TrendingUp
} from 'lucide-react';
import PortfolioList from '@/components/admin/PortfolioList';
import PortfolioForm from '@/components/admin/PortfolioForm';
import PortfolioStats from '@/components/admin/PortfolioStats';
import MediaLibrary from '@/components/admin/MediaLibrary';

const AdminDashboardContent: React.FC = () => {
  const { state, setFilters, setEditing, setSelectedItem } = useAdmin();
  const [activeView, setActiveView] = useState<'list' | 'form' | 'stats' | 'media'>('list');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNew = () => {
    setIsCreating(true);
    setSelectedItem(null);
    setEditing(false);
    setActiveView('form');
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setEditing(true);
    setActiveView('form');
  };

  const handleBackToList = () => {
    setActiveView('list');
    setIsCreating(false);
    setSelectedItem(null);
    setEditing(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот проект?')) {
      // В реальном приложении здесь был бы API вызов
      console.log('Удаление проекта:', id);
      // Обновляем состояние через контекст
      // deletePortfolioItem(id);
    }
  };

  const filteredItems = state.portfolioItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
                         item.description.toLowerCase().includes(state.filters.search.toLowerCase());
    const matchesStatus = !state.filters.status || item.status === state.filters.status;
    const matchesCategory = !state.filters.category || item.category === state.filters.category;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Админ-панель WESHOW</h1>
              <div className="text-sm text-gray-500">
                {state.currentUser ? `Вход выполнен: ${state.currentUser.username}` : 'Не авторизован'}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Настройки
              </Button>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Пользователи
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveView('list')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'list'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Портфолио
            </button>
            <button
              onClick={() => setActiveView('stats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'stats'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Статистика
            </button>
            <button
              onClick={() => setActiveView('media')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'media'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Медиа
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'list' && (
          <div>
            {/* Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Поиск по проектам..."
                    value={state.filters.search}
                    onChange={(e) => setFilters({ search: e.target.value })}
                    className="pl-10 w-80"
                  />
                </div>
                <select
                  value={state.filters.status}
                  onChange={(e) => setFilters({ status: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Все статусы</option>
                  <option value="draft">Черновики</option>
                  <option value="published">Опубликованные</option>
                  <option value="archived">Архивные</option>
                </select>
                <select
                  value={state.filters.category}
                  onChange={(e) => setFilters({ category: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Все категории</option>
                  {state.categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Создать проект
              </Button>
            </div>

            {/* Portfolio List */}
            <PortfolioList 
              items={filteredItems}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        {activeView === 'form' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {isCreating ? 'Создание нового проекта' : 'Редактирование проекта'}
              </h2>
              <Button variant="outline" onClick={handleBackToList}>
                Назад к списку
              </Button>
            </div>
            <PortfolioForm />
          </div>
        )}

        {activeView === 'stats' && (
          <PortfolioStats />
        )}

        {activeView === 'media' && (
          <MediaLibrary />
        )}
      </main>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <AdminProvider>
      <AdminDashboardContent />
    </AdminProvider>
  );
};

export default AdminDashboard;
