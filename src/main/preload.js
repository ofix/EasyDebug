const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  // 监听主进程消息
  onMessageFromMain: (callback) => {
    ipcRenderer.on('main-to-renderer', (event, data) => {
      callback(data)
    })
  },

  // 发送消息给主进程
  sendToMain: (message, data = {}) => {
    ipcRenderer.send('renderer-to-main', { message, ...data })
  },

  // 请求-响应模式
  getAppVersion: () => {
    return ipcRenderer.invoke('get-app-version')
  },

  // 执行任务
  performTask: (taskData) => {
    return ipcRenderer.invoke('perform-task', taskData)
  },

  // 移除监听器
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel)
  },

  // 移除单个监听器
  removeListener: (channel, listener) => {
    ipcRenderer.removeListener(channel, listener)
  }
  // 除函数之外，我们也可以暴露变量
})

// 关键修改：直接将 window 暴露为 global（而非嵌套）
contextBridge.exposeInMainWorld('global', window);

// 额外：显式挂载 Webpack 热更新需要的全局变量（兜底）
contextBridge.exposeInMainWorld('webpackHotUpdateeasydebug', window.webpackHotUpdateeasydebug || function () { });