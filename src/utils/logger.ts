/**
 * Утилита для условного логирования
 * В production режиме логи отключаются для улучшения производительности
 */

const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development'

interface Logger {
  log: (...args: any[]) => void
  warn: (...args: any[]) => void
  error: (...args: any[]) => void
  info: (...args: any[]) => void
  debug: (...args: any[]) => void
}

export const logger: Logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  },
  error: (...args: any[]) => {
    // Ошибки всегда логируем, даже в production
    console.error(...args)
  },
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args)
    }
  },
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug(...args)
    }
  }
}

// Экспортируем отдельные методы для удобства
export const { log, warn, error, info, debug } = logger

export default logger

