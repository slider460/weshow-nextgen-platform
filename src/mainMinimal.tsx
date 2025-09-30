import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('mainMinimal.tsx is loading');

try {
  const rootElement = document.getElementById("root");
  console.log('Root element found:', rootElement);
  
  if (rootElement) {
    const root = createRoot(rootElement);
    console.log('React root created');
    
    root.render(<App />);
    console.log('App rendered');
  } else {
    console.error('Root element not found!');
  }
} catch (error) {
  console.error('Error in mainMinimal.tsx:', error);
}
