const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  configureWebpack:{
    resolve:{
      alias:{ //配置别名 默认 @ 为 src 文件目录
        '@':'/src',
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'view':'@/view',
      }
    }
  }
}