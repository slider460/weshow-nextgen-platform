import React from 'react';
import { КлиентОтладки } from './client';
import { РеактГраницаОшибок } from './errorTracker';

interface ИнтеграцияОтладкиProps {
  дети: React.ReactNode;
  включитьОтладку?: boolean;
  конфигурация?: {
    serverUrl?: string;
    enablePerformanceMonitoring?: boolean;
    enableErrorTracking?: boolean;
    enableNetworkMonitoring?: boolean;
  };
}

export const ИнтеграцияОтладки: React.FC<ИнтеграцияОтладкиProps> = ({
  дети,
  включитьОтладку = process.env.NODE_ENV === 'development',
  конфигурация = {}
}) => {
  const [клиент, setКлиент] = React.useState<КлиентОтладки | null>(null);
  const [состояние, setСостояние] = React.useState<{
    подключен: boolean;
    ошибка?: string;
  }>({ подключен: false });

  React.useEffect(() => {
    if (!включитьОтладку) return;

    console.log('🔧 Инициализация системы отладки...');

    const новыйКлиент = new КлиентОтладки({
      serverUrl: 'http://localhost:3001',
      enablePerformanceMonitoring: true,
      enableErrorTracking: true,
      enableNetworkMonitoring: true,
      ...конфигурация
    });

    setКлиент(новыйКлиент);

    // Мониторинг состояния подключения
    const проверитьСостояние = () => {
      const статус = новыйКлиент.получитьСтатус();
      setСостояние({
        подключен: статус.подключен,
        ошибка: undefined
      });
    };

    const интервал = setInterval(проверитьСостояние, 5000);
    проверитьСостояние(); // Начальная проверка

    return () => {
      clearInterval(интервал);
      новыйКлиент.отключиться();
    };
  }, [включитьОтладку, конфигурация]);

  // Показываем индикатор отладки только в development
  const ИндикаторОтладки = () => {
    if (!включитьОтладку || process.env.NODE_ENV === 'production') {
      return null;
    }

    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: состояние.подключен ? '#10b981' : '#ef4444',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        opacity: 0.8
      }}
      onClick={() => {
        if (клиент) {
          const статус = клиент.получитьСтатус();
          console.log('🔧 Статус отладки:', статус);
          
          // Открываем dashboard в новом окне
          window.open('http://localhost:3001/dashboard', '_blank');
        }
      }}
      title="Нажмите для открытия dashboard отладки"
      >
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'currentColor',
          animation: состояние.подключен ? 'pulse 2s infinite' : 'none'
        }} />
        {состояние.подключен ? 'DEBUG' : 'OFFLINE'}
      </div>
    );
  };

  // Если отладка отключена, просто возвращаем детей
  if (!включитьОтладку) {
    return <>{дети}</>;
  }

  // Если отладка включена, оборачиваем в Error Boundary и добавляем индикатор
  return (
    <РеактГраницаОшибок
      onError={(error, errorInfo) => {
        console.error('🚨 React Error Boundary:', error);
        
        // Отправляем ошибку через клиент отладки
        if (клиент) {
          клиент.отчетОбОшибке(`React Error: ${error.message}`, {
            componentStack: errorInfo.componentStack,
            errorBoundary: true
          });
        }
      }}
      fallback={
        <div style={{
          padding: '40px',
          textAlign: 'center',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <h2 style={{ color: '#dc2626', marginBottom: '16px' }}>
            🚨 Произошла ошибка
          </h2>
          <p style={{ marginBottom: '20px', color: '#6b7280' }}>
            Что-то пошло не так. Ошибка автоматически отправлена разработчикам.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Перезагрузить страницу
          </button>
        </div>
      }
    >
      {дети}
      <ИндикаторОтладки />
    </РеактГраницаОшибок>
  );
};

// Хук для использования клиента отладки в компонентах
export const useОтладка = () => {
  const отчетОбОшибке = React.useCallback((сообщение: string, контекст?: any) => {
    if (typeof window !== 'undefined' && (window as any).debugClient) {
      (window as any).debugClient.отчетОбОшибке(сообщение, контекст);
    }
  }, []);

  const запуститьТест = React.useCallback((типТеста: string) => {
    if (typeof window !== 'undefined' && (window as any).debugClient) {
      (window as any).debugClient.запуститьТест(типТеста);
    }
  }, []);

  const получитьМетрики = React.useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).debugClient) {
      return (window as any).debugClient.получитьТекущиеМетрики();
    }
    return [];
  }, []);

  return {
    отчетОбОшибке,
    запуститьТест,
    получитьМетрики
  };
};

// Компонент для отображения метрик производительности
export const МетрикиПроизводительности: React.FC = () => {
  const [метрики, setМетрики] = React.useState<any[]>([]);
  const { получитьМетрики } = useОтладка();

  React.useEffect(() => {
    const обновитьМетрики = () => {
      const текущиеМетрики = получитьМетрики();
      setМетрики(текущиеМетрики);
    };

    обновитьМетрики();
    const интервал = setInterval(обновитьМетрики, 10000); // Обновление каждые 10 сек

    return () => clearInterval(интервал);
  }, [получитьМетрики]);

  if (process.env.NODE_ENV === 'production' || метрики.length === 0) {
    return null;
  }

  const последняяМетрика = метрики[0];

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '11px',
      fontFamily: 'monospace',
      zIndex: 9998,
      minWidth: '200px'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        📊 Производительность
      </div>
      {последняяМетрика && (
        <>
          <div>Загрузка: {последняяМетрика.pageLoadTime}мс</div>
          <div>FCP: {последняяМетрика.firstContentfulPaint}мс</div>
          <div>LCP: {последняяМетрика.largestContentfulPaint}мс</div>
          <div>CLS: {последняяМетрика.cumulativeLayoutShift.toFixed(3)}</div>
        </>
      )}
    </div>
  );
};

// Компонент кнопки для быстрого запуска тестов
export const КнопкаТестирования: React.FC<{ 
  типТеста?: string;
  стиль?: React.CSSProperties;
}> = ({ 
  типТеста = 'performance',
  стиль = {}
}) => {
  const { запуститьТест } = useОтладка();

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <button
      onClick={() => запуститьТест(типТеста)}
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        background: '#8b5cf6',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        cursor: 'pointer',
        zIndex: 9997,
        ...стиль
      }}
      title={`Запустить ${типТеста} тесты`}
    >
      🧪 Тест
    </button>
  );
};

export default ИнтеграцияОтладки;