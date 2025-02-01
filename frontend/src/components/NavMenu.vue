<template>
  <nav class="flex items-center space-x-6">
    <router-link
      v-for="item in items"
      :key="item.path"
      :to="item.path"
      class="text-sm font-medium text-gray-300 hover:text-white transition-colors"
      :class="{ 'text-white': isActive(item.path) }"
    >
      {{ item.label }}
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const isActive = (path) => {
  return route.path === path
}
</script>
