
const systemConfig = {
  state: {
      percent:0,
      username:"",
      specilnumber:[],
      userinfo:{},
  },
  getters: {
      GetPercent(state){
        return state.percent;
      },
      GetSpecil(state){
        return state.specilnumber;
      },
      GetUserinfo(state){
        return state.userinfo;
      }
  },
  mutations: {
    SET_PROGRESS(state,p){
      state.percent=p;
    },
    SET_SPECIL(state,data){
      state.specilnumber=data;
    },
    SET_USERINFO(state,data){
      state.userinfo=data;
    }
  },
  actions: {
    Setprogress({commit},progress){
      commit('SET_PROGRESS',progress)
    },
    Setspecilnum({commit},data){
      commit('SET_SPECIL',data)
    },
    Setuserinfo({commit},data){
      let result=JSON.parse(data);
      commit('SET_USERINFO',result)
    }
  }
}

export default systemConfig
