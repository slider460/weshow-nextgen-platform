#!/bin/bash

echo "🔴 Исправление красного света MCP Context7 с системным сервером..."
echo ""

# Останавливаем старые серверы
echo "🛑 Останавливаем старые серверы..."
pkill -f "mcp-context7-server" 2>/dev/null || true
pkill -f "mcp-system-server" 2>/dev/null || true
sleep 2

echo ""

# Запускаем системный сервер
echo "🚀 Запуск системного Context7 сервера..."
export PATH="$PWD/node-v22.12.0-darwin-arm64/bin:$PATH"
node src/lib/mcp-system-server.js > system-server.log 2>&1 &
SYSTEM_PID=$!
echo "✅ Системный сервер запущен с PID: $SYSTEM_PID"

echo ""

# Ждём запуска
echo "⏳ Ожидание запуска сервера..."
sleep 5

# Проверяем статус
echo "🔍 Проверка системного сервера..."
if curl -s http://localhost:3004/status > /dev/null 2>&1; then
    echo "✅ Системный сервер работает на порту 3004"
else
    echo "❌ Системный сервер не отвечает"
    exit 1
fi

echo ""

# Тестируем MCP endpoint
echo "🔍 Тестирование MCP endpoint..."
MCP_RESPONSE=$(curl -s -X POST http://localhost:3004/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}')

if [ $? -eq 0 ]; then
    echo "✅ MCP endpoint отвечает корректно"
    echo "📝 Доступно инструментов: $(echo $MCP_RESPONSE | grep -o '"name"' | wc -l)"
else
    echo "❌ MCP endpoint не отвечает"
    exit 1
fi

echo ""

# Переключаем на системную конфигурацию
echo "🔄 Переключение на системную MCP конфигурацию..."
./switch-mcp.sh system

echo ""

echo "🎯 Инструкции по исправлению красного света:"
echo ""
echo "1. 🔄 ПЕРЕЗАПУСТИТЕ Cursor IDE полностью"
echo "   - Закройте Cursor IDE"
echo "   - Откройте заново"
echo ""
echo "2. 📍 Откройте MCP панель в Cursor IDE:"
echo "   - View → Command Palette (Cmd+Shift+P)"
echo "   - Введите: 'MCP: Show Servers'"
echo "   - Или найдите MCP панель в боковой панели"
echo ""
echo "3. 🟢 Context7 должен показать зелёный свет"
echo "   - Индикатор станет зелёным"
echo "   - Появится список инструментов"
echo "   - Статус 'No tools or prompts' исчезнет"
echo ""
echo "4. 🔧 Если всё ещё красный:"
echo "   - Проверьте логи: tail -f system-server.log"
echo "   - Убедитесь, что порт 3004 свободен"
echo "   - Попробуйте другой порт в mcp-system-server.js"
echo ""
echo "✅ Системный сервер запущен и готов к работе!"
echo "🔄 Перезапустите Cursor IDE и проверьте MCP панель!"





