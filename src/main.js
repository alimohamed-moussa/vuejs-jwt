import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }

    axios.interceptors.response.use(
      (response) => response, // retourne une réponse
      (error) => {
        if (error.response.status === 401) {
          // si erreur 401
          this.$store.dispatch('logout') // force a log out
        }
        return Promise.reject(error) // rejecte la Promise, avec le motif erreur
      }
    )
  },
  render: (h) => h(App)
}).$mount('#app')
