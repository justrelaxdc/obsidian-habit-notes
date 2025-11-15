# Инструкция по установке плагина Habit Notes в Obsidian

## Шаг 1: Сборка проекта

Если вы еще не собрали проект, выполните в терминале:

```bash
npm install
npm run build
```

Это создаст файл `main.js` в корне проекта.

## Шаг 2: Установка плагина в Obsidian

### Вариант A: Ручная установка (рекомендуется для разработки)

1. **Найдите папку плагинов Obsidian:**
   - Откройте Obsidian
   - Перейдите в **Settings** (Настройки) → **Community plugins** (Сообщество плагинов)
   - Нажмите на папку рядом с "Installed plugins" (Установленные плагины)
   - Это откроет папку `.obsidian/plugins/` вашего хранилища

2. **Создайте папку для плагина:**
   - В папке `.obsidian/plugins/` создайте новую папку с именем `obsidian-habit-notes`

3. **Скопируйте файлы:**
   Скопируйте следующие файлы из проекта в папку `obsidian-habit-notes`:
   - `main.js` (собранный файл)
   - `main.css` (стили библиотеки uPlot для графиков)
   - `manifest.json`

   Структура должна быть такой:
   ```
   .obsidian/
     └── plugins/
         └── obsidian-habit-notes/
             ├── main.js
             ├── main.css
             └── manifest.json
   ```

4. **Перезапустите Obsidian:**
   - Закройте и снова откройте Obsidian

5. **Включите плагин:**
   - Перейдите в **Settings** → **Community plugins**
   - Найдите "Habit Notes" в списке установленных плагинов
   - Включите переключатель рядом с плагином

### Вариант B: Использование скрипта (Windows PowerShell)

Вы можете использовать этот скрипт для автоматической установки:

```powershell
# Замените путь на путь к вашему хранилищу Obsidian
$obsidianVaultPath = "C:\Users\ВашеИмя\Documents\ObsidianVault"
$pluginPath = "$obsidianVaultPath\.obsidian\plugins\obsidian-habit-notes"

# Создаем папку плагина
New-Item -ItemType Directory -Force -Path $pluginPath

# Копируем файлы
Copy-Item "main.js" -Destination "$pluginPath\main.js" -Force
Copy-Item "main.css" -Destination "$pluginPath\main.css" -Force
Copy-Item "manifest.json" -Destination "$pluginPath\manifest.json" -Force

Write-Host "Плагин установлен в: $pluginPath"
Write-Host "Перезапустите Obsidian и включите плагин в настройках!"
```

## Шаг 3: Проверка установки

1. Откройте Obsidian
2. Перейдите в **Settings** → **Community plugins**
3. Убедитесь, что плагин "Habit Notes" виден в списке и включен
4. Откройте любую заметку и попробуйте использовать команду `Create new habit/metric` (Ctrl+P)

## Режим разработки

Если вы хотите разрабатывать плагин с автоматической пересборкой:

1. Запустите в терминале:
   ```bash
   npm run dev
   ```
   Это будет автоматически пересобирать `main.js` при изменении `main.ts`

2. После изменений в Obsidian:
   - Нажмите `Ctrl+R` (или `Cmd+R` на Mac) для перезагрузки плагина
   - Или перезапустите Obsidian

## Устранение проблем

### Плагин не появляется в списке
- Убедитесь, что файлы скопированы в правильную папку
- Проверьте, что `manifest.json` имеет правильный формат
- Перезапустите Obsidian

### Ошибки при загрузке
- Проверьте консоль разработчика в Obsidian (View → Toggle Developer Tools)
- Убедитесь, что `main.js` собран без ошибок
- Проверьте версию Obsidian (требуется минимум 1.5.0)

### Плагин не работает
- Убедитесь, что плагин включен в настройках
- Проверьте настройки плагина (Settings → Habit Notes)
- Убедитесь, что папка привычек существует в вашем хранилище

## Быстрая установка (для разработчиков)

Если вы часто пересобираете плагин, создайте символическую ссылку:

**Windows (PowerShell от администратора):**
```powershell
$obsidianVaultPath = "C:\Users\ВашеИмя\Documents\ObsidianVault"
$pluginPath = "$obsidianVaultPath\.obsidian\plugins\obsidian-habit-notes"
New-Item -ItemType Directory -Force -Path $pluginPath
New-Item -ItemType SymbolicLink -Path "$pluginPath\main.js" -Target "$PWD\main.js"
Copy-Item "main.css" -Destination "$pluginPath\main.css" -Force
Copy-Item "manifest.json" -Destination "$pluginPath\manifest.json" -Force
```

Теперь при каждой сборке (`npm run build`) изменения сразу будут видны в Obsidian после перезагрузки плагина.

