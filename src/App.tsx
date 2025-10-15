import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LanguageProvider } from './contexts/LanguageContext';
import { LogosProvider } from './contexts/LogosContext';
import { AuthProvider } from './contexts/AuthContext';
import { checkSupabaseEnv } from './utils/envCheck';
// import { PageLoader } from './components/PageLoader';

const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '1.5rem',
    color: '#3b82f6'
  }}>
    Загрузка...
  </div>
);

// Lazy load components
const Index = React.lazy(() => import('./pages/Index'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Blog = React.lazy(() => import('./pages/Blog'));
const News = React.lazy(() => import('./pages/News'));
const Careers = React.lazy(() => import('./pages/Careers'));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'));
const Profile = React.lazy(() => import('./pages/Profile'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const AdminPanel = React.lazy(() => import('./pages/admin/AdminPanel'));
const CaseDetail = React.lazy(() => import('./pages/CaseDetail'));
const CaseManagement = React.lazy(() => import('./pages/admin/CaseManagement'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));

function App() {
  // Проверяем переменные окружения при запуске
  useEffect(() => {
    checkSupabaseEnv();
  }, []);

  return (
  <LanguageProvider>
    <LogosProvider>
      <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/multimedia" element={<Services />} />
        <Route path="/services/development" element={<Services />} />
        <Route path="/services/equipment-rental" element={<Services />} />
        <Route path="/services/design" element={<Services />} />
        <Route path="/services/kinetic-screen" element={<Services />} />
        <Route path="/services/complex-solutions" element={<Services />} />
        <Route path="/services/technical-support" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/news" element={<News />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/case/:id" element={<CaseDetail />} />
        <Route path="/case-management" element={<CaseManagement />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        {/* Fallback route для 404 */}
        <Route path="*" element={
          <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
              <p className="text-xl text-slate-600 mb-8">Страница не найдена</p>
              <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Вернуться на главную
              </a>
            </div>
          </div>
        } />
        </Routes>
            </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </LogosProvider>
      <Toaster 
        position="bottom-right" 
        richColors 
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
  </LanguageProvider>
);
}

export default App;