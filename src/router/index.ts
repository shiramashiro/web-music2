import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index.vue')
    },
    {
        path: '/player',
        name: 'Player',
        component: () => import('../views/Player.vue')
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})
