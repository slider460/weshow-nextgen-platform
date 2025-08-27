import Header from "../components/Header";
import Footer from "../components/Footer";
import MapboxMap from "../components/MapboxMap";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Phone, Mail, MapPin, Clock, Send, Navigation, Building, Car, Train } from "lucide-react";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Заявка отправлена",
      description: "Мы свяжемся с вами в ближайшее время"
    });
    
    setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Телефон",
      content: "+7 (495) 580-75-37",
      link: "tel:+74955807537"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "info@weshow.ru",
      link: "mailto:info@weshow.ru"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Адрес",
      content: "Москва, ул. Рочдельская, 14А",
      link: ""
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Время работы",
      content: "Пн-Пт: 09:00-21:00",
      link: ""
    }
  ];

  const addressDetails = [
    {
      icon: <Building className="h-5 w-5" />,
      title: "Здание",
      description: "Бизнес-центр 'Рочдельская'"
    },
    {
      icon: <Train className="h-5 w-5" />,
      title: "Метро",
      description: "5 минут от ст. м. 'Краснопресненская'"
    },
    {
      icon: <Car className="h-5 w-5" />,
      title: "Парковка",
      description: "Бесплатная парковка для клиентов"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-blue-300/30">
              <MapPin className="h-5 w-5 mr-2 animate-pulse" />
              Свяжитесь с нами
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-8 leading-tight">
              Контакты
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Свяжитесь с нами и начните создавать удивительные проекты
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-3xl font-semibold text-slate-900 mb-8">Отправить заявку</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Компания</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="service">Услуга</Label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multimedia">Мультимедийные решения</SelectItem>
                      <SelectItem value="software">Разработка ПО</SelectItem>
                      <SelectItem value="support">Техническая поддержка</SelectItem>
                      <SelectItem value="consultation">Консультация</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Расскажите о вашем проекте..."
                    className="mt-2"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-semibold text-slate-900 mb-8">Как нас найти</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                        <div className="text-slate-600">
                          {info.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{info.title}</h3>
                        {info.link ? (
                          <a href={info.link} className="text-slate-600 hover:text-blue-500 transition-colors">
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-slate-600">{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address Details */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Детали адреса</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {addressDetails.map((detail, index) => (
                    <div key={index} className="text-center p-3 bg-white rounded-xl border border-slate-200">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <div className="text-blue-600">
                          {detail.icon}
                        </div>
                      </div>
                      <h4 className="font-medium text-slate-900 text-sm mb-1">{detail.title}</h4>
                      <p className="text-slate-600 text-xs">{detail.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Map */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Наше расположение</h3>
                <MapboxMap 
                  address="Москва, ул. Рочдельская, 14А"
                  coordinates={[37.6156, 55.7796]}
                  className="w-full h-80"
                  showAddressInfo={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Добро пожаловать в WESHOW
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Удобное расположение</h3>
                <p className="text-slate-600 text-sm">
                  В центре Москвы, рядом с метро и основными транспортными магистралями
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Гибкий график</h3>
                <p className="text-slate-600 text-sm">
                  Работаем с 9:00 до 21:00, готовы подстроиться под ваше время
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Navigation className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Легко добраться</h3>
                <p className="text-slate-600 text-sm">
                  От метро "Краснопресненская" всего 5 минут пешком
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;