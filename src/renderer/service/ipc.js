class IPCRenderer {
    constructor() {
        this.setup();
    }
    setup() {
        // 监听来自主进程的消息
        window.electronAPI.onMessageFromMain((data) => {
            this.addMessage(`${data.message}`, data.type || 'info', data.timestamp, data.data)
        })
        // 页面卸载时清理监听器
        window.addEventListener('beforeunload', () => {
            window.electronAPI.removeAllListeners('main-to-renderer')
        })
    }

    // 发送消息到主进程
    sendMessage(message) {
        if (message) {
            window.electronAPI.sendToMain(message)
            console.log(`发送: ${message}`, 'info', new Date().toLocaleString())
        }
    }

    // 获取应用版本
    async getVersion() {
        try {
            const version = await window.electronAPI.getAppVersion()
            console.log(`应用版本: ${version}`, 'success')
        } catch (error) {
            console.error(`错误: ${error.message}`, 'error')
        }
    }

    // 执行示例任务
    async performSampleTask() {
        try {
            const result = await window.electronAPI.performTask({
                taskName: '示例任务',
                timestamp: Date.now()
            })

            if (result.success) {
                console.log(`任务结果: ${result.result}`, 'success')
            } else {
                console.error(`任务失败: ${result.error}`, 'error')
            }
        } catch (error) {
            console.error(`任务执行错误: ${error.message}`, 'error')
        }
    }
}

export default IPCRenderer;