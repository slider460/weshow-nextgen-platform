import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Здесь будет логика восстановления пароля
      console.log('Password reset request for:', email);
      
      // Имитация задержки
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
    } catch (err) {
      setError('Ошибка при отправке запроса. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto">
              <Card className="shadow-xl">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    Письмо отправлено
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Мы отправили инструкции по восстановлению пароля на ваш email
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center">
                  <p className="text-slate-700 mb-6">
                    Проверьте почту и следуйте инструкциям в письме. 
                    Если письмо не пришло, проверьте папку "Спам".
                  </p>
                  
                  <div className="space-y-4">
                    <Button
                      onClick={() => {
                        setIsSuccess(false);
                        setEmail('');
                      }}
                      className="w-full"
                    >
                      Отправить повторно
                    </Button>
                    
                    <Link
                      to="/login"
                      className="block text-center text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Вернуться к входу
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Back to home */}
              <div className="text-center mt-6">
                <Link
                  to="/"
                  className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Вернуться на главную
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Главная
            </Link>
            <span>/</span>
            <Link to="/login" className="hover:text-blue-600 transition-colors">
              Вход
            </Link>
            <span>/</span>
            <span className="text-slate-900">Восстановление пароля</span>
          </nav>

          <div className="max-w-md mx-auto">
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">
                  Восстановление пароля
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Введите ваш email для получения инструкций по восстановлению пароля
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Отправка...' : 'Отправить инструкции'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-slate-600">
                    Вспомнили пароль?{' '}
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                    >
                      Войти
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Back to home */}
            <div className="text-center mt-6">
              <Link
                to="/"
                className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Вернуться на главную
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;



