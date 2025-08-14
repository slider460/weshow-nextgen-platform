import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log("Form submitted:", formData);
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
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      value: "info@weshow.ru",
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Имя *
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Ваше имя"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Телефон
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Компания
                  </label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Название компании"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Услуга
                </label>
                <Select value={formData.service} onValueChange={(value) => handleChange("service", value)}>
                  <SelectTrigger>
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
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Сообщение *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Опишите ваш проект или задайте вопрос..."
                  required
                  rows={4}
                  className="w-full"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="mr-2 h-5 w-5" />
                Отправить заявку
              </Button>
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