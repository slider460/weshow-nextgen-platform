import React, { useState } from 'react';
import { AuthModal } from '../components/auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';

export const AuthTest: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const { user, profile, loading } = useAuth();

  const openModal = (mode: 'signin' | 'signup' | 'reset') => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Тест системы аутентификации
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Статус аутентификации</h2>
          {loading ? (
            <p className="text-gray-500">Загрузка...</p>
          ) : user ? (
            <div>
              <p className="text-green-600 font-medium">✅ Пользователь авторизован</p>
              <p>Email: {user.email}</p>
              {profile && (
                <div>
                  <p>Имя: {profile.full_name}</p>
                  <p>Компания: {profile.company_name}</p>
                  <p>Роль: {profile.role}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">❌ Пользователь не авторизован</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Тестирование форм</h2>
          <div className="space-x-4">
            <button
              onClick={() => openModal('signin')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Тест входа
            </button>
            <button
              onClick={() => openModal('signup')}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Тест регистрации
            </button>
            <button
              onClick={() => openModal('reset')}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
            >
              Тест восстановления
            </button>
          </div>
        </div>

        <AuthModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialMode={authMode}
        />
      </div>
    </div>
  );
};
