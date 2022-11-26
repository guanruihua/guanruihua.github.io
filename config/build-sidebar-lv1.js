const fs = require('fs')
const { toArray, isDir } = require('./util')

function write(path, index = 0) {

	const indexSpaces = new Array(index).fill('  ').join('')
	const dirs = toArray(fs.readdirSync(path, 'utf-8'))
		.map(item => {
			const newPath = path + '/' + item
			let content = item
			if (content.indexOf('.md') > -1) {

				content = `[${content.replace('.md', '')}](${newPath.replace('./', '')})`
			}
			const nextContent = isDir(newPath) ? write(newPath, index + 1) : ''
			return `${indexSpaces}* ${content}\n${nextContent}`
		})

	return dirs.join('')
}

fs.writeFileSync('./_sidebar.md', write('./', 0))
