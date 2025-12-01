import React, { useState, useEffect } from 'react';
// Supabase не используется - сайт работает локально

const VerySimpleEquipment = () => {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      console.log('ℹ️ VerySimpleEquipment: Supabase не используется, данные локальные');
      
      // Supabase не используется - возвращаем пустой массив
      // Данные должны загружаться из локальных файлов
      setEquipment([]);

      console.log('🔄 VerySimpleEquipment: Ответ получен, статус:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ VerySimpleEquipment: HTTP ошибка:', response.status, errorText);
        setError(`HTTP ошибка ${response.status}: ${errorText}`);
        return;
      }

      const data = await response.json();
      console.log('✅ VerySimpleEquipment: Данные получены:', data);
      console.log('✅ VerySimpleEquipment: Количество записей:', data?.length || 0);
      
      setEquipment(data || []);
    } catch (err) {
      console.error('❌ VerySimpleEquipment: Ошибка:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 bg-yellow-100">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-yellow-800">🔄 Загружаем оборудование...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 bg-red-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-red-800 font-bold mb-2">❌ Ошибка загрузки</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadEquipment}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            🔄 Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-green-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            ✅ Оборудование загружено успешно!
          </h2>
          <p className="text-green-600 text-lg">
            Количество записей: <strong>{equipment.length}</strong>
          </p>
        </div>

        {equipment.length === 0 ? (
          <div className="text-center">
            <p className="text-green-600">⚠️ Нет данных для отображения</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipment.map((item, index) => (
              <div key={item.id || index} className="bg-white rounded-lg p-4 shadow-lg border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-3">{item.description}</p>
                <div className="text-xs text-gray-500">
                  <p><strong>ID:</strong> {item.id}</p>
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
    </div>
  );
};

export default VerySimpleEquipment;
