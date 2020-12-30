export const strict = false;

export const state = () => ({
  count: 0
});
export const getters = {
  count2x: state => {
    return 2 * state.count;
  }
};

export const mutations = {
  increment(state, n) {
    state.count += n;
  }
};

export const actions = {
  increment({ commit }, n) {
    commit("increment", n)
  }
}