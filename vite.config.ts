import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Маршруты SPA: для каждого при запросе с завершающим слэшем Apache ищет index.html в папке.
// Без этих копий /portfolio/ и т.п. дают 403, если .htaccess не обрабатывается.
const SPA_ROUTE_DIRS = [
  'about', 'contact', 'portfolio', 'team', 'services', 'equipment', 'privacy', 'tetris', 'game',
  'case',
]

function copyIndexIntoRouteDirs() {
  return {
    name: 'copy-index-for-spa-routes',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist')
      const indexPath = path.join(outDir, 'index.html')
      if (!fs.existsSync(indexPath)) return
      const html = fs.readFileSync(indexPath, 'utf-8')
      for (const dir of SPA_ROUTE_DIRS) {
        const targetDir = path.join(outDir, dir)
        fs.mkdirSync(targetDir, { recursive: true })
        fs.writeFileSync(path.join(targetDir, 'index.html'), html)
      }
      // Вложенные маршруты первого уровня (например /portfolio/xxx, /services/xxx, /equipment/xxx)
      const nested = [
        'services/multimedia-content', 'services/video-production', 'services/software-and-games',
        'services/multimedia-installations', 'services/rental-multimedia-equipment',
        'services/technological-exhibition-stands',
        'portfolio/samara-stand-vdnh', 'portfolio/samsung-new-year-2020', 'portfolio/stavropol-3d-mapping',
        'portfolio/samara-exhibition', 'portfolio/vivax-samburskaya', 'portfolio/uaz-patriot-eaton',
        'portfolio/salaris-presentation', 'portfolio/silk-way-rally', 'portfolio/stavropol-stand-vdnh',
        'equipment/kinetic-screen', 'equipment/matrix-screen', 'equipment/transparent-screen',
        'equipment/interactive-panels', 'equipment/projectors', 'equipment/flexible-neon',
      ]
      for (const dir of nested) {
        const targetDir = path.join(outDir, dir)
        fs.mkdirSync(targetDir, { recursive: true })
        fs.writeFileSync(path.join(targetDir, 'index.html'), html)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), copyIndexIntoRouteDirs()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom'],
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    host: '0.0.0.0',
    port: 8082,
  },
  build: {
    target: 'es2015',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
        },
      },
    },
  },
})
