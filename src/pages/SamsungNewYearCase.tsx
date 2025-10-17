import React from 'react'

const SamsungNewYearCase = () => {

  // Данные кейса
  const caseData = {
    title: "Особенный Новый год Samsung, 2020",
    subtitle: "3D mapping декорации, digital зоны",
    company: {
      name: "Samsung",
      description: "SAMSUNG - Транснациональная компания по производству электроники, полупроводников, телекоммуникационного оборудования, чипов памяти, жидкокристаллических дисплеев, мобильных телефонов и мониторов. Основана в 1969 году."
    },
    tasks: [
      "Разработать уникальный контент для поддержки мероприятия и создания новогодней атмосферы.",
      "Подобрать и инсталлировать мультимедийное оборудование.",
      "Оказать полное техническое сопровождение всего мероприятия."
    ],
    technicalSolution: {
      title: "Техническое решение",
      description: [
        "Панорамные проекционные декорации новогоднего зимнего леса. сказочных персонажей и главного новогоднего символа.",
        "Проекционные сетки с системой автоматического сброса.",
        "Digital почтовый ящик для отправки поздравительных открыток в любую точку мира."
      ]
    },
    solutionDescription: [
      "Используя современные мультимедийные решения, мы погрузили участников в атмосферу новогодней сказки.",
      "Зимний лес, олени, белки и, конечно. Дед Мороз на санях это малая часть того, что участники наблюдали в течение всего мероприятия."
    ],
    digitalMailbox: {
      title: "Digital почтовый ящик",
      description: "Зона проекции «Почтовый ящик Деда Мороза» - участники заполняли поздравительные открытки и отправляли их в любую точку мира. При отправке срабатывал датчик, и на проекции появлялась одна из разработанных новогодних графических анимаций. Техническое решение: короткофокусный проектор, спрятанный в декорированном ящике, установленном прямо перед почтовым ящиком. Яркость проектора была настроена под освещение площадки. Сам почтовый ящик был выполнен из прозрачного стекла, в нем был установлен датчик, который при отправке открытки подавал сигнал на смену аудиовизуального контента на сервере."
    },
    results: {
      title: "Результат",
      video: {
        src: "/videos/samsung-new-year-2020.mp4",
        poster: "/images/cases/samsung/event-hall-wide.jpg"
      }
    },
    images: {
      eventHall: "/images/cases/samsung/event-hall-wide.jpg",
      digitalMailbox: [
        "/images/cases/samsung/digital-mailbox-1.jpg",
        "/images/cases/samsung/digital-mailbox-2.jpg"
      ],
      performance: "/images/cases/samsung/performance-stage.jpg"
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <img
          src={caseData.images.eventHall}
          alt="Event Hall"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900/70 to-blue-800/50"></div>
      </div>

      {/* Case Title and Subtitle Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {caseData.title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-200">
            {caseData.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="flex flex-col space-y-12">
          {/* Tasks Section */}
          <div className="relative pl-16">
            <h3 className="absolute left-0 top-0 text-green-500 text-2xl font-bold transform -rotate-90 origin-top-left whitespace-nowrap">
              Задачи
            </h3>
            <ul className="space-y-4 text-lg">
              {caseData.tasks.map((task, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Solution Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Техническое решение</h2>
            <div className="space-y-4 text-lg">
              {caseData.technicalSolution.description.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col space-y-12">
          {/* Solution Section */}
          <div className="relative pr-16">
            <h3 className="absolute right-0 top-0 text-gray-500 text-2xl font-bold transform rotate-90 origin-top-right whitespace-nowrap">
              Решение
            </h3>
            <div className="space-y-4 text-lg">
              {caseData.solutionDescription.map((desc, index) => (
                <p key={index}>{desc}</p>
              ))}
            </div>
          </div>

          {/* Main Event Image */}
          <div className="mt-12">
            <img
              src={caseData.images.eventHall}
              alt="Event Hall"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Digital Mailbox Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-600">{caseData.digitalMailbox.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {caseData.digitalMailbox.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {caseData.images.digitalMailbox.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Digital Mailbox ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <img
            src={caseData.images.performance}
            alt="Performance Stage"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Results Section with Video */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-10 text-white text-left">Результат</h2>
          <div className="relative w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl aspect-video">
            {!isVideoPlaying ? (
              <div
                className="absolute inset-0 bg-cover bg-center flex items-center justify-center cursor-pointer"
                style={{ backgroundImage: `url(${caseData.results.video.poster})` }}
                onClick={() => setIsVideoPlaying(true)}
              >
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-12 h-12 text-white fill-current" />
                  </div>
                </div>
                <p className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold drop-shadow-lg">
                  Смотреть
                </p>
              </div>
            ) : (
              <iframe
                className="w-full h-full"
                src={`${caseData.results.video.src}?autoplay=1`}
                title="Samsung New Year 2020 Event Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SamsungNewYearCase