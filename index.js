import { useStore } from 'vuex';
import { computed } from 'vue';

export const namespaceifyStore = (store, storeName) => {
  return {
    state: (name) => {
      const names = Array.isArray(name) ? name : [name]
      const states = {}
      names.forEach((x)=> states[x] = store.states[`${storeName}/${x}`])
      return states
    },
    getters: (name) => {
      const names = Array.isArray(name) ? name : [name]
      const getters = {}
      names.forEach((x)=> getters[x] = computed(() => store.getters[`${storeName}/${x}`]))
      return getters
    },
    dispatch: (name) => {
      const names = Array.isArray(name) ? name : [name]
      const dispatches = {}
      names.forEach((x)=> dispatches[x] = store.dispatch.bind(this, `${storeName}/${x}`))
      return dispatches
    },
    commit: (name) => {
      const names = Array.isArray(name) ? name : [name]
      const commits = {}
      names.forEach((x)=> commits[x] = store.commit.bind(this, `${storeName}/${x}`))
      return commits
    },
    // commit: (name, payload) => store.commit(`${storeName}/${name}`, payload),
  };
};

export const useNamespacedStore = (storeName) => {
  const store = useStore();

  return namespaceifyStore(store, storeName)
};
