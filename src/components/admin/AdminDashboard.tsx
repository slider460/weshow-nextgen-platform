import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart, 
  Calendar,
  DollarSign,
  Activity,
  Eye,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalEquipment: number;
  activeUsers: number;
  monthlyGrowth: number;
  revenueGrowth: number;
}

interface RecentOrder {
  id: string;
  customer: string;
  equipment: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'completed';
  date: string;
}

interface EquipmentUsage {
  name: string;
  usage: number;
  total: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalEquipment: 0,
    activeUsers: 0,
    monthlyGrowth: 0,
    revenueGrowth: 0
  });

  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [equipmentUsage, setEquipmentUsage] = useState<EquipmentUsage[]>([]);

  // Загрузка данных (в реальном приложении это будет API вызов)
  useEffect(() => {
    // Симуляция загрузки данных
    setStats({
      totalOrders: 156,
      totalRevenue: 2450000,
      totalEquipment: 89,
      activeUsers: 234,
      monthlyGrowth: 12.5,
      revenueGrowth: 8.3
    });

    setRecentOrders([
      {
        id: 'ORD-001',
        customer: 'ООО "ТехноМир"',
        equipment: 'LED экран 4K',
        amount: 45000,
        status: 'confirmed',
        date: '2024-01-15'
      },
      {
        id: 'ORD-002',
        customer: 'Студия "Креатив"',
        equipment: 'Проектор + звук',
        amount: 25000,
        status: 'delivered',
        date: '2024-01-14'
      },
      {
        id: 'ORD-003',
        customer: 'Event Group',
        equipment: 'Интерактивная панель',
        amount: 35000,
        status: 'pending',
        date: '2024-01-13'
      }
    ]);

    setEquipmentUsage([
      { name: 'LED экраны', usage: 85, total: 100 },
      { name: 'Проекторы', usage: 72, total: 100 },
      { name: 'Звуковое оборудование', usage: 68, total: 100 },
      { name: 'Интерактивные панели', usage: 45, total: 100 }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'confirmed': return 'Подтвержден';
      case 'delivered': return 'Доставлен';
      case 'completed': return 'Завершен';
      default: return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Заголовок */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Админ-панель</h1>
            <p className="text-slate-600 mt-1">Обзор системы и управление</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </Button>
            <Button size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Просмотр сайта
            </Button>
          </div>
        </div>

        {/* Основные метрики */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Общие заказы */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Общие заказы</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600">+{stats.monthlyGrowth}%</span>
                <span className="ml-1">с прошлого месяца</span>
              </div>
            </CardContent>
          </Card>

          {/* Общий доход */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Общий доход</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600">+{stats.revenueGrowth}%</span>
                <span className="ml-1">с прошлого месяца</span>
              </div>
            </CardContent>
          </Card>

          {/* Оборудование */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Оборудование</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEquipment}</div>
              <p className="text-xs text-muted-foreground">
                единиц в каталоге
              </p>
            </CardContent>
          </Card>

          {/* Активные пользователи */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активные пользователи</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                за последний месяц
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Недавние заказы */}
          <Card>
            <CardHeader>
              <CardTitle>Недавние заказы</CardTitle>
              <CardDescription>Последние 5 заказов в системе</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{order.customer}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{order.equipment}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{formatCurrency(order.amount)}</p>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Использование оборудования */}
          <Card>
            <CardHeader>
              <CardTitle>Использование оборудования</CardTitle>
              <CardDescription>Популярность по категориям</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipmentUsage.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span>{item.usage}%</span>
                    </div>
                    <Progress value={item.usage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Быстрые действия */}
        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
            <CardDescription>Основные функции управления</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Package className="h-6 w-6 mb-2" />
                <span className="text-sm">Оборудование</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <ShoppingCart className="h-6 w-6 mb-2" />
                <span className="text-sm">Заказы</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">Клиенты</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="text-sm">Расписание</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BarChart3 className="h-6 w-6 mb-2" />
                <span className="text-sm">Аналитика</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;




