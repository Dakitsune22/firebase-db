<script setup lang="ts">
import useFruits from 'src/composables/useFruits';
import useFruitMutation from 'src/composables/useFruitMutation';

defineOptions({
  name: 'FruitsPage',
});

const { fruitsQuery } = useFruits();
const { fruitMutationAdd, fruitMutationUpdate, fruitMutationDelete } =
  useFruitMutation();
</script>

<template>
  <div class="q-ma-lg">
    <div v-if="fruitsQuery.isLoading.value">Loading...</div>
    <div v-if="fruitsQuery.isFetched">
      Frutas encontradas: <span>{{ fruitsQuery.data.value?.length }}</span>
      <q-btn
        round
        size="lg"
        color="primary"
        label="+"
        class="add-fruit"
        @click="fruitMutationAdd.mutate"
      />
      <ul v-for="fruit in fruitsQuery.data.value" :key="fruit.name">
        <li>
          Nombre: <span>{{ fruit.name }}</span>
        </li>
        <li>
          Color: <span>{{ fruit.color }}</span>
        </li>
        <li>
          Tamaño: <span>{{ fruit.size }}</span>
        </li>
        <div class="q-mt-xs">
          <q-btn
            dense
            color="primary"
            label="Nombre"
            class="q-ml-xs"
            @click="
              fruitMutationUpdate.mutate({
                id: fruit.id,
                name: 'X.x',
                color: fruit.color,
                size: fruit.size,
              })
            "
          />
          <q-btn dense color="primary" label="Color" class="q-ml-xs" />
          <q-btn dense color="primary" label="Tamaño" class="q-ml-xs" />
          <q-btn
            dense
            color="negative"
            icon="delete"
            class="q-ml-xs"
            @click="fruitMutationDelete.mutate(fruit.id)"
          />
        </div>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
span {
  color: blueviolet;
}
.add-fruit {
  position: fixed;
  right: 25px;
}
</style>
