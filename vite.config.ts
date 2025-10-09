import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { handleApiRequest } from './src/api/routes'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Добавляем gzip компрессию
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // Сжимаем файлы > 10KB
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Добавляем brotli компрессию (лучше чем gzip)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // Кастомный плагин для API роутов
    {
      name: 'api-routes',
      configureServer(server) {
        server.middlewares.use('/api', async (req, res, next) => {
          try {
            const response = await handleApiRequest(req.url || '', req.method || 'GET');
            
            res.statusCode = response.status;
            response.headers.forEach((value, key) => {
              res.setHeader(key, value);
            });
            
            const body = await response.text();
            res.end(body);
          } catch (error) {
            console.error('API Middleware Error:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
          }
        });
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8082,
    // Добавляем заголовки для кеширования
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
  build: {
    // Оптимизация сборки
    target: 'es2015',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild', // Changed from terser to esbuild for faster builds
    rollupOptions: {
      output: {
        // Разделение на чанки для лучшего кеширования
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['framer-motion', 'lucide-react'],
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
        },
        // Настройка имен файлов для кеширования
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Увеличиваем лимит предупреждений для больших чанков
    chunkSizeWarningLimit: 1000,
  },
})