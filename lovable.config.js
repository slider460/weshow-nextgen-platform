module.exports = {
  // Основные настройки проекта
  projectName: "WeShow NextGen Platform",
  description: "Современная платформа мультимедийных решений и интерактивных технологий",
  
  // Настройки сборки
  build: {
    command: "npm run build",
    output: "dist",
    installCommand: "npm install"
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
    VITE_APP_TITLE: "WeShow NextGen Platform"
  },
  
  // Настройки развертывания
  deploy: {
    autoDeploy: true,
    branch: "main"
  }
};
