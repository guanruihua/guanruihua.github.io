const fs = require('fs')
const { write } = require('./util')

fs.writeFileSync('./_navbar.md', write('./', 0))
