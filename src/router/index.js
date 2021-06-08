//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path        : '/login',
        name        : 'login',
        component   : () => import('@/views/auth/Login.vue')
    },
    {
        path        : '/register',
        name        : 'register',
        component   : () => import('@/views/auth/Register.vue')
    },
    {
        path        : '/dashboard',
        name        : 'dashboard',
        component   : () => import('@/views/dashboard/Index.vue')
    },
    { 
        path        : '/forgot-password', 
        name        : 'forgot-password', 
        component   : () => import('@/views/auth/ForgotPassword.vue'),
        meta        : { 
                        auth:false 
                    } 
    },
    { 
        path        : '/v-reset-password', 
        name        : 'v-reset-password', 
        component   : () => import('@/views/auth/FormResetPassword.vue'),
        meta        : { 
                        auth:false 
                    } 
    },
    { 
        path        : '/company', 
        name        : 'company', 
        component   : () => import('@/views/Company.vue'),
        meta        : { 
                        auth:false 
                    } 
    }
    
]

//create router
const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router