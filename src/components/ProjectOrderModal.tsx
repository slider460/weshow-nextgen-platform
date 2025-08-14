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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Заказать проект
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
                placeholder="Ваше имя"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              />
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
                placeholder="+7 (xxx) xxx-xx-xx"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceType" className="text-sm font-medium text-gray-700">Тип услуги *</Label>
              <Select onValueChange={(value) => handleInputChange("serviceType", value)}>
                <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                  <SelectValue placeholder="Выберите услугу" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                  <SelectItem value="multimedia">Мультимедийные решения</SelectItem>
                  <SelectItem value="development">Разработка ПО и игр</SelectItem>
                  <SelectItem value="support">Техническое сопровождение</SelectItem>
                  <SelectItem value="integration">Интеграция мультимедии</SelectItem>
                  <SelectItem value="branding">Брендинг мероприятий</SelectItem>
                  <SelectItem value="equipment">Аренда оборудования</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-sm font-medium text-gray-700">Бюджет</Label>
              <Select onValueChange={(value) => handleInputChange("budget", value)}>
                <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                  <SelectValue placeholder="Выберите бюджет" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                  <SelectItem value="small">До 100,000 ₽</SelectItem>
                  <SelectItem value="medium">100,000 - 500,000 ₽</SelectItem>
                  <SelectItem value="large">500,000 - 1,000,000 ₽</SelectItem>
                  <SelectItem value="enterprise">Более 1,000,000 ₽</SelectItem>
                  <SelectItem value="discuss">Обсудить</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">Описание проекта</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Расскажите о вашем проекте, целях и требованиях..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline" className="text-sm font-medium text-gray-700">Сроки реализации</Label>
            <Select onValueChange={(value) => handleInputChange("timeline", value)}>
              <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                <SelectValue placeholder="Выберите сроки" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                <SelectItem value="urgent">Срочно (до 1 месяца)</SelectItem>
                <SelectItem value="fast">Быстро (1-3 месяца)</SelectItem>
                <SelectItem value="normal">Обычно (3-6 месяцев)</SelectItem>
                <SelectItem value="flexible">Гибкие сроки</SelectItem>
                <SelectItem value="discuss">Обсудить</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200">
              Отмена
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              Отправить заявку
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectOrderModal;