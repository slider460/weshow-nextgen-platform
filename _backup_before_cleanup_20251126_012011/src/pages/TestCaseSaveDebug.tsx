import React, { useState } from 'react';
import { createCase, updateCase, getCases } from '../api/adminRest';

const TestCaseSaveDebug: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setLogs(prev => [...prev, logMessage]);
    console.log(logMessage);
  };

  const clearLogs = () => {
    setLogs([]);
    setResult('');
    setError('');
  };

  const testCreateCase = async () => {
    setLoading(true);
    setError('');
    setResult('');
    addLog('🔄 Начинаем тест создания кейса...');

    try {
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

      addLog('📤 Отправляем данные: ' + JSON.stringify(testData, null, 2));
      
      const startTime = Date.now();
      addLog('⏱️ Начало запроса...');
      
      const response = await createCase(testData);
      
      const endTime = Date.now();
      addLog(`✅ Ответ получен за ${endTime - startTime}мс`);
      addLog('📋 Ответ: ' + JSON.stringify(response, null, 2));
      
      setResult(`✅ Кейс создан успешно за ${endTime - startTime}мс\nID: ${response?.[0]?.id || 'неизвестно'}`);
      
    } catch (err) {
      addLog('❌ Ошибка создания кейса: ' + (err instanceof Error ? err.message : 'Неизвестная ошибка'));
      console.error('❌ Ошибка создания кейса:', err);
      setError(`❌ Ошибка: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
    } finally {
      setLoading(false);
      addLog('🏁 Тест создания завершен');
    }
  };

  const testUpdateCase = async () => {
    setLoading(true);
    setError('');
    setResult('');
    addLog('🔄 Начинаем тест обновления кейса...');

    try {
      addLog('📋 Получаем список кейсов...');
      const cases = await getCases();
      
      if (!cases || cases.length === 0) {
        throw new Error('Нет кейсов для обновления');
      }
      
      const firstCase = cases[0];
      addLog(`📋 Обновляем кейс: ${firstCase.id} - ${firstCase.title}`);
      
      const updateData = {
        title: `${firstCase.title} (обновлено ${new Date().toLocaleTimeString()})`,
        updated_at: new Date().toISOString()
      };

      addLog('📤 Отправляем данные обновления: ' + JSON.stringify(updateData, null, 2));
      
      const startTime = Date.now();
      addLog('⏱️ Начало запроса обновления...');
      
      const response = await updateCase(firstCase.id, updateData);
      
      const endTime = Date.now();
      addLog(`✅ Ответ получен за ${endTime - startTime}мс`);
      addLog('📋 Ответ: ' + JSON.stringify(response, null, 2));
      
      setResult(`✅ Кейс обновлен успешно за ${endTime - startTime}мс\nНазвание: ${response?.[0]?.title || 'неизвестно'}`);
      
    } catch (err) {
      addLog('❌ Ошибка обновления кейса: ' + (err instanceof Error ? err.message : 'Неизвестная ошибка'));
      console.error('❌ Ошибка обновления кейса:', err);
      setError(`❌ Ошибка: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
    } finally {
      setLoading(false);
      addLog('🏁 Тест обновления завершен');
    }
  };

  const testFormData = () => {
    addLog('🧪 Тестируем данные формы...');
    
    const testFormData = {
      title: 'Тестовый кейс',
      client: 'Тестовый клиент',
      year: 2024,
      description: 'Описание',
      detailed_description: 'Подробное описание',
      results: ['Результат 1', 'Результат 2'],
      technologies_used: ['React', 'Node.js'],
      is_visible: true,
      sort_order: 1
    };

    addLog('📋 Тестовые данные формы: ' + JSON.stringify(testFormData, null, 2));

    // Тестируем обработку results
    const resultsString = testFormData.results.length > 0 ? JSON.stringify(testFormData.results) : null;
    addLog('📋 Results как JSON: ' + resultsString);

    // Тестируем обработку technologies_used
    const technologiesString = testFormData.technologies_used.length > 0 ? testFormData.technologies_used : null;
    addLog('📋 Technologies: ' + JSON.stringify(technologiesString));

    setResult('✅ Тест данных формы завершен - проверьте логи');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Диагностика сохранения кейсов
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={testCreateCase}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Тестируем...' : 'Тест создания'}
          </button>
          
          <button
            onClick={testUpdateCase}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Тестируем...' : 'Тест обновления'}
          </button>
          
          <button
            onClick={testFormData}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            Тест данных формы
          </button>

          <button
            onClick={clearLogs}
            className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700"
          >
            Очистить логи
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Результаты */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Результаты</h3>
            
            {result && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <pre className="text-green-800 whitespace-pre-wrap text-sm">{result}</pre>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <pre className="text-red-800 whitespace-pre-wrap text-sm">{error}</pre>
              </div>
            )}
          </div>

          {/* Логи */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Логи выполнения</h3>
            <div className="bg-gray-900 text-green-400 rounded-lg p-4 h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-500">Логи появятся после выполнения тестов</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="text-sm font-mono mb-1">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Инструкции по диагностике
          </h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Проверьте консоль браузера на наличие ошибок</li>
            <li>• Убедитесь, что RLS политики настроены правильно</li>
            <li>• Проверьте права доступа Service Role ключа</li>
            <li>• Убедитесь, что таблица cases существует</li>
            <li>• Проверьте сетевые запросы в DevTools</li>
            <li>• Проверьте, что форма правильно заполнена</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestCaseSaveDebug;























