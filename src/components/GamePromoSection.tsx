import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, Target, Trophy, ArrowRight, Bike, Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';

const GamePromoSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-purple-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Левая колонка - описание */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-green-500 fill-current" />
                <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  НОВИНКА
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Гоняйте на велосипеде и{' '}
                <span className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  выигрывайте скидки
                </span>{' '}
                на наши услуги!
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Увлекательная игра <strong>Велосипедные гонки</strong> - проверьте свою реакцию и получите скидку до 25% на все услуги WESHOW! 
                Перепрыгивайте мультимедийную технику и набирайте очки в динамичной гонке.
              </p>

              {/* Преимущества */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Быстрая игра на 30 секунд</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Скидки от 5% до 25%</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">История гонок и достижения</span>
                </div>
              </div>

              {/* CTA кнопки */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/game"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  🚴‍♂️ Начать гонку
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  Посмотреть услуги
                </Link>
              </div>
            </motion.div>

            {/* Правая колонка - визуализация игры */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Игровое поле */}
              <div className="relative bg-gradient-to-b from-blue-200 to-blue-100 rounded-3xl p-8 shadow-2xl border border-blue-300">
                {/* Заголовок игры */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">🚴‍♂️ Велосипедные гонки</h3>
                  <p className="text-gray-600">Перепрыгивайте мультимедийную технику и набирайте очки</p>
                </div>

                {/* Игровое поле */}
                <div className="relative bg-gradient-to-b from-sky-200 to-sky-100 rounded-2xl h-64 mb-6 overflow-hidden border-2 border-blue-300">
                  {/* Небо */}
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-200"></div>
                  
                  {/* Облака */}
                  <div className="absolute top-4 left-4 w-16 h-8 bg-white/80 rounded-full"></div>
                  <div className="absolute top-6 left-8 w-12 h-6 bg-white/80 rounded-full"></div>
                  <div className="absolute top-4 right-8 w-20 h-10 bg-white/80 rounded-full"></div>
                  
                  {/* Земля */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-green-300"></div>
                  
                  {/* Дорога */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-500"></div>
                  
                  {/* Разметка дороги */}
                  <div className="absolute bottom-6 left-0 right-0 h-1 bg-white border-dashed border-white"></div>
                  
                  {/* Велосипед */}
                  <div className="absolute bottom-8 left-8">
                    <div className="w-12 h-8 bg-orange-500 rounded-t-full"></div>
                    <div className="w-3 h-3 bg-black rounded-full -mt-1 ml-2"></div>
                    <div className="w-3 h-3 bg-black rounded-full -mt-1 ml-8"></div>
                  </div>
                  
                  {/* Мультимедийная техника */}
                  <div className="absolute bottom-8 right-16">
                    <div className="w-6 h-8 bg-gray-700 rounded"></div>
                    <div className="w-2 h-2 bg-gray-800 rounded-full absolute top-1 right-1"></div>
                  </div>
                  <div className="absolute bottom-8 right-8">
                    <div className="w-8 h-6 bg-blue-600 rounded"></div>
                    <div className="w-2 h-2 bg-red-500 rounded absolute top-1 left-1"></div>
                  </div>
                  <div className="absolute bottom-8 right-24">
                    <div className="w-5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-3 h-1 bg-gray-800 rounded absolute bottom-0 left-1"></div>
                  </div>
                </div>

                {/* Статистика */}
                <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-xs text-gray-500">Очки</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">30s</div>
                    <div className="text-xs text-gray-500">Время</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">0x</div>
                    <div className="text-xs text-gray-500">Комбо</div>
                  </div>
                </div>

                {/* Скидки */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Возможные скидки:</div>
                    <div className="flex justify-center gap-2 text-xs">
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded">5%</span>
                      <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">10%</span>
                      <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded">15%</span>
                      <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded">20%</span>
                      <span className="bg-red-200 text-red-800 px-2 py-1 rounded">25%</span>
                    </div>
                  </div>
                </div>

                {/* Управление */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-center text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Bike className="w-4 h-4" />
                      <span>Клик или пробел для прыжка</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Mountain className="w-4 h-4" />
                      <span>Избегайте мультимедийную технику</span>
                    </div>
                  </div>
                </div>

                {/* Описание техники */}
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <div className="text-center text-xs text-gray-600">
                    <div className="font-semibold mb-2">Техника в игре:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-700 rounded"></div>
                        <span>Проектор</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-600 rounded"></div>
                        <span>Панель</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded"></div>
                        <span>Компьютер</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-orange-600 rounded"></div>
                        <span>Колонка</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Плавающие элементы */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-green-200 rounded-full opacity-60"
              ></motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-200 rounded-full opacity-60"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamePromoSection;
