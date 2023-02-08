import { Bloc } from '@frontend-clean-architecture/core';

import { DeepReadonly, onMounted, onUnmounted, readonly, Ref, ref } from 'vue';

export function useBlocState<S>(bloc: Bloc<S>): DeepReadonly<Ref<S>> {
  const state = ref(bloc.state) as Ref<S>;

  const stateSubscription = (newState: S) => {
    state.value = newState;
  };

  onMounted(() => {
    bloc.subscribe(stateSubscription);
  });

  onUnmounted(() => {
    bloc.unsubscribe(stateSubscription);
  });

  return readonly(state);
}
