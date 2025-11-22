# Tracker: habits and metrics - Plugin for tracking habits and metrics in Obsidian

Obsidian plugin that allows you to track daily habits and metrics (trackers), storing all data in separate notes in your file hierarchy.

## ✨ Features

- 📝 **Separate notes for each tracker** - each tracker (habit or metric) and its data is stored in its own note
- 🎯 **Different tracker types**:
  - **Good habit** (good-habit) - heatmaps to track habit completion
  - **Bad habit** (bad-habit) - heatmaps to track absence of bad habit
  - **Number** (number) - numeric value with automatic saving (debounce)
  - **Counter** (plusminus) - increase/decrease value with +/- buttons
  - **Text** (text) - text notes
  - **Scale** (scale) - slider with customizable value range
- 📅 **Common date for block** - one date picker for all trackers in the block
- 🎨 **Beautiful design** - all trackers in one shared container, arranged as cards in an adaptive grid
- 📊 **Advanced visualization**:
  - Interactive value chart with limit support
  - Detailed statistics:
    - Total records
    - Sum and average for the period
    - For habits: completion percentage, active days, current and best streak
    - For metrics: minimum, maximum, median
  - **Streaks** - tracking consecutive days with records 🔥
  - **Best streak** - maximum sequence of successful days ⭐
  - **Heatmap** - visual activity calendar
  - **Start day highlight** - visual highlighting of the day when the tracker was started ✨
- 🎯 **Optimized heatmap** - optimal heatmap day size for convenient viewing
- ⚡ **Optimized rendering** - instant loading without lags even with many days
- 🔧 **Flexible configuration** - customizable folder, date/time formats, number of days to display
- 📁 **Hierarchical display** - support for nested folders with trackers
- 🔄 **Automatic cache invalidation** - data updates when opening a note with a tracker
- 🎨 **Iconize integration** - automatic display of icons from Iconize plugin for folders and trackers
- 📱 **Responsive design** - optimization for mobile devices

## 📦 Installation

### Manual installation

1. Download the latest version of the plugin
2. Extract the archive to `.obsidian/plugins/tracker-habits-metrics/` folder of your vault
3. Restart Obsidian
4. Enable the plugin in settings (Settings → Community plugins)

### Via BRAT (recommended for development)

1. Install the [BRAT](https://obsidian.md/plugins?id=obsidian42-brat) plugin
2. Add repository: `VladRoss/tracker-habits-metrics`
3. Enable the plugin in settings

## 🚀 Usage

### Creating a new tracker

1. Use the `Create new tracker` command (Ctrl+P)
2. Enter tracker name
3. Select tracker type
4. Configure parameters (for scale: min/max/step, for metrics: units, limits)
5. Set tracking start date (optional)
6. Click "Create"

### Using in notes

#### Displaying a single tracker

In any note, add a code block to display and manage a tracker:

````markdown
```tracker
file: 0. Files/Trackers/01-Habits/Morning workout.md
```
````

#### Displaying all trackers in a folder

To display all trackers in a folder, use the `habit` block:

````markdown
```habit
folder: 0. Files/Trackers/01-Habits
```
````

Or with additional parameters:

````markdown
```habit
folder: 0. Files/Trackers/01-Habits
date: 2025-01-15
days: 30
showChart: true
showStats: true
```
````

#### `tracker` code block parameters:

- `file` (required) - path to tracker file
- `mode` - display type: `good-habit`, `bad-habit`, `number`, `plusminus`, `rating`, `text`, `scale` (default is determined from file frontmatter)
- `view` - view mode: `control` (default) or `display` (view only)
- `date` - date (default "today")
- `days` - number of days to display in chart and statistics (default from settings)
- `showChart` - show chart (`true`/`false`, default from settings)
- `showStats` - show statistics (`true`/`false`, default from settings)

#### `habit` code block parameters:

- `folder` (required) - path to folder with trackers
- `date` - date (default "today")
- `days` - number of days to display in chart and statistics (default from settings)
- `view` - view mode: `control` (default) or `display` (view only)
- `showChart` - show chart for all trackers (`true`/`false`, default from settings)
- `showStats` - show statistics for all trackers (`true`/`false`, default from settings)

#### Examples:

**Good habit:**
````markdown
```tracker
file: 0. Files/Trackers/01-Habits/Morning workout.md
mode: good-habit
showStats: true
```
````

### Quick commands

- `Create new tracker` - create a new tracker
- `Edit tracker` - edit an existing tracker

## ⚙️ Settings

In the plugin settings you can change:

- **Trackers folder** - where tracker files are stored (default: `0. Files/Trackers`)
- **Date format** - date format (default: `YYYY-MM-DD`)
- **Number of days for charts** - number of days to display in charts and statistics (default: `30`)
- **Show chart by default** - automatically show chart for all trackers
- **Show statistics by default** - automatically show statistics for all trackers
- **Hide chart on mobile** - hide chart on mobile devices
- **Hide statistics on mobile** - hide statistics on mobile devices

## 🎨 Iconize Integration

The plugin automatically integrates with the [Iconize](https://obsidian.md/plugins?id=obsidian-icon-folder) plugin to display icons for folders and trackers.

### How it works:

1. Install the Iconize plugin (if not already installed)
2. Configure icons for your folders and files in Iconize
3. The Tracker plugin will automatically display these icons before folder and tracker names

### Features:

- Icons are displayed only for paths where they are explicitly set in Iconize
- Icons are not inherited from parent folders
- Both emoji and Lucide icons are supported
- If Iconize plugin is not installed, the plugin works without icons (no errors)

## 📁 Tracker file structure

Each tracker is stored in a separate Markdown file with the following structure:

```markdown
---
type: good-habit  # or bad-habit, number, plusminus, rating, text, scale
trackingStartDate: "2025-01-01"  # tracking start date (optional)
minValue: 0  # only for scale type
maxValue: 10  # only for scale type
step: 1  # only for scale and plusminus types
minLimit: 0  # minimum allowed value (optional)
maxLimit: 100  # maximum allowed value (optional)
unit: "kg"  # unit of measurement (optional)
data:
  "2025-01-01": 1
  "2025-01-02": 1
  "2025-01-03": 0
---
```

**Tracker name** is determined by the file name (without .md extension).

All records are stored in the `data` section of frontmatter in the format `"YYYY-MM-DD": value`.

### Value types:

- **good-habit / bad-habit**: `1` (completed) or `0` (not completed)
- **number**: numeric value
- **plusminus**: numeric value (can be negative)
- **rating**: number from 3 to 10 (or other maxRating value)
- **text**: text string
- **scale**: number in the range from minValue to maxValue

## 📊 Statistics

The plugin provides detailed statistics for each tracker:

### For habits (good-habit / bad-habit):

- **Total records** - total number of records
- **Last N days** - sum and average for the period
- **Completed** - completion percentage and number of active days
- **Current streak** 🔥 - sequence of days with records up to the current date
- **Best streak** ⭐ - maximum sequence of successful days of all time

## 🎯 Markdown example

```tracker
path: 0. Files/Trackers
showChart: true
showStats: true
days: 90
```

## 🔧 Build

```bash
npm install
npm run build
```
## 📝 License

MIT License © 2025 Vladislav (Vlad Ross)

## 💡 Ideas for future versions

- [ ] Export data
- [ ] Import data
- [ ] Reminders
- [ ] Goals (target values) for trackers
- [ ] Period comparison

---

**Enjoy tracking your habits and metrics! 📊✨**
