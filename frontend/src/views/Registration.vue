<template>
  <div class="registration-container">
    <h1>Email Account Registration</h1>
    
    <div class="registration-info">
      <p>Welcome! This registration will:</p>
      <ol>
        <li>Create your email account (<em>username@ld-csmlmail.test</em>)</li>
        <li>Send a verification link to your external email</li>
        <li>After verification, set up your environment including:</li>
        <ul>
          <li>Email configuration</li>
          <li>Personal maildir folders</li>
          <li>Public home folder</li>
        </ul>
      </ol>
    </div>

    <div class="registration-card">
      <form @submit.prevent="handleSubmit" class="registration-form">
        <div class="form-group">
          <label for="reg-username">Username</label>
          <BaseInput
            id="reg-username"
            v-model="form.username"
            type="text"
            :class="{ 'error': errors.username }"
            placeholder="e.g., csml_regular_0001"
          />
          <small class="input-help">
            Choose a unique username for your account. This will create:
            <ul>
              <li>Your Linux user account</li>
              <li>Your email address: username@ld-csmlmail.test</li>
            </ul>
          </small>
          <small class="error-text" v-if="errors.username">{{ errors.username }}</small>
        </div>

        <div class="form-group">
          <label for="reg-displayName">Display Name</label>
          <BaseInput
            id="reg-displayName"
            v-model="form.displayName"
            type="text"
            :class="{ 'error': errors.displayName }"
            placeholder="Your full name"
          />
          <small class="input-help">Your name as it will appear in emails</small>
          <small class="error-text" v-if="errors.displayName">{{ errors.displayName }}</small>
        </div>

        <div class="form-group">
          <label for="reg-verificationEmail">External Email for Verification</label>
          <BaseInput
            id="reg-verificationEmail"
            v-model="form.verificationEmail"
            type="email"
            :class="{ 'error': errors.verificationEmail }"
            placeholder="your.email@example.com"
          />
          <small class="input-help">Your external email address where we'll send the verification link</small>
          <small class="error-text" v-if="errors.verificationEmail">{{ errors.verificationEmail }}</small>
        </div>

        <div class="form-group">
          <label for="reg-password">Account Password</label>
          <BaseInput
            id="reg-password"
            v-model="form.password"
            type="password"
            :class="{ 'error': errors.password }"
            placeholder="Enter your password"
          />
          <small class="input-help">Password for your email account (min 8 characters)</small>
          <small class="error-text" v-if="errors.password">{{ errors.password }}</small>
        </div>

        <div class="form-group">
          <label for="reg-confirmPassword">Confirm Password</label>
          <BaseInput
            id="reg-confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            :class="{ 'error': errors.confirmPassword }"
            placeholder="Confirm your password"
          />
          <small class="error-text" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</small>
        </div>

        <div class="form-group">
          <label for="reg-phoneNumber">Phone Number</label>
          <BaseInput
            id="reg-phoneNumber"
            v-model="form.phoneNumber"
            type="tel"
            :class="{ 'error': errors.phoneNumber }"
            placeholder="+1234567890"
          />
          <small class="input-help">Your phone number in international format</small>
          <small class="error-text" v-if="errors.phoneNumber">{{ errors.phoneNumber }}</small>
        </div>

        <div v-if="globalError" class="global-error">
          {{ globalError }}
        </div>

        <div class="form-actions">
          <BaseButton
            type="primary"
            :disabled="isSubmitting || !isFormValid"
            :loading="isSubmitting"
          >
            Register Email Account
          </BaseButton>
        </div>
      </form>

      <div class="registration-footer">
        <router-link to="/login">Already have an email account? Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/api'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

export default {
  name: 'Registration',
  components: {
    BaseInput,
    BaseButton
  },
  setup() {
    const router = useRouter()
    const form = ref({
      username: '',
      displayName: '',
      verificationEmail: '',
      password: '',
      confirmPassword: '',
      phoneNumber: ''
    })
    const errors = ref({})
    const globalError = ref('')
    const isSubmitting = ref(false)

    const validateForm = () => {
      const newErrors = {}
      
      // Username validation
      if (!form.value.username) {
        newErrors.username = 'Username is required'
      } else if (!/^[a-z][a-z0-9_-]*$/.test(form.value.username)) {
        newErrors.username = 'Username must contain only lowercase letters, numbers, _ or -'
      }

      // Display name validation
      if (!form.value.displayName) {
        newErrors.displayName = 'Display name is required'
      } else if (form.value.displayName.length < 3) {
        newErrors.displayName = 'Display name must be at least 3 characters'
      }

      // External email validation
      if (!form.value.verificationEmail) {
        newErrors.verificationEmail = 'External email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.verificationEmail)) {
        newErrors.verificationEmail = 'Please enter a valid email address'
      }

      // Password validation
      if (!form.value.password) {
        newErrors.password = 'Password is required'
      } else if (form.value.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      }

      // Confirm password
      if (form.value.password !== form.value.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }

      // Phone number validation
      if (!form.value.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required'
      } else if (!/^\+[0-9]{8,15}$/.test(form.value.phoneNumber)) {
        newErrors.phoneNumber = 'Please enter a valid phone number in international format (e.g., +1234567890)'
      }

      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }

    const isFormValid = computed(() => {
      return form.value.username &&
        form.value.displayName &&
        form.value.verificationEmail &&
        form.value.password &&
        form.value.confirmPassword &&
        form.value.phoneNumber &&
        form.value.password === form.value.confirmPassword
    })

    const handleSubmit = async () => {
      if (!validateForm()) return

      isSubmitting.value = true
      globalError.value = ''
      errors.value = {}

      try {
        const response = await authService.register({
          username: form.value.username,
          displayName: form.value.displayName || form.value.username,
          verificationEmail: form.value.verificationEmail,
          password: form.value.password,
          phoneNumber: form.value.phoneNumber
        })

        if (response.success) {
          router.push({
            name: 'verify-email',
            query: { email: form.value.verificationEmail }
          })
        } else {
          if (response.errors && Array.isArray(response.errors)) {
            response.errors.forEach(err => {
              errors.value[err.field] = err.message
            })
          } else {
            globalError.value = response.message || 'Registration failed. Please try again.'
          }
        }
      } catch (error) {
        console.error('Registration error:', error)
        if (error.errors && Array.isArray(error.errors)) {
          error.errors.forEach(err => {
            errors.value[err.field] = err.message
          })
        } else if (error.status === 'error' && error.errors) {
          error.errors.forEach(err => {
            errors.value[err.field] = err.message
          })
        } else {
          globalError.value = error.message || 'Registration failed. Please try again.'
        }
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      form,
      errors,
      globalError,
      isSubmitting,
      isFormValid,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.registration-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.registration-info {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.registration-info ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.registration-info ul {
  margin: 0.5rem 0;
  padding-left: 2rem;
  color: #666;
}

.registration-info em {
  color: #2c5282;
  font-style: normal;
  font-weight: 500;
}

.registration-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group .input-help {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #666;
}

.form-group .error-text {
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-actions {
  margin-top: 2rem;
  text-align: center;
}

.global-error {
  background: #fff5f5;
  color: #c53030;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

.registration-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
}

.registration-footer a {
  color: #2c5282;
  text-decoration: none;
}

.registration-footer a:hover {
  text-decoration: underline;
}
</style>
