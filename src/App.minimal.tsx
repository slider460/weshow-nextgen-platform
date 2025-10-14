import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from "./contexts/LanguageContext";
import { LogosProvider } from "./contexts/LogosContextDB";
import { AuthProvider } from "./contexts/AuthContext";
import { DataPreloader } from "./components/DataPreloader";
import { PerformanceMonitor } from "./components/PerformanceMonitor";
import Index from "./pages/Index";

const App = () => (
  <LanguageProvider>
    <LogosProvider>
      <AuthProvider>
        <DataPreloader>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
        </BrowserRouter>
        <PerformanceMonitor />
        </DataPreloader>
      </AuthProvider>
    </LogosProvider>
  </LanguageProvider>
);

export default App;





