---
sidebar_position: 4
---

# Styling & Animation

AceTrack achieves its premium look through a combination of **Tailwind CSS** for layout and **Framer Motion** for interactions.

## Tailwind CSS Strategy

-   **Responsive Design**: We use mobile-first utility classes (`md:flex-row`, `lg:grid-cols-3`).
-   **Dark Mode**: Native support via the `dark:` prefix. The `ThemeContext` toggles a class on the `html` element.
-   **Custom Colors**: We avoid generic colors, opting for `slate-900` for deep backgrounds and `blue-500` for primary actions.

## Framer Motion Implementation

We use animations to enhance UX, not just for show.

### 1. Layout Animations (Rankings Table)
When sorting the table, rows physically reorder instead of blinking.
```javascript
<motion.tr layout transition={{ type: "spring" }} />
```

### 2. Tab Indicators
The active tab in the Score page features a "sliding pill" background.
```javascript
<motion.div layoutId="activeTab" className="absolute inset-0 bg-white" />
```

### 3. Page Transitions
Pages fade up and in when navigated to, providing a native app feel.
```javascript
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} />
```
