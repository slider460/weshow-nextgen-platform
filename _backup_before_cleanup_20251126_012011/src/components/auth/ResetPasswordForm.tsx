import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ResetPasswordFormProps {
  onSuccess?: () => void;
  onSwitchToSignIn?: () => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ 
  onSuccess, 
  onSwitchToSignIn 
}) => {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Ошибка при отправке письма');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Письмо отправлено
          </h2>
          <p className="text-gray-600 mb-6">
            Мы отправили ссылку для восстановления пароля на адрес{' '}
            <span className="font-medium">{email}</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Проверьте почту и следуйте инструкциям в письме.
          </p>
          <button
            onClick={onSwitchToSignIn}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Вернуться к входу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Восстановление пароля
      </h2>

      <p className="text-gray-600 mb-6 text-center">
        Введите email, на который зарегистрирован ваш аккаунт. 
        Мы отправим ссылку для восстановления пароля.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите email"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Отправка...' : 'Отправить ссылку'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Вспомнили пароль?{' '}
          <button
            onClick={onSwitchToSignIn}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Войти
          </button>
        </p>
      </div>
    </div>
  );
};
