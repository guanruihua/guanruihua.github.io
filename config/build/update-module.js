const fs = require('fs')
const { toArray } = require('./util')

const modules = toArray(fs.readdirSync('./', 'utf-8'))
fs.writeFileSync(`./config/_modules_.js`, 'const modules =' + JSON.stringify(modules))