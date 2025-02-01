import { defineStore } from 'pinia'

export const useQuantumNexusStore = defineStore('quantum', {
  state: () => ({
    nexusStats: {
      coherence: 95,
      entanglement: 87,
      connections: 42,
      flux: 78,
      accessLevel: 'Standard',
      nodeStatus: 'Optimal',
      currentBranch: 'Main'
    }
  }),

  actions: {
    formatMetric(value) {
      return Math.round(value)
    }
  }
})
