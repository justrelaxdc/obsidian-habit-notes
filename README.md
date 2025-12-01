# 📊 Tracker: Habits and Metrics

> **Note‑based habit & metrics tracker for Obsidian with heatmaps, charts, smart statistics, and clean local data storage.**

Transform your Obsidian vault into a powerful tracking system. Track everything from simple daily habits to complex numeric metrics — all stored as human‑readable Markdown inside your vault. No external databases, no cloud, no telemetry.

---

<!-- 🎥 HERO GIF: main dashboard — several trackers, heatmaps, charts displayed inside a daily note or dashboard -->

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
- **Modern card-based design** — elegant tracker cards with subtle shadows and smooth animations  
- **Heatmaps** — calendar overview of habit activity with beautiful hover effects  
- **Interactive charts** — line graphs with optional limit guides  
- **Limit indicators** — animated progress bar feedback when crossing thresholds  
- **Date navigation** — sleek date picker controls all trackers in the block  
- **Hierarchical view** — folders (up to 3 levels) act as categories/subcategories  
- **Iconize integration** — automatic display of emoji or icon from Iconize plugin  
- **Responsive design** — optimized for desktop, tablet, and mobile devices  
- **Theme-aware** — adapts to any Obsidian theme (light/dark)  

---

## 🚀 Quick Start

> **Create your first tracker in under a minute.**

### 1. Create a tracker
1. Press `Ctrl+P` (or `Cmd+P` on Mac).  
2. Run **“Create new tracker”**.  
3. Enter a name (e.g., “Morning Workout”).  
4. Choose (or create) a folder.  
5. Select the tracker type.  
6. Configure limits, units, start date, etc.  
7. Click **Create**.

<!-- 🎥 GIF: Creation flow — open palette → create new tracker → choose type → file appears -->

> You can structure trackers inside folders (up to 3 levels). The plugin will automatically interpret these folders as categories/subcategories.

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

### General
- **Trackers folder** — default folder for new tracker files  
- **Number of days for charts** — default statistics window

### Display
- **Show chart by default**  
- **Show stats by default**  
- **Hide chart on mobile**  
- **Hide statistics on mobile**

### Advanced
- **Disable limit reaction** — turn off animated feedback

<!-- 🖼 Screenshot: plugin settings panel -->

---

## 📁 Tracker File Structure

You normally don’t need to edit trackers manually — they are managed automatically.  
Advanced users (or Dataview integrations) can customize using YAML:

```markdown
---
type: good-habit          # good-habit, bad-habit, number, plusminus, text, scale
trackingStartDate: "2025-01-01"

minValue: 0               # scale only
maxValue: 10              # scale only
step: 1                   # scale and plusminus

minLimit: 5               # optional
maxLimit: 100             # optional

unit: "kg"                # optional

data:
  "2025-01-01": 1
  "2025-01-02": 1
  "2025-01-03": 0
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

This section breaks down every statistic.

### For Habits
- **Total records** – count of all entries  
- **Last N days summary** – sum/avg for selected period  
- **Completed** – completion % and active days  
- **Current streak** 🔥 – continuous progress up to today  
- **Best streak** ⭐ – longest run ever recorded  

### For Metrics
- **Total records**  
- **Sum**  
- **Average**  
- **Minimum**  
- **Maximum**  
- **Median**  
- **Active days**  

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
- [ ] Goal tracking (define target values)  
- [ ] Period comparison (week-over-week, month-over-month)  
- [ ] Data export/import  
- [ ] Additional chart types  
- [ ] Cross‑tracker analytics (correlations, trends)  

---

## 💬 Support & Feedback

Feedback, ideas, and bug reports are very welcome:

- Issues & feature requests:  
  https://github.com/justrelaxdc/tracker-habits-metrics/issues  
- Telegram: https://t.me/justrelaxdc  
- Ko‑fi: https://ko-fi.com/vladross  

---

## 📝 License
MIT License © 2025 Vladislav (Vlad Ross)

---

**Turn your Obsidian vault into a powerful tracking system — start tracking what matters.**