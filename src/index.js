import TravellerCompanion from './components/TravellerCompanion.vue'
import { useTourStore } from './stores/tourStore'
import { travellerTutorials } from './config/tutorials'

export { TravellerCompanion, useTourStore, travellerTutorials }

// Auto-install if Vue is found
const plugin = {
  install(app) {
    app.component('TravellerCompanion', TravellerCompanion)
  }
}

export default plugin
