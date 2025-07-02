<script setup>
import { md5 } from 'js-md5';
import { useQuasar } from 'quasar';
import useUI from 'src/composables/storeWrappers/useUI';
import useUserInfo from 'src/composables/useUserInfo';
import useUserInfoMutation from 'src/composables/useUserInfoMutation';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();

const { queryUsers } = useUserInfo();
const { mutateUserInfoSignIn } = useUserInfoMutation();
const { userId, setUserId } = useUI();

const newUser = ref('');
const password = ref('');

const onReset = () => {
  newUser.value = '';
  password.value = '';
};

const onSubmit = () => {
  console.log('On submit');

  if (userId.value === newUser.value) {
    $q.notify({
      type: 'info',
      message: 'El usuario introducido coincide con el actual',
    });
    return;
  }
  const userExists =
    queryUsers.data.value.findIndex((user) => user.id === newUser.value) >= 0;
  console.log({ userExists });
  if (!userExists) {
    $q.dialog({
      html: true,
      title: '<span class="text-primary">Nuevo usuario</span>',
      message: `El usuario <span class="text-primary">${newUser.value}</span> no existe.<br><br><strong>¿Quieres crearlo?</strong>`,
      cancel: { label: 'No', flat: true },
      ok: { icon: 'how_to_reg', label: 'Sí', flat: true },
      persistent: true,
    })
      .onOk(() => {
        $q.notify({
          type: 'positive',
          message: `Se ha creado el usuario ${newUser.value}`,
        });
        setUserId(newUser.value);
        mutateUserInfoSignIn.mutate(md5(password.value));
        router.push({ name: 'index' });
      })
      .onOk(() => {
        // console.log('>>>> second OK catcher')
      })
      .onCancel(() => {
        return;
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  } else {
    const userData = queryUsers.data.value.find(
      (user) => user.id === newUser.value
    );
    if (!userData) {
      return;
    }
    if (userData.password !== md5(password.value)) {
      $q.notify({
        type: 'negative',
        message: `Se ha denegado el cambio al usuario ${newUser.value}`,
      });
      return;
    }
    $q.notify({
      type: 'positive',
      message: `Se ha cambiado el usuario a ${newUser.value}`,
    });
    setUserId(newUser.value);
    router.push({ name: 'index' });
  }
};
</script>

<template>
  <!-- <div>USER PAGE</div>
  <div v-if="queryUsers.isFetched">
    {{ queryUsers.data.value }}
  </div> -->
  <div class="user-body">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mb-md">
      <div class="user-body-title">Cambio de usuario</div>
      <div class="user-body-subtitle">
        Introduce el usuario al que quieres cambiar.<br /><br />
        Si se trata de un usuario existente, asegúrate de que introduces la
        contraseña correcta.<br />
        Para un nuevo usuario, recuerda la contraseña para futuros accesos.
      </div>
      <q-input
        filled
        hide-bottom-space
        v-model="newUser"
        label="Id. Usuario"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Campo obligatorio',
          (val) =>
            (val && val.length <= 20) ||
            'La longitud máxima para el usuario son 20 caracteres.',
        ]"
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
    min-width: 380px;
    max-width: 600px;

    @include response('mobile') {
      min-width: 355px;
      max-width: 390px;
      margin: 10px;
      margin-top: 40px;
    }

    &-title {
      font-size: 24px;
      border-left: 6px solid $primary;
      padding-left: 10px;
      margin-bottom: 16px;
    }

    &-subtitle {
      font-size: 14px;
      // border-left: 6px solid $primary;
      padding-left: 18px;
      margin-bottom: 28px;
    }
  }
}
</style>
