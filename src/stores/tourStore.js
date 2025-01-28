import { defineStore } from 'pinia'
import { ref } from 'vue'
import { travellerTutorials } from '../config/tutorials'

export const useTourStore = defineStore('tour', () => {
  const currentTour = ref(null)
  const tutorials = ref({})
  const isLoaded = ref(false)

  const loadTutorials = async () => {
    if (!isLoaded.value) {
      tutorials.value = travellerTutorials
      isLoaded.value = true
    }
  }

  const startTour = (tourId) => {
    if (tutorials.value[tourId]) {
      currentTour.value = tutorials.value[tourId]
    }
  }

  const endTour = () => {
    currentTour.value = null
  }

  return {
    currentTour,
    tutorials,
    loadTutorials,
    startTour,
    endTour
  }
})
