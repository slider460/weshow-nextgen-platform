import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Box, Monitor, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Dialog, DialogContent } from "../../components/ui/dialog";

// Content Imports
import grafFrame from "../../content/services/multimedia-content/Graf_oformlenie.jpg";
import mappingArchitecturePoster from "../../content/services/multimedia-content/cadr_3dmapping.jpg";
import mappingCurvedPoster from "../../content/services/multimedia-content/cadr_ecran.jpg";
import nakedEyePoster from "../../content/services/multimedia-content/cadr_niked_eye.jpg";
import brandingImage from "../../content/services/multimedia-content/Macket_brending.png";
import adaptationImage from "../../content/services/multimedia-content/Adaptacia_content.jpg";
import infoPanelsPoster from "../../content/services/multimedia-content/cadr_panel.jpg";

const IMAGES = {
  broadcast: grafFrame,
  mappingArchitecture: mappingArchitecturePoster,
  mappingCurved: mappingCurvedPoster,
  nakedEye: nakedEyePoster,
  branding: brandingImage,
  vr: "/portfolio/samara-exhibition/photos/VR_Samara.jpg",
  infoPanels: infoPanelsPoster,
  adaptation: adaptationImage,
};

const VIDEO_LINKS = {
  graphics: "https://www.dropbox.com/scl/fi/r3g0hhh54e3jp979qf3rh/Graficheskie_zastavki.mp4?rlkey=2ipcvgy57pumxxwfxe5u5hda2&raw=1",
  mappingArchitecture: "https://www.dropbox.com/scl/fi/upls6horisev58zhhwno9/arhitecturnii_3dmapping.mp4?rlkey=quyv58na6o5k42qycpq97ilyy&raw=1",
  mappingCurved: "https://www.dropbox.com/scl/fi/rwvj445tlkx57x2ljpwy7/4_.mp4?rlkey=g3033ruah2sd84m4hftnd9qzw&raw=1",
  nakedEye: "https://www.dropbox.com/scl/fi/15jhyf8zht2jloiug82n1/Niked-Eye_weshow.mp4?rlkey=ugalj75kk0uigmd85jbdzkuph&raw=1",
  infoPanels: "https://www.dropbox.com/scl/fi/d9jnc8iox0628vrfodcav/5_.mp4?rlkey=jua2l5gl13zlpcl8xfm83qtxy&raw=1",
};

const PlayOverlay = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-lg">
      <Play className="h-6 w-6 text-white fill-white" />
    </div>
  </div>
);

const ServiceSection = ({
  title,
  description,
  video,
  image,
  reverse = false,
  onPlay
}: {
  title: string,
  description: React.ReactNode,
  video?: { src: string, title: string },
  image: string,
  reverse?: boolean,
  onPlay?: (video: { src: string, title: string }) => void
}) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className={`grid lg:grid-cols-2 gap-12 items-center py-20 ${reverse ? 'lg:direction-rtl' : ''}`}
  >
    <div className={`space-y-6 ${reverse ? 'lg:order-2' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        {title}
      </h2>
      <div className="text-lg text-gray-600 leading-relaxed space-y-4">
        {description}
      </div>
      {video && (
        <Button
          variant="ghost"
          className="group text-blue-600 hover:text-blue-700 hover:bg-blue-50 pl-0"
          onClick={() => onPlay && onPlay(video)}
        >
          <Play className="mr-2 w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
          <span>Смотреть пример</span>
        </Button>
      )}
    </div>

    <div className={`relative ${reverse ? 'lg:order-1' : ''}`}>
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl blur-2xl opacity-70" />
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-200 group cursor-pointer aspect-video bg-white"
        onClick={() => video && onPlay && onPlay(video)}>
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {video && <PlayOverlay />}
      </div>
    </div>
  </motion.section>
);

const ServiceCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group relative p-8 rounded-3xl bg-white shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-100 overflow-hidden"
  >
    <div className="relative z-10">
      <div className="w-14 h-14 mb-6 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 leading-relaxed mb-6">
        {description}
      </p>
      <div className="flex items-center text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
        Подробнее <ArrowRight className="ml-2 w-4 h-4" />
      </div>
    </div>
  </motion.div>
);

const MultimediaContent = () => {
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 overflow-x-hidden">
      <Header />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] bg-gradient-to-tr from-indigo-50 to-blue-50 rounded-full blur-[100px] opacity-60" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 container mx-auto z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Новое поколение визуальных решений</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-gray-900"
          >
            Мультимедийный контент: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              От идеи до воплощения
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Мы создаем цифровые миры, которые оживляют ваши идеи. Передовые технологии и креативный подход для создания незабываемых впечатлений.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-14 px-8 rounded-full text-lg shadow-lg shadow-blue-600/20">
              Обсудить проект
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
              <Play className="mr-2 w-5 h-5 fill-current" />
              Смотреть шоурил
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-6 container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <ServiceCard
            icon={Monitor}
            title="Графическое оформление"
            description="Яркие и динамичные заставки, титры и оформление для экранов любых размеров. Задаем тон вашему мероприятию."
            delay={0.1}
          />
          <ServiceCard
            icon={Layers}
            title="3D-контент и мэппинг"
            description="Создание контента для сложных поверхностей, изогнутых экранов и архитектурных форм с точностью до пикселя."
            delay={0.2}
          />
          <ServiceCard
            icon={Box}
            title="Naked Eye 3D"
            description="Впечатляющий объемный контент, который зрители видят без специальных очков. Эффект выхода за рамки экрана."
            delay={0.3}
          />
          <ServiceCard
            icon={Sparkles}
            title="Брендинг мероприятий"
            description="Комплексная разработка визуального стиля: Key Vision, мультимедиа контент и брендирование физических поверхностей."
            delay={0.4}
          />
        </motion.div>
      </section>

      {/* Content Sections */}
      <main className="container mx-auto px-6 relative z-10 space-y-12 pb-32">

        {/* 1. Графическое оформление */}
        <ServiceSection
          title="Графическое оформление и заставки"
          description="Создаем яркие и динамичные заставки, титры и графическое оформление для экранов любых размеров, которые задают тон вашему мероприятию и подчеркивают его статус."
          image={IMAGES.broadcast}
          video={{ src: VIDEO_LINKS.graphics, title: "Графическое оформление" }}
          onPlay={setActiveVideo}
        />

        {/* 2. 3D-контент и мэппинг */}
        <section className="grid lg:grid-cols-2 gap-12 items-center py-20">
          <div className="order-2 lg:order-1 grid gap-6 sm:grid-cols-2">
            <div className="space-y-3 cursor-pointer group" onClick={() => setActiveVideo({ src: VIDEO_LINKS.mappingArchitecture, title: "Архитектурный мэппинг" })}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-gray-200 aspect-video bg-gray-100">
                <img src={IMAGES.mappingArchitecture} alt="Архитектурный мэппинг" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <PlayOverlay />
              </div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Мэппинг на архитектуре</p>
            </div>
            <div className="space-y-3 cursor-pointer group" onClick={() => setActiveVideo({ src: VIDEO_LINKS.mappingCurved, title: "Изогнутые экраны" })}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-gray-200 aspect-video bg-gray-100">
                <img src={IMAGES.mappingCurved} alt="Изогнутые экраны" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <PlayOverlay />
              </div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Контент для изогнутых экранов</p>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              3D-контент и мэппинг
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Создание 3D-контента для изогнутых экранов, нестандартных конструкций и архитектурных поверхностей с расчетом "пиксель в пиксель". Мы учитываем геометрию каждой поверхности для создания идеальной оптической иллюзии.
            </p>
          </div>
        </section>

        {/* 3. Naked Eye 3D */}
        <ServiceSection
          title="Naked Eye 3D Технологии"
          description="Создаем впечатляющий 3D-контент для экранов с технологией 'Naked Eye', который позволяет зрителям видеть объемное изображение без использования специальных очков. Эффект выхода изображения за рамки экрана гарантирует вау-эффект."
          image={IMAGES.nakedEye}
          video={{ src: VIDEO_LINKS.nakedEye, title: "Naked Eye 3D" }}
          onPlay={setActiveVideo}
          reverse
        />

        {/* 4. Комплексный брендинг */}
        <ServiceSection
          title="Комплексный брендинг мероприятий"
          description="Разрабатываем единый визуальный стиль: Key Vision, контент для всех мультимедиа носителей и брендирование физических поверхностей. Целостный подход обеспечивает максимальное погружение аудитории в атмосферу бренда."
          image={IMAGES.branding}
        />

        {/* 5. VR-контент */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center py-20"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              VR-контент и иммерсивные среды
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Погружаем пользователей в виртуальную реальность с помощью интерактивных VR-проектов.
            </p>
            <ul className="space-y-4 text-gray-600">
              {[
                "Персонализированные VR-среды и симуляции",
                "Производство 360° видео: съемка и постпродакшн",
                "VR-кинотеатры для коллективного опыта"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-600 shadow-sm" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl blur-2xl opacity-70" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-200 aspect-video bg-white">
              <img src={IMAGES.vr} alt="VR контент" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.section>

        {/* 6. Инфопанели */}
        <ServiceSection
          title="Контент для инфо-панелей"
          description="Разрабатываем информативный и привлекательный контент для тач-панелей, интерактивных столов и киосков. Делаем навигацию удобной, а получение информации — интуитивно понятным и увлекательным процессом."
          image={IMAGES.infoPanels}
          video={{ src: VIDEO_LINKS.infoPanels, title: "Инфопанели" }}
          onPlay={setActiveVideo}
          reverse
        />

        {/* 7. Адаптация */}
        <ServiceSection
          title="Адаптация контента"
          description="Профессионально адаптируем существующий контент под любые форматы: архитектурные фасады, сложные LED-инсталляции, изогнутые экраны и интерактивные поверхности."
          image={IMAGES.adaptation}
        />

        {/* CTA Section */}
        <section className="relative py-24">
          <div className="container mx-auto relative z-10 px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  Готовы воплотить вашу идею?
                </h2>
                <p className="text-xl text-gray-300">
                  Свяжитесь с нами, чтобы обсудить ваш проект. Мы поможем создать незабываемый интерактивный опыт для вашей аудитории.
                </p>
                <Button size="lg" asChild className="bg-white text-gray-900 hover:bg-gray-100 h-14 px-10 rounded-full text-lg font-bold shadow-lg">
                  <Link to="/contact">
                    Запросить консультацию
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Video Modal */}
      <Dialog open={Boolean(activeVideo)} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-black border border-white/10 rounded-2xl">
          {activeVideo && (
            <div className="relative aspect-video">
              <video
                src={activeVideo.src}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default MultimediaContent;
