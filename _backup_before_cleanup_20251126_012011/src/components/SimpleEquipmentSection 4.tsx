import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Используем те же хардкодированные значения, что и LogosContextRest
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

// Создаем клиент напрямую
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('🔍 SimpleEquipmentSection - SUPABASE_URL:', SUPABASE_URL);
console.log('🔍 SimpleEquipmentSection - SUPABASE_KEY:', SUPABASE_KEY ? 'Есть' : 'Нет');

const SimpleEquipmentSection = () => {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      console.log('🔄 SimpleEquipmentSection: Загружаем оборудование...');
      
      const { data, error } = await supabase
        .from('homepage_equipment')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('❌ SimpleEquipmentSection: Ошибка:', error);
        return;
      }

      console.log('✅ SimpleEquipmentSection: Данные загружены:', data);
      console.log('✅ Количество записей:', data?.length || 0);
      
      setEquipment(data || []);
    } catch (err) {
      console.error('❌ SimpleEquipmentSection: Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка оборудования...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🎬 Аренда оборудования ({equipment.length} записей)
          </h2>
          <p className="text-gray-600">
            Загружено из базы данных: {equipment.length > 0 ? '✅ Да' : '❌ Нет'}
          </p>
        </div>

        {equipment.length === 0 ? (
          <div className="text-center py-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-yellow-800 font-semibold mb-2">⚠️ Нет данных</h3>
              <p className="text-yellow-600">Оборудование не загружено из базы данных</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipment.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p><strong>Icon:</strong> {item.icon}</p>
                  <p><strong>Gradient:</strong> {item.gradient}</p>
                  <p><strong>Link:</strong> {item.link}</p>
                  <p><strong>Visible:</strong> {item.is_visible ? 'Да' : 'Нет'}</p>
                  <p><strong>Sort:</strong> {item.sort_order}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SimpleEquipmentSection;
