import MainPage from "@/pages/MainPage"
import LoginPage from "@/pages/LoginPage"
import MapPage from "@/pages/MapPage"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/map',
        component: MapPage
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
}) 

export default router;
