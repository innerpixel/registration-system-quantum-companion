import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = computed(() => !!token.value)

  // Actions
  const setUser = (newUser) => {
    user.value = {
      ...newUser,
      currentBranch: newUser.currentBranch || 'Main Reality Branch'
    }
  }

  const setToken = (newToken) => {
    token.value = newToken
  }

  const logout = () => {
    user.value = null
    token.value = null
  }

  const redirectToLogin = async () => {
    // You can customize this to match your auth flow
    window.location.href = '/login'
  }

  return {
    // State
    user,
    token,
    isAuthenticated,
    
    // Actions
    setUser,
    setToken,
    logout,
    redirectToLogin
  }
})
