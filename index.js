import { useStore } from 'vuex';

export const useNameSpacedStore = (storeName) => {
  const store = useStore();

  return {
    state: (name) => store.state[`${storeName}/${name}`],
    getters: (name) => {
      const names = Array.isArray(name) ? name : [name]
      const getters = {}
      names.forEach((x)=> getters[x] = store.getters[`${storeName}/${x}`])
      return Array.isArray(name) ? getters : getters[name]
    },
    dispatch: (name, payload) => store.dispatch(`${storeName}/${name}`, payload),
    commit: (name, payload) => store.commit(`${storeName}/${name}`, payload),
  };
};
