<template>
  <div class="login-container">
    <div class="login-card">
      <h1>CSMCL Login</h1>
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="login-username">CSMCL Designation</label>
          <BaseInput
            id="login-username"
            v-model="form.username"
            type="text"
            :class="{ 'error': errors.username }"
            placeholder="Enter your CSMCL designation"
          />
          <small class="error-text" v-if="errors.username">{{ errors.username }}</small>
        </div>

        <div class="form-group">
          <label for="login-password">CSMCL Security Code</label>
          <BaseInput
            id="login-password"
            v-model="form.password"
            type="password"
            :class="{ 'error': errors.password }"
            placeholder="Enter your security code"
          />
          <small class="error-text" v-if="errors.password">{{ errors.password }}</small>
        </div>

        <div v-if="globalError" class="global-error">
          {{ globalError }}
        </div>

        <BaseButton
          type="primary"
          :disabled="isSubmitting || !isFormValid"
          :loading="isSubmitting"
          @click="handleSubmit"
        >
          {{ isSubmitting ? 'Logging in...' : 'Login' }}
        </BaseButton>
        <button type="submit" style="display: none"></button>
      </form>

      <div class="login-footer">
        <router-link to="/register">Need a CSMCL account? Register</router-link>
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
  name: 'Login',
  components: {
    BaseInput,
    BaseButton
  },
  setup() {
    const router = useRouter()
    const form = ref({
      username: '',
      password: ''
    })
    const errors = ref({})
    const globalError = ref('')
    const isSubmitting = ref(false)

    const validateForm = () => {
      const newErrors = {}
      
      if (!form.value.username) {
        newErrors.username = 'Username is required'
      }

      if (!form.value.password) {
        newErrors.password = 'Password is required'
      }

      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }

    const isFormValid = computed(() => {
      return form.value.username && form.value.password
    })

    const handleSubmit = async () => {
      if (!validateForm()) return

      isSubmitting.value = true
      globalError.value = ''
      errors.value = {}

      try {
        const response = await authService.login({
          username: form.value.username,
          password: form.value.password
        })

        if (response.success) {
          // Store the token
          localStorage.setItem('auth_token', response.token)
          
          // Redirect to dashboard or home
          router.push({ name: 'dashboard' })
        }
      } catch (error) {
        globalError.value = error.message || 'Login failed. Please check your credentials and try again.'
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 480px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: #333;
}

.error-text {
  color: #dc3545;
  font-size: 0.875rem;
}

.global-error {
  padding: 1rem;
  background-color: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 4px;
  color: #c53030;
  margin-bottom: 1rem;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
}

.login-footer a {
  color: #2563eb;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}
</style>
