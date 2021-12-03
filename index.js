import { useStore } from "vuex";

const useNameSpacedStore = (storeName) => {
  const store = useStore();

  return {
    state: (name) => store.state[`${storeName}/${name}`],
    getters: (name) => store.getters[`${storeName}/${name}`],
    dispatch: (name, payload) => store.dispatch(`${storeName}/${name}`, payload),
    commit: (name, payload) => store.commit(`${storeName}/${name}`, payload),
  };
};

module.exports = {useNameSpacedStore}