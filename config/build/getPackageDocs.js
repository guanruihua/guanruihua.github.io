const fs = require('fs')

function getPackageDocs(){
	const packageData = fs.readFileSync('../fakingjs/README.md').toString()
	fs.copyFileSync('../fakingjs/README.md', './OpenSource/fakingjs/index.md')

	// console.log(packageData)
}

getPackageDocs()