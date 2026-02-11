import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LazyLoadWrapper } from "./LazyLoadWrapper";
// import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const EquipmentCarouselSection = () => {
  // Топовое оборудование - статический массив
  const topEquipment = [
    {
      id: 'kinetic-screen',
      title: 'Кинетический экран',
      description: 'Движущиеся интерактивные поверхности, способные выдвигать каждый пиксель на 20 см с программируемой скоростью',
      image: '/portfolio/samara-vdnh/kinetick_samara.jpg',
      link: '/equipment/kinetic-screen'
    },
    {
      id: 'matrix-screen',
      title: 'Scalelike Matrix',
      description: 'Модульная световая матрица с интегрированным контроллером, управляемая через Art-Net, DMX и sACN. Каждый модуль содержит 9 квадратных линз с RGB-светодиодами',
      image: '/portfolio/samara-vdnh/Matrix_screen.jpg',
      link: '/equipment/matrix-screen'
    },
    {
      id: 'multimedia-content',
      title: 'Мультимедийный контент',
      description: 'Создаём видеоконтент, 3D-анимацию, motion-графику и интерактивные приложения для LED-экранов, проекций и выставочных стендов',
      image: '/images/banners/multimedia-content-banner.jpg',
      link: '/services/multimedia-content'
    },
  ];

  return (
    <>
      {/* Desktop Version - уменьшен на 40% */}
      <section className="hidden md:block py-7 lg:py-14 bg-slate-50 relative overflow-hidden">
        <LazyLoadWrapper>
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-full blur-3xl opacity-60"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">

            {/* Carousel */}
            <div className="mb-5 lg:mb-8">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {topEquipment.map((item) => (
                    <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-full">
                      <Link to={item.link} className="block group">
                        <div className="relative aspect-[21/9] rounded-lg lg:rounded-xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                          {/* Background image */}
                          <img 
                            src={item.image} 
                            alt={item.title}
                            width={1200}
                            height={514}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-purple-600/40 to-pink-600/40 group-hover:opacity-60 transition-opacity duration-300"></div>
                          
                          {/* Overlay with title and description */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-4 lg:p-6">
                            <div className="max-w-2xl">
                              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-3 group-hover:scale-105 transition-transform duration-300">
                                {item.title}
                              </h3>
                              <p className="text-sm lg:text-base text-white/90 mb-3 lg:mb-4 line-clamp-2">
                                {item.description}
                              </p>
                              <Button 
                                size="default" 
                                className="bg-white text-blue-600 hover:bg-white/90 text-sm lg:text-base px-4 py-2 group-hover:scale-105 transition-transform duration-300"
                              >
                                Подробнее
                                <ArrowRight className="ml-2 h-3 w-3 lg:h-4 lg:w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 lg:left-4" />
                <CarouselNext className="right-2 lg:right-4" />
              </Carousel>
            </div>

          </div>
        </LazyLoadWrapper>
      </section>

      {/* Mobile Version - компактная версия */}
      <section className="md:hidden py-6 bg-slate-50 relative overflow-hidden">
        <LazyLoadWrapper>
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-full blur-2xl opacity-50"></div>
          
          <div className="container mx-auto px-4 relative">

            {/* Mobile Carousel - компактные карточки */}
            <div className="mb-4">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2">
                  {topEquipment.map((item) => (
                    <CarouselItem key={item.id} className="pl-2 basis-5/6">
                      <Link to={item.link} className="block group">
                        <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 shadow-md">
                          {/* Background image */}
                          <img 
                            src={item.image} 
                            alt={item.title}
                            width={800}
                            height={500}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-purple-600/40 to-pink-600/40 group-hover:opacity-60 transition-opacity duration-300"></div>
                          
                          {/* Overlay with title */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-3">
                            <h3 className="text-base font-bold text-white mb-1.5 line-clamp-2 group-hover:scale-105 transition-transform duration-300">
                              {item.title}
                            </h3>
                            <p className="text-xs text-white/90 mb-2 line-clamp-1">
                              {item.description}
                            </p>
                            <div className="flex items-center text-white/90 text-xs">
                              Подробнее
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </LazyLoadWrapper>
      </section>
    </>
  );
};

export default EquipmentCarouselSection;

