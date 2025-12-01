import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LanguageProvider } from './contexts/LanguageContext.tsx'
import { LogosProvider } from './contexts/LogosContextDB.tsx'

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <LogosProvider>
      <App />
    </LogosProvider>
  </LanguageProvider>
);