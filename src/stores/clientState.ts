import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { getJSON, setJSON } from '@/helper/storage';

const LOCAL_STORGAE_KEY = 'client-state';
export const useClientStateStore = defineStore('clientState', () => {
  const state = ref({
    user: {
      name: '',
      id: ''
    },
    like: {
      articleIdList: [],
      commentIdList: []
    },
    dislike: {
      articleIdList: [],
      commentIdList: []
    }
  });

  const init = () => {
    try {
      const localState = getJSON(LOCAL_STORGAE_KEY);
      if (localState) {
        state.value = localState;
      }
      watch(
        state,
        (state) => setJSON(LOCAL_STORGAE_KEY, state),
        { deep: true }
      )
    } catch (error) {
      //
    }
  }

  return {
    state,
    init
  };
});
