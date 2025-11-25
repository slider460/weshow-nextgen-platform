import { useState } from "react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

interface FormErrors {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  serviceType?: string;
  budget?: string;
  description?: string;
  timeline?: string;
}

interface ProjectOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectOrderModal = ({ isOpen, onClose }: ProjectOrderModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    serviceType: "",
    budget: "",
    description: "",
    timeline: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Валидация email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Валидация телефона (российский формат)
  const validatePhone = (phone: string): boolean => {
    // Убираем все нецифровые символы
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Проверяем длину в зависимости от префикса
    if (cleanPhone.startsWith('7') || cleanPhone.startsWith('8')) {
      // Для номеров, начинающихся с 7 или 8, проверяем 11 цифр (с кодом страны)
      return cleanPhone.length === 11;
    } else {
      // Для номеров, начинающихся с 9, проверяем 10 цифр (без кода страны)
      return cleanPhone.length === 10;
    }
  };

  // Форматирование телефона при вводе
  const formatPhone = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    
    if (cleanValue.length === 0) return '';
    
    // Если номер начинается с 7, добавляем +7
    if (cleanValue.startsWith('7')) {
      if (cleanValue.length === 1) return `+7`;
      if (cleanValue.length <= 4) return `+7 (${cleanValue.slice(1, 4)}`;
      if (cleanValue.length <= 7) return `+7 (${cleanValue.slice(1, 4)}) ${cleanValue.slice(4, 7)}`;
      if (cleanValue.length <= 9) return `+7 (${cleanValue.slice(1, 4)}) ${cleanValue.slice(4, 7)}-${cleanValue.slice(7, 9)}`;
      return `+7 (${cleanValue.slice(1, 4)}) ${cleanValue.slice(4, 7)}-${cleanValue.slice(7, 9)}-${cleanValue.slice(9, 11)}`;
    }
    
    // Если номер начинается с 8, не добавляем код страны
    if (cleanValue.startsWith('8')) {
      if (cleanValue.length === 1) return `8`;
      if (cleanValue.length <= 4) return `8 (${cleanValue.slice(1, 4)}`;
      if (cleanValue.length <= 7) return `8 (${cleanValue.slice(1, 4)}) ${cleanValue.slice(4, 7)}`;
      if (cleanValue.length <= 9) return `8 (${cleanValue.slice(1, 4)}) ${cleanValue.slice(4, 7)}-${cleanValue.slice(7, 9)}`;
      return `8 (${cleanValue.slice(1, 4)}) ${cleanValue.slice(4, 7)}-${cleanValue.slice(7, 9)}-${cleanValue.slice(9, 11)}`;
    }
    
    // Для других номеров (начинающихся с 9) добавляем +7
    if (cleanValue.length === 1) return `+7 (${cleanValue}`;
    if (cleanValue.length <= 4) return `+7 (${cleanValue.slice(0, 3)}`;
    if (cleanValue.length <= 7) return `+7 (${cleanValue.slice(0, 3)}) ${cleanValue.slice(3, 6)}`;
    if (cleanValue.length <= 9) return `+7 (${cleanValue.slice(0, 3)}) ${cleanValue.slice(3, 6)}-${cleanValue.slice(6, 8)}`;
    return `+7 (${cleanValue.slice(0, 3)}) ${cleanValue.slice(3, 6)}-${cleanValue.slice(6, 8)}-${cleanValue.slice(8, 10)}`;
  };

  // Валидация всех полей
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Валидация имени
    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно для заполнения";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    // Валидация телефона
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обязателен для заполнения";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Введите корректный номер телефона";
    }

    // Валидация email
    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен для заполнения";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Введите корректный email адрес";
    }

    // Валидация типа услуги
    if (!formData.serviceType.trim()) {
      newErrors.serviceType = "Выберите тип услуги";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Пожалуйста, исправьте ошибки в форме");
      return;
    }

    // Здесь может быть отправка данных на сервер
    console.log("Form submitted:", formData);
    toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    
    // Сброс формы и закрытие модального окна
    setFormData({
      name: "",
      company: "",
      phone: "",
      email: "",
      serviceType: "",
      budget: "",
      description: "",
      timeline: ""
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;
    
    // Специальная обработка для телефона
    if (field === "phone") {
      processedValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));
    
    // Очищаем ошибку при вводе
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: string) => {
    // Валидация при потере фокуса
    if (field === "email" && formData.email) {
      if (!validateEmail(formData.email)) {
        setErrors(prev => ({ ...prev, email: "Введите корректный email адрес" }));
      }
    }
    
    if (field === "phone" && formData.phone) {
      if (!validatePhone(formData.phone)) {
        setErrors(prev => ({ ...prev, phone: "Введите корректный номер телефона" }));
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Забронировать проект
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Имя *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="Ваше имя"
                required
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 ${
                  errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
              />
              {errors.name && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium text-gray-700">Компания</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Название компании"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                placeholder="+7 (___) ___-__-__"
                required
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 ${
                  errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
              />
              {errors.phone && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.phone}
                </div>
              )}
              <p className="text-xs text-gray-500">
                Формат: +7 (XXX) XXX-XX-XX или 8 (XXX) XXX-XX-XX
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="your@email.com"
                required
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 ${
                  errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
              />
              {errors.email && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceType" className="text-sm font-medium text-gray-700">Тип услуги *</Label>
              <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                <SelectTrigger className={`w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 ${
                  errors.serviceType ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}>
                  <SelectValue placeholder="Выберите тип услуги" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multimedia">Мультимедийные решения</SelectItem>
                  <SelectItem value="software">Разработка ПО и игр</SelectItem>
                  <SelectItem value="support">Техническое сопровождение</SelectItem>
                  <SelectItem value="integration">Интеграция мультимедии</SelectItem>
                  <SelectItem value="branding">Брендинг мероприятий</SelectItem>
                  <SelectItem value="equipment">Аренда оборудования</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
              {errors.serviceType && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.serviceType}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-sm font-medium text-gray-700">Бюджет</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                placeholder="Укажите бюджет"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">Описание проекта</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Опишите ваш проект, требования и цели..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline" className="text-sm font-medium text-gray-700">Сроки реализации</Label>
            <Input
              id="timeline"
              value={formData.timeline}
              onChange={(e) => handleInputChange("timeline", e.target.value)}
              placeholder="Укажите желаемые сроки"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Отправить заявку
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectOrderModal;