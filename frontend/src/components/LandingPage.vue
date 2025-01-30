<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white">
    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-16">
      <div class="flex flex-col items-center text-center">
        <h1 class="text-5xl font-bold mb-6 text-glow">Welcome to CSMCL Space</h1>
        <p class="text-xl mb-8 text-cyan-300">Your Gateway to Quantum Reality</p>
        
        <!-- Quantum Status Display -->
        <div class="bg-black/30 p-6 rounded-lg mb-8 w-full max-w-2xl backdrop-blur-sm border border-indigo-500/30">
          <h2 class="text-2xl font-semibold mb-4 text-glow-subtle">Quantum Reality Status</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-indigo-900/50 rounded border border-indigo-400/20">
              <h3 class="text-lg font-medium text-cyan-200">Reality Branch</h3>
              <p class="text-2xl font-bold text-glow-cyan">{{ currentBranch }}</p>
            </div>
            <div class="p-4 bg-indigo-900/50 rounded border border-indigo-400/20">
              <h3 class="text-lg font-medium text-cyan-200">Coherence Level</h3>
              <p class="text-2xl font-bold text-glow-cyan">{{ coherenceLevel }}%</p>
            </div>
          </div>
        </div>

        <!-- Cosmic Companion Integration -->
        <div class="companion-container w-full max-w-4xl mb-8 relative">
          <!-- Ethereal Background -->
          <div class="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-indigo-500/5 to-transparent rounded-lg"></div>
          
          <!-- Glowing Border -->
          <div class="absolute inset-0 rounded-lg border border-cyan-400/30 glow-border"></div>
          
          <!-- Content -->
          <div class="relative p-8 backdrop-blur-md bg-black/20">
            <h2 class="text-2xl font-semibold mb-6 text-glow-cyan flex items-center justify-center">
              <span class="mr-3 text-3xl">✨</span>
              Quantum Companion
              <span class="ml-3 text-3xl">✨</span>
            </h2>
            
            <!-- AI Introduction -->
            <div class="mb-6 text-cyan-200/80 max-w-2xl mx-auto">
              <p>I am your quantum guide through the multiverse, here to assist you in navigating the infinite branches of reality.</p>
            </div>
            
            <!-- Companion Component -->
            <div class="companion-wrapper">
              <TravellerCompanion 
                :initialMessage="welcomeMessage"
                @response="handleCompanionResponse"
                class="companion-content" />
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <button 
            v-for="action in quickActions" 
            :key="action.command"
            @click="executeCommand(action.command)"
            class="p-4 bg-indigo-600/40 hover:bg-indigo-500/50 rounded-lg transition-all duration-300 border border-indigo-400/30 hover:border-indigo-400/50 backdrop-blur-sm hover:scale-105">
            <span class="block text-xl mb-2">{{ action.icon }}</span>
            <span class="font-medium text-cyan-200">{{ action.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Achievement Showcase -->
    <div class="bg-black/30 py-12 backdrop-blur-sm">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center text-glow">Recent Achievements</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div 
            v-for="achievement in recentAchievements" 
            :key="achievement.id"
            class="p-4 bg-indigo-900/30 rounded-lg text-center border border-indigo-400/20 hover:border-indigo-400/40 transition-all duration-300 hover:scale-105">
            <span class="text-3xl mb-2 block achievement-icon">{{ achievement.icon }}</span>
            <h3 class="font-medium mb-1 text-cyan-200">{{ achievement.title }}</h3>
            <p class="text-sm text-cyan-300/70">{{ achievement.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { TravellerCompanion, useTourStore, travellerTutorials } from 'cosmic-companion-ai'

// Initialize tour store
const tourStore = useTourStore()

// Reactive state
const currentBranch = ref('Alpha-Γ')
const coherenceLevel = ref(99.9)
const welcomeMessage = ref('Welcome, Quantum Explorer! How may I assist you today?')

// Quick actions
const quickActions = ref([
  {
    icon: '🌟',
    label: 'Start Journey',
    command: '/start-journey'
  },
  {
    icon: '🎮',
    label: 'View Achievements',
    command: '/achievements'
  },
  {
    icon: '👥',
    label: 'Meet Explorers',
    command: '/meet'
  }
])

// Recent achievements
const recentAchievements = ref([
  {
    id: 1,
    icon: '🎯',
    title: 'First Contact',
    description: 'Made your first quantum connection'
  },
  {
    id: 2,
    icon: '🌌',
    title: 'Reality Jumper',
    description: 'Visited your first parallel reality'
  },
  {
    id: 3,
    icon: '⚡',
    title: 'Quantum Initialized',
    description: 'Set up your quantum signature'
  },
  {
    id: 4,
    icon: '🎲',
    title: 'Probability Master',
    description: 'Completed quantum basics training'
  }
])

// Methods
const handleCompanionResponse = (response) => {
  console.log('Companion response:', response)
  // Handle the companion's response here
}

const executeCommand = (command) => {
  console.log('Executing command:', command)
  // Implement command execution logic
}

onMounted(async () => {
  // Initialize quantum reality connection
  console.log('Quantum reality initialized')
  
  // Load tutorials and start the quantum tour
  await tourStore.loadTutorials()
  if (travellerTutorials.quantum) {
    tourStore.startTour('quantum')
  }
})
</script>

<style scoped>
.bg-gradient-to-b {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

.text-glow {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
               0 0 20px rgba(255, 255, 255, 0.3),
               0 0 30px rgba(255, 255, 255, 0.2);
}

.text-glow-subtle {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.text-glow-cyan {
  color: rgb(103, 232, 249);
  text-shadow: 0 0 10px rgba(103, 232, 249, 0.5),
               0 0 20px rgba(103, 232, 249, 0.3);
}

.companion-container {
  transition: all 0.3s ease;
}

.glow-border {
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.1),
              inset 0 0 15px rgba(34, 211, 238, 0.1);
}

.achievement-icon {
  animation: float 6s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(103, 232, 249, 0.5));
}

.companion-content {
  position: relative;
  z-index: 10;
}

.bg-gradient-radial {
  background: radial-gradient(circle at center,
              var(--tw-gradient-from) 0%,
              var(--tw-gradient-via) 50%,
              var(--tw-gradient-to) 100%);
}

@keyframes gradient {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
