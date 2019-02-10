import loading from "./Loading.vue";

const load = {
  install: function(Vue) {
    Vue.component(loading.name, loading)
  }
};

export default load;
