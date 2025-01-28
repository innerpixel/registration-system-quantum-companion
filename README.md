# Cosmic Companion AI

An AI companion component for space-themed Vue applications. This component provides an interactive AI assistant that helps users navigate and interact with your space application.

## Installation

```bash
npm install git+https://github.com/innerpixel/cosmic-companion-ai.git
```

## Usage

1. Register the plugin in your main.js:
```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createTravellerPlugin } from 'cosmic-companion-ai'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(createTravellerPlugin)

app.mount('#app')
```

2. Use the component in your Vue files:
```vue
<script setup>
import { TravellerCompanion } from 'cosmic-companion-ai'
</script>

<template>
  <TravellerCompanion />
</template>
```

## Package Structure

The package is structured to work optimally with Vite and Vue 3:

```
cosmic-companion-ai/
├── src/
│   ├── components/
│   │   └── TravellerCompanion.vue
│   ├── stores/
│   │   └── tourStore.js
│   ├── config/
│   │   └── tutorials.js
│   ├── style.css
│   └── index.js
├── package.json
└── vite.config.js
```

## Package Configuration

### package.json
```json
{
  "type": "module",
  "exports": {
    ".": {
      "import": "./src/index.js",
      "require": "./dist/cosmic-companion-ai.umd.cjs"
    },
    "./style.css": "./src/style.css"
  },
  "main": "./dist/cosmic-companion-ai.umd.cjs",
  "module": "./src/index.js",
  "files": [
    "dist",
    "src"
  ]
}
```

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'CosmicCompanionAI',
      formats: ['es', 'umd'],
      fileName: (format) => `cosmic-companion-ai.${format === 'es' ? 'js' : 'umd.cjs'}`
    },
    rollupOptions: {
      external: ['vue', 'pinia'],
      output: {
        globals: {
          vue: 'Vue',
          pinia: 'Pinia'
        }
      }
    }
  }
})
```

## Development Notes

### Package Resolution
The package uses modern ES Module resolution with fallbacks:
1. Direct source access during development
2. Built files for production
3. UMD fallback for CommonJS environments

### Plugin Registration
The plugin is designed as a simple object with an install method:
```javascript
const createTravellerPlugin = {
  install(app) {
    app.component('TravellerCompanion', TravellerCompanion)
  }
}
```

### Styles
Styles are automatically included when importing the component. No need for separate style imports in your application.

## Troubleshooting

### Common Issues

1. **Module Resolution Errors**
   - Make sure package.json has correct "exports" field
   - Include both "src" and "dist" in "files" field
   - Use direct source imports during development

2. **Style Loading Issues**
   - Styles are bundled with the component
   - No need for separate style imports
   - Vite handles CSS modules automatically

3. **Plugin Registration**
   - Use `app.use(createTravellerPlugin)` not `app.use(createTravellerPlugin())`
   - Make sure Pinia is registered before the plugin
   - Component will be globally available as 'TravellerCompanion'

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT License - feel free to use in your space adventures!
