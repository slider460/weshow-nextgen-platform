import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AnimatedButton from '@/components/AnimatedButton';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNewsletterAPI } from '@/api/newsletter';

interface NewsletterSubscriptionProps {
  className?: string;
  variant?: 'default' | 'compact' | 'hero';
}

const NewsletterSubscription = ({ className = '', variant = 'default' }: NewsletterSubscriptionProps) => {
  const { t } = useLanguage();
  const { subscribe } = useNewsletterAPI();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Пожалуйста, введите корректный email');
      return;
    }

    setIsLoading(true);
    setStatus('idle');

    try {
      // Интеграция с API подписки
      const result = await subscribe({
        email,
        language: 'ru', // Можно получать из контекста языка
        categories: ['ai', 'xr', 'sustainability', 'design'] // Все категории по умолчанию
      });

      if (result.success) {
        setStatus('success');
        setMessage(result.message);
        setEmail('');
        
        // Сброс статуса через 5 секунд
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage(t('subscription.error'));
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder={t('subscription.placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 min-w-0"
        />
                  <AnimatedButton
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            hoverEffect="scale"
            glow={true}
            className="shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Mail className="w-4 h-4" />
            )}
          </AnimatedButton>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <Card className={`bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg ${className}`}>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Mail className="w-6 h-6" />
              <h3 className="text-xl font-semibold">{t('subscription.title')}</h3>
            </div>
            <p className="text-slate-600">{t('subscription.subtitle')}</p>
            
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('subscription.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <AnimatedButton
                type="submit"
                disabled={isLoading}
                variant="gradient"
                hoverEffect="lift"
                glow={true}
                className="text-white"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  t('btn.subscribe')
                )}
              </AnimatedButton>
            </form>

            {status !== 'idle' && (
              <div className={`flex items-center gap-2 text-sm ${
                status === 'success' ? 'text-green-600' : 'text-red-600'
              }`}>
                {status === 'success' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {message}
              </div>
            )}

            <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
              <Badge variant="secondary" className="text-xs">
                {t('blog.categories.ai')}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {t('blog.categories.xr')}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {t('blog.categories.design')}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-white shadow-lg ${className}`}>
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-blue-600">
          <Mail className="w-5 h-5" />
          {t('subscription.title')}
        </CardTitle>
        <p className="text-slate-600 text-sm">{t('subscription.subtitle')}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder={t('subscription.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <AnimatedButton
            type="submit"
            disabled={isLoading}
            variant="gradient"
            hoverEffect="lift"
            glow={true}
            className="w-full text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Подписка...
              </>
            ) : (
              t('btn.subscribe')
            )}
          </AnimatedButton>
        </form>

        {status !== 'idle' && (
          <div className={`flex items-center gap-2 text-sm p-3 rounded-lg ${
            status === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {status === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {message}
          </div>
        )}

        <div className="pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 mb-3">Получайте материалы по темам:</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {t('blog.categories.ai')}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {t('blog.categories.xr')}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {t('blog.categories.sustainability')}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {t('blog.categories.design')}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsletterSubscription;
