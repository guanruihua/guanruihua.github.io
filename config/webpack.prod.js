const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
        extractComments: false,
        // include: /\.min\.js$/,
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
    new MiniCssExtractPlugin({
      filename: '.web/css/[name].[contenthash].css', // 输出 CSS 文件名
    }),
    new HtmlWebpackPlugin({
      title: 'Ruihuag',
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html', //打包后的文件名
      hash: true,
      cache: false,
      // favicon: './src/assets/images/favicon.ico',
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true, // 缩小CSS样式元素和样式属性
      },
    }),
  ],
}
