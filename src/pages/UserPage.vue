<script setup>
import { md5 } from 'js-md5';
import useUserInfo from 'src/composables/useUserInfo';
import { ref } from 'vue';

const { queryUsers } = useUserInfo();

const newUser = ref('');
const password = ref('');

const onReset = () => {
  newUser.value = '';
  password.value = '';
};

const onSubmit = () => {
  console.log('On submit');

  const userExists =
    queryUsers.data.value.findIndex((user) => user.id === newUser.value) >= 0;
  console.log({ userExists });

  const encryptedPwd = md5(password.value);
  console.log(encryptedPwd);

  // ToDo: CONTINUAR POR AQUI
};
</script>

<template>
  <div>USER PAGE</div>
  <div v-if="queryUsers.isFetched">
    {{ queryUsers.data.value }}
  </div>

  <div class="user-body">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mb-md">
      <div class="user-body-title">Cambio de usuario</div>
      <q-input
        filled
        hide-bottom-space
        v-model="newUser"
        label="Id. Usuario"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
      />
      <q-input
        filled
        hide-bottom-space
        v-model="password"
        label="Contraseña"
        type="password"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 5) ||
            'La contraseña debe tener como mínimo 6 caracteres',
        ]"
      />
      <div class="btn-container">
        <q-btn type="reset" color="primary" icon="clear_all" size="18px" flat />
        <q-btn
          type="submit"
          color="primary"
          icon="save"
          size="18px"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<style lang="scss" scoped>
.user {
  &-body {
    margin: 20px;
    margin-top: 40px;
    min-width: 600px;
    max-width: 900px;

    &-title {
      font-size: 20px;
      border-left: 6px solid $primary;
      padding-left: 10px;
      margin-bottom: 16px;
    }
  }
}
</style>
