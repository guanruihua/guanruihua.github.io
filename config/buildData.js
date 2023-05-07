const { read, writeFile } = require('0file-system')

const path = require('path')
const data = read(path.resolve(__dirname, '../JavaScript/api'), { tree: true })

Array.isArray(data) && data.forEach((item, index) => {
	if (index == 0) {
		console.log(item)
		const { isDir = false, name, data } = item
		const resData = JSON.stringify({
			data: data
		})
		writeFile('./docs/api/name.json', resData)
	}
})

// console.log(data)
