<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useRegistrationStore, REGISTRATION_STATES } from '../stores/registration'

const registrationStore = useRegistrationStore()

const formData = ref({
  cosmicl_you_username: '',
  designation_fullname: '',
  verification_email: '',
  authentication_phrase: '',
  verification_phonenumber: ''
})

const isSubmitting = ref(false)
const verificationToken = ref('')

// Computed properties for UI state
const currentStep = computed(() => {
  switch (registrationStore.currentState) {
    case REGISTRATION_STATES.VERIFICATION_SENT:
      return 'verification'
    case REGISTRATION_STATES.VERIFIED:
      return 'success'
    default:
      return 'registration'
  }
})

const error = computed(() => registrationStore.error)
const validationErrors = computed(() => registrationStore.validationErrors)

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    
    // Create the system email from the username
    const systemEmail = `${formData.value.cosmicl_you_username}@local.domain`
    
    // Initialize registration process
    await registrationStore.initRegistration({
      username: formData.value.cosmicl_you_username,
      displayName: formData.value.designation_fullname,
      email: formData.value.verification_email,
      systemEmail,
      password: formData.value.authentication_phrase,
      phoneNumber: formData.value.verification_phonenumber
    })

    // If validation passes, create user
    if (registrationStore.currentState === REGISTRATION_STATES.USERNAME_VALIDATED) {
      await registrationStore.createUser()
    }

    // If user created, create system user
    if (registrationStore.currentState === REGISTRATION_STATES.USER_CREATED) {
      await registrationStore.createSystemUser()
    }

    // If system user created, configure mail
    if (registrationStore.currentState === REGISTRATION_STATES.SYSTEM_USER_CREATED) {
      await registrationStore.configureMail()
    }

    // If mail configured, send verification
    if (registrationStore.currentState === REGISTRATION_STATES.MAIL_CONFIGURED) {
      await registrationStore.sendVerification()
    }
    
  } catch (err) {
    // Error handling is managed by the store
    console.error('Registration error:', err)
  } finally {
    isSubmitting.value = false
  }
}

const handleVerification = async () => {
  try {
    isSubmitting.value = true
    await registrationStore.verifyEmail(verificationToken.value)
  } catch (err) {
    console.error('Verification error:', err)
  } finally {
    isSubmitting.value = false
  }
}

// Reset store when component unmounts
onUnmounted(() => {
  registrationStore.reset()
})
</script>

<template>
  <div class="max-w-md w-full mx-auto p-6">
    <!-- Registration Form -->
    <form v-if="currentStep === 'registration'" @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-1">
        <label class="block text-sm text-white/70">CSMCL Username</label>
        <input
          v-model="formData.cosmicl_you_username"
          type="text"
          placeholder="Enter your unique CSMCL username"
          required
          class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm 
                 placeholder:text-white/40 focus:outline-none focus:border-white/40
                 hover:bg-white/10 transition-colors"
        />
        <p class="text-xs text-white/50">This will be your unique identifier in the CSMCL system</p>
      </div>
      
      <div class="space-y-1">
        <label class="block text-sm text-white/70">Full Name Designation</label>
        <input
          v-model="formData.designation_fullname"
          type="text"
          placeholder="Enter your full legal name"
          required
          class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm 
                 placeholder:text-white/40 focus:outline-none focus:border-white/40
                 hover:bg-white/10 transition-colors"
        />
        <p class="text-xs text-white/50">Your official designation name for the system</p>
      </div>

      <div class="space-y-1">
        <label class="block text-sm text-white/70">Verification Email</label>
        <input
          v-model="formData.verification_email"
          type="email"
          placeholder="Enter your contact email"
          required
          class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm 
                 placeholder:text-white/40 focus:outline-none focus:border-white/40
                 hover:bg-white/10 transition-colors"
        />
        <p class="text-xs text-white/50">Used for account verification and important notifications</p>
      </div>

      <div class="space-y-1">
        <label class="block text-sm text-white/70">Authentication Phrase</label>
        <input
          v-model="formData.authentication_phrase"
          type="password"
          placeholder="Create your secure authentication phrase"
          required
          class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm 
                 placeholder:text-white/40 focus:outline-none focus:border-white/40
                 hover:bg-white/10 transition-colors"
        />
        <p class="text-xs text-white/50">Your secure passphrase for accessing the system</p>
      </div>

      <div class="space-y-1">
        <label class="block text-sm text-white/70">Contact Number</label>
        <input
          v-model="formData.verification_phonenumber"
          type="tel"
          placeholder="Enter your contact number"
          required
          class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-sm 
                 placeholder:text-white/40 focus:outline-none focus:border-white/40
                 hover:bg-white/10 transition-colors"
        />
        <p class="text-xs text-white/50">Secondary verification and emergency contact</p>
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
    <form v-else-if="currentStep === 'verification'" @submit.prevent="handleVerification" class="space-y-4">
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

      <div v-if="error" class="text-red-500">
        {{ error }}
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full px-4 py-3 bg-blue-600 text-white rounded-sm
               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isSubmitting ? 'Verifying...' : 'Verify Email' }}
      </button>
    </form>

    <!-- Success Message -->
    <div v-else class="text-center">
      <h2 class="text-2xl font-bold mb-4">Registration Complete!</h2>
      <p>Your account has been successfully created and verified.</p>
    </div>
  </div>
</template>
