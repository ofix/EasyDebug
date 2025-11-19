easy-debug/
├── build/                         # 构建相关配置
│   ├── webpack.main.config.js     # 主进程 webpack 配置
│   ├── webpack.renderer.config.js # 渲染进程 webpack 配置
│   └── webpack.plugins.js         # 插件配置
├── dist/                    # 构建输出目录
├── src/
│   ├── main/                # Electron 主进程代码
│   │   ├── main.js          # 主进程入口文件
│   │   └── ipc/             # IPC 通信处理
│   │       ├── FileHandler.js
│   │       ├── AppHandler.js
│   │       └── index.js
│   ├── renderer/           # Vue 渲染进程代码
│   │   ├── assets/         # 静态资源
│   │   │   ├── images/
│   │   │   ├── styles/
│   │   │   └── icons/
│   │   ├── components/     # Vue 组件
│   │   │   ├── common/     # 通用组件
│   │   │   │   ├── AppHeader.vue
│   │   │   │   ├── AppSidebar.vue
│   │   │   │   └── AppFooter.vue
│   │   │   ├── debug/      # 调试相关组件
│   │   │   ├── settings/   # 设置相关组件
│   │   │   └── layout/     # 布局组件
│   │   ├── views/          # 页面级组件
│   │   │   ├── Home.vue
│   │   │   ├── Settings.vue
│   │   │   └── About.vue
│   │   ├── router/         # 路由配置
│   │   │   └── index.js
│   │   ├── store/          # Vuex 状态管理
│   │   │   ├── modules/
│   │   │   │   ├── app.js
│   │   │   │   ├── debug.js
│   │   │   │   └── settings.js
│   │   │   └── index.js
│   │   ├── App.vue         # 根组件
│   │   ├── main.js         # 渲染进程入口
│   │   └── background.js   # Vue 背景脚本（可选）
│   └── preload/            # 预加载脚本
│       ├── index.js
│       └── api.js
├── package.json
├── .gitignore
└── README.md