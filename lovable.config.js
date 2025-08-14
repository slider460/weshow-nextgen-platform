module.exports = {
  // Основные настройки проекта
  projectName: "WeShow NextGen Platform",
  description: "Современная платформа мультимедийных решений и интерактивных технологий",
  version: "1.0.0",
  
  // Настройки сборки
  build: {
    command: "npm run build",
    output: "dist",
    installCommand: "npm install",
    nodeVersion: "18.x"
  },
  
  // Настройки разработки
  dev: {
    command: "npm run dev",
    port: 5173,
    host: "0.0.0.0"
  },
  
  // Настройки окружения
  environment: {
    NODE_ENV: "production",
    VITE_APP_TITLE: "WeShow NextGen Platform",
    VITE_APP_DESCRIPTION: "Современная платформа мультимедийных решений",
    VITE_APP_VERSION: "1.0.0"
  },
  
  // Настройки развертывания
  deploy: {
    autoDeploy: true,
    branch: "main",
    preview: true,
    rollback: true
  },
  
  // Настройки производительности
  performance: {
    minify: true,
    compression: true,
    caching: true,
    cdn: true
  },
  
  // Настройки мониторинга
  monitoring: {
    analytics: true,
    errorTracking: true,
    performanceMonitoring: true,
    uptimeMonitoring: true
  },
  
  // Настройки безопасности
  security: {
    https: true,
    headers: true,
    csp: true
  },
  
  // Настройки доменов
  domains: {
    customDomain: true,
    ssl: true,
    redirects: true
  }
};
