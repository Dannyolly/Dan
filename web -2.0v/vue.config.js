const { defineConfig } = require("@vue/cli-service");
const  path  = require('path')

const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, "src/var.less")
      ]
    }
  },
  devServer:{
  /*   disableHostCheck: true, */
    historyApiFallback: true,
    allowedHosts:'all',
  },
  configureWebpack:(config) => {
    const productionGzipExtensions =
        /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
    return {
      plugins:[
        new CompressionWebpackPlugin({
          test: productionGzipExtensions, // 所有匹配此{RegExp}的资产都会被处理
          threshold: 150, // 只处理大于此大小的资产。以字节为单位
          minRatio: 0.8, // 只有压缩好这个比率的资产才能被处理
        })
      ],
    }
  },
  //crossorigin:""
});
