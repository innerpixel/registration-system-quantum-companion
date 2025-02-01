<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <header class="bg-gray-800 shadow-lg">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <img src="@/assets/logo.svg" alt="Logo" class="h-8 w-8" />
          <span class="text-xl font-semibold">csmcl.space </span>
        </div>
        <NavMenu :items="menuItems" />
        <div v-if="authStore.isAuthenticated" class="relative">
          <div class="flex items-center space-x-3 cursor-pointer" @click="toggleDropdown">
            <img :src="authStore.userAvatar" alt="User avatar" class="h-8 w-8 rounded-full" />
            <span class="text-sm font-medium">{{ authStore.user?.username }}</span>
            <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2">
              <button @click="handleCommand('profile')" class="block w-full text-left px-4 py-2 hover:bg-gray-700">Profile</button>
              <button @click="handleCommand('settings')" class="block w-full text-left px-4 py-2 hover:bg-gray-700">Settings</button>
              <button @click="handleCommand('logout')" class="block w-full text-left px-4 py-2 hover:bg-gray-700">Logout</button>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>
    <div class="relative">
      <CosmicCompanion />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import NavMenu from '@/components/NavMenu.vue'
import CosmicCompanion from '@/components/CosmicCompanion.vue'

const router = useRouter()
const authStore = useAuthStore()
const showDropdown = ref(false)

const menuItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'System Users', path: '/users' },
  { label: 'Register', path: '/registration' }
]

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleCommand = (command) => {
  showDropdown.value = false
  
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'logout':
      authStore.logout()
      router.push('/login')
      break
  }
}
</script>
