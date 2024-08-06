<script setup lang="ts">
import { Fruit } from 'src/models/fruit';
import { ref } from 'vue';

const props = defineProps<Fruit>();
const name = ref(props.name);
const color = ref(props.color);
const size = ref(props.size);

const emit = defineEmits<{
  (e: 'save', fruitData: Fruit): void;
}>();
</script>

<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">
        {{
          props.id !== 'Nueva'
            ? 'Editar fruta' + ` (ID: ${props.id})`
            : 'Nueva fruta'
        }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input dense placeholder="Nombre" v-model="name" autofocus />
      <q-input dense placeholder="Color" v-model="color" />
      <q-input dense placeholder="Tamaño" v-model="size" />
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancelar" color="negative" v-close-popup />
      <q-btn
        label="Enviar"
        color="primary"
        v-close-popup
        @click="
          emit('save', {
            id,
            name,
            color,
            size,
          })
        "
      />
    </q-card-actions>
  </q-card>
</template>

<style scoped></style>
