import './style.css'
import TravellerCompanion from './components/TravellerCompanion.vue'
import { useTourStore } from './stores/tourStore'
import { travellerTutorials } from './config/tutorials'

// Create the Vue plugin
const createTravellerPlugin = () => ({
  install(app) {
    app.component('TravellerCompanion', TravellerCompanion)
  }
})

export {
  TravellerCompanion,
  useTourStore,
  travellerTutorials,
  createTravellerPlugin
}
