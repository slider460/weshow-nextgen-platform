// Заглушка для WebXR системы
import React from 'react';

const WebXRSystem: React.FC<any> = (props) => {
  return (
    <div className="p-4 text-center">
      <h3 className="text-lg font-semibold mb-2">WebXR система</h3>
      <p className="text-gray-600">Компонент временно отключен для отладки</p>
    </div>
  );
};

const QuickARPreview: React.FC<any> = (props) => {
  return (
    <div className="p-4 text-center">
      <h3 className="text-lg font-semibold mb-2">AR превью</h3>
      <p className="text-gray-600">Компонент временно отключен для отладки</p>
    </div>
  );
};

export { QuickARPreview };
export default WebXRSystem;