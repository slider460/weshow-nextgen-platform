import React from 'react';
import { toast } from 'sonner';
import { Toaster } from './ui/sonner';

// Типы уведомлений
export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'loading';

// Интерфейс для уведомления
export interface NotificationOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
}

// Класс для управления уведомлениями
export class NotificationService {
  static success(message: string, options?: NotificationOptions) {
    return toast.success(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action,
      cancel: options?.cancel,
    });
  }

  static error(message: string, options?: NotificationOptions) {
    return toast.error(message, {
      description: options?.description,
      duration: options?.duration || 6000,
      action: options?.action,
      cancel: options?.cancel,
    });
  }

  static warning(message: string, options?: NotificationOptions) {
    return toast.warning(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      action: options?.action,
      cancel: options?.cancel,
    });
  }

  static info(message: string, options?: NotificationOptions) {
    return toast.info(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action,
      cancel: options?.cancel,
    });
  }

  static loading(message: string, options?: NotificationOptions) {
    return toast.loading(message, {
      description: options?.description,
    });
  }

  static promise<T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) {
    return toast.promise(promise, {
      loading,
      success,
      error,
    });
  }

  static dismiss(id?: string | number) {
    toast.dismiss(id);
  }

  static dismissAll() {
    toast.dismiss();
  }
}

// Компонент для интеграции в приложение
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster 
        position="top-right"
        expand={true}
        richColors={true}
        closeButton={true}
        toastOptions={{
          style: {
            background: 'var(--background)',
            border: '1px solid var(--border)',
          },
        }}
      />
    </>
  );
};

// Хук для удобного использования
export const useNotifications = () => {
  return {
    success: NotificationService.success,
    error: NotificationService.error,
    warning: NotificationService.warning,
    info: NotificationService.info,
    loading: NotificationService.loading,
    promise: NotificationService.promise,
    dismiss: NotificationService.dismiss,
    dismissAll: NotificationService.dismissAll,
  };
};

// Утилиты для замены alert()
export const replaceAlert = {
  success: (message: string) => NotificationService.success(message),
  error: (message: string) => NotificationService.error(message),
  info: (message: string) => NotificationService.info(message),
  warning: (message: string) => NotificationService.warning(message),
};

export default NotificationService;




