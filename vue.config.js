// 配置目录别名
// import { baseUrl } from '@/config/env'
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
// 基础路径，发布前修改这里,当前配置打包出来的资源都是相对路径
// let publicPath = process.env.NODE_ENV === 'production' ? '/dist/' : './'
// let baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://10.0.0.253:8083'

module.exports = {
  // publicPath: '/',
  // outputDir: 'dist',
  // indexPath: 'index.html',
  // assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  filenameHashing: true,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: true,
  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
  transpileDependencies: [],
  // 生产环境 sourceMap
  productionSourceMap: true,
  configureWebpack: (config) => {
    // 简单/基础配置，比如引入一个新插件
  },

  // webpack 链接 API，用于生成和修改 webapck 配置
  // https://github.com/mozilla-neutrino/webpack-chain
  chainWebpack: (config) => {
    // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
    // config.resolve.alias
    //   .set('@', resolve('src'))
    //   .set('api', resolve('src/api'))
    //   .set('assets', resolve('src/assets'))
    //   .set('components', resolve('src/components'))
    //   .set('common', resolve('src/common'))
    //   .set('config', resolve('src/config'))
    //   .set('views', resolve('src/views'))
    config.optimization
      .splitChunks({
        cacheGroups: {}
      })

    // 'src/lib' 目录下为外部库文件，不参与 eslint 检测
    config.module
      .rule('eslint')
      .exclude
      .add('/Users/maybexia/Downloads/FE/community_built-in/src/lib')
      .end()
  },
  // All options for webpack-dev-server are supported
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    proxy: {
      '/api': {
        target: 'http://120.77.1.64:8083/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {

    }
  },
  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1,

  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {
    // iconPaths: {
    //   favicon32: 'src/image/logo.png',
    //   favicon16: 'src/image/logo.png',
    //   appleTouchIcon: 'src/image/logo.png',
    //   maskIcon: 'src/image/logo.png',
    //   msTileImage: 'src/image/logo.png'
    // }
  },
}
