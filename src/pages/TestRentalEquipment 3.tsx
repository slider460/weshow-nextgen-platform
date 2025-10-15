import React, { useState, useEffect } from 'react';
import RentalEquipmentSection from '../components/RentalEquipmentSection';
import { supabase } from '../config/supabase';

const TestRentalEquipment = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('ru-RU');
    setTestResults(prev => [...prev, `${timestamp}: ${message}`]);
  };

  useEffect(() => {
    addResult('🔧 Тестируем компонент RentalEquipmentSection...');
    
    // Проверяем импорт компонента
    try {
      addResult('✅ Компонент RentalEquipmentSection импортирован');
    } catch (error) {
      addResult(`❌ Ошибка импорта: ${error}`);
    }

    // Тестируем загрузку данных напрямую
    testDirectDataLoad();
  }, []);

  const testDirectDataLoad = async () => {
    try {
      addResult('🔄 Тестируем прямую загрузку данных...');
      
      const { data, error } = await supabase
        .from('homepage_equipment')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true });

      if (error) {
        addResult(`❌ Ошибка загрузки: ${error.message}`);
        return;
      }

      addResult(`✅ Загружено записей: ${data?.length || 0}`);
      
      if (data && data.length > 0) {
        const firstItem = data[0];
        addResult(`📋 Первая запись: ${firstItem.title}`);
        addResult(`📋 Поля: ${Object.keys(firstItem).join(', ')}`);
        addResult(`📋 is_visible: ${firstItem.is_visible}`);
        addResult(`📋 icon: ${firstItem.icon}`);
        addResult(`📋 gradient: ${firstItem.gradient}`);
      }
    } catch (error) {
      addResult(`❌ Ошибка тестирования: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🔧 Тест компонента RentalEquipmentSection
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📋 Результаты тестирования:</h2>
          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
            {testResults.map((result, index) => (
              <div key={index} className="mb-1">{result}</div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🎯 Рендер компонента:</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg">
            <RentalEquipmentSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestRentalEquipment;
