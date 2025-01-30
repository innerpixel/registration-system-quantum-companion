import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './authStore'

export const useQuantumNexusStore = defineStore('quantumNexus', () => {
  const authStore = useAuthStore()
  
  // Simulated quantum metrics with initial values
  const quantumCoherence = ref(95)
  const entanglementLevel = ref(92)
  const activeConnections = ref(800)
  const quantumFlux = ref(85)
  
  // Update metrics periodically
  setInterval(() => {
    quantumCoherence.value = generateCoherence()
    entanglementLevel.value = generateEntanglement()
    activeConnections.value = generateConnections()
    quantumFlux.value = generateFlux()
  }, 5000)

  // Computed statistics based on auth status and user group
  const nexusStats = computed(() => {
    // Ensure auth store is initialized
    if (!authStore) {
      return {
        coherence: 0,
        entanglement: 0,
        connections: 0,
        flux: 0,
        timestamp: new Date().toISOString(),
        currentBranch: 'Initializing...',
        accessLevel: 'Connecting...',
        nodeStatus: 'Initializing'
      }
    }

    const baseStats = {
      coherence: quantumCoherence.value,
      entanglement: entanglementLevel.value,
      connections: activeConnections.value,
      flux: quantumFlux.value,
      timestamp: new Date().toISOString(),
      currentBranch: 'Alpha-Γ',
      accessLevel: 'Standard',
      nodeStatus: 'Normal'
    }

    if (!authStore.isAuthenticated) {
      return {
        ...baseStats,
        coherence: baseStats.coherence * 0.4,
        entanglement: baseStats.entanglement * 0.3,
        connections: Math.floor(baseStats.connections * 0.2),
        flux: baseStats.flux * 0.5,
        accessLevel: 'Guest',
        nodeStatus: 'Limited',
        currentBranch: 'Quantum Void'
      }
    }

    // Mock different user groups with different stats
    const userGroup = authStore.user?.group || 'standard'
    switch(userGroup) {
      case 'admin':
        return {
          ...baseStats,
          accessLevel: 'Administrator',
          nodeStatus: 'Optimal',
          adminMetrics: {
            totalNodes: 1242,
            activeUsers: 3891,
            systemLoad: '32%',
            networkLatency: '12ms'
          }
        }
      case 'quantum-engineer':
        return {
          ...baseStats,
          coherence: baseStats.coherence * 1.2,
          accessLevel: 'Quantum Engineer',
          nodeStatus: 'Enhanced',
          engineerMetrics: {
            quantumErrors: 0.0012,
            decoherenceRate: '0.003%',
            entanglementQuality: '99.99%',
            quantumMemory: '98.7%'
          }
        }
      case 'researcher':
        return {
          ...baseStats,
          entanglement: baseStats.entanglement * 1.1,
          accessLevel: 'Researcher',
          nodeStatus: 'Advanced',
          researchMetrics: {
            experimentCount: 2891,
            dataQuality: '97.8%',
            anomalyRate: '0.021%',
            quantumStability: '99.1%'
          }
        }
      default:
        return {
          ...baseStats,
          accessLevel: 'Standard User',
          nodeStatus: 'Normal',
          userMetrics: {
            sessionQuality: '96.5%',
            quantumSync: '94.2%',
            localCoherence: '93.8%'
          }
        }
    }
  })

  // Generate mock data with some randomness
  function generateCoherence() {
    return 95 + (Math.random() * 5)
  }

  function generateEntanglement() {
    return 92 + (Math.random() * 8)
  }

  function generateConnections() {
    return Math.floor(800 + (Math.random() * 400))
  }

  function generateFlux() {
    return 85 + (Math.random() * 15)
  }

  // Format numbers for display
  function formatMetric(value, decimals = 1) {
    if (typeof value !== 'number') return '0'
    return value.toFixed(decimals)
  }

  return {
    nexusStats,
    formatMetric
  }
})
