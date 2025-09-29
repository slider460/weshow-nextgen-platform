import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { handleApiRequest } from './src/api/routes'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
  },
})