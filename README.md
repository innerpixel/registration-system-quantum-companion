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

# Cosmic Companion AI

An interactive quantum-aware AI companion for your Vue.js applications.

## Features

- Real-time quantum statistics
- Dynamic state management with Pinia
- Role-based quantum metrics
- Beautiful quantum-themed UI
- Built-in error handling

## Installation

```bash
npm install cosmic-companion-ai
```

## Quick Start

```javascript
import { TravellerCompanion, useQuantumNexusStore } from 'cosmic-companion-ai'

// In your Vue component
export default {
  components: {
    TravellerCompanion
  },
  setup() {
    const quantumStore = useQuantumNexusStore()
    return { quantumStore }
  }
}
```

## Store Integration

### Quantum Nexus Store

The quantum nexus store provides real-time quantum metrics based on user roles:

```javascript
const { nexusStats } = storeToRefs(quantumStore)
const { formatMetric } = quantumStore

// Access quantum metrics
const metrics = computed(() => ({
  coherence: formatMetric(nexusStats.value?.coherence || 0),
  entanglement: formatMetric(nexusStats.value?.entanglement || 0),
  connections: nexusStats.value?.connections || 0
}))
```

### Auth Store Integration

```javascript
import { useAuthStore } from 'cosmic-companion-ai'

const authStore = useAuthStore()
// User roles: admin, quantum-engineer, researcher, standard
```

## Troubleshooting

### Common Issues

1. **Store Initialization**
   ```javascript
   // Ensure proper store initialization
   import { storeToRefs } from 'pinia'
   const { nexusStats } = storeToRefs(quantumStore)
   const { formatMetric } = quantumStore // Direct method access
   ```

2. **Null Safety**
   ```javascript
   // Use optional chaining and defaults
   const stats = nexusStats.value || {}
   const coherence = formatMetric(stats.coherence || 0)
   ```

3. **Component Updates**
   ```javascript
   // Proper computed property setup
   const metrics = computed(() => {
     const stats = nexusStats.value || {}
     return {
       coherence: formatMetric(stats.coherence || 0),
       // ... other metrics
     }
   })
   ```

### Best Practices

1. **Store Setup**
   - Initialize stores before component mounting
   - Use `storeToRefs` for reactive properties
   - Access methods directly from store

2. **Error Handling**
   - Add error boundaries in parent components
   - Use optional chaining for nested properties
   - Provide fallback values for all metrics

3. **Performance**
   - Use computed properties for derived values
   - Implement proper cleanup in `onUnmounted`
   - Monitor quantum metric update frequency

## Recent Updates

### v1.1.0
- Added quantum nexus statistics
- Enhanced error handling
- Improved null safety
- Added role-based metrics
- Dynamic status indicators

## License

MIT License - See LICENSE file for details
