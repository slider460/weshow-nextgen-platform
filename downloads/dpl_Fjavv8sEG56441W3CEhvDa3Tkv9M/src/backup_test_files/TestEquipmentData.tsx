import React, { useState } from 'react';

const TestEquipmentData = () => {
  const [result, setResult] = useState<string>('Готов к тестированию');
  const [loading, setLoading] = useState(false);

  const testEquipmentData = async () => {
    setLoading(true);
    setResult('Тестируем данные оборудования...');
    
    try {
      console.log('🔄 TestEquipmentData: Начинаем тест данных...');
      
      const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
      const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
      
      // Тестируем categories
      console.log('🔄 TestEquipmentData: Тестируем categories...');
      const categoriesUrl = `${SUPABASE_URL}/rest/v1/equipment_categories?select=*&order=name.asc`;
      const categoriesResponse = await fetch(categoriesUrl, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('🔄 TestEquipmentData: Categories ответ:', categoriesResponse.status);
      const categories = await categoriesResponse.json();
      console.log('✅ TestEquipmentData: Categories:', categories);
      
      // Тестируем equipment_catalog
      console.log('🔄 TestEquipmentData: Тестируем equipment_catalog...');
      const equipmentUrl = `${SUPABASE_URL}/rest/v1/equipment_catalog?select=*&order=created_at.desc`;
      const equipmentResponse = await fetch(equipmentUrl, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('🔄 TestEquipmentData: Equipment ответ:', equipmentResponse.status);
      const equipment = await equipmentResponse.json();
      console.log('✅ TestEquipmentData: Equipment:', equipment);
      
      // Группируем по категориям
      const equipmentByCategory: { [key: string]: any[] } = {};
      equipment.forEach((item: any) => {
        if (!equipmentByCategory[item.category_id]) {
          equipmentByCategory[item.category_id] = [];
        }
        equipmentByCategory[item.category_id].push(item);
      });
      
      console.log('📊 TestEquipmentData: Оборудование по категориям:', equipmentByCategory);
      
      let resultText = `✅ Успех!\n`;
      resultText += `📋 Категорий: ${categories?.length || 0}\n`;
      resultText += `🔧 Всего оборудования: ${equipment?.length || 0}\n\n`;
      
      resultText += `📊 По категориям:\n`;
      categories.forEach((category: any) => {
        const categoryEquipment = equipmentByCategory[category.id] || [];
        resultText += `• ${category.name}: ${categoryEquipment.length} единиц\n`;
      });
      
      setResult(resultText);
      
    } catch (err) {
      console.error('❌ TestEquipmentData: Ошибка:', err);
      setResult(`❌ Ошибка: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🔧 Тест данных оборудования
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Результат теста:</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={testEquipmentData}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold text-white ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-500 hover:bg-indigo-600'
            }`}
          >
            {loading ? '🔄 Тестируем...' : '🚀 Тест данных оборудования'}
          </button>
        </div>

        <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <h3 className="font-semibold text-indigo-800 mb-2">📋 Этот тест проверяет:</h3>
          <ul className="text-indigo-700 space-y-1">
            <li>• Количество категорий в БД</li>
            <li>• Количество единиц оборудования в БД</li>
            <li>• Распределение оборудования по категориям</li>
            <li>• Структуру данных</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestEquipmentData;
