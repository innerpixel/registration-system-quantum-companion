<template>
  <div class="traveller-companion" :class="{ 'is-active': isVisible }">
    <div class="companion-container">
      <div class="companion-header">
        <div class="ai-status">
          <div class="ai-indicator" :class="{ 'active': isThinking }"></div>
          <span>COSMIC COMPANION</span>
        </div>
        <div class="location-info" v-if="currentLocation">
          <span>{{ currentLocation }}</span>
        </div>
        <button @click="toggleCompanion" class="toggle-button">
          {{ isVisible ? 'MINIMIZE' : 'NEED GUIDANCE?' }}
        </button>
      </div>
      
      <div class="companion-content" v-if="isVisible">
        <div class="status-bar">
          <div class="status-item">
            <span>Signal Strength: {{ signalStrength }}%</span>
          </div>
          <div class="status-item">
            <span>Shield Status: {{ shieldStatus }}</span>
          </div>
        </div>

        <div class="messages-container" ref="messagesContainer">
          <div v-for="(message, index) in messages" 
               :key="index" 
               class="message"
               :class="message.type">
            <div class="message-content">{{ message.content }}</div>
            <div class="message-options" v-if="message.options">
              <button v-for="option in message.options"
                      :key="option"
                      @click="handleOption(option, message.id)"
                      class="option-button">
                {{ option }}
              </button>
            </div>
          </div>
        </div>
        
        <div class="quick-actions">
          <button @click="emergencyAssistance" class="emergency-button">
            Emergency Assistance
          </button>
          <button @click="showNavigation" class="nav-button">
            Navigation
          </button>
        </div>

        <div class="input-container">
          <input v-model="userInput"
                 @keyup.enter="sendMessage"
                 placeholder="Ask anything about your journey..."
                 :disabled="isThinking"
                 class="user-input" />
          <button @click="sendMessage" 
                  :disabled="isThinking"
                  class="send-button">
            SEND
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useTourStore } from '../stores/tourStore'

const tourStore = useTourStore()
const isVisible = ref(false)
const isThinking = ref(false)
const userInput = ref('')
const messages = ref([])
const messagesContainer = ref(null)
const currentLocation = ref('Sector 7G - Deep Space')
const signalStrength = ref(98)
const shieldStatus = ref('Optimal')

// Welcome message
const welcomeMessage = {
  id: 'welcome',
  type: 'ai',
  content: "Greetings, Space Traveller! I'm your personal AI companion for this journey. How may I assist you today?",
  options: [
    "Current Location Info",
    "Safety Protocols",
    "Local Services",
    "Cultural Guidelines"
  ]
}

// Handle user selecting an option
const handleOption = async (option, messageId) => {
  isThinking.value = true
  
  let response = {
    type: 'ai',
    content: '',
    options: []
  }

  try {
    switch (option) {
      case "Current Location Info":
        await tourStore.loadTutorials()
        tourStore.startTour('spaceOrientation')
        response.content = "We are currently in " + currentLocation.value + ". Would you like to know more about this sector?"
        response.options = ["Sector History", "Local Regulations", "Nearby Stations"]
        break
      case "Safety Protocols":
        await tourStore.loadTutorials()
        tourStore.startTour('safetyProtocols')
        response.content = "Your safety is my priority. Let's review the essential protocols for this sector."
        response.options = ["Emergency Procedures", "Life Support Check", "Communication Channels"]
        break
      case "Local Services":
        await tourStore.loadTutorials()
        tourStore.startTour('localServices')
        response.content = "I can help you find various services in this sector. What are you looking for?"
        response.options = ["Supplies", "Maintenance", "Entertainment", "Medical"]
        break
      default:
        response.content = "I'll help you with that. What specific information would you like?"
        response.options = ["More Details", "Try Something Else", "Contact Support"]
    }
  } catch (error) {
    response.content = "I apologize, but I'm having trouble accessing that information. Would you like to try something else?"
    response.options = ["Try Again", "Other Options", "Contact Support"]
  }

  messages.value.push(response)
  isThinking.value = false
  await scrollToBottom()
}

// Emergency assistance function
const emergencyAssistance = () => {
  messages.value.push({
    type: 'system',
    content: "Emergency Protocol Activated. Scanning local area for immediate assistance...",
    options: ["Contact Nearest Station", "Medical Emergency", "Technical Emergency"]
  })
  scrollToBottom()
}

// Navigation assistance
const showNavigation = () => {
  messages.value.push({
    type: 'ai',
    content: "Navigation System Active. Current Position: " + currentLocation.value,
    options: ["Plot New Course", "Show Nearby Stations", "View Travel History"]
  })
  scrollToBottom()
}

// Send a message
const sendMessage = async () => {
  if (!userInput.value.trim() || isThinking.value) return

  const userMessage = {
    type: 'user',
    content: userInput.value
  }
  
  messages.value.push(userMessage)
  userInput.value = ''
  isThinking.value = true
  
  await scrollToBottom()
  
  // Simulate AI processing
  setTimeout(() => {
    const aiResponse = {
      type: 'ai',
      content: "I understand you're asking about " + userMessage.content + ". Let me help you with that.",
      options: ["More Details", "Related Topics", "Something Else"]
    }
    messages.value.push(aiResponse)
    isThinking.value = false
    scrollToBottom()
  }, 1000)
}

// Toggle companion visibility
const toggleCompanion = () => {
  isVisible.value = !isVisible.value
  if (isVisible.value && messages.value.length === 0) {
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

// Initialize
onMounted(() => {
  messages.value.push(welcomeMessage)
})
</script>

<style scoped>
.traveller-companion {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  background: rgba(15, 23, 42, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  color: #e2e8f0;
  z-index: 1000;
}

.companion-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.companion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 12px 12px 0 0;
}

.ai-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ai-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #64748b;
}

.ai-indicator.active {
  background: #22c55e;
  animation: pulse 1.5s infinite;
}

.location-info {
  font-size: 0.9em;
  color: #94a3b8;
}

.status-bar {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background: rgba(30, 41, 59, 0.5);
  margin-bottom: 10px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9em;
}

.messages-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 15px;
  max-height: 400px;
}

.message {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  max-width: 85%;
}

.message.ai {
  background: rgba(59, 130, 246, 0.2);
  margin-right: auto;
}

.message.user {
  background: rgba(99, 102, 241, 0.2);
  margin-left: auto;
}

.message.system {
  background: rgba(239, 68, 68, 0.2);
  margin: 10px auto;
  text-align: center;
}

.message-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.option-button {
  background: rgba(59, 130, 246, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.5);
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-button:hover {
  background: rgba(59, 130, 246, 0.4);
}

.quick-actions {
  display: flex;
  gap: 10px;
  padding: 10px 15px;
}

.emergency-button {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.5);
  padding: 8px;
  border-radius: 8px;
  flex: 1;
  color: inherit;
}

.nav-button {
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.5);
  padding: 8px;
  border-radius: 8px;
  flex: 1;
  color: inherit;
}

.input-container {
  display: flex;
  gap: 10px;
  padding: 15px;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 0 0 12px 12px;
}

.user-input {
  flex-grow: 1;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(59, 130, 246, 0.3);
  padding: 8px 12px;
  border-radius: 6px;
  color: #e2e8f0;
}

.send-button {
  background: rgba(59, 130, 246, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.5);
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: inherit;
}

.send-button:hover:not(:disabled) {
  background: rgba(59, 130, 246, 0.4);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}
</style>
