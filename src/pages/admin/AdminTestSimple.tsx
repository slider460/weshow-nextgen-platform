import React from 'react';

const AdminTestSimple: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Тест админ-панели
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Статус системы</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span>Админ-панель загружена</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span>React работает</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span>TypeScript работает</span>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Быстрые ссылки</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <a 
              href="/admin/news" 
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-2xl mb-2">📰</div>
              <div className="font-medium">Новости</div>
            </a>
            <a 
              href="/admin/blog" 
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-2xl mb-2">📚</div>
              <div className="font-medium">Блог</div>
            </a>
            <a 
              href="/admin/logos" 
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-2xl mb-2">🖼️</div>
              <div className="font-medium">Логотипы</div>
            </a>
            <a 
              href="/admin/cases" 
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-2xl mb-2">💼</div>
              <div className="font-medium">Кейсы</div>
            </a>
            <a 
              href="/admin/equipment" 
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-medium">Оборудование</div>
            </a>
            <a 
              href="/" 
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-2xl mb-2">🏠</div>
              <div className="font-medium">На главную</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTestSimple;
