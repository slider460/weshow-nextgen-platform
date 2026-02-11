import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Play, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { defaultSuccessMessage, submitForm } from "@/utils/submitForm";

const PLACEHOLDER_IMAGE = "/images/cases/cadr_shapka_production.jpg";

const VideoProductionTest = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedPresentation, setSelectedPresentation] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Убеждаемся, что видео воспроизводится при загрузке
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }, []);

  // Заглушки для видео - здесь можно добавить реальные ссылки на видео
  const VIDEO_LINKS = {
    vivax: "https://dl.dropboxusercontent.com/scl/fi/b2ivtik0ttc7bonru4j59/Vivax-Samburskaya.mp4?rlkey=wzo381ja98w1lyvjxeedrbing&st=nykv18ux&dl=1",
    uaz: "https://dl.dropboxusercontent.com/scl/fi/mdlh2n2cgjf0isub18ccv/Eaton-Yaz.mp4?rlkey=xjpsfo2ze8s0jw0h13s8nvtm8&st=036x39t3&dl=1",
    commercial3: "#",
    commercial4: "#",
    rzd: "https://dl.dropboxusercontent.com/scl/fi/2slylsi1cof0lk0m6fj5n/TransRZHD.mp4?rlkey=hvcfkzjv4tv8406erig5bbw3t&st=rmpzw6bv&dl=1",
    powerTech: "https://dl.dropboxusercontent.com/scl/fi/1849hhpkqqgxde8sl2zpm/PT-Film-LONG.mp4?rlkey=nm1vqmqyupuwbdt0edvy79mid&st=8q4ueer8&dl=1",
    samara: "https://dl.dropboxusercontent.com/scl/fi/b5xfxbxq2ctciv6sb9dah/_-_10_11_-_-_-_1-2.mp4?rlkey=k4qop1iacd7qfo7pelxllz9fh&st=1xetlrft&dl=1",
    salaris: "https://dl.dropboxusercontent.com/scl/fi/jz5iacdkdrbrysk5wfnqg/Salaris-Event-FIN180416.mp4?rlkey=0g49wp4tw2xpqmcgm3my5vxx2&st=nfzaeg7k&dl=1",
    riviera: "https://dl.dropboxusercontent.com/scl/fi/62wm7fvtx99kqn05wvf7g/Event-Riviera.mp4?rlkey=nm1rh6ambgyxm8svihy67nrnj&st=gruet627&dl=1",
    gazel: "https://dl.dropboxusercontent.com/scl/fi/tupa7czpthg8tr7km538y/GAZelle-Transformer.mp4?rlkey=f5jr84m8ntrxw6u5rn686d203&st=4gyka5cn&dl=1",
    saintGobain: "https://dl.dropboxusercontent.com/scl/fi/k4jgzsfyjbdbqchn3mz86/1_HD_.mp4?rlkey=ljpho5nyl3xgqe6swmuv1y0nj&st=edswozru&dl=1",
    presentation1: "https://dl.dropboxusercontent.com/scl/fi/3v7ybi2c1379bbopgukln/oncept_4-elements_-Samara_250805.mp4?rlkey=s4n9fenmvti9l12olvqoy5z9q&st=p0g6i7p3&dl=1",
    presentation2: "https://dl.dropboxusercontent.com/scl/fi/lmtvphbf53ybgq009gbtg/oncept_5-spirits_Samara_250805.mp4?rlkey=b38z6uewja0rkbo4vmecfnm52&st=04dq2adv&dl=1",
    presentation3: "https://dl.dropboxusercontent.com/scl/fi/e9qzej9iswr97fen0ge9c/Concept_1.mp4?rlkey=94iat4q7fyim5trdit6gqnm0e&st=0y6f9lqp&dl=1",
    presentation4: "https://dl.dropboxusercontent.com/scl/fi/a9lr4lpqne1rey5l3kvny/Concept_2.mp4?rlkey=jamwjbtpw31u7x2di8otzymwh&st=x1snvfof&dl=1",
    presentation5: "https://dl.dropboxusercontent.com/scl/fi/l9wpb30i6agr1o3zuunvd/Concept_content_Samara_250805.mp4?rlkey=srmhqn6c1dcordiow8a5o9hgy&st=nfnqg64j&dl=1",
  };

  // Заглушки для изображений
  const getPlaceholderImage = (index: number) => {
    const images = [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEpazIaO5UXFK_LntbKgkOTZ1Tm8E0WiX7sS1bOdnhpo3AWlKwS4I4s-GbWeEuRNt5VVhDcEp0q4nMc7K7rt12Gf474EzPq3d-4ZGVIsS6ySXvx5pXCkJfufWdTd1s4eF4lcfsHu6KD2tEzAzGc_NHiNiRlRu2xbU76iUG7zyAP4Ha9qnalSlSD1H_0O8IbSEYA0N54s5V9N5-n8ngFGCO46_548EAFsbCv2e-dheGbVTbNiSHomDgu_MZSxVWnG9_ndcaG9VKmONI",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAp9wcPoAFCLVcIfoWSAd35zhMZiQL_Vyzn1KczoTcfVrJQb3kmaqMTYUIOHV6JmSqonIT3zc9vfmjErB8qXydb4qe3MhXPPkvuiTtTGieoaknhfwmYDIAGCuo-l_OcWcBngTn6sYaczJRV2D5obJ8uQMTH7bTeRaEaXzJdAg3gsSx5_5YX_bLzLRbUDmFM1kMa4npM8Jz2iDh83vRUbLP_HRY-P7QsTw2SneuNPdICCdt1vzD3iR7_Ge8h4RB7pfjtFiPEwIVX5gH8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDd0MAyLz-fr9jL4tROX_j6Z1IN-AUyAlLa29N3YVZUhZghVnzKV3vns6g6Hk5EFaxK2azwqw81qMe75p7VBU9DQt_RDmYEQfhp9VqLvZJwb-sgrPMOfsXt_-XV-Da5WB_ZPPy2No2M7GCIclEScQtStv-oYsrD3ZWItCVVIi580twu1eSYP0-ZVu6DYxdfKkKx4JOal4aM-SEBXdtLAqqTJScs_oQRl1zcM67FkwSjvSVCsgJ6CWwmjN87Uk_pL1VgnV1WHfXTylE6",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlvv7r7WlSgKJDhFaSJKxX9U0e9eLI3BVb3e1RLg6IqXRVVNLrLWeMCKBCYndv9Pq3binSzjg7M1Ofs12ZMAbS61Tzg6Gi87NLEPPIMd7NYBk3ypWsiv7asILwGB-tw41PVfGnlNxdRgDWzmTWZJbMnvfjsZ-cBFWmmDew7GqB4qeL5WL0rKItC2CASrXaakH8cWfNVN6Debhai7ZZRkaObtzFoUJlbWPlpPWMeaYUIuOp3OIO2eZnnh_zuIxifCEoF8bs3_qGtwxX",
    ];
    return images[index % images.length] || `https://images.unsplash.com/photo-${1612345678 + index}?w=800&h=600&fit=crop`;
  };

  // Данные для видеопрезентаций
  const presentations = [
    { id: 1, title: "Концепция 1", label: "Видео 1", image: "/images/cases/4 stihii_samara.jpg" },
    { id: 2, title: "Концепция 2", label: "Видео 2", image: "/images/cases/5 stihy_samara.jpg" },
    { id: 3, title: "Визуализация стенда 1", label: "Видео 3", image: "/images/cases/vizual_1_samara.jpg" },
    { id: 4, title: "Визуализация стенда 2", label: "Видео 4", image: "/images/cases/vizual_2_samara.jpg" },
    { id: 5, title: "Концепция контента для стенда", label: "Видео 5", image: "/images/cases/content_samara.jpg" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitForm("Видеопродакшн", {
        name: formData.name,
        contact: formData.contact,
        comment: formData.comment,
      });
      setIsSuccess(true);
      setFormData({ name: '', contact: '', comment: '' });
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Ошибка отправки");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300; // Ширина одного элемента + отступ
      const currentScroll = carouselRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      carouselRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] dark:bg-[#101622] text-[#1E1E1E] dark:text-white font-display">
      <SEOHead
        title="Видеопродакшн — WESHOW"
        description="Видеопродакшн рекламных роликов, репортажей и презентаций. Съёмка, монтаж, графика. Услуги WESHOW."
        url="https://weshow.su/services/video-production"
      />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[500px] w-full flex items-center justify-center text-center overflow-hidden bg-gray-800">
          {/* Заглушка - показывается до загрузки видео */}
          <div className="absolute inset-0 z-0 bg-gray-800">
            <img
              src={PLACEHOLDER_IMAGE}
              alt="Видеопродакшн"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
              }`}
              loading="eager"
              style={{ 
                minWidth: '100%',
                minHeight: '100%',
                objectFit: 'cover',
                display: videoLoaded && !videoError ? 'none' : 'block'
              }}
              onLoad={() => {
                console.log('Placeholder image loaded successfully');
              }}
              onError={(e) => {
                console.error('Placeholder image error:', e);
              }}
            />
          </div>
          
          {!videoError ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className={`absolute inset-0 z-0 w-full h-full object-cover transition-opacity duration-700 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                minWidth: '100%',
                minHeight: '100%',
                objectFit: 'cover'
              }}
              onCanPlay={() => {
                console.log('Video can play');
                setVideoLoaded(true);
                if (videoRef.current) {
                  videoRef.current.play().catch((err) => {
                    console.error('Play error:', err);
                  });
                }
              }}
              onLoadedData={() => {
                console.log('Video loaded');
                setVideoLoaded(true);
                if (videoRef.current) {
                  videoRef.current.play().catch((err) => {
                    console.error('Play error:', err);
                  });
                }
              }}
              onError={(e) => {
                console.error('Video error:', e);
                setVideoError(true);
                setVideoLoaded(false);
              }}
              onLoadStart={() => {
                console.log('Video loading started');
                setVideoLoaded(false);
              }}
            >
              <source src="https://dl.dropboxusercontent.com/scl/fi/j4vb1qtiyzmtuw74hiw4u/720_-_MB-2-2.mp4?rlkey=a6ywv87h3slzy7pdsrkzd4hyb&st=bijqt1a9&dl=1" type="video/mp4" />
              <source src="https://www.dropbox.com/scl/fi/j4vb1qtiyzmtuw74hiw4u/720_-_MB-2-2.mp4?rlkey=a6ywv87h3slzy7pdsrkzd4hyb&st=bijqt1a9&dl=0" type="video/mp4" />
            </video>
          ) : (
            <div className="absolute inset-0 z-0">
              <img
                src={PLACEHOLDER_IMAGE}
                alt="Видеопродакшн"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                style={{
                  minWidth: '100%',
                  minHeight: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="relative z-20 flex flex-col items-center justify-center p-4">
            <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
              ВИДЕОПРОДАКШН
            </h1>
            <p className="text-white/90 text-base sm:text-lg font-normal leading-normal mt-4 max-w-md">
              Мы создаем технологичные и кинематографичные видео решения для вашего бизнеса.
            </p>
            <div className="mt-8">
              <button className="flex min-w-[84px] max-w-[480px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-gradient-to-r from-[#0d59f2] to-[#007BFF] text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-lg transition-transform active:scale-95">
                <span className="truncate">Обсудить проект</span>
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 space-y-12">
          {/* Рекламные ролики */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1E1E1E] dark:text-white text-center">
              Рекламные ролики
            </h2>
            <p className="text-base font-normal leading-normal text-center mt-2 text-gray-600 dark:text-gray-400">
              Создаем яркие, цепляющие и запоминающиеся рекламные видео, которые продают ваш продукт и повышают узнаваемость бренда. Мы фокусируемся на креативе, высоком качестве исполнения и достижении KPI.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { id: 1, title: "Кейс: VIVAX", image: "/images/cases/cadr_samburskaya.jpg", video: VIDEO_LINKS.vivax },
                { id: 2, title: "Кейс: УАЗ Патриот", image: "/images/cases/cadr_yaz.jpg", video: VIDEO_LINKS.uaz },
              ].map((item) => (
                <div key={item.id} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <HeroVideoDialog
                    videoSrc={item.video}
                    thumbnailSrc={item.image}
                    thumbnailAlt={item.title}
                    animationStyle="from-center"
                    useVideoTag
                    className="h-full"
                  />
                  <p className="absolute bottom-4 left-4 text-white text-lg font-bold z-10 pointer-events-none drop-shadow-lg">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Корпоративные фильмы */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1E1E1E] dark:text-white text-center">
              Корпоративные фильмы
            </h2>
            <p className="text-base font-normal leading-normal text-center mt-2 text-gray-600 dark:text-gray-400">
              Рассказываем историю вашей компании. Снимаем имиджевые и HR-фильмы, которые укрепляют репутацию, мотивируют сотрудников и производят впечатление на партнеров и инвесторов.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { id: 1, title: "Кейс: АО «РЖД»", image: "/images/cases/cadr_rgd.jpg", video: VIDEO_LINKS.rzd },
                { id: 2, title: "Кейс: Power Technology", image: "/images/cases/cadr_power_tech.jpg", video: VIDEO_LINKS.powerTech },
              ].map((item) => (
                <div key={item.id} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <HeroVideoDialog
                    videoSrc={item.video}
                    thumbnailSrc={item.image}
                    thumbnailAlt={item.title}
                    animationStyle="from-center"
                    useVideoTag
                    className="h-full"
                  />
                  <p className="absolute bottom-4 left-4 text-white text-lg font-bold z-10 pointer-events-none drop-shadow-lg">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Репортажные ролики */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1E1E1E] dark:text-white text-center">
              Репортажные ролики
            </h2>
            <p className="text-base font-normal leading-normal text-center mt-2 text-gray-600 dark:text-gray-400">
              Ловим живые эмоции и ключевые моменты. Создаем динамичные репортажные видео с выставок, конференций, форумов и мероприятий, передавая атмосферу и масштаб события.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { id: 1, title: "Кейс: Международная выставка-форум «Россия»", image: "/images/cases/cadr_samara_vdnh.jpg", video: VIDEO_LINKS.samara },
                { id: 2, title: "Кейс: Event ТРЦ «Саларис»", image: "/images/cases/cadr_salaris.jpg", video: VIDEO_LINKS.salaris },
                { id: 3, title: "Кейс: Event ТРЦ «Ривьера»", image: "/images/cases/cadr_riviera.jpg", video: VIDEO_LINKS.riviera },
              ].map((item) => (
                <div key={item.id} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <HeroVideoDialog
                    videoSrc={item.video}
                    thumbnailSrc={item.image}
                    thumbnailAlt={item.title}
                    animationStyle="from-center"
                    useVideoTag
                    className="h-full"
                  />
                  <p className="absolute bottom-4 left-4 text-white text-sm font-bold z-10 pointer-events-none drop-shadow-lg">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Вирусные ролики */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1E1E1E] dark:text-white text-center">
              Вирусные ролики
            </h2>
            <p className="text-base font-normal leading-normal text-center mt-2 text-gray-600 dark:text-gray-400">
              Разрабатываем нестандартные идеи и креативные концепции, которые выходят за рамки обычного. Наша цель – создать контент, который удивляет и которым хочется делиться.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden w-full max-w-md">
                <HeroVideoDialog
                  videoSrc={VIDEO_LINKS.gazel}
                  thumbnailSrc="/images/cases/cadr_gazell.jpg"
                  thumbnailAlt="Кейс: Газель-трансформер"
                  animationStyle="from-center"
                  useVideoTag
                  playButtonPosition="bottom"
                  className="h-full"
                />
                <p className="absolute bottom-4 left-4 text-white text-lg font-bold z-10 pointer-events-none drop-shadow-lg">Кейс: Газель-трансформер</p>
              </div>
            </div>
          </div>

          {/* Обучающие видео */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1E1E1E] dark:text-white text-center">
              Обучающие видео
            </h2>
            <p className="text-base font-normal leading-normal text-center mt-2 text-gray-600 dark:text-gray-400">
              Переводим сложное на простой и понятный язык. Производим структурированные обучающие материалы, видеоинструкции, HR-онбординги и курсы для ваших сотрудников или клиентов.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden w-full max-w-md">
                <HeroVideoDialog
                  videoSrc={VIDEO_LINKS.saintGobain}
                  thumbnailSrc="/images/cases/Cadr_SG_obushenie.jpg"
                  thumbnailAlt="Кейс: Saint-Gobain"
                  animationStyle="from-center"
                  useVideoTag
                  className="h-full"
                />
                <p className="absolute bottom-4 left-4 text-white text-lg font-bold z-10 pointer-events-none drop-shadow-lg">Кейс: Saint-Gobain</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Case Study Section - Видеопрезентации */}
        <section className="py-16 px-4 bg-white dark:bg-[#101622]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1E1E1E] dark:text-white text-center">
              Видеопрезентации
            </h2>
            <p className="text-base font-normal leading-normal text-center mt-2 text-gray-600 dark:text-gray-400">
              Кейс: Презентация проекта стенда Самарской области (форум «Россия – спортивная держава»)
            </p>
            <div className="mt-8 bg-[#f5f6f8] dark:bg-gray-900/50 p-4 rounded-xl shadow-md">
              {/* Main Video Player */}
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <HeroVideoDialog
                  videoSrc={VIDEO_LINKS[`presentation${selectedPresentation + 1}` as keyof typeof VIDEO_LINKS]}
                  thumbnailSrc={presentations[selectedPresentation].image}
                  thumbnailAlt={presentations[selectedPresentation].title}
                  animationStyle="from-center"
                  useVideoTag
                  className="h-full"
                />
              </div>
              
              {/* Carousel with Thumbnails */}
              <div className="mt-6 relative">
                <button
                  onClick={() => scrollCarousel('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                
                <div
                  ref={carouselRef}
                  className="flex space-x-4 overflow-x-auto scrollbar-hide px-12"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {presentations.map((presentation, index) => (
                    <div
                      key={presentation.id}
                      className="flex-shrink-0 w-[280px] group"
                    >
                      <div
                        className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          selectedPresentation === index
                            ? "border-[#0d59f2] shadow-lg shadow-[#0d59f2]/30"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                        }`}
                        onClick={() => setSelectedPresentation(index)}
                      >
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url("${presentation.image}")` }}
                        >
                          <div className={`absolute inset-0 transition-opacity ${
                            selectedPresentation === index
                              ? "bg-black/20"
                              : "bg-black/0 group-hover:bg-black/10"
                          }`}></div>
                        </div>
                        {selectedPresentation === index && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0d59f2] z-10"></div>
                        )}
                      </div>
                      <p className={`mt-2 text-sm font-bold text-center transition-colors ${
                        selectedPresentation === index
                          ? "text-[#0d59f2] dark:text-white"
                          : "text-gray-800 dark:text-gray-200"
                      }`}>
                        {presentation.title}
                      </p>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => scrollCarousel('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 bg-[#f5f6f8] dark:bg-[#101622]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1E1E1E] dark:text-white">
              Готовы создать ваш следующий проект?
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Свяжитесь с нами, чтобы обсудить ваши идеи. Мы поможем воплотить их в жизнь.
            </p>
            <form className="mt-10 max-w-lg mx-auto text-left space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="sr-only" htmlFor="name">Имя</label>
                <input
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1E1E1E] dark:text-white focus:border-[#0d59f2] focus:ring-[#0d59f2] h-12 px-4"
                  id="name"
                  name="name"
                  placeholder="Имя"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="contact">Телефон/Email</label>
                <input
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1E1E1E] dark:text-white focus:border-[#0d59f2] focus:ring-[#0d59f2] h-12 px-4"
                  id="contact"
                  name="contact"
                  placeholder="Телефон/Email"
                  type="text"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="comment">Комментарий</label>
                <textarea
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1E1E1E] dark:text-white focus:border-[#0d59f2] focus:ring-[#0d59f2] px-4 py-3"
                  id="comment"
                  name="comment"
                  placeholder="Комментарий"
                  rows={4}
                  value={formData.comment}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  className="flex w-full items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-gradient-to-r from-[#0d59f2] to-[#007BFF] text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-lg transition-transform active:scale-95"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span className="truncate">{isSubmitting ? "Отправка..." : "Отправить заявку"}</span>
                </button>
              </div>
              {isSuccess && (
                <p className="text-sm text-emerald-600 text-center">{defaultSuccessMessage}</p>
              )}
              {submitError && (
                <p className="text-sm text-red-600 text-center">{submitError}</p>
              )}
            </form>
          </div>
        </section>
      </main>


      <Footer />
    </div>
  );
};

export default VideoProductionTest;
