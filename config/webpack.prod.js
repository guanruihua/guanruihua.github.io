const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const exclude = /node_modules|example|demo/
const rules = require('./webpack.rules')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  // experiments: {
  // 	outputModule: true
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    // mainFiles: ['index'],
    extensions: [
      '.tsx',
      '.js',
      '.jsx',
      '.ts',
      '.less',
      '.css',
      '.module.less',
      '.d.ts'
    ]
  },
  module: {
    rules
  },
  output: {
    filename: '[name].[hash:8].js', // 打包的文件名
    path: path.resolve(__dirname, '../docs')
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      path: path.resolve(__dirname, '../public/index.html'),
      // path: '../docs',
      // cleanOnceBeforeBuildPatterns: ['../docs'],
      verbose: true
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../.nojekyll'),
          to: path.resolve(__dirname, '../docs/.nojekyll'),
          toType: 'file'
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
}
