
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home'
import Settings from '../views/settings/Settings'
import CodeGenerator from '../views/generator/CodeGenerator'

const routes = [
    {
        path: '/', component: Home, meta: {
            title: '代码编辑',
            requiresAuth: false
        }
    },
    {
        path: '/settings', component: Settings, meta: {
            title: '设置',
            requiresAuth: false
        }
    },
    {
        path: '/code-generator', component: CodeGenerator, meta: {
            title: '代码生成',
            requiresAuth: false
        }
    }
];

const router = createRouter({
    history: createWebHashHistory(), // 使用 hash 模式，适合 Electron 应用
    routes
})


// 路由守卫
router.beforeEach((to, from, next) => {
    // 设置页面标题
    if (to.meta.title) {
        document.title = `${to.meta.title}`
    }

    // 检查是否需要认证
    if (to.meta.requiresAuth) {
        const store = require('../store').default
        if (!store.state.user.isLoggedIn) {
            next('/')
            return
        }
    }

    next()
})

export default router;