# Cosmic Companion AI

An ethereal AI companion component for space-themed Vue applications. This component provides an interactive, luminous AI assistant that helps users navigate quantum realities and interact with your space application.

## Features

- **Quantum Reality Integration**
  - Reality branch navigation
  - Coherence level monitoring
  - Achievement tracking

- **Ethereal UI Design**
  - Luminous, transparent interfaces
  - Radial gradients and glowing effects
  - Smooth animations and transitions

- **Interactive Tutorial System**
  - Guided quantum tours
  - Reality branch exploration
  - Achievement unlocks

- **Advanced Styling**
  - Tailwind integration
  - Custom CSS effects
  - Responsive design

## Installation

```bash
# Install from GitHub
npm install git+https://github.com/innerpixel/cosmic-companion-ai.git

# Or install locally
npm install --save file:./cosmic-companion-ai
```

## Usage

1. Register the plugin in your main.js:
```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createTravellerPlugin } from 'cosmic-companion-ai'
import './style.css'  // Import your styles

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(createTravellerPlugin)

app.mount('#app')
```

2. Use the component with enhanced styling:
```vue
<script setup>
import { ref, onMounted } from 'vue'
import { TravellerCompanion, useTourStore, travellerTutorials } from 'cosmic-companion-ai'

const tourStore = useTourStore()
const welcomeMessage = ref('Welcome to the quantum realm!')

onMounted(async () => {
  await tourStore.loadTutorials()
  if (travellerTutorials.quantum) {
    tourStore.startTour('quantum')
  }
})
</script>

<template>
  <div class="companion-container">
    <!-- Ethereal Background -->
    <div class="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-indigo-500/5 to-transparent rounded-lg"></div>
    
    <!-- Glowing Border -->
    <div class="absolute inset-0 rounded-lg border border-cyan-400/30 glow-border"></div>
    
    <!-- Content -->
    <div class="relative p-8 backdrop-blur-md bg-black/20">
      <TravellerCompanion 
        :initialMessage="welcomeMessage"
        class="companion-content" />
    </div>
  </div>
</template>

<style>
.companion-container {
  position: relative;
}

.glow-border {
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.1),
              inset 0 0 15px rgba(34, 211, 238, 0.1);
}

.companion-content {
  position: relative;
  z-index: 10;
}
</style>
```

## Package Structure

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
├── docs/
│   ├── TECHNICAL_IMPLEMENTATION.md
│   ├── TROUBLESHOOTING.md        # New!
│   ├── AI_ASSISTANT_GUIDE.md
│   └── FEATURE_BRAINSTORM.md
├── package.json
└── vite.config.js
```

## Documentation

- [Technical Implementation](./docs/TECHNICAL_IMPLEMENTATION.md)
- [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)
- [AI Assistant Guide](./docs/AI_ASSISTANT_GUIDE.md)
- [Feature Brainstorm](./docs/FEATURE_BRAINSTORM.md)

## Development

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./cosmic-companion-ai/src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          primary: 'rgb(103, 232, 249)',
          secondary: 'rgb(34, 211, 238)'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    }
  }
}
```

### Style Customization

The companion uses CSS variables for easy customization:

```css
:root {
  --cosmic-primary: rgb(103, 232, 249);
  --cosmic-secondary: rgb(34, 211, 238);
  --cosmic-glow: rgba(34, 211, 238, 0.1);
  --cosmic-blur: 8px;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT License - feel free to use in your quantum adventures!
