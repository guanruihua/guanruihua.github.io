const fs = require('fs')

function getPackageDocs(){
	const packageData = fs.readFileSync('../rh-mock/README.md').toString()
	fs.copyFileSync('../rh-mock/README.md', './OpenSource/rh-mock/index.md')

	console.log(packageData)
}

getPackageDocs()