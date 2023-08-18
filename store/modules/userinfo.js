export const state = {
  user:{
	  
  }
};
export const mutations = {
  getUser(state, data) {
    state.user = data
		
		console.log(11,data)
		uni.navigateBack({ delta: 1 });
  },
};
export const actions = {
  
};
