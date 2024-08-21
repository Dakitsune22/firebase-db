<script setup lang="ts">
import { ref } from 'vue';
import useFruits from 'src/composables/useFruits';
import useFruitMutation from 'src/composables/useFruitMutation';
import FruitDialog from 'src/components/FruitDialog.vue';
import { Fruit } from 'src/models/fruit';

defineOptions({
  name: 'FruitsPage',
});

const { fruitsQuery } = useFruits();
const { fruitMutationAdd, fruitMutationUpdate, fruitMutationDelete } =
  useFruitMutation();

const showFruitDialog = ref<boolean>(false);
const fruitSelected = ref<Fruit>();

const onFruitSelected = (fruit?: Fruit): void => {
  showFruitDialog.value = true;
  fruitSelected.value = fruit;
};
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
        @click="onFruitSelected()"
      />
      <ul v-for="fruit in fruitsQuery.data.value" :key="fruit.id">
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
            icon="edit"
            class="q-ml-xs"
            @click="onFruitSelected(fruit)"
          />
          <q-btn
            dense
            color="negative"
            icon="delete"
            class="q-ml-xs"
            @click="fruitMutationDelete.mutate(fruit.id)"
          />
        </div>
      </ul>
      <q-dialog v-model="showFruitDialog" persistent>
        <fruit-dialog
          :id="fruitSelected?.id ? fruitSelected.id : 'Nueva'"
          :name="fruitSelected?.name"
          :color="fruitSelected?.color"
          :size="fruitSelected?.size"
          @save="
            (f) => {
              if (fruitSelected?.id) {
                console.log(f);
                fruitMutationUpdate.mutate(f);
              } else {
                fruitMutationAdd.mutate(f);
              }
            }
          "
        />
      </q-dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>
span {
  color: blueviolet;
}

ul {
  // border: 1px solid red;
  color: rgb(243, 23, 195);
  // transition: color 2s;
  transition: all 2s;
  // margin-left: 10px;

  @starting-style {
    color: orange;
    margin-left: 300px;
  }

  // :hover {
  //   color: orange;
  //   transition: color 2s;
  //   // transform: translateX(10);
  //   // margin-left: 10px;
  //   // border: 2px solid blue;
  //   // text-decoration: underline;
  //   // font-weight: bold;
  // }
}
.add-fruit {
  position: fixed;
  right: 25px;
}
</style>
