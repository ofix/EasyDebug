const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
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
    },
    autoHideMenuBar: true,              // 可选：隐藏菜单栏（保留快捷键）
    // 可选：自定义窗口图标
    // icon: path.join(__dirname, '../renderer/asssets/icon.png'),
  })
  // 注意：renderer 目录相对于 main 目录的相对路径
  const indexFile = path.join(__dirname, '../renderer/index.html');
  win.loadFile(indexFile)

  // ✅ 开发环境：加载 webpack-dev-server 提供的页面（已注入 Vue 打包代码）
  win.loadURL('http://localhost:8080')

  // 如果是生产环境，才用 loadFile('./dist/index.html')
  // win.loadFile(path.join(__dirname, '../dist/index.html'))

  // win.webContents.openDevTools({ mode: 'detach' });
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