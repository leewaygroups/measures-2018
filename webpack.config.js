/*
    ./webpack.config.js
*/
const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})


module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index_bundle.js'
    // publicPath: '/dist/'
  },
  plugins: [
    new WriteFilePlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  }
}