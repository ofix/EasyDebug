const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const ipcManager = require('./ipc/IPCManager') // 导入 IPC 管理模块

process.env.NODE_ENV = 'development';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,           // 必须开启
      nodeIntegration: false,           // 建议关闭
      enableRemoteModule: false,        // 已废弃，关闭
      sandbox: false,                   // 可按需开启
      // 禁用自动填充相关功能
      autoplayPolicy: 'document-user-activation-required',
      // 其他可能有助于减少警告的设置
      enablePreferredSizeMode: false
      // devTools: process.env.NODE_ENV === 'development'
    },
    autoHideMenuBar: true,              // 可选：隐藏菜单栏（保留快捷键）
    // 新增：允许开发环境的 WebSocket 通信（HMR 依赖）
    webSecurity: process.env.NODE_ENV === 'production', // 开发环境禁用 webSecurity
    // 可选：自定义窗口图标
    // icon: path.join(__dirname, '../renderer/asssets/icon.png'),
  })
  // 设置主窗口引用到 IPC 管理器
  ipcManager.setMainWindow(win);

  // ✅ 开发环境：加载 webpack-dev-server 提供的页面（已注入 Vue 打包代码）
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:8080');
  } else {
    win.loadFile(path.join(__dirname, '../../dist/index.html')); // 生产环境路径
  }
  win.webContents.openDevTools();
  // 新增：监听 WebSocket 连接（解决 HMR 连接失败）
  win.webContents.on('did-finish-load', () => {
    ipcManager.sendMessageToRenderer('应用程序启动成功！');
    console.log('页面加载完成，HMR 准备就绪');
  });

}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})