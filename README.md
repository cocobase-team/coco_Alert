<!-- [![npm version](https://img.shields.io/npm/v/@cocobase/alert?style=flat-square)](https://www.npmjs.com/package/@cocobase/alert)
[![downloads](https://img.shields.io/npm/dm/@cocobase/alert?style=flat-square)](https://www.npmjs.com/package/@cocobase/alert)
[![license](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](https://github.com/cocobase-team/alert/blob/main/LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/cocobase-team/alert/pulls) -->

# 🥥 CocoAlert

<div align="center">

![CocoAlert Banner](https://img.shields.io/badge/CocoAlert-Toast%20Notifications-orange?style=for-the-badge&logo=react)

**Beautiful, lightweight toast notifications for React & Next.js**

[![npm version](https://img.shields.io/npm/v/coco-alert?style=flat-square&color=success)](https://www.npmjs.com/package/coco-alert)
[![downloads](https://img.shields.io/npm/dm/coco-alert?style=flat-square&color=blue)](https://www.npmjs.com/package/coco-alert)
[![license](https://img.shields.io/npm/l/coco-alert?style=flat-square&color=yellow)](https://github.com/cocobase-team/coco_Alert/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/coco-alert?style=flat-square&color=green)](https://bundlephobia.com/package/coco-alert)

[Features](#-features) • [Installation](#-installation) • [Quick Start](#-quick-start) • [API Reference](#-api-reference) • [Examples](#-examples)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 **Beautiful Design**

- 4 alert types (success, error, warning, info)
- Light & dark mode support
- Smooth animations
- Customizable positions

</td>
<td width="50%">

### ⚡ **Zero Dependencies**

- No external icon libraries
- Inline SVG icons
- Pure React/TypeScript
- ~3KB gzipped

</td>
</tr>
<tr>
<td width="50%">

### 🔧 **Framework Support**

- ✅ React 16.8+
- ✅ Next.js App Router
- ✅ Next.js Pages Router
- ✅ TypeScript ready

</td>
<td width="50%">

### 🎭 **Advanced Features**

- Confirmation dialogs
- Auto-dismiss timers
- Progress indicators
- Position control

</td>
</tr>
</table>

---

## 📦 Installation

```bash
# Using npm
npm install coco-alert

# Using yarn
yarn add coco-alert

# Using pnpm
pnpm add coco-alert
```

> **Note:** Make sure you have `react` and `react-dom` installed (version 16.8 or higher)

---

## 🚀 Quick Start

### **React (Vite, CRA)**

```jsx
import { coco_Alert, useAlerts, AlertContainer } from "coco-alert/react";
import { useState } from "react";

function App() {
  const { alerts, removeAlert } = useAlerts();
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <div>
      <h1>Welcome to CocoAlert!</h1>

      {/* Trigger alerts */}
      <button onClick={() => coco_Alert.success("Operation successful! 🎉")}>
        Success
      </button>
      <button onClick={() => coco_Alert.error("Something went wrong! ❌")}>
        Error
      </button>

      {/* Alert Container - Required! */}
      <AlertContainer
        alerts={alerts}
        removeAlert={removeAlert}
        isLightMode={isLightMode}
        position="top-right"
      />
    </div>
  );
}

export default App;
```

### **Next.js App Router**

```tsx
"use client"; // Required for App Router!

import { coco_Alert, useAlerts, AlertContainer } from "coco-alert/react";
import { useState } from "react";

export default function Page() {
  const { alerts, removeAlert } = useAlerts();
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <>
      <button onClick={() => coco_Alert.info("Hello from Next.js! 👋")}>
        Show Info
      </button>

      <AlertContainer
        alerts={alerts}
        removeAlert={removeAlert}
        isLightMode={isLightMode}
        position="top-right"
      />
    </>
  );
}
```

### **Next.js Pages Router**

```tsx
import { coco_Alert, useAlerts, AlertContainer } from "coco-alert/react";
import { useState } from "react";

export default function Home() {
  const { alerts, removeAlert } = useAlerts();
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <>
      <button onClick={() => coco_Alert.warning("Be careful! ⚠️")}>
        Show Warning
      </button>

      <AlertContainer
        alerts={alerts}
        removeAlert={removeAlert}
        isLightMode={isLightMode}
        position="top-right"
      />
    </>
  );
}
```

---

## 📖 API Reference

### **Alert Types**

CocoAlert provides 4 alert types:

```javascript
// Success notification
coco_Alert.success(message, duration?, position?);

// Error notification
coco_Alert.error(message, duration?, position?);

// Warning notification
coco_Alert.warning(message, duration?, position?);

// Info notification
coco_Alert.info(message, duration?, position?);
```

#### Parameters

| Parameter  | Type            | Default       | Description              |
| ---------- | --------------- | ------------- | ------------------------ |
| `message`  | `string`        | _required_    | The message to display   |
| `duration` | `number`        | `4000`        | Duration in milliseconds |
| `position` | `AlertPosition` | `"top-right"` | Position on screen       |

### **Positions**

Available positions for alerts:

```typescript
type AlertPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";
```

#### Example with Position

```javascript
// Show at top-left corner
coco_Alert.success("Saved!", 3000, "top-left");

// Show at bottom-center
coco_Alert.error("Failed to save", 5000, "bottom-center");
```

### **Confirmation Dialog**

```javascript
const confirmed = await coco_confirm(message, position?);

if (confirmed) {
  // User clicked "Confirm"
  console.log('User confirmed!');
} else {
  // User clicked "Cancel"
  console.log('User cancelled!');
}
```

#### Example

```javascript
async function handleDelete() {
  const confirmed = await coco_confirm("Are you sure you want to delete this?");

  if (confirmed) {
    // Proceed with deletion
    await deleteItem();
    coco_Alert.success("Item deleted successfully!");
  } else {
    coco_Alert.info("Deletion cancelled");
  }
}
```

### **useAlerts Hook**

The hook that manages alert state:

```typescript
const { alerts, removeAlert } = useAlerts();
```

Returns:

- `alerts`: Array of current alerts
- `removeAlert`: Function to manually remove an alert by ID

### **AlertContainer Component**

Required component to render alerts:

```tsx
<AlertContainer
  alerts={alerts}
  removeAlert={removeAlert}
  isLightMode={false}
  position="top-right"
/>
```

#### Props

| Prop          | Type            | Required | Default | Description                        |
| ------------- | --------------- | -------- | ------- | ---------------------------------- |
| `alerts`      | `Alert[]`       | ✅ Yes   | -       | Alerts from `useAlerts()`          |
| `removeAlert` | `function`      | ✅ Yes   | -       | Remove function from `useAlerts()` |
| `isLightMode` | `boolean`       | ✅ Yes   | -       | Theme mode (light/dark)            |
| `position`    | `AlertPosition` | ✅ Yes   | -       | Default position for alerts        |

---

## 🎯 Examples

### **Basic Alerts**

```javascript
// Simple success
coco_Alert.success("Profile updated!");

// Error with custom duration (10 seconds)
coco_Alert.error("Failed to connect to server", 10000);

// Warning at different position
coco_Alert.warning("Your session will expire soon", 5000, "top-center");

// Info notification
coco_Alert.info("New features available!");
```

### **Form Submission**

```jsx
async function handleSubmit(e) {
  e.preventDefault();

  try {
    await submitForm(formData);
    coco_Alert.success("Form submitted successfully! ✅");
  } catch (error) {
    coco_Alert.error("Failed to submit form. Please try again.");
  }
}
```

### **Delete Confirmation**

```jsx
async function handleDelete(id) {
  const confirmed = await coco_confirm(
    "This action cannot be undone. Delete this item?"
  );

  if (confirmed) {
    try {
      await deleteItem(id);
      coco_Alert.success("Item deleted successfully!");
    } catch (error) {
      coco_Alert.error("Failed to delete item");
    }
  }
}
```

### **Light/Dark Mode Toggle**

```jsx
function App() {
  const { alerts, removeAlert } = useAlerts();
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <>
      <button onClick={() => setIsLightMode(!isLightMode)}>Toggle Theme</button>

      <AlertContainer
        alerts={alerts}
        removeAlert={removeAlert}
        isLightMode={isLightMode}
        position="top-right"
      />
    </>
  );
}
```

### **Multiple Positions**

```javascript
// Top notifications
coco_Alert.info("Loading...", 2000, "top-center");

// Bottom notifications
coco_Alert.success("Saved to drafts", 3000, "bottom-right");

// Center for important messages
coco_Alert.warning("Action required!", 5000, "center");
```

### **Custom Durations**

```javascript
// Quick notification (1 second)
coco_Alert.success("Copied!", 1000);

// Standard notification (4 seconds - default)
coco_Alert.info("Changes saved");

// Long notification (10 seconds)
coco_Alert.error("Critical error occurred. Please contact support.", 10000);
```

---

## 🎨 Styling

CocoAlert uses **Tailwind CSS** utility classes for styling. Make sure your project has Tailwind configured.

### **Without Tailwind?**

If you're not using Tailwind, the component injects basic keyframe animations automatically. However, you may want to add custom styles:

```css
/* Your global CSS file */
.coco-alert-container {
  /* Add custom styles here */
}
```

---

## 🛠️ TypeScript Support

CocoAlert is written in TypeScript and includes full type definitions.

```typescript
import {
  coco_Alert,
  coco_confirm,
  useAlerts,
  AlertContainer,
  Alert,
  AlertType,
  AlertPosition,
} from "coco-alert/react";

// TypeScript will provide full autocomplete and type checking!
```

---

## ⚙️ Configuration

### **Default Configuration**

```typescript
const ALERT_CONFIG = {
  isLightMode: false, // Dark mode by default
  defaultPosition: "top-right", // Default position
};
```

### **Alert Colors**

| Type    | Color  | Border    | Icon |
| ------- | ------ | --------- | ---- |
| Success | Green  | Green/50  | ✓    |
| Error   | Red    | Red/50    | ✕    |
| Warning | Yellow | Yellow/50 | ⚠    |
| Info    | Blue   | Blue/50   | ℹ    |

---

## 🐛 Common Issues

### **Issue: Alerts not showing**

Make sure you've added the `<AlertContainer>` component:

```jsx
<AlertContainer
  alerts={alerts}
  removeAlert={removeAlert}
  isLightMode={isLightMode}
  position="top-right"
/>
```

### **Issue: TypeScript errors**

Install React types:

```bash
npm install --save-dev @types/react @types/react-dom
```

### **Issue: Styles not working**

Ensure Tailwind CSS is configured in your project. Add to `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./node_modules/coco-alert/**/*.{js,ts,jsx,tsx}",
    // ... your other paths
  ],
};
```

---

## 🤝 Contributing

Contributions are welcome! Please check out our [GitHub repository](https://github.com/cocobase-team/coco_Alert).

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT © [Cocobase Team](https://github.com/cocobase-team)

---

## 🔗 Links

- **NPM Package**: [npmjs.com/package/coco-alert](https://www.npmjs.com/package/coco-alert)
- **GitHub Repository**: [github.com/cocobase-team/coco_Alert](https://github.com/cocobase-team/coco_Alert)
- **Report Issues**: [GitHub Issues](https://github.com/cocobase-team/coco_Alert/issues)
- **Cocobase**: [cocobase.buzz](https://cocobase.buzz)

---

<div align="center">

**Made with 💙 by [Dycoder](https://github.com/cocobase-team)**

⭐ Star us on GitHub if you find this useful!

</div>
