const path = require('path');
const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@i': path.resolve(__dirname, './src/assets'),
        '@v': path.resolve(__dirname, './src/views'),
        '@c': path.resolve(__dirname, './src/components'),
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        jquery: "jquery",
        jQuery: "jquery",
        $: "jquery",
        'windows.jQuery': 'jquery',
      })
    ],
    performance: {
      hints: 'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  }
}