import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { submitForm } from "../utils/submitForm";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
}

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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

    // Валидация email
    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен для заполнения";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Введите корректный email адрес";
    }

    // Валидация телефона
    if (formData.phone.trim()) {
      if (!validatePhone(formData.phone)) {
        newErrors.phone = "Введите корректный номер телефона (7XXXXXXXXXX или 8XXXXXXXXXX или 9XXXXXXXXX)";
      }
    }

    // Валидация сообщения
    if (!formData.message.trim()) {
      newErrors.message = "Сообщение обязательно для заполнения";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Сообщение должно содержать минимум 10 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitForm("Большая форма", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        message: formData.message,
      });

      setIsSubmitted(true);

      // Сброс формы через 3 секунды
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: ""
        });
        setErrors({});
        setSubmitError(null);
      }, 3000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Ошибка отправки");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    let processedValue = value;
    
    // Специальная обработка для телефона
    if (field === "phone") {
      processedValue = formatPhone(value);
    }

    setFormData(prev => ({ ...prev, [field]: processedValue }));
    
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

  const contactInfo = [
    {
      icon: Phone,
      title: "Телефон",
      value: "+7 (495) 580-75-37",
      description: "Пн-Пт: 9:00 - 18:00"
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@weshow.su",
      description: "Ответим в течение 2 часов"
    },
    {
      icon: MapPin,
      title: "Адрес",
      value: "Москва, ул. Рочдельская, 14А",
      description: "Офис в центре города"
    },
    {
      icon: Clock,
      title: "Время работы",
      value: "9:00 - 18:00",
      description: "Понедельник - Пятница"
    }
  ];

  if (isSubmitted) {
    return (
      <section className="py-24 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Спасибо за обращение!
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Мы получили ваше сообщение и свяжемся с вами в ближайшее время.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              Отправить еще одно сообщение
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-40"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-6">
            📞 Свяжитесь с нами
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Готовы обсудить
            <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              ваш проект?
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Оставьте заявку, и мы свяжемся с вами для бесплатной консультации. 
            Наши эксперты помогут реализовать любые идеи!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/50 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Отправить заявку
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="contact-form-name">
                    Имя *
                  </label>
                  <Input
                    id="contact-form-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    placeholder="Ваше имя"
                    autoComplete="name"
                    required
                    className={`w-full ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.name && (
                    <div className="flex items-center mt-1 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.name}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="contact-form-email">
                    Email *
                  </label>
                  <Input
                    id="contact-form-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    placeholder="your@email.com"
                    autoComplete="email"
                    required
                    className={`w-full ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.email && (
                    <div className="flex items-center mt-1 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="contact-form-phone">
                    Телефон
                  </label>
                  <Input
                    id="contact-form-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    placeholder="+7 (___) ___-__-__"
                    autoComplete="tel"
                    className={`w-full ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <div className="flex items-center mt-1 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone}
                    </div>
                  )}
                  <p className="text-xs text-slate-500 mt-1">
                    Формат: +7 (XXX) XXX-XX-XX или 8 (XXX) XXX-XX-XX
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="contact-form-company">
                    Компания
                  </label>
                  <Input
                    id="contact-form-company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Название компании"
                    autoComplete="organization"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="contact-form-service">
                  Услуга
                </label>
                <Select
                  name="service"
                  value={formData.service}
                  onValueChange={(value) => handleChange("service", value)}
                >
                  <SelectTrigger id="contact-form-service" aria-label="Услуга">
                    <SelectValue placeholder="Выберите услугу" />
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
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="contact-form-message">
                  Сообщение *
                </label>
                <Textarea
                  id="contact-form-message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Опишите ваш проект или задайте вопрос..."
                  required
                  rows={4}
                  autoComplete="off"
                  className={`w-full ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.message && (
                  <div className="flex items-center mt-1 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.message}
                  </div>
                )}
                <p className="text-xs text-slate-500 mt-1">
                  Минимум 10 символов
                </p>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="mr-2 h-5 w-5" />
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </Button>
              {submitError && (
                <div className="flex items-center text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {submitError}
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Контактная информация
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                Мы всегда на связи и готовы ответить на ваши вопросы. 
                Свяжитесь с нами любым удобным способом.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      {info.title}
                    </h4>
                    <p className="text-slate-900 font-medium mb-1">
                      {info.value}
                    </p>
                    <p className="text-slate-600 text-sm">
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200/50">
              <h4 className="font-semibold text-slate-900 mb-3">
                🎯 Быстрый старт
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Оставьте заявку прямо сейчас и получите бесплатную консультацию 
                от наших экспертов в течение 2 часов!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;