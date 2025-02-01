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
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="p-4 bg-indigo-900/50 rounded border border-indigo-400/20">
              <h3 class="text-lg font-medium text-cyan-200">Reality Branch</h3>
              <p class="text-2xl font-bold text-glow-cyan">{{ currentBranch }}</p>
            </div>
            <div class="p-4 bg-indigo-900/50 rounded border border-indigo-400/20">
              <h3 class="text-lg font-medium text-cyan-200">Coherence</h3>
              <p class="text-2xl font-bold text-glow-cyan">{{ quantumMetrics.coherence }}%</p>
            </div>
            <div class="p-4 bg-indigo-900/50 rounded border border-indigo-400/20">
              <h3 class="text-lg font-medium text-cyan-200">Entanglement</h3>
              <p class="text-2xl font-bold text-glow-cyan">{{ quantumMetrics.entanglement }}%</p>
            </div>
            <div class="p-4 bg-indigo-900/50 rounded border border-indigo-400/20">
              <h3 class="text-lg font-medium text-cyan-200">System Health</h3>
              <p class="text-2xl font-bold" :class="systemHealth.color">{{ systemHealth.status }}</p>
            </div>
          </div>
          
          <!-- Additional Metrics -->
          <div class="mt-4 grid grid-cols-2 gap-4">
            <div class="p-4 bg-quantum-gradient rounded border border-quantum-400/20">
              <h3 class="text-lg font-medium text-cyan-200">Active Connections</h3>
              <p class="text-2xl font-bold text-quantum-400">{{ quantumMetrics.connections }}</p>
            </div>
            <div class="p-4 bg-quantum-gradient rounded border border-quantum-400/20">
              <h3 class="text-lg font-medium text-cyan-200">Quantum Flux</h3>
              <p class="text-2xl font-bold text-quantum-400">{{ quantumMetrics.flux }}%</p>
            </div>
          </div>
        </div>

        <!-- Access Level Badge -->
        <div class="mb-8">
          <span class="px-4 py-2 rounded-full bg-quantum-gradient border border-quantum-400/20 text-quantum-100">
            {{ quantumMetrics.accessLevel }} Access • {{ quantumMetrics.nodeStatus }}
          </span>
        </div>
      </div>
    </div>

    <!-- Companion Integration -->
   
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuantumNexusStore } from '../stores/quantum'

// Initialize stores
const quantumStore = useQuantumNexusStore()
const { nexusStats } = storeToRefs(quantumStore)
const { formatMetric } = quantumStore

// Computed values for quantum stats with null safety
const quantumMetrics = computed(() => {
  const stats = nexusStats.value || {}
  return {
    coherence: formatMetric(stats.coherence || 0),
    entanglement: formatMetric(stats.entanglement || 0),
    connections: stats.connections || 0,
    flux: formatMetric(stats.flux || 0),
    accessLevel: stats.accessLevel || 'Connecting...',
    nodeStatus: stats.nodeStatus || 'Initializing'
  }
})

const currentBranch = computed(() => nexusStats.value?.currentBranch || 'Initializing...')
const systemHealth = computed(() => {
  const status = nexusStats.value?.nodeStatus
  return {
    status: status || 'Initializing',
    color: status === 'Optimal' ? 'text-emerald-400' : 
           status === 'Enhanced' ? 'text-cyan-400' :
           status === 'Advanced' ? 'text-blue-400' :
           status === 'Normal' ? 'text-indigo-400' :
           'text-amber-400'
  }
})


const executeCommand = (command) => {
  console.log('Executing command:', command)
}

onMounted(async () => {
  // Initialize quantum reality connection
  console.log('Quantum reality initialized')
})
</script>

<style>
.text-glow {
  text-shadow: 0 0 10px rgba(147, 197, 253, 0.5);
}

.text-glow-subtle {
  text-shadow: 0 0 5px rgba(147, 197, 253, 0.3);
}

.text-glow-cyan {
  text-shadow: 0 0 8px rgba(34, 211, 238, 0.4);
}
</style>
