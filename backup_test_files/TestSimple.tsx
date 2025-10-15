import React from 'react';

const TestSimple: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Тест работает!
        </h1>
        <p className="text-gray-600">
          Если вы видите это сообщение, React работает корректно.
        </p>
      </div>
    </div>
  );
};

export default TestSimple;
