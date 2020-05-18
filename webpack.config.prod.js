const path = require("path");
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require('dotenv-webpack');

const happyPackWorkers = require('./happypack.config')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  output: {
    path: __dirname + "/dist",
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.css'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
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
        sideEffects: true,
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    ...happyPackWorkers,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './.env.prod',
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 6330
    // })
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin({
      sourceMap: true,
      compress:{
        pure_funcs: ['console.info', 'console.debug', 'console.warn']
      }
    })],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all',
          priority: 2,
          minChunks: 2,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 20,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  node: {
    fs: 'empty',
    net: 'empty',
  },
}