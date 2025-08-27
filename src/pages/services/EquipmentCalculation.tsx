import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EquipmentRentalCalculator from "../../components/EquipmentRentalCalculator";

const EquipmentCalculation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <EquipmentRentalCalculator />
      <Footer />
    </div>
  );
};

export default EquipmentCalculation;
