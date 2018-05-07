import App from "./App.vue";
import * as Browser from "../lib/browser.js";
import store from "./store";
import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

new Vue({
  store: new Vuex.Store(store(Browser)),
  render: h => h(App)
}).$mount("#app");
