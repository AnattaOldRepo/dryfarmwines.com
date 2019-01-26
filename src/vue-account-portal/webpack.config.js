/* eslint no-console:"off" */
const { resolve } = require('path')
const { getIfUtils } = require('webpack-config-utils')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env)
  const config = {
    context: resolve('src'),
    entry: {
      'vue-account-portal': './vue-account-portal.js'
    },
    output: {
      filename: '[name].js',
      path: resolve('dist'),
      publicPath: '/dist/',
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    watch: ifNotProd(),
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: ['vue-style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.sass$/,
          use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
              sass: [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax'
              ]
            }
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [new VueLoaderPlugin()],
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js'
        // vue: 'vue/dist/vue.js'
      }
    }
  }
  if (env.debug) {
    console.log(config)
    debugger // eslint-disable-line
  }
  return config
}
