#!/bin/bash

# Скрипт для добавления React импортов для Docker сборки

echo "🔧 Добавление React импортов для Docker..."

# Добавить React импорт в начало файлов, которые используют JSX
files=(
    "client/src/components/ui/fire-background.tsx"
    "client/src/components/ui/gothic-card.tsx"
    "client/src/components/ui/gothic-review-card.tsx"
    "client/src/components/ui/horizontal-carousel.tsx"
    "client/src/components/ui/listing-card.tsx"
    "client/src/components/ui/resizable.tsx"
    "client/src/components/ui/review-card.tsx"
    "client/src/pages/gothic-home.tsx"
    "client/src/pages/not-found.tsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        # Проверить, есть ли уже импорт React
        if ! grep -q "import React" "$file"; then
            echo "Добавление React импорта в $file"
            # Добавить импорт React в начало файла
            sed -i '1s/^/import React from '\''react'\'';\n/' "$file"
        else
            echo "React импорт уже есть в $file"
        fi
    else
        echo "Файл $file не найден"
    fi
done

# Удалить неиспользуемые импорты из gothic-stats-card.tsx
if [ -f "client/src/components/ui/gothic-stats-card.tsx" ]; then
    echo "Исправление импортов в gothic-stats-card.tsx"
    sed -i 's/import { Users, Star, ShoppingBag } from '\''lucide-react'\'';/\/\/ Убрали неиспользуемые импорты для Docker/' "client/src/components/ui/gothic-stats-card.tsx"
fi

echo "✅ Готово! React импорты добавлены."