const fs = require('fs')
const { toArray, isDir } = require('./util')

const modules = toArray(fs.readdirSync('./', 'utf-8'))
fs.writeFileSync(`./_modules_.js`, 'const modules =' + JSON.stringify(modules))