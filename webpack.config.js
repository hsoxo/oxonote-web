const path = require("path");
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const happyPackWorkers = require('./happypack.config')
const port = process.env.PORT || 6327;

module.exports = {
  mode: 'development',
  entry: ['webpack/hot/dev-server', __dirname + "/src/index.tsx"],
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    contentBase: path.join(__dirname, "/public"), // index.html的位置
    port: port,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/backend': {
        target: 'http://localhost:6389',
        pathRewrite: {'^/backend' : ''},
      },
    }
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.css'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        loader: "source-map-loader"
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'ts-loader', options: { transpileOnly: true } }
        ],
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ['happypack/loader?id=css'],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    ...happyPackWorkers,
    new ForkTsCheckerWebpackPlugin({
      workers: 4,
      checkSyntacticErrors: true,
      useTypescriptIncrementalAPI: true,
      async: false,
      watch: ['src/']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './.env.dev',
    }),
  ],
};