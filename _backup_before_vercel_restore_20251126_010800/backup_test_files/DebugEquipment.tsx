import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const DebugEquipment = () => {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Загружаем оборудование...');
      
      const { data, error } = await supabase
        .from('homepage_equipment')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('❌ Ошибка:', error);
        setError(error.message);
        return;
      }

      console.log('✅ Данные загружены:', data);
      setEquipment(data || []);
    } catch (err) {
      console.error('❌ Ошибка загрузки:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Загрузка оборудования...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold mb-2">❌ Ошибка загрузки</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={loadEquipment}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">🔧 Отладка оборудования</h2>
      
      <div className="mb-6">
        <p className="text-green-600 font-semibold">
          ✅ Загружено записей: {equipment.length}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipment.map((item) => (
          <div key={item.id} className="bg-white border rounded-lg p-4 shadow">
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-3">{item.description}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p><strong>ID:</strong> {item.id}</p>
              <p><strong>Icon:</strong> {item.icon}</p>
              <p><strong>Gradient:</strong> {item.gradient}</p>
              <p><strong>Link:</strong> {item.link}</p>
              <p><strong>Visible:</strong> {item.is_visible ? 'Да' : 'Нет'}</p>
              <p><strong>Sort Order:</strong> {item.sort_order}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button 
          onClick={loadEquipment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🔄 Обновить данные
        </button>
      </div>
    </div>
  );
};

export default DebugEquipment;
