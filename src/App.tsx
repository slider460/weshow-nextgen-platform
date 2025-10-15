
// WESHOW NextGen Platform - Updated: 2025-10-09 PERFORMANCE OPTIMIZED v2 - Code Splitting
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LogosProvider } from "./contexts/LogosContextDB";
import { AuthProvider } from "./contexts/AuthContext";
import { DataPreloader } from "./components/DataPreloader";
import { PerformanceMonitor } from "./components/PerformanceMonitor";
import { NotificationProvider } from "./components/NotificationSystem";
import { Toaster } from "sonner";
import { preloadCriticalDataOptimized } from "./config/optimized-supabase";
import { setupPerformanceMonitoring } from "./config/performance-config";

// Критичные страницы - загружаем сразу
import Index from "./pages/Index";
import Equipment from "./pages/Equipment";

// Некритичные страницы - lazy loading для оптимизации
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Team = lazy(() => import("./pages/Team"));
const Blog = lazy(() => import("./pages/Blog"));
const News = lazy(() => import("./pages/News"));
const Careers = lazy(() => import("./pages/Careers"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const CaseSamaraStand = lazy(() => import("./pages/CaseSamaraStand"));
const SamsungEvent = lazy(() => import("./pages/SamsungEvent"));
// Тестовые страницы удалены для оптимизации сборки
// Тестовые страницы удалены для оптимизации сборки
const EquipmentCatalogAdmin = lazy(() => import("./pages/admin/EquipmentCatalogAdmin"));
const QuickAddEquipment = lazy(() => import("./pages/QuickAddEquipment"));
const CSVImportEquipment = lazy(() => import("./pages/CSVImportEquipment"));
const HomepageEquipmentAdmin = lazy(() => import("./pages/admin/HomepageEquipmentAdmin"));
const SetupHomepageEquipment = lazy(() => import("./pages/SetupHomepageEquipment"));
const CreateHomepageEquipmentTable = lazy(() => import("./pages/CreateHomepageEquipmentTable"));
const QuickSetupHomepageEquipment = lazy(() => import("./pages/QuickSetupHomepageEquipment"));


// Основные страницы услуг - lazy loading
const Multimedia = lazy(() => import("./pages/services/Multimedia"));
const Development = lazy(() => import("./pages/services/Development"));
const Design = lazy(() => import("./pages/services/Design"));
const TechnicalSupport = lazy(() => import("./pages/services/TechnicalSupport"));
const EquipmentRental = lazy(() => import("./pages/services/EquipmentRental"));
const ComplexSolutions = lazy(() => import("./pages/services/ComplexSolutions"));

// Страницы мультимедийного оборудования - lazy loading
const KineticScreen = lazy(() => import("./pages/services/KineticScreen"));
const MatrixScreen = lazy(() => import("./pages/services/MatrixScreen"));
const TransparentScreen = lazy(() => import("./pages/services/TransparentScreen"));
const InfoPanels = lazy(() => import("./pages/services/InfoPanels"));
const Projectors = lazy(() => import("./pages/services/Projectors"));
const FlexibleNeon = lazy(() => import("./pages/services/FlexibleNeon"));
const ProjectionScreens = lazy(() => import("./pages/services/ProjectionScreens"));
const HolographicFans = lazy(() => import("./pages/services/HolographicFans"));
const ArGlasses = lazy(() => import("./pages/services/ArGlasses"));
const ProjectionMapping = lazy(() => import("./pages/services/ProjectionMapping"));
const HolographicDisplays = lazy(() => import("./pages/services/HolographicDisplays"));
const SpacePlanning = lazy(() => import("./pages/services/SpacePlanning"));
const TechSupport = lazy(() => import("./pages/services/TechSupport"));
const SystemIntegration = lazy(() => import("./pages/services/SystemIntegration"));

// Страницы разработки - lazy loading
const ArVrApps = lazy(() => import("./pages/services/ArVrApps"));
const InteractiveGames = lazy(() => import("./pages/services/InteractiveGames"));
const MobileSolutions = lazy(() => import("./pages/services/MobileSolutions"));
const WebPlatforms = lazy(() => import("./pages/services/WebPlatforms"));
const CrossPlatform = lazy(() => import("./pages/services/CrossPlatform"));

// Страницы дизайна - lazy loading
const ContentCreation = lazy(() => import("./pages/services/ContentCreation"));
const ContentAdaptation = lazy(() => import("./pages/services/ContentAdaptation"));
const MultimediaContent = lazy(() => import("./pages/services/MultimediaContent"));
const CorporateDesign = lazy(() => import("./pages/services/CorporateDesign"));
const SpaceDecoration = lazy(() => import("./pages/services/SpaceDecoration"));

// Страницы технической поддержки - lazy loading
const Installation = lazy(() => import("./pages/services/Installation"));
const Configuration = lazy(() => import("./pages/services/Configuration"));
const EquipmentDiagnostics = lazy(() => import("./pages/services/EquipmentDiagnostics"));
const Maintenance = lazy(() => import("./pages/services/Maintenance"));
const EquipmentCalculation = lazy(() => import("./pages/services/EquipmentCalculation"));
// Тестовые страницы удалены для оптимизации сборки
const DatabaseManagement = lazy(() => import('./pages/DatabaseManagement'));
const AdminPanel = lazy(() => import('./pages/admin/AdminPanel'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));

// Страницы комплексных решений - lazy loading
const SystemConfiguration = lazy(() => import("./pages/services/SystemConfiguration"));
const SystemTesting = lazy(() => import("./pages/services/SystemTesting"));
const ProcessAutomation = lazy(() => import("./pages/services/ProcessAutomation"));
const SystemScaling = lazy(() => import("./pages/services/SystemScaling"));

// Админка - lazy loading
// Тестовые страницы удалены для оптимизации сборки
const CreateServicesBlocksTable = lazy(() => import("./pages/CreateServicesBlocksTable"));
const CopyServicesBlocksSQL = lazy(() => import("./pages/CopyServicesBlocksSQL"));
const CopyCasesSQL = lazy(() => import("./pages/CopyCasesSQL"));
const SetupSupabaseStorage = lazy(() => import("./pages/SetupSupabaseStorage"));
const SimpleStorageFix = lazy(() => import("./pages/SimpleStorageFix"));
const DebugPortfolio = lazy(() => import("./pages/DebugPortfolio"));
const CaseDetail = lazy(() => import("./pages/CaseDetail"));
const CaseManagement = lazy(() => import("./pages/admin/CaseManagement"));
const AddCaseFieldsSQL = lazy(() => import("./pages/AddCaseFieldsSQL"));
const LogosManagement = lazy(() => import("./pages/admin/LogosManagement"));
const LettersCertificatesManagement = lazy(() => import("./pages/admin/LettersCertificatesManagement"));
const TestLettersTable = lazy(() => import("./pages/TestLettersTable"));
const CreateLettersTable = lazy(() => import("./pages/CreateLettersTable"));
const AutoCreateLettersTable = lazy(() => import("./pages/AutoCreateLettersTable"));
const SimpleCreateTable = lazy(() => import("./pages/SimpleCreateTable"));
const AutoCreateTableDirect = lazy(() => import("./pages/AutoCreateTableDirect"));
const SetupSQLExecution = lazy(() => import("./pages/SetupSQLExecution"));
const CreateTableSimple = lazy(() => import("./pages/CreateTableSimple"));
const TestLettersHook = lazy(() => import("./pages/TestLettersHook"));
const TestDirectSupabase = lazy(() => import("./pages/TestDirectSupabase"));
const CreateLogosTableSQL = lazy(() => import("./pages/CreateLogosTableSQL"));
const TestLogosConnection = lazy(() => import("./pages/TestLogosConnection"));
const ClearLogosData = lazy(() => import("./pages/ClearLogosData"));
const TestLogosSync = lazy(() => import("./pages/TestLogosSync"));
const TestLogoDeletion = lazy(() => import("./pages/TestLogoDeletion"));
const ForceRefreshLogos = lazy(() => import("./pages/ForceRefreshLogos"));
const DebugLogos = lazy(() => import("./pages/DebugLogos"));
const ClearAllLogos = lazy(() => import("./pages/ClearAllLogos"));
const ClearAllLogosSQL = lazy(() => import("./pages/ClearAllLogosSQL"));
const ForceClearLogos = lazy(() => import("./pages/ForceClearLogos"));
const ExecuteForceClearSQL = lazy(() => import("./pages/ExecuteForceClearSQL"));
const QuickClearLogos = lazy(() => import("./pages/QuickClearLogos"));
const ForceRemoveAllLogos = lazy(() => import("./pages/ForceRemoveAllLogos"));
const Profile = lazy(() => import("./pages/Profile").then(m => ({ default: m.Profile })));
const AccessDenied = lazy(() => import("./pages/AccessDenied").then(m => ({ default: m.AccessDenied })));
const AuthTest = lazy(() => import("./pages/AuthTest").then(m => ({ default: m.AuthTest })));
const SimpleAuthTest = lazy(() => import("./pages/SimpleAuthTest").then(m => ({ default: m.SimpleAuthTest })));
const WorkingAuthTest = lazy(() => import("./pages/WorkingAuthTest").then(m => ({ default: m.WorkingAuthTest })));
const CreateAdminUser = lazy(() => import("./pages/CreateAdminUser"));
const DiagnoseAdmin = lazy(() => import("./pages/DiagnoseAdmin"));
const FixAdminEmail = lazy(() => import("./pages/FixAdminEmail"));
const TestLogosLoad = lazy(() => import("./pages/TestLogosLoad"));
const SimpleDbTest = lazy(() => import("./pages/SimpleDbTest"));
const DirectSupabaseTest = lazy(() => import("./pages/DirectSupabaseTest"));
const UltraSimpleTest = lazy(() => import("./pages/UltraSimpleTest"));
const RestApiTest = lazy(() => import("./pages/RestApiTest"));
const TestRestLogos = lazy(() => import("./pages/TestRestLogos"));
const TestRestApi = lazy(() => import("./pages/TestRestApi"));
const CartPage = lazy(() => import("./pages/CartPage"));

// Страницы пространственного проектирования - lazy loading
const SpaceDesign = lazy(() => import("./pages/services/SpaceDesign"));
const SpaceImplementation = lazy(() => import("./pages/services/SpaceImplementation"));
const ThreeDModeling = lazy(() => import("./pages/services/ThreeDModeling"));
const TechnicalDocumentation = lazy(() => import("./pages/services/TechnicalDocumentation"));
const ElectricDemoFinal = lazy(() => import("./pages/ElectricDemoFinal"));
const RotatingTextDemo = lazy(() => import("./pages/RotatingTextDemo"));
const VideoShowcase = lazy(() => import("./pages/VideoShowcase"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));

// Компонент для инициализации оптимизированной предзагрузки
const OptimizedAppWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Проверка переменных окружения
    console.log('=== ПРОВЕРКА ПЕРЕМЕННЫХ ОКРУЖЕНИЯ ===');
    console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL || 'НЕ НАЙДЕНА');
    console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'НАЙДЕНА' : 'НЕ НАЙДЕНА');
    console.log('VITE_SUPABASE_SERVICE_KEY:', import.meta.env.VITE_SUPABASE_SERVICE_KEY ? 'НАЙДЕНА' : 'НЕ НАЙДЕНА');
    console.log('=====================================');
    
    // Инициализируем оптимизированную предзагрузку при запуске приложения
    preloadCriticalDataOptimized()
      .then(() => {
        console.log('🚀 Оптимизированная предзагрузка инициализирована');
      })
      .catch((error) => {
        console.warn('⚠️ Ошибка инициализации предзагрузки:', error);
      });
    
    // Инициализируем систему мониторинга производительности
    setupPerformanceMonitoring();
    console.log("📊 Performance monitoring активирован");
  }, []);

  return <>{children}</>;
};

// Fallback компонент для Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Загрузка...</p>
    </div>
  </div>
);

const App = () => (
  <LanguageProvider>
    <LogosProvider>
      <AuthProvider>
        <NotificationProvider>
        <DataPreloader>
        <OptimizedAppWrapper>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/case/:id" element={<CaseDetail />} />
        <Route path="/team" element={<Team />} />
        {/* Скрытые маршруты для Новостей и Блога */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/news" element={<News />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/logos" element={<LogosManagement />} />
        {/* Тестовые роуты удалены для оптимизации сборки */}
        <Route path="/admin/equipment" element={<EquipmentCatalogAdmin />} />
        <Route path="/admin/homepage-equipment" element={<HomepageEquipmentAdmin />} />
        <Route path="/setup-homepage-equipment" element={<SetupHomepageEquipment />} />
        <Route path="/create-homepage-equipment-table" element={<CreateHomepageEquipmentTable />} />
        <Route path="/quick-setup-homepage-equipment" element={<QuickSetupHomepageEquipment />} />
        <Route path="/add-equipment" element={<QuickAddEquipment />} />
        <Route path="/import-equipment" element={<CSVImportEquipment />} />
        <Route path="/database" element={<DatabaseManagement />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* Тестовые роуты удалены для оптимизации сборки */}
        <Route path="/create-services-blocks-table" element={<CreateServicesBlocksTable />} />
        <Route path="/copy-services-blocks-sql" element={<CopyServicesBlocksSQL />} />
        <Route path="/copy-cases-sql" element={<CopyCasesSQL />} />
        <Route path="/setup-supabase-storage" element={<SetupSupabaseStorage />} />
        <Route path="/simple-storage-fix" element={<SimpleStorageFix />} />
        {/* Тестовые роуты удалены для оптимизации сборки */}
        <Route path="/admin/cases" element={<CaseManagement />} />
        <Route path="/add-case-fields-sql" element={<AddCaseFieldsSQL />} />
        <Route path="/admin/logos" element={<LogosManagement />} />
        <Route path="/admin/letters" element={<LettersCertificatesManagement />} />
        {/* Тестовые роуты удалены для оптимизации сборки */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        {/* Тестовые роуты удалены для оптимизации сборки */}
        <Route path="/create-admin" element={<CreateAdminUser />} />
        <Route path="/diagnose-admin" element={<DiagnoseAdmin />} />
        <Route path="/fix-admin-email" element={<FixAdminEmail />} />
        {/* Тестовые роуты удалены для оптимизации сборки */}
        {/* Тестовые роуты удалены для оптимизации сборки */}
        <Route path="/cart" element={<CartPage />} />
        {/* Тестовые роуты удалены для оптимизации сборки */}
        {/* Тестовые роуты удалены для оптимизации сборки */}
        {/* Тестовые роуты удалены для оптимизации сборки */}
        {/* Тестовые роуты удалены для оптимизации сборки */}
        {/* Тестовые роуты удалены для оптимизации сборки */}
        {/* Тестовые роуты удалены для оптимизации сборки */}
        {/* Тестовые роуты удалены для оптимизации сборки */}
        {/* <Route path="/figma-inline" element={
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
        <Route path="/services/projection-mapping" element={<ProjectionMapping />} />
        <Route path="/services/holographic-displays" element={<HolographicDisplays />} />
        <Route path="/services/space-planning" element={<SpacePlanning />} />
        <Route path="/services/tech-support" element={<TechSupport />} />
        <Route path="/services/system-integration" element={<SystemIntegration />} />
        
        {/* Страницы разработки */}
        <Route path="/services/ar-vr-apps" element={<ArVrApps />} />
        <Route path="/services/interactive-games" element={<InteractiveGames />} />
        <Route path="/services/mobile-solutions" element={<MobileSolutions />} />
        <Route path="/services/web-platforms" element={<WebPlatforms />} />
        <Route path="/services/cross-platform" element={<CrossPlatform />} />
        
        {/* Страницы дизайна */}
        <Route path="/services/content-creation" element={<ContentCreation />} />
        <Route path="/services/content-adaptation" element={<ContentAdaptation />} />
        <Route path="/services/multimedia-content" element={<MultimediaContent title="Мультимедийный контент" />} />
        <Route path="/services/corporate-design" element={<CorporateDesign title="Корпоративный дизайн" />} />
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
        <Route path="/services/space-design" element={<SpaceDesign title="Дизайн пространства" />} />
        <Route path="/services/space-implementation" element={<SpaceImplementation />} />
        <Route path="/services/3d-modeling" element={<ThreeDModeling />} />
        <Route path="/services/technical-documentation" element={<TechnicalDocumentation />} />
        <Route path="/electric-demo" element={<ElectricDemoFinal />} />
        <Route path="/rotating-text-demo" element={<RotatingTextDemo />} />
        <Route path="/video-showcase" element={<VideoShowcase />} />
        </Routes>
        </Suspense>
        </BrowserRouter>
        <PerformanceMonitor />
        </OptimizedAppWrapper>
        </DataPreloader>
        </NotificationProvider>
        <Toaster 
          position="bottom-right" 
          richColors 
          toastOptions={{
            style: {
              marginRight: '1rem',
              marginBottom: '1rem',
            },
            className: 'toast-notification',
          }}
        />
      </AuthProvider>
    </LogosProvider>
  </LanguageProvider>
);

export default App;