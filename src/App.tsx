import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
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

// Страницы комплексных решений
import SystemIntegration from "./pages/services/SystemIntegration";
import SystemConfiguration from "./pages/services/SystemConfiguration";
import SystemTesting from "./pages/services/SystemTesting";
import ProcessAutomation from "./pages/services/ProcessAutomation";
import SystemScaling from "./pages/services/SystemScaling";

// Страницы пространственного проектирования
import SpacePlanning from "./pages/services/SpacePlanning";
import SpaceDesign from "./pages/services/SpaceDesign";
import SpaceImplementation from "./pages/services/SpaceImplementation";
import ThreeDModeling from "./pages/services/ThreeDModeling";
import TechnicalDocumentation from "./pages/services/TechnicalDocumentation";

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/team" element={<Team />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/news" element={<News />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/equipment" element={<Equipment />} />
      <Route path="/portfolio/samara-stand" element={<CaseSamaraStand />} />
      
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
);

export default App;
