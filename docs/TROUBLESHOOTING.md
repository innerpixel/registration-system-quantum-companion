# Cosmic Companion AI Troubleshooting Guide

## Common Installation Issues

### 1. Package Installation

```bash
# Correct installation as a local dependency
npm install --save file:./cosmic-companion-ai

# If you encounter ENOENT errors, ensure the package exists:
ls -la cosmic-companion-ai/
```

### 2. Component Registration Issues

If the TravellerCompanion component is not found:

```javascript
// main.js
import { createTravellerPlugin } from 'cosmic-companion-ai'

// Make sure to use the plugin
app.use(createTravellerPlugin)
```

### 3. Store Integration

If you encounter Pinia store errors:

```javascript
// Ensure Pinia is installed first
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

// Then install the companion
app.use(createTravellerPlugin)
```

### 4. Style Issues

If styles are not applying correctly:

1. Check that your main.js imports the styles:
```javascript
import 'cosmic-companion-ai/style.css'
```

2. Ensure Tailwind is properly configured:
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./cosmic-companion-ai/src/**/*.{vue,js,ts,jsx,tsx}"  // Add this line
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          primary: 'rgb(103, 232, 249)',
          secondary: 'rgb(34, 211, 238)'
        }
      }
    }
  }
}
```

## Common Runtime Issues

### 1. Tour System

If tutorials are not starting:

```javascript
// Correct usage in component
import { useTourStore, travellerTutorials } from 'cosmic-companion-ai'

const tourStore = useTourStore()

onMounted(async () => {
  // Load tutorials first
  await tourStore.loadTutorials()
  
  // Then start specific tour
  if (travellerTutorials.quantum) {
    tourStore.startTour('quantum')
  }
})
```

### 2. Styling Conflicts

If the companion's styles are being overridden:

```vue
<template>
  <!-- Use the companion-container class for proper isolation -->
  <div class="companion-container">
    <TravellerCompanion 
      :initialMessage="welcomeMessage"
      @response="handleCompanionResponse"
      class="companion-content" />
  </div>
</template>

<style>
/* Ensure proper z-index and isolation */
.companion-container {
  position: relative;
  z-index: 10;
}

/* Add luminous effects */
.companion-content {
  background: radial-gradient(circle at center,
              rgba(103, 232, 249, 0.1) 0%,
              rgba(34, 211, 238, 0.05) 50%,
              transparent 100%);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(103, 232, 249, 0.3);
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.1);
}
</style>
```

### 3. Performance Issues

If the companion is causing performance issues:

1. Enable lazy loading:
```javascript
// In your component
const TravellerCompanion = defineAsyncComponent(() =>
  import('cosmic-companion-ai').then(mod => mod.TravellerCompanion)
)
```

2. Optimize renders:
```vue
<TravellerCompanion 
  :initialMessage="welcomeMessage"
  @response="handleCompanionResponse"
  :updateInterval="1000"  <!-- Adjust update frequency -->
  :batchSize="5"         <!-- Adjust message batch size -->
/>
```

## Best Practices

1. **Initialization**
   - Always initialize Pinia before the companion
   - Load tutorials asynchronously
   - Handle tour state properly

2. **Styling**
   - Use provided CSS variables for consistency
   - Implement proper z-indexing
   - Use backdrop-filter with fallbacks

3. **Performance**
   - Lazy load when possible
   - Batch message updates
   - Use proper cleanup in component unmount

4. **Error Handling**
   - Always wrap async operations in try/catch
   - Provide fallback content
   - Log errors appropriately

## Support

If you encounter issues not covered in this guide:

1. Check the console for specific error messages
2. Verify package versions compatibility
3. Review the implementation examples
4. Submit an issue with:
   - Error message
   - Environment details
   - Steps to reproduce
   - Expected vs actual behavior
