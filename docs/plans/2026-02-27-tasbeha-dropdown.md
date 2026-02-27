# Tasbeha Dropdown Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the Day 1 "تسبحة (قيادة أنكل فادي)" schedule tile into an inline expandable dropdown with 5 navigable two-column Arabic/Coptic content pages.

**Architecture:** Extend the existing `toggleDropdown()` / `.dropdown-content.open` pattern already used for الألحان and الترانيم. The schedule tile gets a clickable header with a chevron and an inline dropdown list. Each item navigates to a new shell page in `tasbeha/` cloned from `alhaan/ana-alsagheer.html`.

**Tech Stack:** Vanilla HTML/CSS/JS, no build tools, no frameworks.

---

### Task 1: Add `.dropdown-speaker` CSS rule to main.css

**Files:**
- Modify: `assets/css/main.css` (after `.dropdown-item-text` rule, around line 300)

**Step 1: Open the file and locate the insertion point**

Find this line in `assets/css/main.css`:
```css
.dropdown-item-text  { font-size: 16px; color: var(--dropdown-item-text-color); font-weight: 500; }
```

**Step 2: Insert the new rule immediately after it**

```css
.dropdown-speaker { display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
```

**Step 3: Verify**

Open `assets/css/main.css` and confirm `.dropdown-speaker` is present after `.dropdown-item-text`.

**Step 4: Commit**

```bash
git add assets/css/main.css
git commit -m "feat: add dropdown-speaker flex rule for tasbeha tile"
```

---

### Task 2: Convert the tasbeha schedule tile to a dropdown in index.html

**Files:**
- Modify: `index.html` lines 90-94

**Step 1: Locate the current tile**

Find this block in `index.html`:
```html
<div class="schedule-item prayer">
    <span class="time">١٠:٠٠ - ١١:٠٠</span>
    <div class="activity-title">🙏 صلاة</div>
    <div class="speaker">تسبحة (قيادة أنكل فادي)</div>
</div>
```

**Step 2: Replace it with the dropdown version**

```html
<div class="schedule-item prayer" onclick="toggleDropdown('tasbeha')">
    <span class="time">١٠:٠٠ - ١١:٠٠</span>
    <div class="activity-title">🙏 صلاة</div>
    <div class="speaker dropdown-speaker">
        <span>تسبحة (قيادة أنكل فادي)</span>
        <span class="dropdown-arrow" id="tasbeha-arrow">▼</span>
    </div>
    <div class="dropdown-content" id="tasbeha-content">
        <div class="dropdown-item" onclick="event.stopPropagation(); window.location.href='tasbeha/hoos-alsiyami.html'">
            <span class="dropdown-item-text">📜 الهوس الصيامي الكبير</span>
        </div>
        <div class="dropdown-item" onclick="event.stopPropagation(); window.location.href='tasbeha/ibsaliat-adam.html'">
            <span class="dropdown-item-text">📜 إبصاليات أدام للصوم الكبير</span>
        </div>
        <div class="dropdown-item" onclick="event.stopPropagation(); window.location.href='tasbeha/theotokia-alsabt.html'">
            <span class="dropdown-item-text">📜 ثيؤطوكية السبت (مديح للعذراء)</span>
        </div>
        <div class="dropdown-item" onclick="event.stopPropagation(); window.location.href='tasbeha/ibsaliat-sabt-alfarah.html'">
            <span class="dropdown-item-text">📜 ابصالية سبت الفرح</span>
        </div>
        <div class="dropdown-item" onclick="event.stopPropagation(); window.location.href='tasbeha/tin-thino.html'">
            <span class="dropdown-item-text">📜 تين ثينو (قوموا يا بني النور)</span>
        </div>
    </div>
</div>
```

**Step 3: Verify manually**

Open `index.html` in a browser → Day 1 tab → scroll to the last tile → tap/click it → the 5 items should expand with a smooth animation and the arrow should rotate.

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: convert tasbeha tile to inline dropdown with 5 items"
```

---

### Task 3: Create the tasbeha/ folder and 5 shell pages

All 5 pages share the same HTML structure — a clone of `alhaan/ana-alsagheer.html` with different title/icon and an empty content area. Create them one by one.

**Files to create:**
- `tasbeha/hoos-alsiyami.html`
- `tasbeha/ibsaliat-adam.html`
- `tasbeha/theotokia-alsabt.html`
- `tasbeha/ibsaliat-sabt-alfarah.html`
- `tasbeha/tin-thino.html`

**Shell template** (used for all 5 — only the `<title>`, `h1` text, and icon differ per file):

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PAGE_TITLE - مؤتمر ميراث آبائي</title>
    <style>
        :root {
            --bg-gradient-start: #667eea;
            --bg-gradient-end: #764ba2;
            --header-gradient-start: #5a67d8;
            --header-gradient-end: #6b46c1;
            --container-bg: #ffffff;
            --back-btn-bg: rgba(255,255,255,0.2);
            --back-btn-color: #ffffff;
            --back-btn-hover-bg: rgba(255,255,255,0.35);
            --title-color: #ffffff;
            --subtitle-color: rgba(255,255,255,0.85);
            --content-bg: #ffffff;
            --arabic-bg: #f0f4ff;
            --arabic-border: #5a67d8;
            --arabic-label-color: #5a67d8;
            --arabic-text-color: #2d3748;
            --coptic-bg: #f5f0ff;
            --coptic-border: #9f7aea;
            --coptic-label-color: #6b46c1;
            --coptic-text-color: #3d2d5e;
            --halleluia-color: #5a67d8;
            --divider-color: #e2e8f0;
            --column-gap-bg: #e2e8f0;
        }
        @media (prefers-color-scheme: dark) {
            :root {
                --bg-gradient-start: #1a1a2e;
                --bg-gradient-end: #16213e;
                --header-gradient-start: #3730a3;
                --header-gradient-end: #4c1d95;
                --container-bg: #1e1e2e;
                --back-btn-bg: rgba(255,255,255,0.15);
                --back-btn-color: #e2e8f0;
                --back-btn-hover-bg: rgba(255,255,255,0.25);
                --title-color: #e2e8f0;
                --subtitle-color: rgba(220,220,255,0.8);
                --content-bg: #1e1e2e;
                --arabic-bg: #1e2240;
                --arabic-border: #818cf8;
                --arabic-label-color: #818cf8;
                --arabic-text-color: #e2e8f0;
                --coptic-bg: #221a3a;
                --coptic-border: #a78bfa;
                --coptic-label-color: #c4b5fd;
                --coptic-text-color: #ddd6fe;
                --halleluia-color: #818cf8;
                --divider-color: #2d2d4e;
                --column-gap-bg: #2d2d4e;
            }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: var(--container-bg);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, var(--header-gradient-start) 0%, var(--header-gradient-end) 100%);
            padding: 30px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .back-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: var(--back-btn-bg);
            color: var(--back-btn-color);
            border: none;
            padding: 10px 18px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 600;
            text-decoration: none;
            transition: background 0.2s;
            align-self: flex-start;
        }
        .back-btn:hover { background: var(--back-btn-hover-bg); }
        .header-title { text-align: center; }
        .header-title .icon { font-size: 48px; display: block; margin-bottom: 12px; }
        .header-title h1 { font-size: 26px; font-weight: 700; color: var(--title-color); margin-bottom: 8px; }
        .column-labels {
            display: grid;
            grid-template-columns: 1fr 4px 1fr;
            background: var(--column-gap-bg);
            border-bottom: 2px solid var(--divider-color);
        }
        .col-label { padding: 12px 20px; font-size: 13px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; }
        .col-label-arabic { background: var(--arabic-bg); color: var(--arabic-label-color); text-align: right; border-left: 3px solid var(--column-gap-bg); }
        .col-label-coptic { background: var(--coptic-bg); color: var(--coptic-label-color); text-align: left; border-right: 3px solid var(--column-gap-bg); }
        .content { padding: 24px 20px; background: var(--content-bg); display: flex; flex-direction: column; gap: 16px; }
        .stanza-row {
            display: grid;
            grid-template-columns: 1fr 4px 1fr;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        }
        .col-divider { background: var(--column-gap-bg); width: 4px; }
        .stanza-arabic { background: var(--arabic-bg); border-right: 4px solid var(--arabic-border); padding: 20px 22px; direction: rtl; text-align: right; }
        .stanza-coptic { background: var(--coptic-bg); border-left: 4px solid var(--coptic-border); padding: 20px 22px; direction: rtl; text-align: right; }
        .stanza-number { font-size: 11px; font-weight: 800; letter-spacing: 1px; margin-bottom: 10px; }
        .stanza-arabic .stanza-number { color: var(--arabic-label-color); }
        .stanza-coptic .stanza-number { color: var(--coptic-label-color); }
        .stanza-text { font-size: 16px; line-height: 2; white-space: pre-line; }
        .stanza-arabic .stanza-text { color: var(--arabic-text-color); }
        .stanza-coptic .stanza-text { color: var(--coptic-text-color); }
        .halleluia-row { display: grid; grid-template-columns: 1fr 4px 1fr; border-radius: 10px; overflow: hidden; }
        .halleluia-cell { padding: 14px 22px; font-size: 17px; font-weight: 700; color: var(--halleluia-color); text-align: center; }
        .halleluia-cell-ar { background: var(--arabic-bg); }
        .halleluia-cell-co { background: var(--coptic-bg); }
        @media (max-width: 700px) {
            body { padding: 0; }
            .container { border-radius: 0; min-height: 100vh; }
            .header { padding: 20px; }
            .header-title h1 { font-size: 20px; }
            .content { padding: 10px 6px; gap: 10px; }
            .stanza-arabic, .stanza-coptic { padding: 14px 10px; }
            .stanza-text { font-size: 17px; line-height: 2.1; }
            .stanza-number { font-size: 12px; }
            .halleluia-cell { font-size: 16px; padding: 12px 6px; }
            .col-label { padding: 10px 10px; font-size: 12px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a class="back-btn" href="../index.html" onclick="history.length > 1 ? (history.back(), false) : true">
                &#8592; رجوع
            </a>
            <div class="header-title">
                <span class="icon">PAGE_ICON</span>
                <h1>PAGE_TITLE</h1>
            </div>
        </div>

        <div class="column-labels">
            <div class="col-label col-label-arabic">☦️ عربي</div>
            <div style="background: var(--column-gap-bg);"></div>
            <div class="col-label col-label-coptic">☦️ قبطي</div>
        </div>

        <div class="content">
            <!-- lyrics go here -->
        </div>
    </div>
</body>
</html>
```

**Per-file title/icon substitutions:**

| File | PAGE_ICON | PAGE_TITLE |
|------|-----------|------------|
| `hoos-alsiyami.html` | 📜 | الهوس الصيامي الكبير |
| `ibsaliat-adam.html` | 📜 | إبصاليات أدام للصوم الكبير |
| `theotokia-alsabt.html` | 📜 | ثيؤطوكية السبت |
| `ibsaliat-sabt-alfarah.html` | 📜 | ابصالية سبت الفرح |
| `tin-thino.html` | 📜 | تين ثينو (قوموا يا بني النور) |

**Step 1: Create the `tasbeha/` folder**

```bash
mkdir -p tasbeha
```

**Step 2: Create each of the 5 files** using the shell template with the appropriate title/icon substitutions.

**Step 3: Verify**

Open each file in a browser — you should see the purple gradient header with the correct title, two column labels (عربي / قبطي), and an empty content area.

**Step 4: Commit**

```bash
git add tasbeha/
git commit -m "feat: add 5 tasbeha shell pages with two-column Arabic/Coptic layout"
```

---

### Task 4: Final end-to-end verification

1. Open `index.html` in browser
2. Click Day 1 tab
3. Scroll to last tile "🙏 صلاة"
4. Tap the tile — confirm dropdown expands with 5 items, arrow rotates ▼→▲
5. Tap again — confirm it collapses
6. Tap each of the 5 items — confirm each navigates to the correct page
7. On each content page, tap "رجوع" — confirm it goes back to Day 1
8. Test dark mode (system preference)
9. Test on mobile viewport (375px wide)
