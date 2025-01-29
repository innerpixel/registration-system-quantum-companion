import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const userService = {
  // Initial registration
  async register({ name, displayName, email, password, simNumber }) {
    try {
      // Step 1: Register user with auth service
      const authResponse = await authApi.post('/api/auth/register', {
        username: name, // Map name to username
        email,
        password
      })

      // Step 2: Create system user and setup mail
      const systemResponse = await api.post('/users/system-setup', {
        username: name,
        email,
        token: authResponse.data.token
      })

      return {
        ...authResponse.data,
        systemSetup: systemResponse.data
      }
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Verify email
  async verifyEmail(token) {
    try {
      const response = await authApi.post('/api/auth/verify-email', { token })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Get user system status
  async getSystemStatus(username) {
    try {
      const response = await api.get(`/users/${username}/system-status`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
}
