import { useStore } from 'vuex';
import { computed } from 'vue';

export const useNameSpacedStore = (storeName) => {
  const store = useStore();

  return {
    state: (name) => {
      const names = Array.isArray(name) ? name : [name]
      const states = {}
      names.forEach((x)=> states[x] = store.states[`${storeName}/${x}`])
      return Array.isArray(name) ? states : states[name]
    },
    getters: (name) => {
      const names = Array.isArray(name) ? name : [name]
      const getters = {}
      names.forEach((x)=> computed(() => getters[x] = store.getters[`${storeName}/${x}`]))
      return Array.isArray(name) ? getters : getters[name]
    },
    dispatch: (name) => {
      const names = Array.isArray(name) ? name : [name]
      const dispatches = {}
      names.forEach((x)=> dispatches[x] = store.dispatch.bind(this, `${storeName}/${x}`))
      return Array.isArray(name) ? dispatches : dispatches[name]
    },
    // commit: (name, payload) => {
    //   const names = Array.isArray(name) ? name : [name]
    //   const commits = {}
    //   names.forEach((x)=> commits[x] = store.commit.bind(this, `${storeName}/${x}`))
    //   return Array.isArray(name) ? commits : commits[name]
    // },
    commit: (name, payload) => store.commit(`${storeName}/${name}`, payload),
  };
};
