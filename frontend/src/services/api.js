import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // This will be proxied by Vite
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept'
  },
  withCredentials: true
})

// Add request interceptor for logging
api.interceptors.request.use(
  config => {
    console.log('Making request:', {
      url: `${config.baseURL}${config.url}`,
      method: config.method?.toUpperCase(),
      headers: config.headers,
      data: config.data
    })
    return config
  },
  error => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor
api.interceptors.response.use(
  response => {
    console.log('Response received:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    })
    return response
  },
  error => {
    console.error('Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      headers: error.response?.headers,
      data: error.response?.data,
      message: error.message
    })

    // If we have a response with validation errors
    if (error.response?.data?.errors) {
      return Promise.reject(error.response.data)
    }

    // If we have a response with a message
    if (error.response?.data?.message) {
      return Promise.reject({
        status: 'error',
        message: error.response.data.message
      })
    }

    // Default error
    return Promise.reject({
      status: 'error',
      message: error.message || 'An unexpected error occurred'
    })
  }
)

const authApi = axios.create({
  baseURL: '/api/auth',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})

// Add request interceptor
authApi.interceptors.request.use(
  config => {
    // Log full URL for debugging
    const fullUrl = `${config.baseURL}${config.url}`
    console.log('Making request:', {
      url: fullUrl,
      method: config.method?.toUpperCase(),
      headers: config.headers,
      data: config.data
    })
    return config
  },
  error => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor
authApi.interceptors.response.use(
  response => {
    console.log('Response received:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    })
    return response
  },
  error => {
    // Log detailed error information
    const errorDetails = {
      status: error.response?.status,
      statusText: error.response?.statusText,
      headers: error.response?.headers,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      requestData: error.config?.data ? JSON.parse(error.config.data) : null,
      responseBody: error.response?.data,
      stack: error.stack
    }
    console.error('Response Error Details:', JSON.stringify(errorDetails, null, 2))

    // Handle 502 Bad Gateway specifically
    if (error.response?.status === 502) {
      return Promise.reject({
        status: 'error',
        message: 'Unable to connect to the authentication service. Please try again later.'
      })
    }

    // If we have a response with validation errors
    if (error.response?.data?.errors) {
      return Promise.reject({ 
        status: 'error', 
        errors: error.response.data.errors 
      })
    }

    // If we have a response with a message
    if (error.response?.data?.message) {
      return Promise.reject({
        status: 'error',
        message: error.response.data.message
      })
    }

    // Default error
    return Promise.reject({
      status: 'error',
      message: error.message || 'An unexpected error occurred'
    })
  }
)

export const userService = {
  // Initial registration
  async register({ name, displayName, email, password, phoneNumber }) {
    try {
      console.log('Registering user:', {
        name,
        displayName,
        email,
        phoneNumber
      })
      // Step 1: Register user with auth service
      const authResponse = await authApi.post('/register', { 
        username: name,
        displayName,
        personalEmail: email,
        password,
        phoneNumber
      })

      if (authResponse.data.success) {
        // Step 2: Create system user and setup mail
        const systemResponse = await api.post('/users/system-setup', {
          username: name,
          displayName,
          email: authResponse.data.data.systemEmail,
          phoneNumber,
          token: authResponse.data.token
        })

        return {
          ...authResponse.data.data,
          systemSetup: systemResponse.data
        }
      } else {
        throw new Error(authResponse.data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw error.response?.data || error.message
    }
  },

  // Verify email
  async verifyEmail(token) {
    try {
      const verifyResponse = await authApi.post('/verify-email', { token }) 
      // Step 2: Complete system setup if verification successful
      if (verifyResponse.data.verified) {
        await api.post('/users/complete-setup', {
          token: verifyResponse.data.token
        })
      }

      return verifyResponse.data
    } catch (error) {
      console.error('Verification error:', error)
      throw error.response?.data || error.message
    }
  },

  // Get user system status
  async getSystemStatus(username) {
    try {
      const response = await api.get(`/users/${username}/system-status`)
      return {
        ...response.data,
        ready: response.data.systemUserCreated && 
               response.data.mailConfigured && 
               response.data.verified
      }
    } catch (error) {
      console.error('System status error:', error)
      throw error.response?.data || error.message
    }
  }
}

export const authService = {
  async register({ username, displayName, verificationEmail, password, phoneNumber }) {
    try {
      console.log('Registering user:', {
        username,
        displayName,
        personalEmail: verificationEmail,
        phoneNumber,
        emailAccount: `${username}@ld-csmlmail.test`
      })

      const response = await authApi.post('/register', {
        username,
        displayName,
        personalEmail: verificationEmail,
        password,
        phoneNumber,
        emailAccount: `${username}@ld-csmlmail.test`
      })

      return response.data
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  },

  async login({ username, password }) {
    try {
      const response = await authApi.post('/login', {
        username,
        password
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  async verifyEmail(token) {
    try {
      const response = await authApi.post('/verify-email', { token })
      return response.data
    } catch (error) {
      throw error
    }
  }
}
