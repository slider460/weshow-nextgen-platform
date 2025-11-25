import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
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

// Lazy load components with optimized loading
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
const CaseDetail = React.lazy(() => import('./pages/CaseDetail'));
const Team = React.lazy(() => import('./pages/Team'));
const SamaraStandCase = React.lazy(() => import('./pages/SamaraStandCase'));
const CaseSamaraStandVDNH = React.lazy(() => import('./pages/CaseSamaraStandVDNH'));
const SamsungNewYearCase = React.lazy(() => import('./pages/SamsungNewYearCase'));
const CaseSamaraStandVDNH_Test = React.lazy(() => import('./pages/CaseSamaraStandVDNH_Test'));
const CaseStavropol3DMapping = React.lazy(() => import('./pages/CaseStavropol3DMapping'));
const CaseSamaraExhibition = React.lazy(() => import('./pages/CaseSamaraExhibition'));
const Equipment = React.lazy(() => import('./pages/Equipment'));
const KineticScreen = React.lazy(() => import('./pages/equipment/KineticScreen'));
const MatrixScreen = React.lazy(() => import('./pages/equipment/MatrixScreen'));
const TransparentScreen = React.lazy(() => import('./pages/equipment/TransparentScreen'));
const InteractivePanels = React.lazy(() => import('./pages/equipment/InteractivePanels'));
const Projectors = React.lazy(() => import('./pages/equipment/Projectors'));
const FlexibleNeon = React.lazy(() => import('./pages/equipment/FlexibleNeon'));
const MultimediaContent = React.lazy(() => import('./pages/services/MultimediaContent'));
const EquipmentRental = React.lazy(() => import('./pages/services/EquipmentRental'));
const ExhibitionStands = React.lazy(() => import('./pages/services/ExhibitionStands'));
const VideoProductionTest = React.lazy(() => import('./pages/VideoProductionTest'));

// Preload critical components
const preloadCriticalComponents = () => {
  // Preload About and Services as they're likely to be visited
  import('./pages/About');
  import('./pages/Services');
};

function App() {
  // Проверяем переменные окружения при запуске
  useEffect(() => {
    checkSupabaseEnv();
    
    // Preload critical components after initial load
    const timer = setTimeout(() => {
      preloadCriticalComponents();
    }, 2000); // Preload after 2 seconds
    
    return () => clearTimeout(timer);
  }, []);

  return (
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
              <Route path="/services/multimedia-content" element={<MultimediaContent />} />
              <Route path="/services/video-production" element={<VideoProductionTest />} />
              <Route path="/services/software-and-games" element={<Services />} />
              <Route path="/services/multimedia-installations" element={<Services />} />
              <Route path="/services/rental-multimedia-equipment" element={<EquipmentRental />} />
              <Route path="/services/technological-exhibition-stands" element={<ExhibitionStands />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/news" element={<News />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/case/:id" element={<CaseDetail />} />
              <Route path="/team" element={<Team />} />
              <Route path="/portfolio/samara-stand" element={<Navigate to="/portfolio/samara-stand-vdnh" replace />} />
              <Route path="/portfolio/samara-stand-vdnh" element={<CaseSamaraStandVDNH_Test />} />
              <Route path="/portfolio/samsung-new-year-2020" element={<SamsungNewYearCase />} />
              <Route path="/portfolio/samara-stand-vdnh-test" element={<CaseSamaraStandVDNH_Test />} />
              <Route path="/portfolio/stavropol-3d-mapping" element={<CaseStavropol3DMapping />} />
              <Route path="/portfolio/samara-exhibition" element={<CaseSamaraExhibition />} />
              <Route path="/equipment/kinetic-screen" element={<KineticScreen />} />
              <Route path="/equipment/matrix-screen" element={<MatrixScreen />} />
              <Route path="/equipment/transparent-screen" element={<TransparentScreen />} />
              <Route path="/equipment/interactive-panels" element={<InteractivePanels />} />
              <Route path="/equipment/projectors" element={<Projectors />} />
              <Route path="/equipment/flexible-neon" element={<FlexibleNeon />} />
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
      </AuthProvider>
    </LogosProvider>
  );
}

export default App;