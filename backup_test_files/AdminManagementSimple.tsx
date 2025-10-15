import React, { useState, useEffect } from 'react';

interface DashboardStats {
  totalEstimates: number
  pendingEstimates: number
  confirmedEstimates: number
  totalEquipment: number
  totalUsers: number
}

const AdminManagementSimple: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalEstimates: 0,
    pendingEstimates: 0,
    confirmedEstimates: 0,
    totalEquipment: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Симуляция загрузки данных
    setTimeout(() => {
      setStats({
        totalEstimates: 12,
        pendingEstimates: 3,
        confirmedEstimates: 8,
        totalEquipment: 45,
        totalUsers: 5
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Панель управления</h1>
          <p className="mt-2 text-gray-600">
            Обзор системы и управление контентом
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Всего заявок</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEstimates}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-2xl">⏰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">На рассмотрении</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingEstimates}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Подтверждено</p>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmedEstimates}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">⚙️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Оборудование</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEquipment}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Основные разделы управления</h3>
            <div className="space-y-3">
              <a 
                href="/admin/cases" 
                className="block w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl mr-3">💼</span>
                Управление кейсами
              </a>
              <a 
                href="/admin/logos" 
                className="block w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl mr-3">🖼️</span>
                Управление логотипами
              </a>
              <a 
                href="/admin/news" 
                className="block w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl mr-3">📰</span>
                Управление новостями
              </a>
              <a 
                href="/admin/blog" 
                className="block w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl mr-3">📚</span>
                Управление блогом
              </a>
              <a 
                href="/admin/equipment" 
                className="block w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl mr-3">⚙️</span>
                Каталог оборудования
              </a>
              <a 
                href="/admin/estimates" 
                className="block w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl mr-3">📋</span>
                Управление заявками
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Системная информация</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Пользователи в системе</span>
                <span className="px-2 py-1 bg-gray-100 rounded text-sm">{stats.totalUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Статус базы данных</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Подключена</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">RLS политики</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Настроены</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Версия системы</span>
                <span className="px-2 py-1 bg-gray-100 rounded text-sm">v1.2.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Быстрые действия</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a 
              href="/debug-logos" 
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🔍</div>
              <div className="text-sm font-medium">Отладка логотипов</div>
            </a>
            <a 
              href="/force-refresh-logos" 
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🔄</div>
              <div className="text-sm font-medium">Обновление логотипов</div>
            </a>
            <a 
              href="/test-logos-connection" 
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🔗</div>
              <div className="text-sm font-medium">Тест подключения БД</div>
            </a>
            <a 
              href="/clear-all-logos" 
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🗑️</div>
              <div className="text-sm font-medium">Очистка логотипов</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManagementSimple;
