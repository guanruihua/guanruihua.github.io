const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const formatTS = require('@formatjs/ts-transformer')
const exclude = /node_modules|example|demo/

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.tsx'),
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
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
          },
        },
        exclude,
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers() {
                return {
                  before: [
                    formatTS.transform({
                      overrideIdFn: '[sha512:contenthash:base64:6]',
                    }),
                  ],
                }
              },
            },
          },
        ],
        exclude,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        exclude: /\.module.less/,
        use: [
          {
            loader: 'style-loader',
          },
          // miniCSS.loader,
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                // modifyVars: themes[process.env.theme],
                // modifyVars: themes[process.env.theme],
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      //设置模块化样式，添加hash命名，antd的样式修改只能引入.less文件覆盖
      {
        test: /\.module.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          // miniCSS.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '_[local]_[hash:base64:6]',
              },
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                importLoaders: 2,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      // {
      // 	test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf|ico)$/i,
      // 	type: 'asset/resource',
      // 	exclude
      // },
      {
        test: /\.(jpe?g|png|gif|)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf|otf|ico)$/i,
        // test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf|ico)$/i,
        type: 'asset/resource',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    // library: ['aurad'],
    filename: '[name].[hash:8].js', // 打包的文件名
    path: path.resolve(__dirname, '../dist'),
    // libraryTarget: "umd",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  // externals: {
  // 	react: 'react',
  // 	'react-dom': 'ReactDOM'
  // },
  plugins: [
    new CleanWebpackPlugin({
      path: '../dist',
      cleanOnceBeforeBuildPatterns: ['../dist'],
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
}
