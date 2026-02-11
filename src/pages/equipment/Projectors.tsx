import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import { Button } from "../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Projectors = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Проекторы высокой яркости — WESHOW"
        description="Проекторы от 10000 люмен для конференций, маппинга и наружной рекламы. Аренда. WESHOW."
        url="https://weshow.su/equipment/projectors"
      />
      <Header />
      <main className="pt-20">
        <section className="relative h-[60vh] min-h-[500px] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Проекторы высокой яркости</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Проекторы от 10000 люмен для ярких визуализаций в любых условиях освещения
            </p>
          </div>
        </section>
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Описание оборудования</h2>
            <p className="text-lg text-slate-700">
              Высокояркостные проекторы позволяют создавать качественные визуализации даже при ярком освещении. 
              Идеально для конференций, презентаций и наружной рекламы.
            </p>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Button size="lg" asChild>
              <Link to="/contact">Получить консультацию <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projectors;








