<template lang="pug">
  div.app
    TariffForm
</template>

<script setup lang="ts">
import TariffForm from './components/TariffForm.vue'
import { useTariffStore } from './stores/tariff'

const store = useTariffStore()

store.fetchRates()
</script>

<style scoped>
.app {
    @apply min-h-screen bg-gray-100 flex items-center justify-center;
}
</style>
