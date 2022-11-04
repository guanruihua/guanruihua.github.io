const fs = require('fs')

const ignoreDir = [
	'.git', '.gitignore',
	'.nojekyll', '.prettierrc',
	'blog', 'config',
	'index.html', 'package.json',
	'Pending.md',
	'push.bat', 'README.md',
	'temp-note.md', '_sidebar.md',
	'__assets__', 'bar.md', '.keep', 'blog'
]

function toArray(params, ignore = ignoreDir) {
	if (Array.isArray(params)) return params.filter(i => {
		if(i.indexOf('.assets')>-1) return false
		return !ignore.includes(i)
	})
	return [params].filter(Boolean)
}


function isDir(url) {
	return fs.lstatSync(url).isDirectory();// true || false 判断是不是文件夹
}

function write(path, index = 0) {

	const indexSpaces = new Array(index).fill('  ').join('')
	const dirs = toArray(fs.readdirSync(path, 'utf-8'))
		.map(item => {
			const newPath = path + '/' + item
			let content = item
			if(content.indexOf('.md')>-1){

				content = `[${content.replace('.md','')}](${newPath.replace('./','')})`
			}
			const nextContent = isDir(newPath)?write(newPath, index + 1):''
			return `${indexSpaces}* ${content}\n${nextContent}`
		})

	return dirs.join('')
}


module.exports = { toArray, isDir, write }