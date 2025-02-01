#!/bin/bash

echo "🚀 Starting deployment process..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# 2. Build the project
echo "🏗️ Building for production..."
npm run build

# 3. Initialize Pinia stores
echo "🔄 Ensuring store initialization..."
cat << 'EOF' >> src/main.js

// Ensure stores are initialized
import { useQuantumNexusStore } from 'cosmic-companion-ai'
import { useAuthStore } from 'cosmic-companion-ai'

const initStores = () => {
  const quantumStore = useQuantumNexusStore()
  const authStore = useAuthStore()
  return { quantumStore, authStore }
}

app.config.globalProperties.$initStores = initStores()
EOF

# 4. Add error boundaries
echo "🛡️ Adding error boundaries..."
cat << 'EOF' >> src/App.vue

<script setup>
import { onErrorCaptured } from 'vue'

onErrorCaptured((err, instance, info) => {
  console.error('Error captured:', err)
  console.info('Component:', instance)
  console.info('Info:', info)
  return false // prevent error from propagating
})
</script>
EOF

# 5. Set up environment
echo "🌍 Setting up environment..."
cat << 'EOF' > .env.production
VITE_APP_ENV=production
VITE_APP_QUANTUM_UPDATE_INTERVAL=5000
VITE_APP_ENABLE_QUANTUM_LOGGING=false
EOF

echo "✨ Deployment setup complete!"
echo "🎯 Next steps:"
echo "1. Copy the dist folder to your VPS"
echo "2. Set up your web server (nginx/apache) to serve the static files"
echo "3. Configure SSL if needed"
