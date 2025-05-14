<template>
  <div class="container mx-auto px-4 py-8">
    <ConfirmationModal
        v-model="isModalOpen"
        title="Підтвердіть збереження маршруту"
        :route-data="rData"
        @success="handleSuccess"
        @error="handleError"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConfirmationModal from '~/components/ConfirmationModal.vue'
import type { RouteData } from '@/models/RouteModels'

const isModalOpen = ref(false)
const rData = ref<RouteData | null>(null)

function handleSuccess(data: Object) {
  console.log('Маршрут успішно збережено:', data)
}

function handleError(data: Object) {
  console.error('Помилка при збереженні маршруту:', data)
}
</script>
