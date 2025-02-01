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

export const authService = {
  // Register a new user
  async register({ cosmicl_you_username, designation_fullname, verification_email, authentication_phrase, verification_phonenumber }) {
    try {
      const response = await authApi.post('/register', {
        username: cosmicl_you_username,
        fullName: designation_fullname,
        email: verification_email,
        password: authentication_phrase,
        phoneNumber: verification_phonenumber
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Login user
  async login({ username, password }) {
    try {
      const response = await authApi.post('/login', { username, password })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Verify email
  async verifyEmail(token) {
    try {
      const response = await authApi.post('/verify-email', { token })
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const userService = {
  // Initial registration
  async register({ cosmicl_you_username, designation_fullname, verification_email, authentication_phrase, verification_phonenumber }) {
    try {
      const response = await api.post('/users/register', {
        username: cosmicl_you_username,
        fullName: designation_fullname,
        email: verification_email,
        password: authentication_phrase,
        phoneNumber: verification_phonenumber
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Create system user
  async createSystemUser(userData) {
    try {
      const response = await api.post('/users/system', {
        username: userData.cosmicl_you_username,
        fullName: userData.designation_fullname,
        email: userData.verification_email,
        systemEmail: `${userData.cosmicl_you_username}@ld-csmlmail.test`
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Configure user mail
  async configureUserMail(userData) {
    try {
      const response = await api.post('/users/mail-config', {
        username: userData.cosmicl_you_username,
        email: userData.verification_email,
        systemEmail: `${userData.cosmicl_you_username}@ld-csmlmail.test`
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Send verification email
  async sendVerificationEmail(userData) {
    try {
      const response = await api.post('/users/send-verification', {
        username: userData.cosmicl_you_username,
        email: userData.verification_email
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Verify email
  async verifyEmail(token) {
    try {
      const response = await api.post('/users/verify-email', { token })
      return response.data
    } catch (error) {
      throw error
    }
  }
}
