const { ipcMain } = require('electron')

class IPCManager {
  constructor() {
    this.mainWindow = null
    this.setupIPCListeners()
  }

  // 设置主窗口引用
  setMainWindow(window) {
    this.mainWindow = window
  }

  // 设置 IPC 监听器
  setupIPCListeners() {
    // 监听渲染进程的消息
    ipcMain.on('renderer-to-main', (event, data) => {
      console.log('收到渲染进程消息:', data)
      
      // 回复消息
      event.reply('main-to-renderer', {
        message: `主进程已收到你的消息: ${data.message}`,
        timestamp: new Date().toLocaleString()
      })
    })

    // 处理请求-响应模式
    ipcMain.handle('get-app-version', () => {
      const { app } = require('electron')
      return app.getVersion()
    })

    // 处理其他业务相关的 IPC 调用
    ipcMain.handle('perform-task', async (event, taskData) => {
      return await this.handleTask(taskData)
    })
  }

  // 发送消息给渲染进程
  sendMessageToRenderer(message, data = {}) {
    if (!this.mainWindow) {
      console.warn('主窗口未设置，无法发送消息到渲染进程')
      return false
    }

    try {
      const messageData = {
        message: message,
        data: data,
        timestamp: new Date().toLocaleString(),
        type: 'info'
      }

      this.mainWindow.webContents.send('main-to-renderer', messageData)
      return true
    } catch (error) {
      console.error('发送消息到渲染进程失败:', error)
      return false
    }
  }

  // 发送错误消息
  sendErrorToRenderer(errorMessage, errorData = {}) {
    return this.sendMessageToRenderer(errorMessage, {
      ...errorData,
      type: 'error'
    })
  }

  // 发送成功消息
  sendSuccessToRenderer(successMessage, data = {}) {
    return this.sendMessageToRenderer(successMessage, {
      ...data,
      type: 'success'
    })
  }

  // 广播消息到所有窗口（如果有多个窗口）
  broadcastToAllWindows(message, data = {}) {
    const { BrowserWindow } = require('electron')
    const windows = BrowserWindow.getAllWindows()
    
    windows.forEach(window => {
      if (window && !window.isDestroyed()) {
        window.webContents.send('main-to-renderer', {
          message,
          data,
          timestamp: new Date().toLocaleString(),
          broadcast: true
        })
      }
    })
  }

  // 处理异步任务
  async handleTask(taskData) {
    try {
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        success: true,
        result: `任务完成: ${taskData.taskName}`,
        data: taskData
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // 清理资源
  cleanup() {
    // 移除特定的 IPC 监听器（如果需要）
    // ipcMain.removeAllListeners('specific-channel')
  }
}

// 创建单例实例
const ipcManager = new IPCManager()

module.exports = ipcManager