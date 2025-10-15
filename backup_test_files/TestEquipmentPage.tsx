import React, { useState } from 'react';
import { getEquipment, getCategories } from '../api/equipment';

const TestEquipmentPage = () => {
  const [result, setResult] = useState<string>('Готов к тестированию');
  const [loading, setLoading] = useState(false);

  const testEquipmentPage = async () => {
    setLoading(true);
    setResult('Тестируем загрузку страницы оборудования...');
    
    try {
      console.log('🔄 TestEquipmentPage: Начинаем тест оборудования...');
      
      // Тестируем загрузку категорий
      console.log('🔄 TestEquipmentPage: Тестируем getCategories...');
      const categories = await getCategories();
      console.log('✅ TestEquipmentPage: Категории загружены:', categories);
      
      // Тестируем загрузку оборудования
      console.log('🔄 TestEquipmentPage: Тестируем getEquipment...');
      const equipment = await getEquipment();
      console.log('✅ TestEquipmentPage: Оборудование загружено:', equipment);
      
      setResult(`✅ Успех! Загружено ${categories?.length || 0} категорий и ${equipment?.length || 0} единиц оборудования`);
      
    } catch (err) {
      console.error('❌ TestEquipmentPage: Ошибка:', err);
      setResult(`❌ Ошибка: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🔧 Тест страницы оборудования
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Результат теста:</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-lg">{result}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={testEquipmentPage}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold text-white ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {loading ? '🔄 Тестируем...' : '🚀 Тест страницы оборудования'}
          </button>
        </div>

        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="font-semibold text-orange-800 mb-2">📋 Этот тест проверяет:</h3>
          <ul className="text-orange-700 space-y-1">
            <li>• Подключение к таблице equipment_catalog</li>
            <li>• Подключение к таблице equipment_categories</li>
            <li>• RLS политики для оборудования</li>
            <li>• Загрузку данных для страницы /equipment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestEquipmentPage;
