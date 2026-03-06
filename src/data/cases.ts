// Локальные данные кейсов с Dropbox ссылками
export interface LocalCase {
  id: string;
  title: string;
  client: string;
  year: string;
  description: string;
  results: string[];
  technologies: string[];
  image_url?: string;
  video_url?: string;
  is_visible: boolean;
  sort_order: number;
}

export const localCases: LocalCase[] = [
  {
    id: 'samara-stand-vdnh',
    title: 'Стенд Самарской области на ВДНХ',
    client: 'Правительство Самарской области',
    year: '2024',
    description: 'Стенд Самарской области был представлен на международной выставке-форуме «Россия» в Москве (ВДНХ), которая проходила с 4 ноября 2023 года по 8 июля 2024 года и привлекла более 18 миллионов посетителей. Главная задача — демонстрация культурных, экономических и инновационных достижений региона через современную экспозицию в виде ладьи, символизирующей историческое наследие Самарской области.',
    results: [
      'Более 18 миллионов посетителей',
      'Специальный приз оргкомитета «За лучшую просветительскую деятельность»',
      'Один из самых посещаемых стендов на форуме',
      'Признан одним из самых технологичных на выставке «Россия»'
    ],
    technologies: [
      'Naked Eye 3D',
      'Кинетический экран',
      'Прозрачные LED-панели',
      'Интерактивные тач-панели',
      'VR и AR приложения',
      'Синхронизированная система запуска мультимедийного шоу'
    ],
    image_url: '/portfolio/samara-vdnh/gallery-1.jpg',
    video_url: 'https://www.dropbox.com/scl/fi/drwpmae1kg322wk1pk8er/1_.mp4?rlkey=iaqb0rd7trfgbgw9i3drnjiv7&st=tx799nib&raw=1',
    is_visible: true,
    sort_order: 1
  },
  {
    id: 'samsung-new-year-2020',
    title: 'Особенный Новый год Samsung',
    client: 'Samsung',
    year: '2020',
    description: 'Масштабное новогоднее мероприятие с интерактивными технологиями и мультимедийными эффектами.',
    results: [
      'Успешное проведение мероприятия',
      'Высокие оценки участников',
      'Инновационный подход к организации праздника'
    ],
    technologies: [
      'Интерактивные экраны',
      'Проекционный маппинг',
      'Звуковое оборудование',
      'Осветительные системы'
    ],
    image_url: '/images/cases/samsung/event-hall-wide.jpg',
    video_url: '/videos/samsung-new-year-2020.mp4',
    is_visible: true,
    sort_order: 2
  }
  // Дополнительные кейсы можно добавить здесь
];

