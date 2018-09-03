
const systemConfig = {
  state: {
      percent:0,
  },
  getters: {
      GetPercent(state){
        return state.percent;
      }
  },
  mutations: {
    SET_PROGRESS(state,p){
      state.percent=p;
    }
  },
  actions: {
    Setprogress({commit},progress){
      commit('SET_PROGRESS',progress)
    }
  }
}

export default systemConfig
