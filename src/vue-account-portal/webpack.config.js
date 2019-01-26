const { resolve } = require('path')
const { getIfUtils } = require('webpack-config-utils')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env)
  const config = {
    context: resolve('src'),
    entry: { 'vue-account-portal': './vue-account-portal.js' },
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
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loader: ['vue-style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        }
      ]
    },
    plugins: [new VueLoaderPlugin()],
    resolve: {
      extensions: ['*', '.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, './src/')
      }
    }
  }
  if (env.debug) {
    console.log(config)
    debugger
  }
  return config
}
