<template>
  <div>
    <Toolbar>
      <template #left>
        <img alt="logo" width="150" src="../assets/logo.png" />
        <img alt="Vue logo" height="40" src="../assets/vue-logo.png" />
      </template>

      <template #right>
        <Button
          icon="pi pi-shopping-cart"
          label="Cart"
          v-bind:badge="state.totalItems ? state.totalItems.toString() : '0'"
          badgeClass="p-badge-danger"
          @click="handleOpenCart"
        />
      </template>
    </Toolbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { CartBloc } from '@frontend-clean-architecture/core';
import { useBlocState } from '../common/use-bloc-state';

export default defineComponent({
  setup() {
    const cartBloc = inject<CartBloc>('cartBloc') as CartBloc;
    const state = useBlocState(cartBloc);

    const handleOpenCart = () => {
      cartBloc?.openCart();
    };

    return {
      state,
      handleOpenCart,
    };
  },
});
</script>

<style scoped>
.p-button .p-badge {
  margin-right: 0.5rem;
}
</style>
