import { createApp } from 'vue' // Vue 3
import ElementPlus from 'element-plus' // Element-Plus
import App from './App.vue' // 单页应用主入口
import router from './router' // 路由
import pinia from './store' // 存储
import 'element-plus/dist/index.css' // 样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 图标

const app = createApp(App)

// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')