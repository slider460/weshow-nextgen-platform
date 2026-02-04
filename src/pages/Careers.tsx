import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Users, 
  Zap, 
  Star, 
  Globe, 
  Heart, 
  TrendingUp, 
  Award, 
  Send,
  Upload,
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { submitForm } from "../utils/submitForm";

const Careers = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    education: "",
    skills: "",
    coverLetter: "",
    portfolio: "",
    linkedin: "",
    expectedSalary: "",
    startDate: "",
    source: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitForm("Карьера", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        experience: formData.experience,
        education: formData.education,
        skills: formData.skills,
        coverLetter: formData.coverLetter,
        portfolio: formData.portfolio,
        linkedin: formData.linkedin,
        expectedSalary: formData.expectedSalary,
        startDate: formData.startDate,
        source: formData.source,
      });

      toast({
        title: "Резюме отправлено!",
        description: "Мы рассмотрим вашу кандидатуру и свяжемся с вами в ближайшее время",
      });

      setFormData({
        firstName: "", lastName: "", email: "", phone: "", position: "",
        experience: "", education: "", skills: "", coverLetter: "",
        portfolio: "", linkedin: "", expectedSalary: "", startDate: "", source: "",
      });
    } catch (error) {
      toast({
        title: "Не удалось отправить",
        description: error instanceof Error ? error.message : "Попробуйте позже",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Команда экспертов",
      description: "Работайте с профессионалами своего дела"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Быстрый рост",
      description: "Карьерный рост и развитие навыков"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Инновации",
      description: "Передовые технологии и креативные решения"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Глобальные проекты",
      description: "Участвуйте в международных проектах"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Дружественная атмосфера",
      description: "Комфортная рабочая среда"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Стабильность",
      description: "Надежная компания с 15+ летним опытом"
    }
  ];

  const openPositions = [
    {
      title: "Frontend Developer",
      department: "Разработка",
      type: "Полная занятость",
      location: "Москва",
      experience: "2+ лет",
      skills: ["React", "TypeScript", "Vue.js"],
      description: "Разработка современных веб-приложений и интерфейсов"
    },
    {
      title: "UI/UX Designer",
      department: "Дизайн",
      type: "Полная занятость",
      location: "Москва",
      experience: "3+ лет",
      skills: ["Figma", "Adobe Creative Suite", "Prototyping"],
      description: "Создание пользовательских интерфейсов и опыта"
    },
    {
      title: "Project Manager",
      department: "Управление проектами",
      type: "Полная занятость",
      location: "Москва",
      experience: "4+ лет",
      skills: ["Agile", "Scrum", "Team Leadership"],
      description: "Управление мультимедийными проектами"
    },
    {
      title: "3D Artist",
      department: "3D Графика",
      type: "Полная занятость",
      location: "Москва",
      experience: "2+ лет",
      skills: ["Blender", "Maya", "Substance Painter"],
      description: "Создание 3D моделей и анимаций"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-sm font-medium text-blue-700 mb-6">
              🚀 Карьера в WESHOW
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Присоединяйтесь к
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                команде мечты
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              Создавайте будущее мультимедийных технологий вместе с нами. 
              Мы ищем талантливых профессионалов, готовых к вызовам и инновациям.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-4 text-lg" onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}>
                Открытые вакансии
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg" onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Отправить резюме
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why WESHOW Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Почему выбирают WESHOW?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Мы создаем не просто рабочее место, а пространство для роста, 
              творчества и реализации самых смелых идей
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Открытые вакансии
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Выберите подходящую позицию или отправьте нам свое резюме для рассмотрения
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{position.title}</CardTitle>
                      <CardDescription className="text-base">{position.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-2">{position.department}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">{position.type}</Badge>
                    <Badge variant="outline">{position.location}</Badge>
                    <Badge variant="outline">{position.experience}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {position.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Откликнуться на вакансию
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                Отправить резюме
              </h2>
              <p className="text-xl text-slate-600">
                Заполните форму ниже, и мы свяжемся с вами в ближайшее время
              </p>
            </div>
            
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Заявка на вакансию</CardTitle>
                <CardDescription>
                  Расскажите о себе и своих профессиональных целях
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
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
                  </div>

                  {/* Professional Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="position">Желаемая должность *</Label>
                      <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Выберите должность" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                          <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                          <SelectItem value="project-manager">Project Manager</SelectItem>
                          <SelectItem value="3d-artist">3D Artist</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="experience">Опыт работы</Label>
                      <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Выберите опыт" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no-experience">Без опыта</SelectItem>
                          <SelectItem value="1-2-years">1-2 года</SelectItem>
                          <SelectItem value="3-5-years">3-5 лет</SelectItem>
                          <SelectItem value="5-plus-years">5+ лет</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="education">Образование</Label>
                      <Input
                        id="education"
                        value={formData.education}
                        onChange={(e) => handleInputChange("education", e.target.value)}
                        className="mt-2"
                        placeholder="Укажите ваше образование"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expectedSalary">Ожидаемая зарплата</Label>
                      <Input
                        id="expectedSalary"
                        value={formData.expectedSalary}
                        onChange={(e) => handleInputChange("expectedSalary", e.target.value)}
                        className="mt-2"
                        placeholder="В рублях"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="skills">Ключевые навыки</Label>
                    <Textarea
                      id="skills"
                      rows={3}
                      value={formData.skills}
                      onChange={(e) => handleInputChange("skills", e.target.value)}
                      className="mt-2"
                      placeholder="Опишите ваши технические и профессиональные навыки"
                    />
                  </div>

                  <div>
                    <Label htmlFor="coverLetter">Сопроводительное письмо</Label>
                    <Textarea
                      id="coverLetter"
                      rows={5}
                      value={formData.coverLetter}
                      onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                      className="mt-2"
                      placeholder="Расскажите, почему вы хотите работать в WESHOW и что можете предложить компании"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="portfolio">Портфолио/Сайт</Label>
                      <Input
                        id="portfolio"
                        type="url"
                        value={formData.portfolio}
                        onChange={(e) => handleInputChange("portfolio", e.target.value)}
                        className="mt-2"
                        placeholder="https://your-portfolio.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange("linkedin", e.target.value)}
                        className="mt-2"
                        placeholder="https://linkedin.com/in/your-profile"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="startDate">Когда готовы приступить к работе</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange("startDate", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="source">Откуда узнали о вакансии</Label>
                      <Select value={formData.source} onValueChange={(value) => handleInputChange("source", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Выберите источник" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Сайт компании</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="hh-ru">HeadHunter</SelectItem>
                          <SelectItem value="recommendation">Рекомендация</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Отправка...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Отправить заявку
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Остались вопросы?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Свяжитесь с нашим HR отделом для получения дополнительной информации
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <Mail className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                <a href="mailto:hr@weshow.su" className="text-blue-600 hover:underline">
                  hr@weshow.su
                </a>
              </div>
              <div className="flex flex-col items-center">
                <Phone className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Телефон</h3>
                <a href="tel:+74955807537" className="text-blue-600 hover:underline">
                  +7 (495) 580-75-37
                </a>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Адрес</h3>
                <p className="text-slate-600">Москва, ул. Рочдельская, 14А</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
