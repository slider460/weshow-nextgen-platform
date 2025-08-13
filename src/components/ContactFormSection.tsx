import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
const ContactFormSection = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в течение 30 минут."
    });
    setFormData({
      name: "",
      phone: "",
      email: "",
      company: "",
      service: "",
      message: ""
    });
    setIsSubmitting(false);
  };
  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return <section id="contact" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Свяжитесь с нами
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Готовы обсудить ваш проект? Оставьте заявку, и наш эксперт свяжется с вами 
            для бесплатной консультации
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Получить консультацию
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-slate-700">Имя *</Label>
                  <Input id="name" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} placeholder="Ваше имя" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-slate-700">Телефон *</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={e => handleInputChange("phone", e.target.value)} placeholder="+7 (000) 000-00-00" required className="mt-1" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-slate-700">Email *</Label>
                  <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} placeholder="your@email.com" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="company" className="text-slate-700">Компания</Label>
                  <Input id="company" value={formData.company} onChange={e => handleInputChange("company", e.target.value)} placeholder="Название компании" className="mt-1" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="service" className="text-slate-700">Интересующая услуга</Label>
                <Select value={formData.service} onValueChange={value => handleInputChange("service", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Выберите услугу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multimedia">Мультимедийные решения</SelectItem>
                    <SelectItem value="integration">Техническая интеграция</SelectItem>
                    <SelectItem value="events">Организация мероприятий</SelectItem>
                    <SelectItem value="equipment">Поставка оборудования</SelectItem>
                    <SelectItem value="consultation">Консультация</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message" className="text-slate-700">Описание проекта</Label>
                <Textarea id="message" value={formData.message} onChange={e => handleInputChange("message", e.target.value)} placeholder="Расскажите подробнее о ваших задачах и требованиях..." rows={4} className="mt-1" />
              </div>
              
              <div className="text-sm text-slate-600">
                Нажимая кнопку "Отправить заявку", вы соглашаетесь с{" "}
                <a href="/privacy" className="text-blue-500 hover:underline">
                  политикой конфиденциальности
                </a>
              </div>
              
              <Button type="submit" size="lg" className="w-full" variant="default" disabled={isSubmitting}>
                {isSubmitting ? "Отправляем..." : "Отправить заявку"}
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                Контактная информация
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Телефон</h4>
                    <a href="tel:+74951234567" className="text-slate-600 hover:text-blue-500 transition-colors block">
                      +7 (495) 123-45-67
                    </a>
                    <a href="tel:+78005555555" className="text-slate-600 hover:text-blue-500 transition-colors block">
                      +7 (800) 555-55-55
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                    <a href="mailto:info@weshow.ru" className="text-slate-600 hover:text-blue-500 transition-colors block">
                      info@weshow.ru
                    </a>
                    <a href="mailto:sales@weshow.ru" className="text-slate-600 hover:text-blue-500 transition-colors block">
                      sales@weshow.ru
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">г. Москва, ул. Рочдельская, д. 14А
                  </h4>
                    <p className="text-slate-600">
                      г. Москва, ул. Тверская, д. 123<br />
                      БЦ "Технопарк", офис 456
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Время работы</h4>
                    <p className="text-slate-600">
                      Пн-Пт: 9:00 - 18:00<br />
                      Техподдержка: 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="gradient-card-dark rounded-3xl p-6">
              <h4 className="font-semibold text-white mb-4">Нужна срочная помощь?</h4>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-white/30 text-white hover:bg-white/20" asChild>
                  <a href="tel:+74951234567">
                    <Phone className="mr-2 h-4 w-4" />
                    Заказать обратный звонок
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start border-white/30 text-white hover:bg-white/20" asChild>
                  <a href="https://t.me/weshow_support" target="_blank" rel="noopener noreferrer">
                    <Mail className="mr-2 h-4 w-4" />
                    Написать в Telegram
                  </a>
                </Button>
              </div>
            </div>

            <div className="text-center p-6 gradient-card-purple rounded-3xl">
              <div className="text-2xl font-bold text-white mb-2">≤ 30 минут</div>
              <div className="text-sm text-white/90">
                Среднее время ответа на заявки<br />
                в рабочее время
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactFormSection;