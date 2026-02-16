import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster as SonnerToaster } from 'sonner';
import { Toaster as ShadcnToaster } from './components/ui/toaster';
import { LogosProvider } from './contexts/LogosContext';
// AuthProvider убран - сайт полностью локальный, БД не используется
// import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import SkipToContent from './components/SkipToContent';
import CookieConsent from './components/CookieConsent';
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
const Index = React.lazy(() => import('./pages/Index.tsx'));
const About = React.lazy(() => import('./pages/About.tsx'));
const Services = React.lazy(() => import('./pages/Services.tsx'));
const Portfolio = React.lazy(() => import('./pages/Portfolio.tsx'));
const Contact = React.lazy(() => import('./pages/Contact.tsx'));
// Страницы с БД убраны - сайт полностью локальный
// const Blog = React.lazy(() => import('./pages/Blog.tsx'));
// const News = React.lazy(() => import('./pages/News.tsx'));
// const Careers = React.lazy(() => import('./pages/Careers.tsx'));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage.tsx'));
// const Profile = React.lazy(() => import('./pages/Profile.tsx'));
const CaseDetail = React.lazy(() => import('./pages/CaseDetail.tsx'));
const Team = React.lazy(() => import('./pages/Team.tsx'));
const SamaraStandCase = React.lazy(() => import('./pages/SamaraStandCase.tsx'));
const CaseSamaraStandVDNH = React.lazy(() => import('./pages/CaseSamaraStandVDNH.tsx'));
const SamsungNewYearCase = React.lazy(() => import('./pages/SamsungNewYearCase.tsx'));

const CaseStavropol3DMapping = React.lazy(() => import('./pages/CaseStavropol3DMapping.tsx'));
const CaseSamaraExhibition = React.lazy(() => import('./pages/CaseSamaraExhibition.tsx'));
const VivaxCase = React.lazy(() => import('./pages/VivaxCase.tsx'));
const UazPatriotCase = React.lazy(() => import('./pages/UazPatriotCase.tsx'));
const SalarisCase = React.lazy(() => import('./pages/SalarisCase.tsx'));
const SilkWayRallyCase = React.lazy(() => import('./pages/SilkWayRallyCase.tsx'));
const CaseStavropolStandVDNH = React.lazy(() => import('./pages/CaseStavropolStandVDNH.tsx'));
const Equipment = React.lazy(() => import('./pages/Equipment.tsx'));
const KineticScreen = React.lazy(() => import('./pages/equipment/KineticScreen.tsx'));
const MatrixScreen = React.lazy(() => import('./pages/equipment/MatrixScreen.tsx'));
const TransparentScreen = React.lazy(() => import('./pages/equipment/TransparentScreen.tsx'));
const InteractivePanels = React.lazy(() => import('./pages/equipment/InteractivePanels.tsx'));
const Projectors = React.lazy(() => import('./pages/equipment/Projectors.tsx'));
const FlexibleNeon = React.lazy(() => import('./pages/equipment/FlexibleNeon.tsx'));
const MultimediaContent = React.lazy(() => import('./pages/services/MultimediaContent.tsx'));
const EquipmentRental = React.lazy(() => import('./pages/services/EquipmentRental.tsx'));
const RentalMultimediaEquipment = React.lazy(() => import('./pages/services/RentalMultimediaEquipment.tsx'));
const TechnologicalExhibitionStands = React.lazy(() => import('./pages/services/TechnologicalExhibitionStands.tsx'));
const ExhibitionStands = React.lazy(() => import('./pages/services/ExhibitionStands.tsx'));
const VideoProduction = React.lazy(() => import('./pages/VideoProduction.tsx'));
const IndexTest = React.lazy(() => import('./pages/IndexTest.tsx'));
const SoftwareAndGames = React.lazy(() => import('./pages/services/SoftwareAndGames.tsx'));
const MultimediaInstallations = React.lazy(() => import('./pages/services/MultimediaInstallations.tsx'));
const Tetris = React.lazy(() => import('./pages/Tetris.tsx'));

const PersonalDataAgreement = React.lazy(() => import('./pages/PersonalDataAgreement.tsx'));

const NotFound = React.lazy(() => import('./pages/NotFound.tsx'));

// Preload critical components
const preloadCriticalComponents = () => {
  // Preload About and Services as they're likely to be visited
  import('./pages/About.tsx');
  import('./pages/Services.tsx');
};

function App() {
  // Preload critical components after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      preloadCriticalComponents();
    }, 2000); // Preload after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <LogosProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SkipToContent />
        <ScrollToTop />
        <CookieConsent />
        <div id="main" tabIndex={-1} className="outline-none">
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

              <Route path="/services/video-production" element={<VideoProduction />} />
              <Route path="/services/software-and-games" element={<SoftwareAndGames />} />
              <Route path="/services/multimedia-installations" element={<MultimediaInstallations />} />
              <Route path="/services/rental-multimedia-equipment" element={<RentalMultimediaEquipment />} />
              <Route path="/services/technological-exhibition-stands" element={<TechnologicalExhibitionStands />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              {/* Страницы с БД убраны - сайт полностью локальный */}
              {/* <Route path="/blog" element={<Blog />} /> */}
              {/* <Route path="/news" element={<News />} /> */}
              {/* <Route path="/careers" element={<Careers />} /> */}
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/agreement" element={<PersonalDataAgreement />} />
              {/* <Route path="/profile" element={<Profile />} /> */}
              <Route path="/case/:id" element={<CaseDetail />} />
              <Route path="/team" element={<Team />} />
              <Route path="/portfolio/samara-stand" element={<Navigate to="/portfolio/samara-stand-vdnh" replace />} />
              <Route path="/portfolio/samara-stand-vdnh" element={<CaseSamaraStandVDNH />} />
              <Route path="/portfolio/samsung-new-year-2020" element={<SamsungNewYearCase />} />

              <Route path="/portfolio/stavropol-3d-mapping" element={<CaseStavropol3DMapping />} />
              <Route path="/portfolio/samara-exhibition" element={<CaseSamaraExhibition />} />
              <Route path="/portfolio/vivax-samburskaya" element={<VivaxCase />} />
              <Route path="/portfolio/uaz-patriot-eaton" element={<UazPatriotCase />} />
              <Route path="/portfolio/salaris-presentation" element={<SalarisCase />} />
              <Route path="/portfolio/silk-way-rally" element={<SilkWayRallyCase />} />
              <Route path="/portfolio/stavropol-stand-vdnh" element={<CaseStavropolStandVDNH />} />
              <Route path="/equipment/kinetic-screen" element={<KineticScreen />} />
              <Route path="/equipment/matrix-screen" element={<MatrixScreen />} />

              <Route path="/index-test" element={<IndexTest />} />
              <Route path="/equipment/transparent-screen" element={<TransparentScreen />} />
              <Route path="/equipment/interactive-panels" element={<InteractivePanels />} />
              <Route path="/equipment/projectors" element={<Projectors />} />
              <Route path="/equipment/flexible-neon" element={<FlexibleNeon />} />
              <Route path="/tetris" element={<Tetris />} />
              <Route path="/game" element={<Tetris />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
      <SonnerToaster
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
      <ShadcnToaster />
    </LogosProvider>
  );
}

export default App;