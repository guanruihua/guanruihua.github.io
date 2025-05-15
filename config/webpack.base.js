
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rules = require('./webpack.rules')
const path = require("path")
// const { ESBuildPlugin } = require('esbuild-loader')

module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	// output: './background/index.tsx',
	// stats: 'errors-only',
	experiments: {
		outputModule: true
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '../src'),
		},
		extensions: ['.tsx', '.js', '.ts', '.less', '.css', '.module.less', '.d.ts'],
	},
	module: {
		rules, 
	},
	plugins: [
		// new ESBuildPlugin(),
		//数组 放着所有的webpack插件
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
				minifyCSS: true // 缩小CSS样式元素和样式属性
			},
		})
	]
}