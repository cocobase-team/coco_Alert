# 🥥 CocoAlert

<div align="center">

![CocoAlert Banner](https://img.shields.io/badge/CocoAlert-Zero%20Config%20Alerts-orange?style=for-the-badge&logo=react)

**The simplest toast notification library for React & Next.js**

[![npm version](https://img.shields.io/npm/v/coco-alert?style=flat-square&color=success)](https://www.npmjs.com/package/coco-alert)
[![downloads](https://img.shields.io/npm/dm/coco-alert?style=flat-square&color=blue)](https://www.npmjs.com/package/coco-alert)
[![license](https://img.shields.io/npm/l/coco-alert?style=flat-square&color=yellow)](https://github.com/cocobase-team/coco_Alert/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/coco-alert?style=flat-square&color=green)](https://bundlephobia.com/package/coco-alert)

**Zero configuration. Just import and use. That's it.**

</div>

---

## ✨ Why CocoAlert?

```javascript
// Other libraries 😩
import { ToastContainer, toast } from 'other-lib';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <button onClick={() => toast.success('Hello')}>Click</button>
    </>
  );
}

// CocoAlert 🔥
import coco_Alert from 'coco-alert/react';

function App() {
  return (
    <button onClick={() => coco_Alert.success('Hello')}>Click</button>
  );
}
```

**No setup. No providers. No containers. Just works.** ✨

---

## 📦 Installation

```bash
npm install coco-alert
```

---

## 🚀 Usage (It's THIS Easy!)

### **Step 1: Import**
```javascript
import coco_Alert from 'coco-alert/react';
```

### **Step 2: Use It Anywhere**
```javascript
coco_Alert.success('Operation successful! 🎉');
coco_Alert.error('Something went wrong! ❌');
coco_Alert.warning('Be careful! ⚠️');
coco_Alert.info('Just so you know... ℹ️');
```

**That's literally it. No setup, no providers, no containers!**

---

## 📖 Complete Examples

### **React (Vite, CRA)**

```jsx
import coco_Alert from 'coco-alert/react';

function App() {
  const handleClick = () => {
    coco_Alert.success('Button clicked!');
  };

  return (
    <div>
      <h1>My App</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
```

### **Next.js App Router**

```tsx
'use client'; // Required for App Router!

import coco_Alert from 'coco-alert/react';

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
import coco_Alert from 'coco-alert/react';

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
import coco_Alert from 'coco-alert/react';

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
import coco_Alert from 'coco-alert/react';

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
import coco_Alert from 'coco-alert/react';

async function handleDelete(id) {
  // Ask for confirmation
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

### **File Upload**

```javascript
import coco_Alert from 'coco-alert/react';

async function handleFileUpload(file) {
  if (file.size > 5000000) {
    coco_Alert.warning('File size must be less than 5MB');
    return;
  }

  try {
    await uploadFile(file);
    coco_Alert.success('File uploaded successfully! 📁');
  } catch (error) {
    coco_Alert.error('Upload failed. Please try again.');
  }
}
```

---

## 📚 API Reference

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
| `duration` | `number` | `4000` | Duration in milliseconds (4 seconds) |
| `position` | `AlertPosition` | `"top-right"` | Position on screen |

#### **Examples**

```javascript
// Simple alert (4 seconds, top-right)
coco_Alert.success('Saved!');

// Custom duration (10 seconds)
coco_Alert.error('Critical error', 10000);

// Custom position
coco_Alert.info('Loading...', 3000, 'top-center');

// All options
coco_Alert.warning('Session expiring soon', 5000, 'bottom-right');
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

```javascript
// Top positions
coco_Alert.info('Top left', 3000, 'top-left');
coco_Alert.info('Top center', 3000, 'top-center');
coco_Alert.info('Top right', 3000, 'top-right');

// Center
coco_Alert.warning('Center alert', 3000, 'center');

// Bottom positions
coco_Alert.success('Bottom left', 3000, 'bottom-left');
coco_Alert.success('Bottom center', 3000, 'bottom-center');
coco_Alert.success('Bottom right', 3000, 'bottom-right');
```

---

## 🎨 Features

<table>
<tr>
<td width="50%">

### ⚡ **Zero Configuration**
- No setup required
- No providers needed
- No containers to add
- Just import and use

</td>
<td width="50%">

### 🎯 **Smart Defaults**
- Auto-dismisses after 4s
- Shows at top-right
- Dark theme by default
- Smooth animations

</td>
</tr>
<tr>
<td width="50%">

### 🎨 **Beautiful Design**
- 4 alert types with colors
- Progress bar indicator
- Smooth slide-in animation
- Glassmorphism effects

</td>
<td width="50%">

### 📦 **Tiny Bundle**
- Zero dependencies
- Pure inline styles
- ~3KB gzipped
- No CSS imports needed

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
- Custom durations
- 7 position options
- Auto-stacking alerts

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

### **Long Messages**
```javascript
// 10 second notification for important messages
coco_Alert.error(
  'Critical error occurred. Please contact support at support@example.com',
  10000
);
```

### **Center Important Alerts**
```javascript
// Use center position for critical messages
coco_Alert.warning('Your session will expire in 5 minutes', 5000, 'center');
```

---

## 🎨 Alert Types & Colors

| Type | Color | Use Case | Icon |
|------|-------|----------|------|
| **Success** | Green | Successful operations, confirmations | ✓ |
| **Error** | Red | Errors, failed operations | ✕ |
| **Warning** | Yellow | Warnings, cautions | ⚠ |
| **Info** | Blue | General information, tips | ℹ |
| **Confirm** | Yellow | User confirmations | ? |

---

## 🐛 Troubleshooting

### **Alerts not showing?**

Make sure you've imported correctly:
```javascript
// ✅ Correct
import coco_Alert from 'coco-alert/react';

// ❌ Wrong
import { coco_Alert } from 'coco-alert/react';
```

### **TypeScript errors?**

Install React types:
```bash
npm install --save-dev @types/react @types/react-dom
```

### **Next.js App Router issues?**

Add `'use client';` at the top of your file:
```javascript
'use client';

import coco_Alert from 'coco-alert/react';
```

---

## 📊 Comparison with Other Libraries

| Feature | CocoAlert | react-toastify | react-hot-toast | sonner |
|---------|-----------|----------------|-----------------|--------|
| Setup Required | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| Provider/Container | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| Bundle Size | 3KB | 8KB | 4KB | 6KB |
| Dependencies | 0 | 2 | 1 | 3 |
| TypeScript | ✅ Built-in | ✅ Yes | ✅ Yes | ✅ Yes |
| Confirmation Dialog | ✅ Built-in | ❌ No | ❌ No | ❌ No |

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

*The simplest alert library you'll ever use.*

</div>