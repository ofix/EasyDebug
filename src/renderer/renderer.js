(function () {
  // 1. 优先检测是否有预加载注入的 global
  if (typeof window !== 'undefined') {
    // 若没有 global，直接赋值为 window
    if (!window.global) {
      window.global = window;
    }
    console.log("xxxxdfasdfasdfasdfasdf");
    // 2. 确保 Webpack 热更新的全局变量存在
    if (!window.webpackHotUpdateeasydebug) {
      window.webpackHotUpdateeasydebug = function (chunkId, moreModules, runtime) {
        for (const moduleId in moreModules) {
          if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
            window.global[moduleId] = moreModules[moduleId];
          }
        }
        if (runtime) {
          runtime();
        }
      };
    }
  }
})();
console.log("xxxxxsadfdasf");
import { createApp } from 'vue' // Vue 3
import ElementPlus from 'element-plus' // Element-Plus
import router from './router' // 路由
import pinia from './store' // 存储
import 'element-plus/dist/index.css' // 样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 图标
import App from './App.vue' // 单页应用主入口

const app = createApp(App)
app.use(ElementPlus)
// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(pinia)

// 将 Electron API 添加到全局属性
app.config.globalProperties.$electron = window.electronAPI


app.mount('#app')