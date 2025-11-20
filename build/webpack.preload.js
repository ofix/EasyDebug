const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/preload/index.js',
  target: 'electron-preload',
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'preload.js'
  },
}