// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  configureWebpack: {
    resolve: {
      alias:{
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    },
    // plugins:[
    //   new BundleAnalyzerPlugin()
    // ],
    externals: {
      'element-ui': 'ELEMENT',
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'file-saver.js': 'FileSaver',
      'xlsx': 'XLSX',
      'echarts': 'echarts',
      'v-charts':'v-charts'
    }
  },
  devServer: {
    proxy: {
      '/fank':{
        target:'http://192.168.2.116:8888',
        changeOrigin:true,
        pathRewrite:{
          '^/fank':''
        }
      },
      '/school':{
        target:'http://127.0.0.1:9192/querry',
        changeOrigin:true,
        pathRewrite:{
          '^/school':''
        }
      }
      // '/baiduToken':{
      //     target:'https://aip.baidubce.com/oauth/2.0/token',
      //     changeOrigin:true,
      //     pathRewrite:{
      //         '^/baiduToken':''
      //     }
      // },
      // '/baidu':{
      //     target:'https://aip.baidubce.com/rest/2.0/ocr/v1',
      //     changeOrigin:true,
      //     pathRewrite:{
      //         '^/baidu':''
      //     }
      // },
    }
  }
}
