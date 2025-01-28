# Cosmic Companion AI

A beautiful and interactive AI companion component for space-themed Vue applications. This component provides an immersive chat interface with space-themed features, perfect for adding an interactive AI assistant to your cosmic applications.

![Cosmic Companion AI](./preview.png)

## Features

- 🚀 Space-themed UI with sleek, semi-transparent design
- 🤖 Interactive AI chat interface
- 📡 Real-time status indicators (signal strength, shields)
- 🗺️ Location awareness and navigation
- 🆘 Emergency protocols
- 🌌 Customizable tutorials and guidance
- 🎨 Beautiful animations and transitions
- 📱 Responsive design

## Installation

```bash
npm install cosmic-companion-ai
```

## Usage

1. First, ensure you have Pinia installed in your Vue 3 project:

```bash
npm install pinia
```

2. Set up Pinia in your main.js:

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

3. Import and use the component:

```vue
<template>
  <div class="app">
    <h1>Your Space App</h1>
    <TravellerCompanion />
  </div>
</template>

<script setup>
import { TravellerCompanion } from 'cosmic-companion-ai'
import 'cosmic-companion-ai/style.css'
</script>
```

## Customization

### Custom Tutorials

You can provide custom tutorials to the companion:

```javascript
const customTutorials = {
  myFeature: {
    steps: [
      {
        content: "Welcome to my custom feature!",
        options: ["Learn More", "Get Started"]
      }
    ],
    prerequisites: [],
    version: "1.0"
  }
}
```

### Styling

The component uses CSS variables that you can override:

```css
:root {
  --cc-primary-color: #4a90e2;
  --cc-secondary-color: #2c3e50;
  --cc-background: rgba(15, 23, 42, 0.95);
  --cc-text-color: #e2e8f0;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| initialMessages | Array | [] | Initial messages to display |
| customTutorials | Object | {} | Custom tutorial configurations |
| theme | Object | {} | Custom theme overrides |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| message | { content, type } | Emitted when a message is sent |
| option-selected | { option, messageId } | Emitted when an option is selected |
| emergency | { type } | Emitted when emergency assistance is requested |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details
