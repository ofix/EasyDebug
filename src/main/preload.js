const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
  // 除函数之外，我们也可以暴露变量
})

// 关键修改：直接将 window 暴露为 global（而非嵌套）
contextBridge.exposeInMainWorld('global', window);

// 额外：显式挂载 Webpack 热更新需要的全局变量（兜底）
contextBridge.exposeInMainWorld('webpackHotUpdateeasydebug', window.webpackHotUpdateeasydebug || function () { });