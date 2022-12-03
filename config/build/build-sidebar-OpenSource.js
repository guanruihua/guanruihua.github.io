const fs = require('fs')
const { toArray, isDir } = require('./util')

const openSourceList = ['abandonjs']

// 复制 index.html 文件
function copyHtml(list = []) {
	list.forEach(unit => {
		fs.copyFile('./config/index.html', `./OpenSource/${unit}/index.html`, (err) => {
			err && console.log(err)
		})
	})
}

function readDirStructure(path, index = 0) {
	const indexSpaces = new Array(index).fill('  ').join('')
	const dirs = toArray(fs.readdirSync(path, 'utf-8'))
	const result = dirs.map(unit => {
		let template = `${indexSpaces}* ${unit}`
		const newPath = path + '/' + unit
		const isDirStatus = isDir(newPath)
		if (!isDirStatus) {
			template = `${indexSpaces}* [${unit.replace('.md', '')}](${newPath})`
		}
		if (isDirStatus) {
			template += '\n' + readDirStructure(newPath, index + 1)
		}

		return template
	}).join('\n')
	// dirs.map()
	// console.log(dirs)
	return result
}

function buildSidebar(path) {
	fs.writeFileSync(
		`./${path}/_sidebar.md`,
		readDirStructure(path).replaceAll('](' + path + '/', '](')
	)
}

copyHtml(openSourceList)
buildSidebar('./OpenSource/abandonjs')