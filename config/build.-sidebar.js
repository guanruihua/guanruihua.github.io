const fs = require('fs')
const { write } = require('./util')

fs.writeFileSync('./_sidebar.md', write('./', 0))
