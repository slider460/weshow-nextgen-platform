import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";

const AppIntermediate: React.FC = () => {
  console.log('🚀 AppIntermediate is rendering');
  
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/test" element={<div>Test page</div>} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default AppIntermediate;
