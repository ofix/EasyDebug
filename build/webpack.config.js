const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')
const preloadConfig = require('./webpack.preload.config')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  process.env.NODE_ENV = argv.mode || 'development'

  // 为所有配置设置模式
  ;[mainConfig, rendererConfig, preloadConfig].forEach(config => {
    config.mode = isProduction ? 'production' : 'development'
  })

  if (isProduction) {
    // 生产环境优化
    rendererConfig.optimization = {
      ...rendererConfig.optimization,
      minimize: true
    }
  }

  return [mainConfig, rendererConfig, preloadConfig]
}