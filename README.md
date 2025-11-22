# 🥥 CocoAlert

<div align="center">

![CocoAlert Banner](https://img.shields.io/badge/CocoAlert-Configurable%20Alerts-orange?style=for-the-badge&logo=react)

**Beautiful, customizable toast notifications for React & Next.js**

[![npm version](https://img.shields.io/npm/v/coco-alert?style=flat-square&color=success)](https://www.npmjs.com/package/coco-alert)
[![downloads](https://img.shields.io/npm/dm/coco-alert?style=flat-square&color=blue)](https://www.npmjs.com/package/coco-alert)
[![license](https://img.shields.io/npm/l/coco-alert?style=flat-square&color=yellow)](https://github.com/cocobase-team/coco_Alert/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/coco-alert?style=flat-square&color=green)](https://bundlephobia.com/package/coco-alert)

**Simple setup. Full control. Light & Dark themes. That's it.**

</div>

---

## ✨ Why CocoAlert?

- 🎨 **Light & Dark Mode** - Beautiful themes for any design
- 📍 **7 Position Options** - Place alerts anywhere on screen
- ⚡ **Simple Setup** - One container component, use anywhere
- 🎯 **TypeScript Ready** - Full type safety included
- 📦 **Tiny Bundle** - Only ~3KB gzipped
- 🔧 **Zero Dependencies** - No external packages needed

---

## 📦 Installation

```bash
npm install coco-alert
```

---

## 🚀 Quick Start

### **Step 1: Add AlertContainer to your root component**

```jsx
import { AlertContainer, coco_Alert } from 'coco-alert/react';

function App() {
  return (
    <>
      <AlertContainer 
        isLightMode={false}
        position="top-right"
      />
      <YourApp />
    </>
  );
}
```

### **Step 2: Use alerts anywhere in your app**

```javascript
import { coco_Alert } from 'coco-alert/react';

function MyComponent() {
  return (
    <button onClick={() => coco_Alert.success('It works! 🎉')}>
      Click Me
    </button>
  );
}
```

**That's it! No providers, no complex setup.**

---

## 📖 Complete Examples

### **React (Vite, CRA)**

```jsx
import { AlertContainer, coco_Alert } from 'coco-alert/react';
import { useState } from 'react';

function App() {
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <>
      <AlertContainer 
        isLightMode={isLightMode}
        position="top-right"
      />
      
      <div>
        <h1>My App</h1>
        <button onClick={() => setIsLightMode(!isLightMode)}>
          Toggle Theme
        </button>
        <button onClick={() => coco_Alert.success('Success!')}>
          Show Alert
        </button>
      </div>
    </>
  );
}

export default App;
```

### **Next.js App Router**

```tsx
'use client'; // Required for App Router!

import { AlertContainer, coco_Alert } from 'coco-alert/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AlertContainer 
          isLightMode={false}
          position="top-right"
        />
        {children}
      </body>
    </html>
  );
}
```

```tsx
'use client';

import { coco_Alert } from 'coco-alert/react';

export default function Page() {
  return (
    <div>
      <h1>Next.js App Router</h1>
      <button onClick={() => coco_Alert.info('Hello from Next.js! 👋')}>
        Show Alert
      </button>
    </div>
  );
}
```

### **Next.js Pages Router**

```tsx
// pages/_app.tsx
import { AlertContainer } from 'coco-alert/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AlertContainer 
        isLightMode={false}
        position="top-right"
      />
      <Component {...pageProps} />
    </>
  );
}
```

```tsx
// pages/index.tsx
import { coco_Alert } from 'coco-alert/react';

export default function Home() {
  return (
    <div>
      <h1>Next.js Pages Router</h1>
      <button onClick={() => coco_Alert.success('It works! 🎉')}>
        Show Alert
      </button>
    </div>
  );
}
```

---

## 🎯 Real-World Examples

### **Form Submission**

```javascript
import { coco_Alert } from 'coco-alert/react';

async function handleSubmit(e) {
  e.preventDefault();
  
  try {
    await submitForm(formData);
    coco_Alert.success('Form submitted successfully! ✅');
  } catch (error) {
    coco_Alert.error('Failed to submit form. Please try again.');
  }
}
```

### **API Calls**

```javascript
import { coco_Alert } from 'coco-alert/react';

async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    coco_Alert.success('Data loaded successfully!');
    return data;
  } catch (error) {
    coco_Alert.error('Failed to load data');
  }
}
```

### **Delete Confirmation**

```javascript
import { coco_Alert } from 'coco-alert/react';

async function handleDelete(id) {
  const confirmed = await coco_Alert.confirm('Delete this item? This cannot be undone.');
  
  if (confirmed) {
    try {
      await deleteItem(id);
      coco_Alert.success('Item deleted successfully!');
    } catch (error) {
      coco_Alert.error('Failed to delete item');
    }
  } else {
    coco_Alert.info('Deletion cancelled');
  }
}
```

### **Theme Switcher**

```javascript
import { AlertContainer, coco_Alert } from 'coco-alert/react';
import { useState } from 'react';

function App() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    coco_Alert.info(`Switched to ${!isDark ? 'dark' : 'light'} mode`);
  };

  return (
    <>
      <AlertContainer 
        isLightMode={!isDark}
        position="top-right"
      />
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </>
  );
}
```

---

## 📚 API Reference

### **AlertContainer Props**

```typescript
interface AlertContainerProps {
  isLightMode?: boolean;      // Default: false (dark mode)
  position?: AlertPosition;    // Default: "top-right"
}
```

#### **Examples**

```jsx
// Dark mode, top-right (default)
<AlertContainer />

// Light mode, top-right
<AlertContainer isLightMode={true} />

// Dark mode, bottom-center
<AlertContainer position="bottom-center" />

// Light mode, center
<AlertContainer isLightMode={true} position="center" />
```

---

### **Alert Methods**

```javascript
coco_Alert.success(message, duration?, position?);
coco_Alert.error(message, duration?, position?);
coco_Alert.warning(message, duration?, position?);
coco_Alert.info(message, duration?, position?);
```

#### **Parameters**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `message` | `string` | *required* | The message to display |
| `duration` | `number` | `4000` | Duration in milliseconds |
| `position` | `AlertPosition` | Container's position | Override container position |

#### **Examples**

```javascript
// Simple alert (uses container settings)
coco_Alert.success('Saved!');

// Custom duration
coco_Alert.error('Critical error', 10000);

// Override container position for this alert
coco_Alert.info('Loading...', 3000, 'center');

// All options
coco_Alert.warning('Session expiring', 5000, 'bottom-right');
```

---

### **Confirmation Dialog**

```javascript
const confirmed = await coco_Alert.confirm(message, position?);
```

Returns a **Promise** that resolves to:
- `true` if user clicks "Confirm"
- `false` if user clicks "Cancel"

#### **Examples**

```javascript
// Simple confirmation
const result = await coco_Alert.confirm('Are you sure?');
if (result) {
  console.log('User confirmed!');
}

// With custom position
const result = await coco_Alert.confirm('Delete this?', 'center');

// In async function
async function handleAction() {
  const confirmed = await coco_Alert.confirm('Proceed with this action?');
  
  if (confirmed) {
    // Do something
    coco_Alert.success('Action completed!');
  }
}
```

---

### **Positions**

Available positions for alerts:

```typescript
type AlertPosition = 
  | "top-left" 
  | "top-right"      // Default
  | "top-center"
  | "center"
  | "bottom-left" 
  | "bottom-right" 
  | "bottom-center";
```

#### **Position Examples**

```jsx
// Set container position (all alerts use this by default)
<AlertContainer position="bottom-center" />

// Override position for individual alerts
coco_Alert.info('Top alert', 3000, 'top-center');
coco_Alert.success('Center alert', 3000, 'center');
coco_Alert.warning('Bottom alert', 3000, 'bottom-left');
```

---

## 🎨 Light & Dark Themes

CocoAlert includes beautiful built-in themes:

### **Dark Mode** (Default)
- Deep, rich backgrounds
- Vibrant accent colors
- Perfect for dark interfaces
- High contrast for readability

### **Light Mode**
- Clean, bright backgrounds
- Subtle accent colors
- Perfect for light interfaces
- Optimized for daylight viewing

#### **Examples**

```jsx
// Dark mode
<AlertContainer isLightMode={false} />

// Light mode
<AlertContainer isLightMode={true} />

// Dynamic theme based on user preference
function App() {
  const [isDark, setIsDark] = useState(true);
  
  return (
    <AlertContainer isLightMode={!isDark} />
  );
}

// Sync with system preference
function App() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  return (
    <AlertContainer isLightMode={!prefersDark} />
  );
}
```

---

## 🎯 Features

<table>
<tr>
<td width="50%">

### 🎨 **Themes**
- Dark mode (default)
- Light mode
- Dynamic switching
- System preference sync

</td>
<td width="50%">

### 📍 **Positions**
- 7 position options
- Set globally or per-alert
- Auto-stacking
- Responsive spacing

</td>
</tr>
<tr>
<td width="50%">

### ⚡ **Simple API**
- One container component
- Use alerts anywhere
- TypeScript support
- Intuitive methods

</td>
<td width="50%">

### 🎭 **Alert Types**
- Success (green)
- Error (red)
- Warning (yellow)
- Info (blue)
- Confirm (interactive)

</td>
</tr>
<tr>
<td width="50%">

### 📦 **Tiny Bundle**
- ~3KB gzipped
- Zero dependencies
- Pure inline styles
- No CSS imports

</td>
<td width="50%">

### 🔧 **Framework Support**
- ✅ React 16.8+
- ✅ Next.js App Router
- ✅ Next.js Pages Router
- ✅ TypeScript ready

</td>
</tr>
</table>

---

## 💡 Pro Tips

### **Multiple Alerts**
```javascript
// Show multiple alerts - they stack automatically!
coco_Alert.info('Loading...');
coco_Alert.success('Step 1 complete');
coco_Alert.success('Step 2 complete');
coco_Alert.success('All done! 🎉');
```

### **Quick Notifications**
```javascript
// 1 second quick notification
coco_Alert.success('Copied!', 1000);
```

### **Center Important Alerts**
```jsx
// Use center position for critical messages
<AlertContainer position="center" />

coco_Alert.warning('Your session will expire in 5 minutes', 5000);
```

### **Position Override**
```jsx
// Container uses top-right by default
<AlertContainer position="top-right" />

// But you can override for specific alerts
coco_Alert.error('Critical error!', 5000, 'center');
```

### **Theme Synchronization**
```jsx
function App() {
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    // Listen to system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return <AlertContainer isLightMode={theme === 'light'} />;
}
```

---

## 🎨 Alert Types & Colors

| Type | Dark Mode | Light Mode | Use Case | Icon |
|------|-----------|------------|----------|------|
| **Success** | Green | Green | Successful operations | ✓ |
| **Error** | Red | Red | Errors, failures | ✕ |
| **Warning** | Yellow | Yellow | Warnings, cautions | ⚠ |
| **Info** | Blue | Blue | General information | ℹ |
| **Confirm** | Yellow | Yellow | User confirmations | ? |

---

## 🐛 Troubleshooting

### **Alerts not showing?**

Make sure you've added the `AlertContainer` to your root component:
```jsx
// ✅ Correct
<AlertContainer />

// ❌ Wrong - no container
coco_Alert.success('Hello'); // Won't work without container!
```

### **TypeScript errors?**

Install React types:
```bash
npm install --save-dev @types/react @types/react-dom
```

### **Next.js App Router issues?**

Add `'use client';` at the top of files that use alerts:
```javascript
'use client';

import { coco_Alert } from 'coco-alert/react';
```

### **Theme not updating?**

Make sure you're using state to control `isLightMode`:
```jsx
// ✅ Correct
const [isDark, setIsDark] = useState(false);
<AlertContainer isLightMode={!isDark} />

// ❌ Wrong - static value
<AlertContainer isLightMode={false} />
```

---

## 📊 Comparison with Other Libraries

| Feature | CocoAlert | react-toastify | react-hot-toast | sonner |
|---------|-----------|----------------|-----------------|--------|
| Setup Required | Container only | Container + Provider | Container + Provider | Provider |
| Light/Dark Themes | ✅ Built-in | ⚠️ Manual CSS | ⚠️ Manual CSS | ✅ Yes |
| Bundle Size | 3KB | 8KB | 4KB | 6KB |
| Dependencies | 0 | 2 | 1 | 3 |
| TypeScript | ✅ Built-in | ✅ Yes | ✅ Yes | ✅ Yes |
| Confirmation Dialog | ✅ Built-in | ❌ No | ❌ No | ❌ No |
| Position Control | ✅ Global + Override | ✅ Yes | ✅ Yes | ⚠️ Limited |

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repo
2. Create a branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT © [Cocobase Team](https://github.com/cocobase-team)

---

## 🔗 Links

- **NPM**: [npmjs.com/package/coco-alert](https://www.npmjs.com/package/coco-alert)
- **GitHub**: [github.com/cocobase-team/coco_Alert](https://github.com/cocobase-team/coco_Alert)
- **Issues**: [GitHub Issues](https://github.com/cocobase-team/coco_Alert/issues)
- **Cocobase**: [cocobase.buzz](https://cocobase.buzz)

---

## ❤️ Support

If you find CocoAlert helpful:
- ⭐ Star us on [GitHub](https://github.com/cocobase-team/coco_Alert)
- 🐦 Share on [Twitter](https://twitter.com)
- 📦 Try our other tools at [Cocobase](https://cocobase.buzz)

---

<div align="center">

**Made with 💙 by [Dycoder](https://github.com/cocobase-team)**

*Beautiful alerts with full control.*

</div>