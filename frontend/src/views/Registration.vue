<template>
  <div class="registration-container">
    <div class="registration-card">
      <h1>Register</h1>
      <form @submit.prevent="handleRegistration" class="registration-form">
        <div class="form-group">
          <label for="username">Username</label>
          <BaseInput
            id="username"
            v-model="form.username"
            type="text"
            placeholder="Choose a username"
            :disabled="loading"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <BaseInput
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Choose a password"
            :disabled="loading"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <BaseInput
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirm your password"
            :disabled="loading"
          />
        </div>
        <div class="error-message" v-if="error">
          {{ error }}
        </div>
        <BaseButton
          type="primary"
          :disabled="loading || !isFormValid"
          class="register-button"
        >
          {{ loading ? 'Registering...' : 'Register' }}
        </BaseButton>
      </form>
      <div class="registration-footer">
        <router-link to="/login">Already have an account? Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
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
      password: '',
      confirmPassword: ''
    })
    const loading = ref(false)
    const error = ref('')

    const isFormValid = computed(() => {
      return form.value.username &&
        form.value.password &&
        form.value.password === form.value.confirmPassword
    })

    const handleRegistration = async () => {
      if (loading.value || !isFormValid.value) return

      loading.value = true
      error.value = ''

      try {
        await axios.post('/api/auth/register', {
          username: form.value.username,
          password: form.value.password
        })
        router.push('/login')
      } catch (err) {
        error.value = err.response?.data?.message || 'Registration failed. Please try again.'
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      error,
      isFormValid,
      handleRegistration
    }
  }
}
</script>

<style scoped>
.registration-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  padding: 20px;
}

.registration-card {
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.registration-card h1 {
  margin: 0 0 24px 0;
  text-align: center;
  color: #2c3e50;
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  color: #606266;
}

.error-message {
  color: #f56c6c;
  font-size: 14px;
  text-align: center;
}

.register-button {
  width: 100%;
}

.registration-footer {
  margin-top: 24px;
  text-align: center;
}

.registration-footer a {
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
}

.registration-footer a:hover {
  text-decoration: underline;
}
</style>
