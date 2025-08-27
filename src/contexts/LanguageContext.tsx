import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Переводы для основных элементов
const translations = {
  ru: {
    // Навигация
    'nav.home': 'Главная',
    'nav.services': 'Услуги',
    'nav.portfolio': 'Портфолио',
    'nav.about': 'О нас',
    'nav.team': 'Команда',
    'nav.contact': 'Контакты',
    'nav.news': 'Новости',
    'nav.blog': 'Блог',
    'nav.equipment': 'Оборудование',
    
    // Кнопки
    'btn.get-consultation': 'Получить консультацию',
    'btn.order-project': 'Заказать проект',
    'btn.learn-more': 'Узнать больше',
    'btn.view-showreel': 'Смотреть шоурил',
    'btn.subscribe': 'Подписаться',
    'btn.read-more': 'Читать далее',
    
    // Заголовки
    'hero.title': 'Современные мультимедийные решения',
    'hero.subtitle': 'Создаем впечатляющие интерактивные проекты с использованием передовых технологий',
    
    // Сервисы
    'services.title': 'Наши услуги',
    'services.subtitle': 'Комплексные решения для любых мероприятий',
    
    // Портфолио
    'portfolio.title': 'Наши проекты',
    'portfolio.subtitle': 'Реализованные работы и достижения',
    
    // О нас
    'about.title': 'О компании',
    'about.subtitle': 'Мы создаем будущее событий',
    
    // Команда
    'team.title': 'Наша команда',
    'team.subtitle': 'Профессионалы с многолетним опытом',
    
    // Контакты
    'contact.title': 'Свяжитесь с нами',
    'contact.subtitle': 'Готовы обсудить ваш проект',
    
    // Блог
    'blog.title': 'Блог',
    'blog.subtitle': 'Актуальные новости и экспертные материалы',
    'blog.categories.all': 'Все категории',
    'blog.categories.ai': 'Искусственный интеллект',
    'blog.categories.xr': 'XR технологии',
    'blog.categories.sustainability': 'Устойчивость',
    'blog.categories.design': 'Дизайн',
    
    // Формы
    'form.name': 'Имя',
    'form.email': 'Email',
    'form.phone': 'Телефон',
    'form.message': 'Сообщение',
    'form.send': 'Отправить',
    
    // Футер
    'footer.description': 'Современное агентство мультимедийных решений и интерактивных технологий',
    'footer.address': 'Адрес',
    'footer.phone': 'Телефон',
    'footer.email': 'Email',
    
    // Подписка
    'subscription.title': 'Подпишитесь на новости',
    'subscription.subtitle': 'Получайте актуальные материалы и эксклюзивные предложения',
    'subscription.placeholder': 'Ваш email',
    'subscription.success': 'Спасибо за подписку!',
    'subscription.error': 'Ошибка при подписке',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.team': 'Team',
    'nav.contact': 'Contact',
    'nav.news': 'News',
    'nav.blog': 'Blog',
    'nav.equipment': 'Equipment',
    
    // Buttons
    'btn.get-consultation': 'Get Consultation',
    'btn.order-project': 'Order Project',
    'btn.learn-more': 'Learn More',
    'btn.view-showreel': 'View Showreel',
    'btn.subscribe': 'Subscribe',
    'btn.read-more': 'Read More',
    
    // Headers
    'hero.title': 'Modern Multimedia Solutions',
    'hero.subtitle': 'Creating impressive interactive projects using cutting-edge technologies',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive solutions for any events',
    
    // Portfolio
    'portfolio.title': 'Our Projects',
    'portfolio.subtitle': 'Completed works and achievements',
    
    // About
    'about.title': 'About Company',
    'about.subtitle': 'We create the future of events',
    
    // Team
    'team.title': 'Our Team',
    'team.subtitle': 'Professionals with years of experience',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Ready to discuss your project',
    
    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Latest news and expert materials',
    'blog.categories.all': 'All Categories',
    'blog.categories.ai': 'Artificial Intelligence',
    'blog.categories.xr': 'XR Technologies',
    'blog.categories.sustainability': 'Sustainability',
    'blog.categories.design': 'Design',
    
    // Forms
    'form.name': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.message': 'Message',
    'form.send': 'Send',
    
    // Footer
    'footer.description': 'Modern agency of multimedia solutions and interactive technologies',
    'footer.address': 'Address',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    
    // Subscription
    'subscription.title': 'Subscribe to News',
    'subscription.subtitle': 'Get latest materials and exclusive offers',
    'subscription.placeholder': 'Your email',
    'subscription.success': 'Thank you for subscribing!',
    'subscription.error': 'Subscription error',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('ru');

  useEffect(() => {
    // Загружаем сохраненный язык из localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // ✅ Context7 оптимизация: мемоизация функции
  const handleLanguageChange = useCallback((newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  }, []);

  // ✅ Context7 оптимизация: мемоизация функции перевода
  const t = useCallback((key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.ru] || key;
  }, [language]);

  // ✅ Context7 оптимизация: мемоизация значения контекста
  const contextValue = useMemo(() => ({
    language,
    setLanguage: handleLanguageChange,
    t
  }), [language, handleLanguageChange, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
