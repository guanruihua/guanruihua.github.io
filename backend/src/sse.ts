import { Express } from 'express'

const getRandomString = () => Math.random().toString(36).substring(2, 6)

export const loadSSE = (app:Express) => {
  // @ts-ignore (define in dts)
  app.post('/sse', (req, res) => {
    // 设置 HTTP 头部以允许 SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    })
    let count = 10
    setInterval(() => {
      res.write(getRandomString())

      if (!count--) {
        res.write(getRandomString())
        res.end()
      }
    }, 500)

    req.on('close', () => {
      console.log('Client disconnected')
      res.end()
    })
  })

  // @ts-ignore (define in dts)
  app.get('/sse', (req, res) => {
    // 设置 HTTP 头部以允许 SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    })
    let count = 10
    setInterval(() => {
      res.write('event: customEvent\n')
      const record = {
        id: performance.now(),
        type: 'message',
        content: Math.random().toString(36).substring(2, 6),
      }
      res.write('data: ' + JSON.stringify(record) + '\n\n')

      if (!count--) {
        const record = {
          id: performance.now(),
          type: 'stop',
          content: '',
        }
        res.write('data: ' + JSON.stringify(record) + '\n\n')
        res.end()
      }
    }, 500)

    req.on('close', () => {
      console.log('Client disconnected')
      res.end()
    })
  })
} 
