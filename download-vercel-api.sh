#!/bin/bash

# Скрипт для скачивания файлов из Vercel deployment через API

TOKEN="4mpfMdimmpBB2iFU5e2afioI"
DEPLOYMENT_ID="dpl_Fjavv8sEG56441W3CEhvDa3Tkv9M"
BASE_URL="https://api.vercel.com/v13/deployments"

# Создаем директорию для скачивания
DOWNLOAD_DIR="weshow-vercel-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$DOWNLOAD_DIR"
cd "$DOWNLOAD_DIR"

echo "=== СКАЧИВАНИЕ ФАЙЛОВ С VERCEL ЧЕРЕЗ API ==="
echo ""
echo "Deployment ID: $DEPLOYMENT_ID"
echo "Директория: $(pwd)"
echo ""

# Функция для скачивания файла
download_file() {
    local file_uid=$1
    local file_path=$2
    
    # Создаем директории если нужно
    mkdir -p "$(dirname "$file_path")"
    
    # Скачиваем файл
    echo "📥 Скачиваем: $file_path"
    curl -s -H "Authorization: Bearer $TOKEN" \
        "https://api.vercel.com/v13/deployments/$DEPLOYMENT_ID/files/$file_uid" \
        -o "$file_path" 2>/dev/null
    
    if [ $? -eq 0 ] && [ -s "$file_path" ]; then
        echo "✅ Скачан: $file_path"
    else
        echo "❌ Ошибка скачивания: $file_path"
    fi
}

# Получаем структуру файлов
echo "🔄 Получаем структуру файлов..."
FILES_JSON=$(curl -s -H "Authorization: Bearer $TOKEN" \
    "$BASE_URL/$DEPLOYMENT_ID/files")

if [ $? -ne 0 ] || [ -z "$FILES_JSON" ]; then
    echo "❌ Ошибка получения структуры файлов"
    exit 1
fi

echo "✅ Структура получена"
echo ""

# Сохраняем структуру в файл для отладки
echo "$FILES_JSON" > files_structure.json
echo "📄 Структура сохранена в files_structure.json"
echo ""

# Обрабатываем и скачиваем файлы
echo "📥 Начинаем скачивание файлов..."
echo ""

# Создаем временный Python скрипт для обработки
TEMP_SCRIPT=$(mktemp)
cat > "$TEMP_SCRIPT" << 'PYTHON_SCRIPT'
import json
import sys

def process_item(item, path=''):
    """Рекурсивно обрабатывает элементы структуры файлов"""
    if item['type'] == 'directory':
        # Создаем директорию
        dir_path = f"{path}/{item['name']}" if path else item['name']
        print(f"DIR|{dir_path}")
        
        # Рекурсивно обрабатываем дочерние элементы
        if 'children' in item and item['children']:
            for child in item['children']:
                process_item(child, dir_path)
    elif item['type'] == 'file':
        # Скачиваем файл
        file_path = f"{path}/{item['name']}" if path else item['name']
        file_uid = item.get('uid', '')
        if file_uid:
            print(f"FILE|{file_uid}|{file_path}")

try:
    data = json.load(sys.stdin)
    
    if isinstance(data, list):
        for item in data:
            process_item(item)
    else:
        process_item(data)
except Exception as e:
    print(f"ERROR|{e}", file=sys.stderr)
    sys.exit(1)
PYTHON_SCRIPT

# Обрабатываем структуру и скачиваем файлы
echo "$FILES_JSON" | python3 "$TEMP_SCRIPT" | while IFS='|' read -r type arg1 arg2; do
    if [ "$type" = "FILE" ]; then
        download_file "$arg1" "$arg2"
    elif [ "$type" = "DIR" ]; then
        mkdir -p "$arg1" 2>/dev/null
    elif [ "$type" = "ERROR" ]; then
        echo "❌ Ошибка обработки: $arg1" >&2
    fi
done

# Удаляем временный скрипт
rm -f "$TEMP_SCRIPT"

echo ""
echo "=== ГОТОВО ==="
echo "Файлы скачаны в: $(pwd)"
echo ""
echo "Для просмотра структуры:"
echo "  cat files_structure.json | python3 -m json.tool"
