
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LogosProvider } from "./contexts/LogosContextDB";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import News from "./pages/News";
import Careers from "./pages/Careers";
import Equipment from "./pages/Equipment";
import CaseSamaraStand from "./pages/CaseSamaraStand";
import SamsungEvent from "./pages/SamsungEvent";
import TestPage from "./pages/TestPage";
import TestSimple from "./pages/TestSimple";
import TestMinimal from "./pages/TestMinimal";
import SupabaseConnectionTest from "./pages/SupabaseConnectionTest";
import EquipmentTest from "./pages/EquipmentTest";
import { SupabaseDiagnostic } from "./pages/SupabaseDiagnostic";
import EquipmentCatalogAdmin from "./pages/admin/EquipmentCatalogAdmin";
import QuickAddEquipment from "./pages/QuickAddEquipment";
import CSVImportEquipment from "./pages/CSVImportEquipment";
import HomepageEquipmentAdmin from "./pages/admin/HomepageEquipmentAdmin";
import SetupHomepageEquipment from "./pages/SetupHomepageEquipment";
import CreateHomepageEquipmentTable from "./pages/CreateHomepageEquipmentTable";
import QuickSetupHomepageEquipment from "./pages/QuickSetupHomepageEquipment";


// Основные страницы услуг
import Multimedia from "./pages/services/Multimedia";
import Development from "./pages/services/Development";
import Design from "./pages/services/Design";
import TechnicalSupport from "./pages/services/TechnicalSupport";
import EquipmentRental from "./pages/services/EquipmentRental";
import ComplexSolutions from "./pages/services/ComplexSolutions";

// Страницы мультимедийного оборудования
import KineticScreen from "./pages/services/KineticScreen";
import MatrixScreen from "./pages/services/MatrixScreen";
import TransparentScreen from "./pages/services/TransparentScreen";
import InfoPanels from "./pages/services/InfoPanels";
import Projectors from "./pages/services/Projectors";
import FlexibleNeon from "./pages/services/FlexibleNeon";
import ProjectionScreens from "./pages/services/ProjectionScreens";
import HolographicFans from "./pages/services/HolographicFans";
import ArGlasses from "./pages/services/ArGlasses";

// Страницы разработки
import ArVrApps from "./pages/services/ArVrApps";
import InteractiveGames from "./pages/services/InteractiveGames";
import MobileSolutions from "./pages/services/MobileSolutions";
import WebPlatforms from "./pages/services/WebPlatforms";
import CrossPlatform from "./pages/services/CrossPlatform";

// Страницы дизайна
import ContentCreation from "./pages/services/ContentCreation";
import ContentAdaptation from "./pages/services/ContentAdaptation";
import MultimediaContent from "./pages/services/MultimediaContent";
import CorporateDesign from "./pages/services/CorporateDesign";
import SpaceDecoration from "./pages/services/SpaceDecoration";

// Страницы технической поддержки
import TechSupport from "./pages/services/TechSupport";
import Installation from "./pages/services/Installation";
import Configuration from "./pages/services/Configuration";
import EquipmentDiagnostics from "./pages/services/EquipmentDiagnostics";
import Maintenance from "./pages/services/Maintenance";
import EquipmentCalculation from "./pages/services/EquipmentCalculation";
import DebugCart from "./pages/DebugCart";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Game from "./pages/Game";
import GameSimple from './pages/GameSimple';
import TestFigmaPage from './pages/TestFigmaPage';
import FigmaExactPage from './pages/FigmaExactPage';
import FigmaDebugPage from './pages/FigmaDebugPage';
import FigmaSimplePage from './pages/FigmaSimplePage';
import FigmaTestPage from './pages/FigmaTestPage';
import SimpleTest from './pages/SimpleTest';
import SupabaseTest from './pages/SupabaseTest';
import DatabaseManagement from './pages/DatabaseManagement';
import AdminPanel from './pages/admin/AdminPanel';

// Страницы комплексных решений
import SystemIntegration from "./pages/services/SystemIntegration";
import SystemConfiguration from "./pages/services/SystemConfiguration";
import SystemTesting from "./pages/services/SystemTesting";
import ProcessAutomation from "./pages/services/ProcessAutomation";
import SystemScaling from "./pages/services/SystemScaling";

// Админка
import AdminDebug from "./pages/admin/AdminDebug";
import AdminSimple from "./pages/admin/AdminSimple";
import FixHomepageEquipmentRLS from "./pages/FixHomepageEquipmentRLS";
import TestEstimatesPage from "./pages/TestEstimatesPage";
import AdminBypass from "./pages/AdminBypass";
import SimpleEstimatesPage from "./pages/SimpleEstimatesPage";
import CreateServicesBlocksTable from "./pages/CreateServicesBlocksTable";
import CopyServicesBlocksSQL from "./pages/CopyServicesBlocksSQL";
import CopyCasesSQL from "./pages/CopyCasesSQL";
import SetupSupabaseStorage from "./pages/SetupSupabaseStorage";
import SimpleStorageFix from "./pages/SimpleStorageFix";
import TestCasesDisplay from "./pages/TestCasesDisplay";
import DebugPortfolio from "./pages/DebugPortfolio";
import CaseDetail from "./pages/CaseDetail";
import CaseManagement from "./pages/admin/CaseManagement";
import AddCaseFieldsSQL from "./pages/AddCaseFieldsSQL";
import LogosManagement from "./pages/admin/LogosManagement";
import CreateLogosTableSQL from "./pages/CreateLogosTableSQL";
import TestLogosConnection from "./pages/TestLogosConnection";
import ClearLogosData from "./pages/ClearLogosData";
import TestLogosSync from "./pages/TestLogosSync";
import TestLogoDeletion from "./pages/TestLogoDeletion";
import ForceRefreshLogos from "./pages/ForceRefreshLogos";
import DebugLogos from "./pages/DebugLogos";
import ClearAllLogos from "./pages/ClearAllLogos";
import ClearAllLogosSQL from "./pages/ClearAllLogosSQL";
import ForceClearLogos from "./pages/ForceClearLogos";
import ExecuteForceClearSQL from "./pages/ExecuteForceClearSQL";
import QuickClearLogos from "./pages/QuickClearLogos";
import ForceRemoveAllLogos from "./pages/ForceRemoveAllLogos";
import { Profile } from "./pages/Profile";
import { AccessDenied } from "./pages/AccessDenied";
import { AuthTest } from "./pages/AuthTest";
import { SimpleAuthTest } from "./pages/SimpleAuthTest";
import { WorkingAuthTest } from "./pages/WorkingAuthTest";
import CreateAdminUser from "./pages/CreateAdminUser";
import DiagnoseAdmin from "./pages/DiagnoseAdmin";
import FixAdminEmail from "./pages/FixAdminEmail";
import TestLogosLoad from "./pages/TestLogosLoad";
import SimpleDbTest from "./pages/SimpleDbTest";
import DirectSupabaseTest from "./pages/DirectSupabaseTest";
import UltraSimpleTest from "./pages/UltraSimpleTest";
import RestApiTest from "./pages/RestApiTest";
import TestRestLogos from "./pages/TestRestLogos";
import TestRestApi from "./pages/TestRestApi";

// Страницы пространственного проектирования
import SpacePlanning from "./pages/services/SpacePlanning";
import SpaceDesign from "./pages/services/SpaceDesign";
import SpaceImplementation from "./pages/services/SpaceImplementation";
import ThreeDModeling from "./pages/services/ThreeDModeling";
import TechnicalDocumentation from "./pages/services/TechnicalDocumentation";

const App = () => (
  <LanguageProvider>
    <LogosProvider>
      <AuthProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
        <ScrollToTop />
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/case/:id" element={<CaseDetail />} />
        <Route path="/team" element={<Team />} />
        {/* Скрытые маршруты для Новостей и Блога */}
        <Route path="/blog" element={<Blog />} style={{display: 'none'}} />
        <Route path="/news" element={<News />} style={{display: 'none'}} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/debug-cart" element={<DebugCart />} />
        <Route path="/logos" element={<LogosManagement />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game-simple" element={<GameSimple />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/test-simple" element={<TestSimple />} />
        <Route path="/test-minimal" element={<TestMinimal />} />
        <Route path="/test-page" element={<TestPage />} />
        <Route path="/simple" element={<SimpleTest />} />
        <Route path="/supabase-test" element={<SupabaseConnectionTest />} />
        <Route path="/test-figma" element={<TestFigmaPage />} />
        <Route path="/figma-exact" element={<FigmaExactPage />} />
        <Route path="/figma-debug" element={<FigmaDebugPage />} />
        <Route path="/figma-simple" element={<FigmaSimplePage />} />
        <Route path="/figma-test" element={<FigmaTestPage />} />
        <Route path="/simple-test" element={<SimpleTest />} />
        <Route path="/supabase-test" element={<SupabaseTest />} />
        <Route path="/equipment-test" element={<EquipmentTest />} />
        <Route path="/admin/equipment" element={<EquipmentCatalogAdmin />} />
        <Route path="/admin/homepage-equipment" element={<HomepageEquipmentAdmin />} />
        <Route path="/setup-homepage-equipment" element={<SetupHomepageEquipment />} />
        <Route path="/create-homepage-equipment-table" element={<CreateHomepageEquipmentTable />} />
        <Route path="/quick-setup-homepage-equipment" element={<QuickSetupHomepageEquipment />} />
        <Route path="/add-equipment" element={<QuickAddEquipment />} />
        <Route path="/import-equipment" element={<CSVImportEquipment />} />
        <Route path="/database" element={<DatabaseManagement />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/admin-debug" element={<AdminDebug />} />
        <Route path="/admin-simple" element={<AdminSimple />} />
        <Route path="/fix-homepage-equipment-rls" element={<FixHomepageEquipmentRLS />} />
        <Route path="/test-estimates" element={<TestEstimatesPage />} />
        <Route path="/admin-bypass" element={<AdminBypass />} />
        <Route path="/simple-estimates" element={<SimpleEstimatesPage />} />
        <Route path="/create-services-blocks-table" element={<CreateServicesBlocksTable />} />
        <Route path="/copy-services-blocks-sql" element={<CopyServicesBlocksSQL />} />
        <Route path="/copy-cases-sql" element={<CopyCasesSQL />} />
        <Route path="/setup-supabase-storage" element={<SetupSupabaseStorage />} />
        <Route path="/simple-storage-fix" element={<SimpleStorageFix />} />
        <Route path="/test-cases-display" element={<TestCasesDisplay />} />
        <Route path="/debug-portfolio" element={<DebugPortfolio />} />
        <Route path="/admin/cases" element={<CaseManagement />} />
        <Route path="/add-case-fields-sql" element={<AddCaseFieldsSQL />} />
        <Route path="/admin/logos" element={<LogosManagement />} />
        <Route path="/create-logos-table-sql" element={<CreateLogosTableSQL />} />
        <Route path="/test-logos-connection" element={<TestLogosConnection />} />
        <Route path="/clear-logos-data" element={<ClearLogosData />} />
        <Route path="/test-logos-sync" element={<TestLogosSync />} />
        <Route path="/test-logo-deletion" element={<TestLogoDeletion />} />
        <Route path="/force-refresh-logos" element={<ForceRefreshLogos />} />
        <Route path="/debug-logos" element={<DebugLogos />} />
        <Route path="/clear-all-logos" element={<ClearAllLogos />} />
        <Route path="/clear-all-logos-sql" element={<ClearAllLogosSQL />} />
        <Route path="/force-clear-logos" element={<ForceClearLogos />} />
        <Route path="/execute-force-clear-sql" element={<ExecuteForceClearSQL />} />
        <Route path="/quick-clear-logos" element={<QuickClearLogos />} />
        <Route path="/force-remove-all-logos" element={<ForceRemoveAllLogos />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/auth-test" element={<AuthTest />} />
        <Route path="/simple-auth-test" element={<SimpleAuthTest />} />
        <Route path="/working-auth-test" element={<WorkingAuthTest />} />
        <Route path="/create-admin" element={<CreateAdminUser />} />
        <Route path="/diagnose-admin" element={<DiagnoseAdmin />} />
        <Route path="/fix-admin-email" element={<FixAdminEmail />} />
        <Route path="/test-logos-load" element={<TestLogosLoad />} />
        <Route path="/simple-db-test" element={<SimpleDbTest />} />
        <Route path="/direct-supabase-test" element={<DirectSupabaseTest />} />
        <Route path="/ultra-simple-test" element={<UltraSimpleTest />} />
        <Route path="/rest-api-test" element={<RestApiTest />} />
        <Route path="/test-rest-logos" element={<TestRestLogos />} />
        <Route path="/test-rest-api" element={<TestRestApi />} />
        <Route path="/supabase-diagnostic" element={<SupabaseDiagnostic />} />
        <Route path="/test-inline" element={
          <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h1>🎨 Inline Test работает!</h1>
              <p style={{ fontSize: '1rem', marginTop: '1rem', opacity: 0.8 }}>
                Если вы видите это, значит React работает корректно
              </p>
            </div>
          </div>
        } />
        <Route path="/minimal-test" element={
          <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            <div>
              <h1>🎨 Minimal Test</h1>
              <p style={{ fontSize: '1rem', marginTop: '1rem', opacity: 0.8 }}>
                React работает! Порт: 8083
              </p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.6 }}>
                Время: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        } />
        <Route path="/ultra-simple" element={
          <div style={{ 
            minHeight: '100vh', 
            background: 'red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '3rem',
            fontWeight: 'bold'
          }}>
            ULTRA SIMPLE TEST
          </div>
        } />
        <Route path="/figma-inline" element={
          <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '20px'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                textAlign: 'center', 
                marginBottom: '2rem',
                color: '#1e293b'
              }}>
                🎨 Figma Design - Inline версия
              </h1>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '1.5rem' 
              }}>
                {/* Карточка 1 */}
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  color: 'white',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                    КОМПЛЕКСНАЯ АРЕНДА
                  </h3>
                  <p style={{ opacity: 0.9, marginBottom: '1rem' }}>
                    Цена аренды включает доставку, монтаж и сопровождение
                  </p>
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    display: 'inline-block',
                    fontSize: '0.875rem'
                  }}>
                    Подробнее →
                  </div>
                </div>

                {/* Карточка 2 */}
                <div style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  color: 'white',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                    SHOW<br />REEL
                  </h3>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}>
                    ▶️
                  </div>
                </div>

                {/* Карточка 3 */}
                <div style={{
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  color: 'white',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                    ВДНХ
                  </h3>
                  <p style={{ opacity: 0.9, marginBottom: '1rem' }}>
                    стенд Самарской области<br />
                    на выставке-форуме<br />
                    «Россия»
                  </p>
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    display: 'inline-block',
                    fontSize: '0.875rem'
                  }}>
                    посмотреть →
                  </div>
                </div>
              </div>

              <div style={{ 
                marginTop: '3rem', 
                textAlign: 'center',
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b' }}>
                  Статус: Работает! ✅
                </h2>
                <p style={{ color: '#64748b' }}>
                  Точная копия дизайна из Figma с интерактивными элементами
                </p>
              </div>
            </div>
          </div>
        } />
        <Route path="/portfolio/samara-stand" element={<CaseSamaraStand />} />
        <Route path="/portfolio/samsung-event" element={<SamsungEvent />} />
        {/* Основные страницы услуг */}
        <Route path="/services/multimedia" element={<Multimedia />} />
        <Route path="/services/development" element={<Development />} />
        <Route path="/services/technical-support" element={<TechnicalSupport />} />
        <Route path="/services/design" element={<Design />} />
        <Route path="/services/equipment-rental" element={<EquipmentRental />} />
        <Route path="/services/complex-solutions" element={<ComplexSolutions />} />
        
        {/* Страницы мультимедийного оборудования */}
        <Route path="/services/kinetic-screen" element={<KineticScreen />} />
        <Route path="/services/matrix-screen" element={<MatrixScreen />} />
        <Route path="/services/transparent-screen" element={<TransparentScreen />} />
        <Route path="/services/info-panels" element={<InfoPanels />} />
        <Route path="/services/projectors" element={<Projectors />} />
        <Route path="/services/flexible-neon" element={<FlexibleNeon />} />
        <Route path="/services/projection-screens" element={<ProjectionScreens />} />
        <Route path="/services/holographic-fans" element={<HolographicFans />} />
        <Route path="/services/ar-glasses" element={<ArGlasses />} />
        
        {/* Страницы разработки */}
        <Route path="/services/ar-vr-apps" element={<ArVrApps />} />
        <Route path="/services/interactive-games" element={<InteractiveGames />} />
        <Route path="/services/mobile-solutions" element={<MobileSolutions />} />
        <Route path="/services/web-platforms" element={<WebPlatforms />} />
        <Route path="/services/cross-platform" element={<CrossPlatform />} />
        
        {/* Страницы дизайна */}
        <Route path="/services/content-creation" element={<ContentCreation />} />
        <Route path="/services/content-adaptation" element={<ContentAdaptation />} />
        <Route path="/services/multimedia-content" element={<MultimediaContent />} />
        <Route path="/services/corporate-design" element={<CorporateDesign />} />
        <Route path="/services/space-decoration" element={<SpaceDecoration />} />
        
        {/* Страницы технической поддержки */}
        <Route path="/services/tech-support" element={<TechSupport />} />
        <Route path="/services/installation" element={<Installation />} />
        <Route path="/services/configuration" element={<Configuration />} />
        <Route path="/services/equipment-diagnostics" element={<EquipmentDiagnostics />} />
        <Route path="/services/maintenance" element={<Maintenance />} />
        <Route path="/services/equipment-calculation" element={<EquipmentCalculation />} />
        
        {/* Страницы комплексных решений */}
        <Route path="/services/system-integration" element={<SystemIntegration />} />
        <Route path="/services/system-configuration" element={<SystemConfiguration />} />
        <Route path="/services/system-testing" element={<SystemTesting />} />
        <Route path="/services/process-automation" element={<ProcessAutomation />} />
        <Route path="/services/system-scaling" element={<SystemScaling />} />
        
        {/* Страницы пространственного проектирования */}
        <Route path="/services/space-planning" element={<SpacePlanning />} />
        <Route path="/services/space-design" element={<SpaceDesign />} />
        <Route path="/services/space-implementation" element={<SpaceImplementation />} />
        <Route path="/services/3d-modeling" element={<ThreeDModeling />} />
        <Route path="/services/technical-documentation" element={<TechnicalDocumentation />} />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LogosProvider>
  </LanguageProvider>
);

export default App;