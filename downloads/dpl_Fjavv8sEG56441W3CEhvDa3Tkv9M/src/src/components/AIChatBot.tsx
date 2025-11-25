import { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  DollarSign, 
  Calendar,
  Users,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface Recommendation {
  service: string;
  description: string;
  estimatedBudget: string;
  duration: string;
  technologies: string[];
  icon: React.ReactNode;
}

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<'welcome' | 'event-type' | 'budget' | 'recommendations'>('welcome');
  const [eventType, setEventType] = useState('');
  const [budget, setBudget] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const eventTypes = [
    { value: 'corporate', label: 'Корпоративное мероприятие', icon: Users },
    { value: 'exhibition', label: 'Выставка/Конференция', icon: Calendar },
    { value: 'entertainment', label: 'Развлекательное шоу', icon: Lightbulb },
    { value: 'wedding', label: 'Свадьба/Частное событие', icon: Sparkles },
    { value: 'educational', label: 'Образовательное мероприятие', icon: Lightbulb },
  ];

  const budgetRanges = [
    { value: 'low', label: 'До 500,000 ₽', range: '100,000 - 500,000 ₽' },
    { value: 'medium', label: '500,000 - 2,000,000 ₽', range: '500,000 - 2,000,000 ₽' },
    { value: 'high', label: 'Более 2,000,000 ₽', range: '2,000,000+ ₽' },
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startConversation();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startConversation = () => {
    const welcomeMessage: ChatMessage = {
      id: '1',
      type: 'bot',
      content: 'Привет! Я AI-ассистент WESHOW. Помогу подобрать идеальные решения для вашего мероприятия. Расскажите, какой тип мероприятия планируете?',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    setCurrentStep('event-type');
  };

  const addMessage = (content: string, type: 'user' | 'bot') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleEventTypeSelect = (type: string) => {
    const eventTypeData = eventTypes.find(et => et.value === type);
    setEventType(type);
    addMessage(`Выбрал: ${eventTypeData?.label}`, 'user');
    
    setIsTyping(true);
    setTimeout(() => {
      addMessage('Отлично! Теперь укажите примерный бюджет для вашего проекта:', 'bot');
      setCurrentStep('budget');
      setIsTyping(false);
    }, 1000);
  };

  const handleBudgetSelect = (budgetValue: string) => {
    const budgetData = budgetRanges.find(b => b.value === budgetValue);
    setBudget(budgetValue);
    addMessage(`Бюджет: ${budgetData?.label}`, 'user');
    
    setIsTyping(true);
    setTimeout(() => {
      generateRecommendations();
      setIsTyping(false);
    }, 1500);
  };

  const generateRecommendations = () => {
    const recs: Recommendation[] = [];
    
    if (eventType === 'corporate') {
      recs.push({
        service: '3D-маппинг для презентаций',
        description: 'Впечатляющие проекции для корпоративных мероприятий',
        estimatedBudget: '300,000 - 800,000 ₽',
        duration: '2-4 недели',
        technologies: ['3D-маппинг', 'Проекторы', 'Интерактивные элементы'],
        icon: <Sparkles className="w-5 h-5" />
      });
    }
    
    if (eventType === 'exhibition') {
      recs.push({
        service: 'Интерактивные выставочные стенды',
        description: 'Современные решения с VR/AR технологиями',
        estimatedBudget: '500,000 - 1,500,000 ₽',
        duration: '3-6 недель',
        technologies: ['VR/AR', 'Интерактивные экраны', 'Kinect-технологии'],
        icon: <Lightbulb className="w-5 h-5" />
      });
    }
    
    if (budget === 'high') {
      recs.push({
        service: 'Комплексное мультимедийное решение',
        description: 'Полный цикл от концепции до реализации',
        estimatedBudget: '2,000,000+ ₽',
        duration: '6-12 недель',
        technologies: ['3D-маппинг', 'LED-видеостены', 'Интерактивные зоны', 'VR/AR'],
        icon: <Sparkles className="w-5 h-5" />
      });
    }
    
    recs.push({
      service: 'Аренда оборудования',
      description: 'Профессиональное техническое оснащение',
      estimatedBudget: '100,000 - 500,000 ₽',
      duration: '1-7 дней',
      technologies: ['LED-панели', 'Проекторы', 'Звуковые системы'],
      icon: <DollarSign className="w-5 h-5" />
    });

    setRecommendations(recs);
    setCurrentStep('recommendations');
    
    addMessage('Вот мои рекомендации для вашего проекта:', 'bot');
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep('welcome');
    setEventType('');
    setBudget('');
    setRecommendations([]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-50"
      >
        <MessageCircle className="w-8 h-8" />
      </Button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-end p-4">
          <Card className="w-full max-w-md h-[600px] flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-md">
            <CardHeader className="pb-3 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  AI-ассистент WESHOW
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 text-slate-800 rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Interactive Elements */}
              <div className="p-4 border-t border-slate-200">
                {currentStep === 'event-type' && (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600 mb-3">Выберите тип мероприятия:</p>
                    {eventTypes.map((type) => (
                      <Button
                        key={type.value}
                        variant="outline"
                        onClick={() => handleEventTypeSelect(type.value)}
                        className="w-full justify-start h-auto p-3"
                      >
                        <type.icon className="w-4 h-4 mr-2 text-blue-600" />
                        {type.label}
                      </Button>
                    ))}
                  </div>
                )}

                {currentStep === 'budget' && (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600 mb-3">Укажите бюджет:</p>
                    {budgetRanges.map((budget) => (
                      <Button
                        key={budget.value}
                        variant="outline"
                        onClick={() => handleBudgetSelect(budget.value)}
                        className="w-full justify-start h-auto p-3"
                      >
                        <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                        {budget.label}
                      </Button>
                    ))}
                  </div>
                )}

                {currentStep === 'recommendations' && (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600 mb-3">Рекомендуемые решения:</p>
                    {recommendations.map((rec, index) => (
                      <div key={index} className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <div className="flex items-start gap-3">
                          <div className="text-blue-600 mt-1">{rec.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 mb-1">{rec.service}</h4>
                            <p className="text-sm text-slate-600 mb-2">{rec.description}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                              <span>💰 {rec.estimatedBudget}</span>
                              <span>⏱️ {rec.duration}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {rec.technologies.map((tech, techIndex) => (
                                <Badge key={techIndex} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      onClick={resetChat}
                      variant="outline"
                      className="w-full mt-4"
                    >
                      Начать заново
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AIChatBot;
