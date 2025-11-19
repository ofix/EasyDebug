const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.resolve(__dirname, '../src/renderer/renderer.js'),
  target: 'electron-renderer',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
    publicPath: isProduction ? './' : 'http://localhost:8080/',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css'],
    alias: {
      '@': path.resolve(__dirname, '../src/renderer'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10KB
          }
        },
        generator: {
          filename: 'images/[name].[hash:8][ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'fonts/[name].[hash:8][ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/renderer/index.html'),
      filename: 'index.html',
      minify: isProduction,
      inject: 'body', // 脚本注入到 body 末尾（确保 #app 已存在）
      scriptLoading: 'blocking', // 同步执行脚本（关键！避免加载顺序问题）
    }),
    new DefinePlugin({
      '__VUE_OPTIONS_API__': 'true',
      '__VUE_PROD_DEVTOOLS__': 'false',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    ...(isProduction ? [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      })
    ] : []),
    // 新增：覆盖 Webpack 热更新的全局对象
    new (require('webpack')).HotModuleReplacementPlugin({
      // 强制热更新方法挂载到 window 上
      multiStep: true,
      fullBuildTimeout: 200,
      // 关键：指定热更新的全局变量名，且挂载到 window
      hotUpdateGlobal: 'window["webpackHotUpdateeasydebug"]',
    }),
  ],
  // 新增：优化热更新模块查找路径
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    port: 8080,
    hot: true,
    compress: true,
    client: {
      // 告诉 Webpack HMR 客户端，将热更新方法挂载到 window 上
      overlay: true,
      webSocketURL: 'ws://localhost:8080/ws', // 与 Vue CLI 端口一致
    },
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  externals: {
    electron: 'commonjs electron'
  },
  devtool: isProduction ? false : 'eval-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        elementUI: {
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          name: 'element-ui',
          chunks: 'all',
          priority: 20
        }
      }
    }
  }
}