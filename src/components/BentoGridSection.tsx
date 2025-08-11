import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, ArrowRight } from "lucide-react";
import ProjectOrderModal from "@/components/ProjectOrderModal";

const BentoGridSection = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const bentoItems = [
    {
      id: 1,
      title: "Комплексная аренда интерактивного оборудования",
      subtitle: "",
      buttonText: "Подробнее",
      size: "large", // занимает 2 колонки
      gradient: "from-blue-600/80 to-purple-600/80",
      image: "/src/assets/office-building.jpg",
      action: () => console.log("Navigate to equipment rental")
    },
    {
      id: 2,
      title: "SHOWREEL",
      subtitle: "",
      buttonText: "play",
      size: "medium",
      gradient: "from-red-600/80 to-orange-600/80",
      image: "/src/assets/team-work.jpg",
      action: () => setIsVideoModalOpen(true)
    },
    {
      id: 3,
      title: "Особенный Новый год Samsung",
      subtitle: "",
      buttonText: "Посмотреть",
      size: "medium",
      gradient: "from-green-600/80 to-teal-600/80",
      image: "/src/assets/hero-bg.jpg",
      action: () => console.log("Navigate to Samsung case")
    },
    {
      id: 4,
      title: "SHOWROOM",
      subtitle: "Посмотрите наши решения вживую!",
      buttonText: "Подробнее",
      size: "large", // занимает 2 колонки
      gradient: "from-purple-600/80 to-pink-600/80",
      image: "/src/assets/office-building.jpg",
      action: () => console.log("Navigate to showroom")
    },
    {
      id: 5,
      title: "Выставка «Самара»",
      subtitle: "",
      buttonText: "Посмотреть",
      size: "medium",
      gradient: "from-yellow-600/80 to-orange-600/80",
      image: "/src/assets/team-work.jpg",
      action: () => console.log("Navigate to Samara exhibition")
    },
    {
      id: 6,
      title: "ВДНХ стенд Самарской области",
      subtitle: "на выставке-форуме \"России\"",
      buttonText: "Посмотреть",
      size: "medium",
      gradient: "from-indigo-600/80 to-blue-600/80",
      image: "/src/assets/hero-bg.jpg",
      action: () => console.log("Navigate to VDNH case")
    }
  ];

  return (
    <>
      <section className="py-12 px-4 bg-gradient-to-br from-background via-background/95 to-muted/20">
        <div className="container mx-auto max-w-7xl">
          {/* Бенто-сетка согласно примеру */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 h-auto">
            {/* Первая строка */}
            {/* Большой блок слева (2 колонки) */}
            <div 
              className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 group cursor-pointer relative overflow-hidden rounded-2xl bg-cover bg-center min-h-[300px] md:min-h-[400px]"
              style={{ backgroundImage: `url(${bentoItems[0].image})` }}
              onClick={bentoItems[0].action}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${bentoItems[0].gradient} group-hover:opacity-90 transition-all duration-300`} />
              <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                    {bentoItems[0].title}
                  </h3>
                </div>
                <Button 
                  variant="outline" 
                  className="w-fit bg-white/10 border-white/20 text-white hover:bg-white/20 group-hover:scale-105 transition-all duration-300"
                >
                  {bentoItems[0].buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Showreel (средний блок) */}
            <div 
              className="col-span-1 md:col-span-1 lg:col-span-2 group cursor-pointer relative overflow-hidden rounded-2xl bg-cover bg-center min-h-[190px] md:min-h-[190px]"
              style={{ backgroundImage: `url(${bentoItems[1].image})` }}
              onClick={bentoItems[1].action}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${bentoItems[1].gradient} group-hover:opacity-90 transition-all duration-300`} />
              <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {bentoItems[1].title}
                </h3>
                <Button 
                  variant="outline" 
                  className="w-fit bg-white/10 border-white/20 text-white hover:bg-white/20 group-hover:scale-105 transition-all duration-300"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {bentoItems[1].buttonText}
                </Button>
              </div>
            </div>

            {/* Samsung проект */}
            <div 
              className="col-span-1 md:col-span-1 lg:col-span-2 group cursor-pointer relative overflow-hidden rounded-2xl bg-cover bg-center min-h-[190px] md:min-h-[190px]"
              style={{ backgroundImage: `url(${bentoItems[2].image})` }}
              onClick={bentoItems[2].action}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${bentoItems[2].gradient} group-hover:opacity-90 transition-all duration-300`} />
              <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {bentoItems[2].title}
                </h3>
                <Button 
                  variant="outline" 
                  className="w-fit bg-white/10 border-white/20 text-white hover:bg-white/20 group-hover:scale-105 transition-all duration-300"
                >
                  {bentoItems[2].buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Вторая строка */}
            {/* Showroom (большой блок справа) */}
            <div 
              className="col-span-1 md:col-span-2 lg:col-span-2 group cursor-pointer relative overflow-hidden rounded-2xl bg-cover bg-center min-h-[190px] md:min-h-[190px]"
              style={{ backgroundImage: `url(${bentoItems[3].image})` }}
              onClick={bentoItems[3].action}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${bentoItems[3].gradient} group-hover:opacity-90 transition-all duration-300`} />
              <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {bentoItems[3].title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    {bentoItems[3].subtitle}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-fit bg-white/10 border-white/20 text-white hover:bg-white/20 group-hover:scale-105 transition-all duration-300"
                >
                  {bentoItems[3].buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Выставка Самара */}
            <div 
              className="col-span-1 md:col-span-1 lg:col-span-2 group cursor-pointer relative overflow-hidden rounded-2xl bg-cover bg-center min-h-[190px] md:min-h-[190px]"
              style={{ backgroundImage: `url(${bentoItems[4].image})` }}
              onClick={bentoItems[4].action}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${bentoItems[4].gradient} group-hover:opacity-90 transition-all duration-300`} />
              <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {bentoItems[4].title}
                </h3>
                <Button 
                  variant="outline" 
                  className="w-fit bg-white/10 border-white/20 text-white hover:bg-white/20 group-hover:scale-105 transition-all duration-300"
                >
                  {bentoItems[4].buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* ВДНХ стенд */}
            <div 
              className="col-span-1 md:col-span-1 lg:col-span-2 group cursor-pointer relative overflow-hidden rounded-2xl bg-cover bg-center min-h-[190px] md:min-h-[190px]"
              style={{ backgroundImage: `url(${bentoItems[5].image})` }}
              onClick={bentoItems[5].action}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${bentoItems[5].gradient} group-hover:opacity-90 transition-all duration-300`} />
              <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    ВДНХ стенд Самарской области
                  </h3>
                  <p className="text-white/80 text-sm">
                    {bentoItems[5].subtitle}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-fit bg-white/10 border-white/20 text-white hover:bg-white/20 group-hover:scale-105 transition-all duration-300"
                >
                  {bentoItems[5].buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно для видео */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl w-full p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>WESHOW Showreel</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-black rounded-b-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="WESHOW Showreel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-b-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно заказа проекта */}
      <ProjectOrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </>
  );
};

export default BentoGridSection;