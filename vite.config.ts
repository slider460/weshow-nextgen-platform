import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// import { handleApiRequest } from './src/api/routes'
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
    // Кастомный плагин для API роутов (временно отключен)
    // {
    //   name: 'api-routes',
    //   configureServer(server) {
    //     server.middlewares.use('/api', async (req, res, next) => {
    //       try {
    //         const response = await handleApiRequest(req.url || '', req.method || 'GET');

    //         res.statusCode = response.status;
    //         response.headers.forEach((value, key) => {
    //           res.setHeader(key, value);
    //         });

    //         const body = await response.text();
    //         res.end(body);
    //       } catch (error) {
    //         console.error('API Middleware Error:', error);
    //         res.statusCode = 500;
    //         res.end(JSON.stringify({ error: 'Internal Server Error' }));
    //       }
    //     });
    //   }
    // }
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
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react'
            }
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query'
            }
            if (id.includes('framer-motion') || id.includes('lucide-react')) {
              return 'vendor-ui'
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three'
            }
            if (id.includes('@supabase')) {
              return 'vendor-supabase'
            }
            return 'vendor-other'
          }
          
          // App chunks
          if (id.includes('/pages/')) {
            return 'pages'
          }
          if (id.includes('/components/')) {
            return 'components'
          }
          if (id.includes('/hooks/')) {
            return 'hooks'
          }
          if (id.includes('/utils/')) {
            return 'utils'
          }
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
  // Статические переменные окружения для предотвращения ReferenceError
  define: {
    __VITE_SUPABASE_URL__: JSON.stringify('https://zbykhdjqrtqftfitbvbt.supabase.co'),
    __VITE_SUPABASE_ANON_KEY__: JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'),
  },
})