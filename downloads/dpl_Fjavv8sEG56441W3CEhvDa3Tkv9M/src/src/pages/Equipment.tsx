import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { ArrowRight, Package, Truck, Wrench, Headphones, CheckCircle, Star } from 'lucide-react'
import DarkVeil from '../components/DarkVeil'
import EquipmentCarouselSection from '../components/EquipmentCarouselSection'
import ConsultationModal from '../components/ConsultationModal'
import { useState } from 'react'

const Equipment = () => {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  const benefits = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Оперативная доставка',
      description: 'Доставляем оборудование в кратчайшие сроки по всей России'
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: 'Качественный монтаж',
      description: 'Профессиональная установка и настройка оборудования нашими специалистами'
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: 'Техническое сопровождение',
      description: 'Поддержка 24/7 во время работы мероприятия'
    }
  ];

  const includedInPrice = [
    'Доставка оборудования',
    'Профессиональный монтаж',
    'Настройка и тестирование',
    'Техническое сопровождение',
    'Демонтаж оборудования',
    'Страхование оборудования'
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950/90 px-4 sm:px-8 py-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <DarkVeil speed={0.3} scanlineIntensity={0.08} scanlineFrequency={0.03} noiseIntensity={0.02} />
            </div>
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium mb-4">
                <Package className="h-4 w-4" />
                Комплексная аренда
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                КОМПЛЕКСНАЯ<br />
                АРЕНДА<br />
                ИНТЕРАКТИВНОГО<br />
                ОБОРУДОВАНИЯ
              </h1>
              <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Цена аренды нашего цифрового оборудования включает в себя полный спектр обслуживания: 
                оперативная доставка, качественный монтаж и техническое сопровождение.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-6 text-lg font-semibold rounded-full"
                onClick={() => setIsConsultModalOpen(true)}
              >
                Получить консультацию
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Карусель оборудования */}
      <section className="py-16 bg-slate-50">
        <EquipmentCarouselSection />
      </section>

      {/* Что входит в цену */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Что входит в цену аренды</h2>
              <p className="text-xl text-slate-600">
                Полный комплекс услуг без скрытых платежей
              </p>
            </div>
            <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-white">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {includedInPrice.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <span className="text-lg text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Готовы начать проект?
            </h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Свяжитесь с нами, и мы подберем оптимальное оборудование для вашего мероприятия
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-10 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
              onClick={() => setIsConsultModalOpen(true)}
            >
              Получить консультацию
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      <ConsultationModal 
        isOpen={isConsultModalOpen} 
        onClose={() => setIsConsultModalOpen(false)} 
      />
    </div>
  )
}

export default Equipment


