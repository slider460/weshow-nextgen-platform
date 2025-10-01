import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface FigmaConnectionStatusProps {
  onConnectionEstablished?: () => void;
}

const FigmaConnectionStatus = ({ onConnectionEstablished }: FigmaConnectionStatusProps) => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error' | 'no-token'>('checking');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    checkFigmaConnection();
  }, []);

  const checkFigmaConnection = async () => {
    try {
      setConnectionStatus('checking');
      
      // Проверяем наличие токена
      const token = localStorage.getItem('figma_token') || process.env.REACT_APP_FIGMA_TOKEN;
      
      if (!token) {
        setConnectionStatus('no-token');
        return;
      }

      // Тестируем подключение
      const response = await fetch('https://api.figma.com/v1/me', {
        method: 'GET',
        headers: {
          'X-Figma-Token': token
        }
      });

      if (response.ok) {
        setConnectionStatus('connected');
        onConnectionEstablished?.();
      } else {
        setConnectionStatus('error');
        setErrorMessage(`Ошибка ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      setConnectionStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
  };

  const handleTokenSubmit = (token: string) => {
    localStorage.setItem('figma_token', token);
    checkFigmaConnection();
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'checking':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'no-token':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'checking':
        return 'Проверка подключения к Figma...';
      case 'connected':
        return 'Подключение к Figma установлено';
      case 'error':
        return `Ошибка подключения: ${errorMessage}`;
      case 'no-token':
        return 'Требуется API ключ Figma';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'checking':
        return 'text-blue-600';
      case 'connected':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'no-token':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg p-4 shadow-lg max-w-sm">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div className="flex-1">
            <p className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </p>
            {connectionStatus === 'no-token' && (
              <div className="mt-2">
                <p className="text-xs text-gray-600 mb-2">
                  Для подключения к Figma необходим API ключ
                </p>
                <button
                  onClick={() => {
                    const token = prompt('Введите ваш Figma Personal Access Token:');
                    if (token) {
                      handleTokenSubmit(token);
                    }
                  }}
                  className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                >
                  Ввести ключ
                </button>
              </div>
            )}
            {connectionStatus === 'error' && (
              <button
                onClick={checkFigmaConnection}
                className="text-xs text-blue-500 hover:text-blue-700 mt-1"
              >
                Попробовать снова
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigmaConnectionStatus;




