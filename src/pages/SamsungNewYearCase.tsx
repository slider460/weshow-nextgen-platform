import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Play, ExternalLink } from 'lucide-react'

const SamsungNewYearCase = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // Данные кейса
  const caseData = {
    title: "Особенный Новый год Samsung, 2020",
    subtitle: "3D mapping декорации, digital зоны",
    company: {
      name: "Samsung",
      description: "Транснациональная компания, специализирующаяся на производстве электроники, телекоммуникационного оборудования и мониторов."
    },
    tasks: [
      "Разработать уникальный контент для поддержки мероприятия",
      "Подобрать и инсталлировать мультимедийное оборудование", 
      "Оказать полное техническое сопровождение всего мероприятия"
    ],
    technicalSolution: {
      title: "Техническое решение",
      description: "Панорамные проекционные декорации новогоднего зимнего леса, сказочных персонажей и главного новогоднего символа. Проекционные сетки с системой автоматического сброса.",
      digitalMailbox: {
        title: "Digital почтовый ящик",
        description: "Интерактивная зона для отправки поздравительных открыток в любую точку мира. Деда Мороз в цифровом формате принимает поздравления и отправляет их адресатам. Проектор 4K с системой распознавания жестов."
      }
    },
    solution: {
      title: "Решение",
      description: "Создали иммерсивную атмосферу зимнего леса с оленями, белками и, конечно, Дедом Морозом. Интерактивные зоны позволили гостям стать частью сказочного действа."
    },
    result: {
      title: "Результат",
      description: "Успешное проведение корпоративного мероприятия с уникальным новогодним контентом. Более 500 участников получили незабываемые впечатления от интерактивных зон и 3D проекций."
    },
    images: [
      {
        src: "/images/cases/samsung/event-hall-wide.jpg",
        alt: "Общий вид зала с проекциями зимнего леса",
        category: "Общий вид"
      },
      {
        src: "/images/cases/samsung/digital-mailbox-1.jpg", 
        alt: "Интерактивный почтовый ящик с Снегурочкой",
        category: "Digital почтовый ящик"
      },
      {
        src: "/images/cases/samsung/digital-mailbox-2.jpg",
        alt: "Гость взаимодействует с цифровым почтовым ящиком", 
        category: "Digital почтовый ящик"
      },
      {
        src: "/images/cases/samsung/performance-stage.jpg",
        alt: "Сценическое выступление с LED экраном",
        category: "Результат"
      },
      {
        src: "/images/cases/samsung/3d-projections.jpg",
        alt: "3D проекции новогодних персонажей",
        category: "Техническое решение"
      },
      {
        src: "/images/cases/samsung/guests-interaction.jpg",
        alt: "Гости взаимодействуют с интерактивными зонами",
        category: "Решение"
      }
    ],
    video: {
      src: "/videos/samsung-new-year-2020.mp4",
      poster: "/images/cases/samsung/video-poster.jpg",
      title: "Видео с мероприятия Samsung Новый год 2020"
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % caseData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + caseData.images.length) % caseData.images.length)
  }

  const imagesByCategory = caseData.images.reduce((acc, image, index) => {
    if (!acc[image.category]) {
      acc[image.category] = []
    }
    acc[image.category].push({ ...image, index })
    return acc
  }, {} as Record<string, Array<typeof caseData.images[0] & { index: number }>>)

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/cases/samsung/event-hall-wide.jpg')"
          }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/70 to-blue-800/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
            {caseData.title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-8 drop-shadow-lg">
            {caseData.subtitle}
          </p>
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <span className="text-2xl font-bold text-white">S</span>
            </div>
          </div>
        </div>
      </div>

      {/* Company Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Компания</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {caseData.company.description}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-800/20 to-slate-800/20 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold mb-4">{caseData.company.name}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Электроника</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Телекоммуникации</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Мониторы и дисплеи</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tasks Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-8">
                <div className="w-1 h-16 bg-green-400 mr-6"></div>
                <h2 className="text-4xl font-bold">Задачи</h2>
              </div>
              <div className="space-y-6">
                {caseData.tasks.map((task, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex-shrink-0 mt-1"></div>
                    <p className="text-lg text-gray-300">{task}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-800/20 to-slate-800/20 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Ключевые требования</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Уникальный контент</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Мультимедийное оборудование</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Техническое сопровождение</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-8">Техническое решение</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {caseData.technicalSolution.description}
              </p>
              
              <div className="bg-gradient-to-br from-blue-800/20 to-slate-800/20 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-12 bg-gray-400 mr-4"></div>
                  <h3 className="text-2xl font-bold">{caseData.technicalSolution.digitalMailbox.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {caseData.technicalSolution.digitalMailbox.description}
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              {imagesByCategory["Техническое решение"]?.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                    <button className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                      <ExternalLink className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {imagesByCategory["Решение"]?.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                    <button className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                      <ExternalLink className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <div className="flex items-center mb-8">
                <div className="w-1 h-16 bg-gray-400 mr-6"></div>
                <h2 className="text-4xl font-bold">{caseData.solution.title}</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                {caseData.solution.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Mailbox Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-8">
                <div className="w-1 h-16 bg-gray-400 mr-6"></div>
                <h2 className="text-4xl font-bold">{caseData.technicalSolution.digitalMailbox.title}</h2>
              </div>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {caseData.technicalSolution.digitalMailbox.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {imagesByCategory["Digital почтовый ящик"]?.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                    <button className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                      <ExternalLink className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Видео с мероприятия</h2>
            <p className="text-lg text-gray-300">Посмотрите, как проходил Особенный Новый год Samsung</p>
          </div>
          
          <div className="relative group max-w-4xl mx-auto">
            <div className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              {!isVideoPlaying ? (
                <div className="relative h-full">
                  <img 
                    src={caseData.video.poster} 
                    alt={caseData.video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button 
                      onClick={() => setIsVideoPlaying(true)}
                      className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-colors group"
                    >
                      <Play className="w-12 h-12 ml-1" />
                    </button>
                  </div>
                </div>
              ) : (
                <video 
                  src={caseData.video.src}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Result Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-8">{caseData.result.title}</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {caseData.result.description}
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                  <div className="text-sm text-gray-400">Участников</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
                  <div className="text-sm text-gray-400">Успех</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                  <div className="text-sm text-gray-400">Поддержка</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {imagesByCategory["Результат"]?.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                    <button className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                      <ExternalLink className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Галерея проекта</h2>
            <p className="text-lg text-gray-300">Больше фотографий с мероприятия</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {caseData.images.map((image, index) => (
              <div key={index} className="relative group aspect-square">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                    <ExternalLink className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                    <p className="text-sm font-medium">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Хотите такой же результат?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Создадим незабываемое мероприятие для вашей компании
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              Обсудить проект
            </button>
            <button className="border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              Посмотреть портфолио
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SamsungNewYearCase
