import { IConfig } from 'umi-types'
import path from 'path'

// ref: https://umijs.org/config/
const config: IConfig =  {
  runtimePublicPath: true,
  chainWebpack: function (config, { webpack }) {
      config.resolve.alias.set('@', path.resolve(__dirname, 'src'))
  },
  treeShaking: true,
  proxy: {
    '/auth': {
      'changeOrigin': true,
      'target': 'http://localhost:3000/'
    },
    '/api': {
        'changeOrigin': true,
        'target': 'http://localhost:3000/'
    }
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true
      },
      dynamicImport: { webpackChunkName: true },
      title: 'IOA',
      dll: false,
      locale: {
        enable: true,
        default: 'ru-RU'
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//
        ],
      },
    }],
  ],
}

export default config;
