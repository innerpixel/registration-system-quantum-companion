<template>
  <TravellerCompanion 
    class="absolute bottom-4 right-4 z-50 max-w-[90vw] max-h-[90vh] overflow-auto"
    :initial-message="'Navigation systems online! Ready to guide you through csmcl.space. What\'s your destination, traveler?'"
  />
</template>

<script setup>
// The component is globally registered by the plugin, no need to import
</script>

<style>
.traveller-companion-container {
  max-height: calc(100vh - 2rem);
  max-width: min(400px, calc(100vw - 2rem));
}
</style>
