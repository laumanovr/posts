import Vue from 'vue';
import VueRouter from 'vue-router';
import Post from '../components/Post.vue';
import Login from '../components/Login.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'posts',
        component: Post
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];

const router = new VueRouter({
    routes
});

export default router
