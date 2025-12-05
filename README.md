![GitHub Release](https://img.shields.io/github/v/release/justrelaxdc/tracker-habits-metrics?style=flat&color=blue)
![GitHub last commit](https://img.shields.io/github/last-commit/justrelaxdc/tracker-habits-metrics?style=flat&color=success)
![GitHub License](https://img.shields.io/github/license/justrelaxdc/tracker-habits-metrics?style=flat&color=yellow)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/vladross)

# 📊 Tracker: Habits and Metrics 

> **Note‑based habit & metrics tracker for Obsidian with heatmaps, charts, smart statistics, and local data storage.**

Transform your Obsidian vault into a powerful tracking system. Track everything from simple daily habits to complex numeric metrics — all stored as human‑readable Markdown inside your vault. No external databases, no cloud, no telemetry.

---

![Dashboard Preview](assets/hero.gif)

---

## ✨ Key Features

### 🎯 Six tracker types
- **Good Habit** – track positive habits with interactive heatmaps
- **Bad Habit** – monitor habits you want to reduce or eliminate
- **Number** – record numeric values with debounced auto‑saving
- **Counter** – increment/decrement via “+ / –” buttons  
- **Text** – store daily notes and observations  
- **Scale** – slider input with customizable range (min/max/step)

### 📈 Smart Statistics
- **Habits:**  
  - Completion percentage & active days  
  - Current streak 🔥  
  - Best streak ⭐  
  - Total completed days  
  - Period summaries (last N days)

- **Metrics:**  
  - Minimum / maximum / median  
  - Sum & average  
  - Active days  
  - Period summaries  

### 🎨 Visuals & UX
- **Heatmaps** — calendar overview of habit activity  
- **Interactive charts** — line graphs with optional limit guides  
- **Limit indicators (targets)** — animated visual feedback when crossing thresholds  
- **Date navigation** — one date picker controls all trackers in the block  
- **Hierarchical view** — folders (up to 3 levels) act as categories/subcategories  
- **Iconize integration** — automatic display of emoji or icon from Iconize plugin  

---

## 🚀 Quick Start

> **Create your first tracker in under a minute.**

### 1. Create a tracker
1. Press `Ctrl+P` (or `Cmd+P` on Mac).  
2. Run **“Create new tracker”**.  
3. Enter a name (e.g., “Morning Workout”).  
4. Choose (or auto create) a folder.  
5. Select the tracker type.  
6. Configure limits, units, start date, etc.  
7. Click **Create**.

> You can structure trackers inside folders (up to 3 levels). The plugin will automatically interpret these folders as categories/subcategories. Folders containing the word `archive` are ignored, so old trackers can be saved there.

---

## 📋 Displaying trackers

Embed trackers anywhere using a `habit` code block.

### 2.1 Global (default settings)

````markdown
```habit
```
````

Uses default folder & display settings from the plugin.

### 2.2 Local override

````markdown
```habit
folder: 0. Files/Trackers/Habits
date: 2025-01-01
days: 30
showChart: true
showStats: true
```
````

**Parameters:**
- `folder` — where tracker files are stored
- `date` — date to display  
  - default: today  
  - auto-detected from filename in daily notes  
- `days` — number of days for charts/statistics  
- `showChart` — display chart for all trackers  
- `showStats` — display statistics for all trackers  

---

## ⚙️ Settings

Access via **Settings → Tracker: Habits and Metrics**

Most users can start without changing anything. These options let you fine‑tune defaults.

![Dashboard Preview](assets/settings.png)

---

## 📁 Tracker File Structure

You normally don’t need to edit trackers manually — they are managed automatically.  
Advanced users can use Dataview to extract data from trackers:

```markdown
---
type: good-habit          # good-habit, bad-habit, number, plusminus, text, scale
trackingStartDate: "2025-01-01"

minValue: 0               # scale only
maxValue: 10              # scale only
step: 1                   # scale and plusminus

minLimit: 5               # optional, can be your target
maxLimit: 100             # optional, a limit you don't want to cross

unit: "kg"                # optional, will appear next to the title and in the chart

data:{"2025-01-01":1,"2025-01-02":1,"2025-01-03":0}
  
---
```

### Value types by tracker type
- **good-habit / bad-habit:** `1` or `0`  
- **number:** numeric value  
- **plusminus:** numeric counter with step  
- **text:** string  
- **scale:** numeric value within `[minValue … maxValue]`

---

## 📊 Statistics Explained

This section breaks down every statistic displayed in the tracker.

### For Habits (Good Habit / Bad Habit)

**PERIOD section:**
- **Completion rate** (or "Days without" for bad habits) – percentage of successful days in the selected period with visual progress bar  
  - Shows completion percentage and ratio of active days to total days (e.g., "75% (15/20)")

**STREAKS section:**
- **Current streak** 🔥 – consecutive successful days from the selected date backwards  
- **Best streak** ⭐ – longest consecutive successful period ever recorded

### For Metrics (Number / Scale / Counter / Text)

**PERIOD section:**
- **Active days** 📅 – number of days with recorded values vs total days in period (e.g., "18/30")  
- **Sum** 📈 – total sum of all values in the selected period  
- **Average** 📊 – average value across the period  
- **Min | Max** 📉 – minimum and maximum values in the period  
- **Median** 📊 – median value of all entries in the period

> **Note:** For text trackers, values are counted as word count. Statistics are calculated for the period specified by the `days` parameter (default: 30 days).  

---

## 🎨 Iconize Integration

Optional, but powerful.

### Features
- Automatically displays icons configured via Iconize  
- Supports emoji & Lucide icons  
- Works even without Iconize — just put an emoji in the tracker title  

### Setup
1. Install **Iconize**  
2. Assign icons to folders or files  
3. Trackers will show icons automatically  

---

## 🛠 Commands

Available in **Ctrl+P / Cmd+P**:

- **Create new tracker** — guided creation flow  

---

## 🎯 Roadmap

- [ ] Reminders & notifications  
- [ ] Period comparison (week-over-week, month-over-month)  
- [ ] Data export/import
- [ ] Additional chart types
- [ ] Cross‑tracker analytics (correlations, trends)  

---

## 💬 Support & Feedback

Feedback, ideas, and bug reports are very welcome:

- Issues & feature requests:  
  https://github.com/justrelaxdc/tracker-habits-metrics/issues  
- Telegram: https://t.me/vladrosss  
- Donate: https://buymeacoffee.com/vladross

---

## 📝 License
MIT License © 2025 Vladislav (Vlad Ross)

---

**Turn your Obsidian vault into a powerful tracking system — start tracking what matters.**
