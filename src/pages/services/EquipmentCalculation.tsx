import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { 
  Calculator, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  FileText
} from "lucide-react";
import { supabase } from '../../config/supabase';

interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  price_per_day: number | null;
  category_name: string;
  quantity: number;
}

interface CartItem extends EquipmentItem {
  selectedQuantity: number;
  totalPrice: number;
}

const EquipmentCalculation = () => {
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [orderData, setOrderData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventDate: '',
    notes: ''
  });

  // Загружаем оборудование из базы данных
  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      const { data, error } = await supabase
        .from('equipment_catalog')
        .select(`
          id,
          name,
          description,
          price_per_day,
          equipment_categories (
            name
          )
        `)
        .order('name');

      if (error) {
        console.error('Error loading equipment:', error);
        return;
      }

      const formattedData = data?.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price_per_day: item.price_per_day,
        category_name: item.equipment_categories?.name || 'Без категории',
        quantity: 1
      })) || [];

      setEquipment(formattedData);
    } catch (error) {
      console.error('Error loading equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item: EquipmentItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              selectedQuantity: cartItem.selectedQuantity + 1,
              totalPrice: (cartItem.selectedQuantity + 1) * (cartItem.price_per_day || 0)
            }
          : cartItem
      ));
    } else {
      setCart([...cart, {
        ...item,
        selectedQuantity: 1,
        totalPrice: item.price_per_day || 0
      }]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(cart.map(item =>
      item.id === id
        ? {
            ...item,
            selectedQuantity: quantity,
            totalPrice: quantity * (item.price_per_day || 0)
          }
        : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category_name === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...Array.from(new Set(equipment.map(item => item.category_name)))];

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      console.log('Начинаем отправку заявки...', { orderData, cart });
      
      // Создаем заявку в базе данных
      const { data: estimate, error: estimateError } = await supabase
        .from('estimates')
        .insert({
          user_id: '00000000-0000-0000-0000-000000000001', // Временный ID для демо
          status: 'pending_review',
          event_date: orderData.eventDate,
          client_notes: `Клиент: ${orderData.name}\nEmail: ${orderData.email}\nТелефон: ${orderData.phone}\nКомпания: ${orderData.company}\nДополнительно: ${orderData.notes}`
        })
        .select()
        .single();

      if (estimateError) {
        console.error('Error creating estimate:', estimateError);
        setSubmitError(`Ошибка создания заявки: ${estimateError.message}`);
        setIsSubmitting(false);
        return;
      }

      console.log('Заявка создана:', estimate);

      // Добавляем позиции в заявку
      const estimateItems = cart.map(item => ({
        estimate_id: estimate.id,
        equipment_id: item.id,
        quantity: item.selectedQuantity,
        price_at_creation: item.price_per_day || 0
      }));

      console.log('Добавляем позиции:', estimateItems);

      const { error: itemsError } = await supabase
        .from('estimate_items')
        .insert(estimateItems);

      if (itemsError) {
        console.error('Error creating estimate items:', itemsError);
        setSubmitError(`Ошибка добавления позиций: ${itemsError.message}`);
        setIsSubmitting(false);
        return;
      }

      console.log('Заявка успешно отправлена!');
      
      // Показываем успешное сообщение
      alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
      
      // Очищаем форму и корзину
      setCart([]);
      setShowOrderForm(false);
      setOrderData({
        name: '',
        email: '',
        phone: '',
        company: '',
        eventDate: '',
        notes: ''
      });
      
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitError(`Произошла ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-slate-600">Загружаем каталог оборудования...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              <Calculator className="inline-block mr-3 text-blue-600" />
              Расчет оборудования
            </h1>
            <p className="text-lg text-slate-600">
              Выберите оборудование и получите расчет стоимости аренды
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Каталог оборудования */}
            <div className="lg:col-span-2">
              {/* Фильтры */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Каталог оборудования</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все категории</SelectItem>
                          {categories.slice(1).map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="search">Поиск</Label>
                      <Input
                        id="search"
                        placeholder="Поиск по названию или описанию..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Список оборудования */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEquipment.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription>{item.category_name}</CardDescription>
                        </div>
                        <Badge variant="secondary">
                          {item.price_per_day ? item.price_per_day.toLocaleString() : 'Цена не указана'} ₽/день
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                      <Button 
                        onClick={() => addToCart(item)}
                        className="w-full"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить в расчет
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredEquipment.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-slate-500">Оборудование не найдено</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Корзина */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Расчет ({cart.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <p className="text-slate-500 text-center py-4">
                      Корзина пуста
                    </p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-slate-500">
                                {item.price_per_day ? item.price_per_day.toLocaleString() : 'Цена не указана'} ₽/день
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.selectedQuantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center">{item.selectedQuantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.selectedQuantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Итого:</span>
                          <span className="text-xl font-bold text-blue-600">
                            {getTotalPrice().toLocaleString()} ₽
                          </span>
                        </div>

                        <Button 
                          onClick={() => setShowOrderForm(true)}
                          className="w-full"
                          size="lg"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Оформить заявку
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Модальное окно оформления заявки */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Оформление заявки
              </CardTitle>
              <CardDescription>
                Заполните форму для отправки заявки на аренду оборудования
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{submitError}</p>
                </div>
              )}
              
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    value={orderData.name}
                    onChange={(e) => setOrderData({...orderData, name: e.target.value})}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={orderData.email}
                    onChange={(e) => setOrderData({...orderData, email: e.target.value})}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    value={orderData.phone}
                    onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="company">Компания</Label>
                  <Input
                    id="company"
                    value={orderData.company}
                    onChange={(e) => setOrderData({...orderData, company: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="eventDate">Дата мероприятия *</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={orderData.eventDate}
                    onChange={(e) => setOrderData({...orderData, eventDate: e.target.value})}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Дополнительные пожелания</Label>
                  <Textarea
                    id="notes"
                    value={orderData.notes}
                    onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                    rows={3}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowOrderForm(false)}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Отмена
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Отправка...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Отправить заявку
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default EquipmentCalculation;
