import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useToast } from "../hooks/use-toast";
import { MapPin, Phone, Mail } from "lucide-react";
import mapImage from "../content/services/multimedia-content/temp_map_1762893477095_33ee003kg.jpeg";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Заявка отправлена",
      description: "Мы свяжемся с вами в ближайшее время"
    });
    
    setFormData({ name: "", phone: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f8] dark:bg-[#221022]">
      <Header />
      
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden pt-32">
        {/* Background effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#221022]"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#ee2bee]/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#673267]/20 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Свяжитесь с нами</h2>
            <p className="mt-4 text-lg text-[#c992c9] max-w-2xl mx-auto">
              Мы здесь, чтобы воплотить ваши идеи в жизнь. Расскажите нам о своем проекте.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column - Contact Info and Form */}
            <div className="flex flex-col space-y-8">
              <div className="glass-card p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-white mb-6">Контактная информация</h3>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <MapPin className="text-[#ee2bee] text-2xl mr-4 mt-1 h-6 w-6 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-[#c992c9] font-medium">Адрес</p>
                      <p className="text-white">Москва, ул. Рочдельская, 14А</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="text-[#ee2bee] text-2xl mr-4 mt-1 h-6 w-6 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-[#c992c9] font-medium">Телефон</p>
                      <a href="tel:+74955807537" className="text-white hover:text-[#ee2bee] transition-colors">
                        +7 (495) 580-75-37
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="text-[#ee2bee] text-2xl mr-4 mt-1 h-6 w-6 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-[#c992c9] font-medium">Email</p>
                      <a href="mailto:info@weshow.ru" className="text-white hover:text-[#ee2bee] transition-colors">
                        info@weshow.ru
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="glass-card p-8 rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-6" method="POST">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <label className="flex flex-col">
                      <p className="text-white text-sm font-medium leading-normal pb-2">Ваше имя</p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-[#ee2bee]/50 border border-[#673267] bg-transparent h-12 p-[15px] text-base font-normal leading-normal transition-all"
                        placeholder="Иван Иванов"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </label>
                    <label className="flex flex-col">
                      <p className="text-white text-sm font-medium leading-normal pb-2">Телефон</p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-[#ee2bee]/50 border border-[#673267] bg-transparent h-12 p-[15px] text-base font-normal leading-normal transition-all"
                        placeholder="+7 (999) 123-45-67"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </label>
                  </div>

                  <label className="flex flex-col">
                    <p className="text-white text-sm font-medium leading-normal pb-2">Email</p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-[#ee2bee]/50 border border-[#673267] bg-transparent h-12 p-[15px] text-base font-normal leading-normal transition-all"
                      placeholder="you@example.com"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </label>

                  <label className="flex flex-col">
                    <p className="text-white text-sm font-medium leading-normal pb-2">Ваше сообщение</p>
                    <textarea
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-[#ee2bee]/50 border border-[#673267] bg-transparent min-h-36 p-[15px] text-base font-normal leading-normal transition-all"
                      placeholder="Напишите ваше сообщение здесь..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    ></textarea>
                  </label>

                  <div>
                    <button
                      className="w-full text-center items-center justify-center rounded-xl px-6 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-[#ee2bee] to-purple-600 hover:shadow-[#ee2bee]/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Отправка..." : "Отправить"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="rounded-lg overflow-hidden h-64 md:h-auto flex-grow">
              <img 
                className="w-full h-full object-cover" 
                alt="Карта расположения офиса" 
                src={mapImage}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .form-input::placeholder {
          color: #c992c9;
          opacity: 0.7;
        }
        .glass-card {
          background-color: rgba(51, 25, 51, 0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(103, 50, 103, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Contact;
