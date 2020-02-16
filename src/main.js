import Vue from 'vue';
import App from './App.vue';
import './assets/style/main.scss';
import router from './router';
import VueMaterial from 'vue-material';
import Toaster from 'v-toaster';
import JwPagination from 'jw-vue-pagination';


Vue.use(VueMaterial);
Vue.use(Toaster);
Vue.component('jw-pagination', JwPagination);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
