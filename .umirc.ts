import { IConfig } from 'umi-types'
import path from 'path'

// ref: https://umijs.org/config/
const config: IConfig =  {
  publicPath: '/static/js/ioa-ui/',
  runtimePublicPath: true,
  chainWebpack: function (config, { webpack }) {
      config.resolve.alias.set('@', path.resolve(__dirname, 'src'))
  },
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'mao',
      dll: false,
      locale: {
        enable: true,
        default: 'ru-RU',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}

export default config;
