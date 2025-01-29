<script setup>
import { ref } from 'vue'
import { userService } from '../services/api'

const formData = ref({
  name: '',
  displayName: '',
  email: '',
  password: '',
  simNumber: ''
})

const isSubmitting = ref(false)
const currentStep = ref('registration') // registration, verification, success
const error = ref(null)
const verificationToken = ref('')

const handleSubmit = async () => {
  try {
    error.value = null
    isSubmitting.value = true

    // In development, we'll use mock verification
    const isDevelopment = import.meta.env.DEV
    
    // Register the user
    await userService.register(formData.value)

    if (isDevelopment) {
      // Mock verification in development
      await userService.mockVerification({
        email: formData.value.email,
        simNumber: formData.value.simNumber
      })
      currentStep.value = 'success'
    } else {
      // In production, we'll wait for email verification
      currentStep.value = 'verification'
    }
  } catch (err) {
    error.value = err.message || 'Registration failed. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const handleVerification = async () => {
  try {
    error.value = null
    isSubmitting.value = true
    await userService.verifyEmail(verificationToken.value)
    currentStep.value = 'success'
  } catch (err) {
    error.value = err.message || 'Verification failed. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-md w-full mx-auto p-6">
    <!-- Registration Form -->
    <form v-if="currentStep === 'registration'" @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <input
          v-model="formData.name"
          type="text"
          placeholder="Name"
          required
          class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm 
                 placeholder:text-white/40 focus:outline-none focus:border-white/40
                 hover:bg-white/10 transition-colors"
        />
      </div>
      
      <div>
        <input
          v-model="formData.displayName"
          type="text"
          placeholder="Display Name"
          required
          class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm 
                 placeholder:text-white/40 focus:outline-none focus:border-white/40
                 hover:bg-white/10 transition-colors"
        />
      </div>

      <div>
        <input
          v-model="formData.email"
          type="email"
          placeholder="Email"
          required
          class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm 
                 placeholder:text-white/40 focus:outline-none focus:border-white/40
                 hover:bg-white/10 transition-colors"
        />
      </div>

      <div>
        <input
          v-model="formData.password"
          type="password"
          placeholder="Password"
          required
          class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm 
                 placeholder:text-white/40 focus:outline-none focus:border-white/40
                 hover:bg-white/10 transition-colors"
        />
      </div>

      <div>
        <input
          v-model="formData.simNumber"
          type="text"
          placeholder="SIM Number"
          required
          class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm 
                 placeholder:text-white/40 focus:outline-none focus:border-white/40
                 hover:bg-white/10 transition-colors"
        />
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full btn"
      >
        {{ isSubmitting ? 'Creating Account...' : 'Create Account' }}
      </button>

      <p v-if="error" class="text-red-400 text-sm mt-2">{{ error }}</p>
    </form>

    <!-- Verification Form -->
    <form v-if="currentStep === 'verification'" @submit.prevent="handleVerification" class="space-y-4">
      <p class="text-white/70 text-center mb-4">
        Please check your email for the verification code.
      </p>
      
      <div>
        <input
          v-model="verificationToken"
          type="text"
          placeholder="Enter verification code"
          required
          class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm 
                 placeholder:text-white/40 focus:outline-none focus:border-white/40
                 hover:bg-white/10 transition-colors"
        />
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full btn"
      >
        {{ isSubmitting ? 'Verifying...' : 'Verify Email' }}
      </button>

      <p v-if="error" class="text-red-400 text-sm mt-2">{{ error }}</p>
    </form>

    <!-- Success Message -->
    <div v-if="currentStep === 'success'" class="text-center">
      <h3 class="text-2xl font-bold mb-4">Welcome Aboard! 🚀</h3>
      <p class="text-white/70">
        Your account has been successfully created and verified.
      </p>
    </div>
  </div>
</template>
