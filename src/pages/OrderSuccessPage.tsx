import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Package,
  Clock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const orderId = location.state?.orderId;
  const message = location.state?.message || 'Спасибо за заказ!';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="text-center">
          <CardHeader className="pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle className="h-12 w-12 text-green-600" />
            </motion.div>
            
            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
              Заказ успешно оформлен!
            </CardTitle>
            
            <p className="text-lg text-gray-600 mb-6">
              {message}
            </p>

            {orderId && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Номер заказа:</strong> #{orderId}
                </p>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Что дальше */}
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Что дальше?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Обработка заказа</h4>
                    <p className="text-sm text-gray-600">
                      Наш менеджер обработает ваш заказ в течение 1-2 часов в рабочее время
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Подтверждение</h4>
                    <p className="text-sm text-gray-600">
                      Мы свяжемся с вами по телефону для подтверждения деталей заказа
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Package className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Подготовка оборудования</h4>
                    <p className="text-sm text-gray-600">
                      Подготовим и доставим оборудование в указанные сроки
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Контакты */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Нужна помощь?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>info@weshow.ru</span>
                </div>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={() => navigate('/equipment')}
                className="flex-1"
                variant="outline"
              >
                <Package className="h-4 w-4 mr-2" />
                Продолжить покупки
              </Button>
              
              <Button
                onClick={() => navigate('/')}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                На главную
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OrderSuccessPage;



