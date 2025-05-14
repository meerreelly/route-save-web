<template>
  <UModal
      v-model:open="isModalOpen"
      :title="title"
      :prevent-close="currentState === 'loading'"
  >
    <UButton label="Зберегти маршрут" color="neutral" variant="subtle" />

    <template #body>
    </template>

    <template #footer>
        <UButton
            v-if="currentState === 'confirm'"
            color="error"
            variant="outline"
            size="xl"
            class="min-w-[100px] text-center justify-center"
            @click="close"
            label="Ні"
        />
        <UButton
            v-if="currentState === 'confirm'"
            size="xl"
            class="min-w-[100px] text-center justify-center"
            @click="submitData"
            label="Так"
        />
        <UButton
            v-if="currentState === 'success' || currentState === 'error'"
            color="info"
            variant="outline"
            size="xl"
            class="min-w-[100px] text-center justify-center"
            @click="close"
            label="Закрити"
        />
        <UButton
            v-if="currentState === 'error'"
            color="warning"
            variant="outline"
            size="xl"
            class="min-w-[100px] text-center justify-center"
            @click="submitData"
            label="Спробувати знову"
        />
    </template>
  </UModal>
</template>


<script setup lang="ts">
import type { RouteData } from '@/models/RouteModels'

interface Props {
  modelValue: boolean;
  title?: string;
  routeData: RouteData;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: 'Підтвердження'
});

const emit = defineEmits<{
  (e: 'success', data: object): void;
  (e: 'error', data: object): void;
}>();

const isModalOpen = ref(props.modelValue);
const currentState = ref('confirm');
const errorMessage = ref('');

const close = () => {
  if (currentState.value === 'loading') {
    return;
  }
  currentState.value = 'confirm';
  isModalOpen.value = false;
};

const submitData = async () => {
  try {
    currentState.value = 'loading';

    // Закоментований код реального API запиту
  /*
    const response = await fetch('https://umsystem-documents.azurewebsites.net/routes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.routeData)
    });

    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status}`);
    }

    const data = await response.json();


    //імітуємо затримку і завжди повертаємо успіх
    */
    console.log('Відправлені дані (заглушка):', props.routeData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const mockResponse = {
      success: true,
      message: 'Маршрут успішно збережено',
      id: 'mock-id-' + Date.now()
    };

    currentState.value = 'success';
    emit('success', mockResponse);
  } catch (error: any) {
    console.error('Помилка під час відправки даних:', error);
    errorMessage.value = error.message || 'Невідома помилка';
    currentState.value = 'error';
    emit('error', error);
  }
};

</script>