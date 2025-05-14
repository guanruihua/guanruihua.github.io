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
  output: {
    filename: '.web/js/[name].[hash:8].js', // 打包的文件名
    path: path.resolve(__dirname, '../docs'),
  },
  // experiments: {
  // 	outputModule: true
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
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
      '.d.ts',
    ],
  },
  module: {
    rules,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['.web'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../.nojekyll'),
          to: path.resolve(__dirname, '../docs/.nojekyll'),
          toType: 'file',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
}
