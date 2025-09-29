import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Settings, 
  Bell, 
  CreditCard,
  Package,
  Heart,
  Edit3,
  Save,
  X,
  Check,
  ShoppingBag,
  Star,
  Eye,
  Download,
  FileText,
  LogOut,
  Shield,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { TouchButton, TouchInput } from '../components/TouchFriendlyComponents';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    company: user?.company || '',
    email: user?.email || ''
  });

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSaveProfile = async () => {
    try {
      await updateProfile(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Вкладки профиля
  const tabs = [
    { id: 'profile', label: 'Профиль', icon: User },
    { id: 'orders', label: 'Заказы', icon: ShoppingBag },
    { id: 'favorites', label: 'Избранное', icon: Heart },
    { id: 'payments', label: 'Оплата', icon: CreditCard },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-white/80">{user.email}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <span className="bg-white/20 px-2 py-1 rounded">
                        {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
                      </span>
                      <span>Регистрация: {new Date(user.registrationDate).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                </div>
                <TouchButton
                  onClick={handleLogout}
                  className="bg-white/20 text-white hover:bg-white/30 border-white/30"
                  size="sm"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </TouchButton>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'profile' && (
            <Card className="shadow-lg border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Личная информация</span>
                </CardTitle>
                {!isEditing ? (
                  <TouchButton
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Редактировать
                  </TouchButton>
                ) : (
                  <div className="flex space-x-2">
                    <TouchButton
                      onClick={handleSaveProfile}
                      size="sm"
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Сохранить
                    </TouchButton>
                    <TouchButton
                      onClick={() => {
                        setIsEditing(false);
                        setEditForm({
                          name: user.name,
                          phone: user.phone || '',
                          company: user.company || '',
                          email: user.email
                        });
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </TouchButton>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Имя и фамилия</label>
                    {isEditing ? (
                      <TouchInput
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Введите имя и фамилию"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{user.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{user.email}</span>
                      <div className="flex items-center text-green-600 ml-auto">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-xs">Подтвержден</span>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Телефон</label>
                    {isEditing ? (
                      <TouchInput
                        value={editForm.phone}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Введите номер телефона"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{user.phone || 'Не указан'}</span>
                      </div>
                    )}
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Компания</label>
                    {isEditing ? (
                      <TouchInput
                        value={editForm.company}
                        onChange={(e) => setEditForm(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Введите название компании"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span>{user.company || 'Не указана'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Registration Date */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Дата регистрации: {new Date(user.registrationDate).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'orders' && (
            <Card className="shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>История заказов</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Пока нет заказов</h3>
                  <p className="text-gray-500 mb-4">
                    Ваши заказы оборудования будут отображаться здесь
                  </p>
                  <TouchButton 
                    onClick={() => navigate('/equipment')}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Перейти к каталогу
                  </TouchButton>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'favorites' && (
            <Card className="shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Избранное</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Нет избранных товаров</h3>
                  <p className="text-gray-500 mb-4">
                    Добавляйте товары в избранное для быстрого доступа
                  </p>
                  <TouchButton 
                    onClick={() => navigate('/equipment')}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Найти товары
                  </TouchButton>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'payments' && (
            <Card className="shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Способы оплаты</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Нет сохраненных карт</h3>
                  <p className="text-gray-500 mb-4">
                    Добавьте способы оплаты для быстрого оформления заказов
                  </p>
                  <TouchButton 
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Добавить карту
                  </TouchButton>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'settings' && (
            <Card className="shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Настройки</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">Уведомления</div>
                      <div className="text-sm text-gray-500">Получать уведомления о заказах</div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={user.preferences.notifications}
                      className="sr-only"
                      onChange={() => {}}
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors ${
                      user.preferences.notifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform mt-0.5 ${
                        user.preferences.notifications ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </div>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">Рассылка</div>
                      <div className="text-sm text-gray-500">Новости и акции на email</div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={user.preferences.newsletter}
                      className="sr-only"
                      onChange={() => {}}
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors ${
                      user.preferences.newsletter ? 'bg-blue-600' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform mt-0.5 ${
                        user.preferences.newsletter ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </div>
                  </div>
                </div>

                {/* Language */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">Язык интерфейса</div>
                      <div className="text-sm text-gray-500">Текущий: Русский</div>
                    </div>
                  </div>
                  <TouchButton variant="outline" size="sm">
                    Изменить
                  </TouchButton>
                </div>

                {/* Privacy */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">Конфиденциальность</div>
                      <div className="text-sm text-gray-500">Управление данными аккаунта</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <TouchButton 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Скачать мои данные
                    </TouchButton>
                    <TouchButton 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Удалить аккаунт
                    </TouchButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;