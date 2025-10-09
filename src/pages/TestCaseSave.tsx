import React, { useState } from 'react';
import { createCase, updateCase, getCases } from '../api/adminRest';

const TestCaseSave: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const testCreateCase = async () => {
    setLoading(true);
    setError('');
    setResult('');

    try {
      console.log('🔄 Тестируем создание кейса...');
      
      const testData = {
        title: `Тестовый кейс ${Date.now()}`,
        client: 'Тестовый клиент',
        year: 2024,
        description: 'Описание тестового кейса',
        results: JSON.stringify(['Результат 1', 'Результат 2']),
        is_visible: true,
        sort_order: 9999,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('📤 Отправляем данные:', testData);
      
      const startTime = Date.now();
      const response = await createCase(testData);
      const endTime = Date.now();
      
      console.log('✅ Ответ получен:', response);
      console.log('⏱️ Время выполнения:', endTime - startTime, 'мс');
      
      setResult(`✅ Кейс создан успешно за ${endTime - startTime}мс\nID: ${response?.[0]?.id || 'неизвестно'}`);
      
    } catch (err) {
      console.error('❌ Ошибка создания кейса:', err);
      setError(`❌ Ошибка: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
    } finally {
      setLoading(false);
    }
  };

  const testUpdateCase = async () => {
    setLoading(true);
    setError('');
    setResult('');

    try {
      console.log('🔄 Тестируем обновление кейса...');
      
      // Сначала получаем список кейсов
      const cases = await getCases();
      if (!cases || cases.length === 0) {
        throw new Error('Нет кейсов для обновления');
      }
      
      const firstCase = cases[0];
      console.log('📋 Обновляем кейс:', firstCase.id);
      
      const updateData = {
        title: `${firstCase.title} (обновлено ${new Date().toLocaleTimeString()})`,
        updated_at: new Date().toISOString()
      };

      console.log('📤 Отправляем данные обновления:', updateData);
      
      const startTime = Date.now();
      const response = await updateCase(firstCase.id, updateData);
      const endTime = Date.now();
      
      console.log('✅ Ответ получен:', response);
      console.log('⏱️ Время выполнения:', endTime - startTime, 'мс');
      
      setResult(`✅ Кейс обновлен успешно за ${endTime - startTime}мс\nНазвание: ${response?.[0]?.title || 'неизвестно'}`);
      
    } catch (err) {
      console.error('❌ Ошибка обновления кейса:', err);
      setError(`❌ Ошибка: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
    } finally {
      setLoading(false);
    }
  };

  const testGetCases = async () => {
    setLoading(true);
    setError('');
    setResult('');

    try {
      console.log('🔄 Тестируем получение кейсов...');
      
      const startTime = Date.now();
      const cases = await getCases();
      const endTime = Date.now();
      
      console.log('✅ Кейсы получены:', cases?.length || 0);
      console.log('⏱️ Время выполнения:', endTime - startTime, 'мс');
      
      setResult(`✅ Получено кейсов: ${cases?.length || 0} за ${endTime - startTime}мс`);
      
    } catch (err) {
      console.error('❌ Ошибка получения кейсов:', err);
      setError(`❌ Ошибка: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Тест сохранения кейсов
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={testCreateCase}
            disabled={loading}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Тестируем...' : 'Тест создания кейса'}
          </button>
          
          <button
            onClick={testUpdateCase}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Тестируем...' : 'Тест обновления кейса'}
          </button>
          
          <button
            onClick={testGetCases}
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Тестируем...' : 'Тест получения кейсов'}
          </button>
        </div>

        {loading && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-3"></div>
              <p className="text-yellow-800">Выполняется тест...</p>
            </div>
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <pre className="text-green-800 whitespace-pre-wrap">{result}</pre>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <pre className="text-red-800 whitespace-pre-wrap">{error}</pre>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Диагностика проблем с сохранением
          </h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Проверьте консоль браузера на наличие ошибок</li>
            <li>• Убедитесь, что RLS политики настроены правильно</li>
            <li>• Проверьте права доступа Service Role ключа</li>
            <li>• Убедитесь, что таблица cases существует</li>
            <li>• Проверьте сетевые запросы в DevTools</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestCaseSave;








