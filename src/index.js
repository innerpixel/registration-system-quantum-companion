import TravellerCompanion from './components/TravellerCompanion.vue'
import { useTourStore } from './stores/tourStore'
import { useAuthStore } from './stores/authStore'
import { useQuantumNexusStore } from './stores/quantumNexusStore'
import { travellerTutorials } from './config/tutorials'
import './style.css'

// Create the Vue plugin
const createTravellerPlugin = {
  install(app) {
    app.component('TravellerCompanion', TravellerCompanion)
  }
}

export {
  TravellerCompanion,
  useTourStore,
  useAuthStore,
  useQuantumNexusStore,
  travellerTutorials,
  createTravellerPlugin
}
