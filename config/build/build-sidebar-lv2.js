const fs = require('fs')
const { toArray, isDir } = require('./util')

function write(path, index = 0, lv = 0) {
	const indexSpaces = new Array(index).fill('  ').join('')
	const dirs = toArray(fs.readdirSync(path, 'utf-8'))
		.map(item => {
			if (index === 0 && lv === 0) {
				try {
					const _path = path + item + '/index.html'
					// fs.copyFile('./config/README.md', path + item + '/README.md', (err) => {
					// 	err && console.log(err)
					// });
					const __index__html = fs.readFileSync('./config/index.html')
					fs.writeFileSync(_path, __index__html.toString().replace('__ruihuag__website__name__', `__ruihuag__website__${item}__`))
					// fs.copyFile('./config/index.html', _path, (err) => {
					// 	err && console.log(err)
					// })

					fs.writeFileSync(
						`./${item}/_sidebar.md`,
						write(path + item, 0, 1)
							.replaceAll(`](${item}/`, '](')
					)
				} catch (error) {
					console.error(error)
				}
				return
			}
			const newPath = path + '/' + item
			const isDirStatus = isDir(newPath)
			const _newPath = newPath.replace('./', '')
			let nextContent = ''
			const newDirs = isDirStatus ? toArray(fs.readdirSync(newPath, 'utf-8')) : []
			const nextLvHasIndexMd = newDirs.includes('index.md')
			let content = item

			// 判断下级时候有index.md 文件
			if (item.indexOf('index.md') > -1) {
				// return;
			}

			if (nextLvHasIndexMd) {
				content = `[${item}](${_newPath}/index.md)`
			} else if (content.indexOf('.md') > -1) {
				content = `[${content.replace('.md', '').replace('index', 'home')}](${_newPath})`
			}

			if (isDirStatus) {
				nextContent = write(newPath, index + 1)
			}
			return `${indexSpaces}* ${content}\n${nextContent}`
		}).filter(Boolean)

	return dirs.join('')
}

write('./', 0)