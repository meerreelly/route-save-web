<template>
  <UModal
      v-model:open="isModalOpen"
      :title="title"
      :prevent-close="currentState === 'loading'"
  >
    <UButton label="Зберегти маршрут" color="neutral" variant="subtle" />

    <template #body>
      <div v-if="currentState === 'confirm'" class="sm:flex sm:items-start">
        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
          <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6 text-blue-600" />
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium ">
            Ви впевнені, що хочете зберегти цей маршрут?
          </h3>
          <div class="mt-2">
            <p class="text-sm ">
              Після цього ви зможете знайти його у списку своїх маршрутів!
            </p>
          </div>
        </div>
      </div>


      <div v-else-if="currentState === 'loading'" class="text-center py-4">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin h-12 w-12  mx-auto" />
        <p class="mt-4 text-lg ">Завантаження...</p>
      </div>


      <div v-else-if="currentState === 'success'" class="text-center py-4">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <UIcon name="i-heroicons-check" class="h-6 w-6 text-green-600" />
        </div>
        <h3 class="mt-4 text-lg font-medium ">Маршрут успішно збережено!</h3>
      </div>


      <div v-else-if="currentState === 'error'" class="text-center py-4">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <UIcon name="i-heroicons-x-mark" class="h-6 w-6 text-red-600" />
        </div>
        <h3 class="mt-4 text-lg font-medium ">Помилка!</h3>
        <p class="mt-1 text-sm ">
          Будь ласка, спробуйте пізніше.
        </p>
        <p v-if="errorMessage" class="mt-2 text-sm text-red-500">{{ errorMessage }}</p>
      </div>
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