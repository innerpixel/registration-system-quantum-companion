<template>
  <div class="w-full bg-slate-900/95 rounded-xl shadow-lg transition-all duration-300 text-slate-200">
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div class="flex justify-between items-center p-4 bg-slate-800/80 rounded-t-xl">
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full bg-slate-500" :class="{ 'bg-green-500 animate-pulse': isThinking }"></div>
          <span class="text-sm font-medium">COSMIC COMPANION</span>
        </div>
        <div v-if="currentLocation" class="text-sm text-slate-400">
          <span>{{ currentLocation }}</span>
        </div>
        <button @click="toggleCompanion" 
                class="px-3 py-1.5 text-sm bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 rounded-lg transition-colors">
          {{ isVisible ? 'MINIMIZE' : 'NEED GUIDANCE?' }}
        </button>
      </div>
      
      <div v-if="isVisible" class="flex flex-col flex-grow">
        <!-- Status Bar -->
        <div class="flex justify-around p-3 bg-slate-800/50 mb-2">
          <div class="flex items-center gap-1.5 text-sm">
            <span>Signal Strength: {{ signalStrength }}%</span>
          </div>
          <div class="flex items-center gap-1.5 text-sm">
            <span>Shield Status: {{ shieldStatus }}</span>
          </div>
        </div>

        <!-- Messages Container -->
        <div ref="messagesContainer" 
             class="flex-grow overflow-y-auto p-4 max-h-[400px] space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div v-for="(message, index) in messages" 
               :key="index" 
               :class="[
                 'p-3 rounded-lg max-w-[85%]',
                 message.type === 'ai' ? 'bg-blue-500/20 mr-auto' : '',
                 message.type === 'user' ? 'bg-indigo-500/20 ml-auto' : '',
                 message.type === 'system' ? 'bg-red-500/20 mx-auto text-center' : ''
               ]">
            <div class="message-content">{{ message.content }}</div>
            <div v-if="message.options" class="flex flex-wrap gap-2 mt-3">
              <button v-for="option in message.options"
                      :key="option"
                      @click="handleOption(option, message.id)"
                      class="px-3 py-1.5 text-sm bg-blue-500/30 hover:bg-blue-500/40 border border-blue-500/50 rounded-full transition-colors">
                {{ option }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="flex gap-3 p-4">
          <button @click="emergencyAssistance" 
                  class="flex-1 p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition-colors">
            Emergency Assistance
          </button>
          <button @click="showNavigation" 
                  class="flex-1 p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg transition-colors">
            Navigation
          </button>
        </div>

        <!-- Input Container -->
        <div class="flex gap-3 p-4 bg-slate-800/80 rounded-b-xl">
          <input v-model="userInput"
                 @keyup.enter="sendMessage"
                 placeholder="Ask anything about your journey..."
                 :disabled="isThinking"
                 class="flex-grow bg-slate-900/80 border border-blue-500/30 p-2 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500/50" />
          <button @click="sendMessage" 
                  :disabled="isThinking"
                  class="px-4 py-2 bg-blue-500/30 hover:bg-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500/50 rounded-lg transition-colors">
            SEND
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  ref, 
  onMounted, 
  onUnmounted, 
  watch, 
  nextTick, 
  computed 
} from 'vue'
import { useTourStore } from '../stores/tourStore'
import { useAuthStore } from '../stores/authStore'
import { useQuantumNexusStore } from '../stores/quantumNexusStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  initialMessage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['response'])

const tourStore = useTourStore()
const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)

const quantumNexusStore = useQuantumNexusStore()
const { nexusStats, formatMetric } = storeToRefs(quantumNexusStore)

// Core state
const isVisible = ref(false)
const isThinking = ref(false)
const userInput = ref('')
const messages = ref([])
const messagesContainer = ref(null)

// Network state
const isOnline = ref(navigator.onLine)

// Computed values
const currentLocation = computed(() => {
  if (!isOnline.value) return 'Quantum Void (Offline)'
  if (!isAuthenticated.value) return 'Quantum Void'
  return user.value?.currentBranch || 'Main Reality Branch'
})

const signalStrength = computed(() => {
  if (!isOnline.value) return 15
  if (!isAuthenticated.value) return 45
  return 98
})

const shieldStatus = computed(() => {
  if (!isOnline.value) return 'Critical'
  if (!isAuthenticated.value) return 'Minimal'
  return 'Optimal'
})

const getQuantumStatus = computed(() => {
  const stats = nexusStats.value
  return {
    coherence: formatMetric.value(stats.coherence),
    entanglement: formatMetric.value(stats.entanglement),
    connections: stats.connections,
    flux: formatMetric.value(stats.flux),
    accessLevel: stats.accessLevel,
    nodeStatus: stats.nodeStatus
  }
})

// Network status monitoring
const handleOnline = () => {
  isOnline.value = true
  messages.value.push({
    type: 'system',
    content: '🟢 Quantum connection restored',
    timestamp: new Date().toISOString()
  })
  scrollToBottom()
}

const handleOffline = () => {
  isOnline.value = false
  messages.value.push({
    type: 'system',
    content: '🔴 Warning: Quantum connection unstable',
    options: ['Retry Connection', 'Emergency Mode'],
    timestamp: new Date().toISOString()
  })
  scrollToBottom()
}

// Initialize component
onMounted(() => {
  // Set up network listeners
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
  
  // Initialize with welcome message
  const welcomeMessage = {
    id: 'welcome',
    type: 'ai',
    content: props.initialMessage || (isAuthenticated.value
      ? `Welcome back to ${currentLocation.value}, ${user.value?.name || 'Quantum Traveler'}! Current quantum coherence: ${getQuantumStatus.value.coherence}%`
      : "Greetings, Space Traveller! I detect you're in the quantum void. Would you like to authenticate your quantum signature?"),
    options: isAuthenticated.value
      ? ["Current Location Info", "Quantum Stats", "Safety Protocols", "Local Services"]
      : ["Authenticate", "Guest Access", "Learn More", "Emergency Contact"],
    timestamp: new Date().toISOString()
  }
  
  if (messages.value.length === 0) {
    messages.value.push(welcomeMessage)
  }
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('online', handleOnline)
  window.removeEventListener('offline', handleOffline)
})

// Handle authentication option
const handleAuthOption = async (option) => {
  if (option === 'Authenticate') {
    await authStore.redirectToLogin()
  } else if (option === 'Guest Access') {
    messages.value.push({
      type: 'system',
      content: "⚠️ Guest access provides limited quantum coherence. Full authentication recommended for optimal experience.",
      options: ["Authenticate Now", "Continue as Guest"],
      timestamp: new Date().toISOString()
    })
  }
}

// Enhanced option handling with auth awareness
const handleOption = async (option, messageId) => {
  isThinking.value = true
  
  let response = {
    type: 'ai',
    content: '',
    options: [],
    timestamp: new Date().toISOString()
  }

  try {
    // Check authentication for protected options
    const protectedOptions = ["Current Location Info", "Safety Protocols", "Local Services", "Quantum Stats"]
    if (protectedOptions.includes(option) && !isAuthenticated.value) {
      response.content = "I apologize, but this information requires quantum authentication. Would you like to proceed with authentication?"
      response.options = ["Authenticate", "Guest Access", "Learn More"]
      messages.value.push(response)
      isThinking.value = false
      await scrollToBottom()
      return
    }

    switch (option) {
      case "Authenticate":
      case "Guest Access":
        await handleAuthOption(option)
        break
      case "Current Location Info":
        await tourStore.loadTutorials()
        tourStore.startTour('spaceOrientation')
        response.content = `We are currently in ${currentLocation.value}. Signal strength is ${signalStrength.value}% with ${shieldStatus.value} shields.`
        response.options = ["Sector History", "Local Regulations", "Nearby Stations"]
        break
      case "Safety Protocols":
        await tourStore.loadTutorials()
        tourStore.startTour('safetyProtocols')
        response.content = `Your safety is my priority. Current shield status: ${shieldStatus.value}. Let's review the essential protocols for this sector.`
        response.options = ["Emergency Procedures", "Life Support Check", "Communication Channels"]
        break
      case "Local Services":
        await tourStore.loadTutorials()
        tourStore.startTour('localServices')
        response.content = `With current signal strength at ${signalStrength.value}%, I can help you find various services in this sector. What are you looking for?`
        response.options = ["Supplies", "Maintenance", "Entertainment", "Medical"]
        break
      case "Quantum Stats":
        const stats = getQuantumStatus.value
        const details = nexusStats.value[`${stats.accessLevel.toLowerCase().replace(' ', '')}Metrics`] || {}
        
        response.content = `📊 CSMCL Quantum Nexus Status:
        
🔮 Coherence: ${stats.coherence}%
🌌 Entanglement: ${stats.entanglement}%
🔗 Active Connections: ${stats.connections}
⚡ Quantum Flux: ${stats.flux}%

Access Level: ${stats.accessLevel}
Node Status: ${stats.nodeStatus}

${Object.entries(details).map(([key, value]) => 
  `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: ${value}`
).join('\n')}`

        response.options = ["Refresh Stats", "Detailed Analysis", "System Health", "Optimization Tips"]
        break;
      case "Refresh Stats":
        response.content = "Refreshing quantum metrics..."
        setTimeout(() => {
          const newStats = getQuantumStatus.value
          messages.value.push({
            type: 'system',
            content: `🔄 Updated Quantum Metrics:
            
Coherence: ${newStats.coherence}% (${newStats.coherence > stats.coherence ? '↑' : '↓'})
Entanglement: ${newStats.entanglement}% (${newStats.entanglement > stats.entanglement ? '↑' : '↓'})
Connections: ${newStats.connections} (${newStats.connections > stats.connections ? '↑' : '↓'})
Flux: ${newStats.flux}% (${newStats.flux > stats.flux ? '↑' : '↓'})`,
            timestamp: new Date().toISOString()
          })
          scrollToBottom()
        }, 1500)
        response.options = ["Monitor Changes", "Analyze Trends", "View Alerts"]
        break;
      case "Retry Connection":
        response.content = "Attempting to restore quantum coherence..."
        setTimeout(() => {
          if (navigator.onLine) {
            handleOnline()
          } else {
            messages.value.push({
              type: 'system',
              content: '🔴 Quantum coherence still unstable. Please check your connection.',
              options: ['Retry Connection', 'Emergency Mode'],
              timestamp: new Date().toISOString()
            })
          }
        }, 1500)
        break
      case "Emergency Mode":
        response.content = "🚨 Emergency Mode activated. Limited functionality available. Critical systems only."
        response.options = ["Check Status", "Send Emergency Signal", "Power Conservation"]
        break
      default:
        response.content = "I'll help you with that. What specific information would you like?"
        response.options = ["More Details", "Try Something Else", "Contact Support"]
    }
  } catch (error) {
    console.error('Companion error:', error)
    response.content = "I apologize, but I'm having trouble accessing that information. Would you like to try something else?"
    response.options = ["Try Again", "Other Options", "Contact Support"]
  }

  messages.value.push(response)
  emit('response', response)
  isThinking.value = false
  await scrollToBottom()
}

// Send a message
const sendMessage = async () => {
  if (!userInput.value.trim() || isThinking.value) return

  const userMessage = {
    type: 'user',
    content: userInput.value,
    timestamp: new Date().toISOString()
  }
  
  messages.value.push(userMessage)
  userInput.value = ''
  isThinking.value = true
  
  await scrollToBottom()
  
  // Simulate AI processing
  setTimeout(() => {
    const aiResponse = {
      type: 'ai',
      content: `I understand you're asking about ${userMessage.content}. Let me help you with that.`,
      options: ["More Details", "Related Topics", "Something Else"],
      timestamp: new Date().toISOString()
    }
    messages.value.push(aiResponse)
    emit('response', aiResponse)
    isThinking.value = false
    scrollToBottom()
  }, 1000)
}

// Toggle companion visibility
const toggleCompanion = () => {
  isVisible.value = !isVisible.value
  if (isVisible.value && messages.value.length === 0) {
    const welcomeMessage = {
      id: 'welcome',
      type: 'ai',
      content: props.initialMessage || (isAuthenticated.value
        ? `Welcome back to ${currentLocation.value}, ${user.value?.name || 'Quantum Traveler'}! Current quantum coherence: ${getQuantumStatus.value.coherence}%`
        : "Greetings, Space Traveller! I detect you're in the quantum void. Would you like to authenticate your quantum signature?"),
      options: isAuthenticated.value
        ? ["Current Location Info", "Quantum Stats", "Safety Protocols", "Local Services"]
        : ["Authenticate", "Guest Access", "Learn More", "Emergency Contact"],
      timestamp: new Date().toISOString()
    }
    messages.value.push(welcomeMessage)
  }
}

// Scroll to bottom of messages
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Watch for new messages and scroll
watch(messages, () => scrollToBottom(), { deep: true })
</script>

<style>
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

/* Custom Scrollbar */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(51, 65, 85, 0.5);
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: rgba(51, 65, 85, 0.7);
}
</style>
