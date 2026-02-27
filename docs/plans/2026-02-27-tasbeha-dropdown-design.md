# Tasbeha Dropdown — Design Doc
Date: 2026-02-27

## Goal
Convert the last Day 1 schedule tile "تسبحة (قيادة أنكل فادي)" into an inline expandable dropdown with 5 navigable content pages.

## Approach
Inline expandable schedule tile (Approach A): the existing `schedule-item prayer` div becomes a toggle using the project's existing `toggleDropdown()` / `.dropdown-content.open` pattern. No new JavaScript functions needed.

## Changes

### index.html
- Add `clickable` class and `onclick="toggleDropdown('tasbeha')"` to the schedule-item div
- Wrap the speaker text and a `▼` arrow span inside a flex `.dropdown-speaker` container
- Add a `.dropdown-content` block inside the tile with 5 `.dropdown-item` entries
- Each item navigates to its page via `onclick="event.stopPropagation(); window.location.href='tasbeha/<filename>.html'"`

### main.css
- Add `.dropdown-speaker` rule: `display: flex; justify-content: space-between; align-items: center;`
- No other CSS changes needed (`.dropdown-content`, `.dropdown-arrow`, `.dropdown-item` are already styled)

### New files — tasbeha/ folder (5 shell pages)
Each page is a two-column Arabic/Coptic layout cloned from `alhaan/ana-alsagheer.html`.
Content area will be a `<!-- lyrics go here -->` placeholder, filled item by item.

| File | Title |
|------|-------|
| `tasbeha/hoos-alsiyami.html` | الهوس الصيامي الكبير |
| `tasbeha/ibsaliat-adam.html` | إبصاليات أدام للصوم الكبير |
| `tasbeha/theotokia-alsabt.html` | ثيؤطوكية السبت (مديح للعذراء) |
| `tasbeha/ibsaliat-sabt-alfarah.html` | ابصالية سبت الفرح |
| `tasbeha/tin-thino.html` | تين ثينو (قوموا يا بني النور) |

## Content page structure
- Header: gradient purple (matches prayer color theme), title + subtitle
- Back button: `history.back()`
- Body: `.stanza-row` grid (1fr 4px 1fr) — Arabic column right, Coptic column left
- Dark mode: full CSS variable support
- Mobile responsive: single-column stack below 700px
