import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Простая валидация
    if (!formData.name || !formData.phone || !formData.email || !formData.serviceType) {
      toast.error("Пожалуйста, заполните обязательные поля");
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
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Заказать проект
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ваше имя"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Компания</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Название компании"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+7 (999) 123-45-67"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceType">Тип услуги *</Label>
            <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип услуги" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multimedia">Мультимедийные решения</SelectItem>
                <SelectItem value="software">Разработка ПО и игр</SelectItem>
                <SelectItem value="content">Разработка контента</SelectItem>
                <SelectItem value="technical">Техническое сопровождение</SelectItem>
                <SelectItem value="integration">Интеграция мультимедии</SelectItem>
                <SelectItem value="branding">Брендинг мероприятий</SelectItem>
                <SelectItem value="space-design">Проектирование пространств</SelectItem>
                <SelectItem value="installations">Проектирование инсталляций</SelectItem>
                <SelectItem value="3d-mapping">3D маппинг шоу</SelectItem>
                <SelectItem value="equipment-sales">Продажа оборудования</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Бюджет</Label>
              <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Примерный бюджет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-500k">До 500 тыс. руб.</SelectItem>
                  <SelectItem value="500k-1m">500 тыс. - 1 млн руб.</SelectItem>
                  <SelectItem value="1m-3m">1 - 3 млн руб.</SelectItem>
                  <SelectItem value="3m-5m">3 - 5 млн руб.</SelectItem>
                  <SelectItem value="over-5m">Свыше 5 млн руб.</SelectItem>
                  <SelectItem value="discuss">Обсудим при встрече</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeline">Сроки реализации</Label>
              <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Желаемые сроки" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Срочно (до 2 недель)</SelectItem>
                  <SelectItem value="month">В течение месяца</SelectItem>
                  <SelectItem value="quarter">В течение квартала</SelectItem>
                  <SelectItem value="flexible">Сроки гибкие</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание проекта</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Опишите ваш проект, задачи, особые требования..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" variant="hero">
              Отправить заявку
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectOrderModal;