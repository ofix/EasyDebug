const path = require('path')
const { DefinePlugin } = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/preload/index.js',
  target: 'electron-preload',
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'preload.js'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@shared': path.resolve(__dirname, '../src/shared')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  externals: {
    electron: 'commonjs electron'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map'
}