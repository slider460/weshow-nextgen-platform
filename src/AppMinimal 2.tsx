import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestWhiteScreen from "./pages/TestWhiteScreen";

const AppMinimal: React.FC = () => {
  console.log('AppMinimal is rendering');
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestWhiteScreen />} />
        <Route path="/test-white-screen" element={<TestWhiteScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppMinimal;
