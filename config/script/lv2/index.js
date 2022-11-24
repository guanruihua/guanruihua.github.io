window.$docsify = {
	count: {
		countable: true,
		fontsize: '0.9em',
		color: 'rgb(90,90,90)',
		language: 'chinese'
	},
	search: {
		maxAge: 86400000, // 过期时间，单位毫秒，默认一天
		noData: '找不到结果',//搜索不到结果时显示
		paths: 'auto',//自动
		placeholder: '搜索',//搜索框提示
		depth: 2,
	},
	loadSidebar: true,
	// loadNavbar: true,
	subMaxLevel: 4,
	repo: 'https://github.com/guanruihua',
	copyCode: {
		buttonText: 'Copy',
		errorText: 'Error',
		successText: 'Copied'
	},
	plugins: [
		function myPlugin2(hook, vm) {
			console.log(hook, vm)
		}
	]
}