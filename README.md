[![npm version](https://img.shields.io/npm/v/@cocobase/alert?style=flat-square)](https://www.npmjs.com/package/@cocobase/alert)
[![downloads](https://img.shields.io/npm/dm/@cocobase/alert?style=flat-square)](https://www.npmjs.com/package/@cocobase/alert)
[![license](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](https://github.com/cocobase-team/alert/blob/main/LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/cocobase-team/alert/pulls)

```

---

### **Website/Homepage URL:**
```

https://docs.cocobase.buzz/alert

````


# 🥥 CocoAlert

Beautiful toast notifications for web apps.

## Installation
```bash
npm install coco-alert
````

## Usage

### Vanilla JavaScript / HTML

```html
<script src="https://unpkg.com/coco-alert"></script>
<script>
  const alert = new CocoAlert();
  alert.success("Hello World!");
</script>
```

### React

```javascript
import { coco_Alert } from "coco-alert/react";

function App() {
  return (
    <button onClick={() => coco_Alert.success("It works!")}>Show Alert</button>
  );
}
```

### Vue (Coming Soon)

```bash
npm install @coco-alert/vue
```

## License

MIT
