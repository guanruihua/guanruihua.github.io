const https = require('https')

function getStatusCode(url) {
  return new Promise((rs) => {
    let req = null
    req = https.get(url, (res) => {
      res.destroy()
      req.destroy()
      rs(res.statusCode)
    })

    req.on('error', (err) => {
      console.error('请求错误:', err)
      rs(-1)
    })

    req.setTimeout(5000, ()=>{
      req.destroy()
      rs(-1)
    })
  })
}

getStatusCode('https://guanruihua.github.io/').then(console.log)
getStatusCode('https://guanruihua1111.github.io/').then(console.log)
