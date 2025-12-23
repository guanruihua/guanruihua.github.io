import WebSocket, { WebSocketServer } from 'ws'

export const loadWebSocket = () => {
  const wss = new WebSocketServer({
    port: 2410,
    perMessageDeflate: {
      zlibDeflateOptions: {
        chunkSize: 1024,
        memLevel: 7,
        level: 3,
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024,
      },
    },
  })

  wss.on('connection', (ws) => {
    console.log('New client connected')

    ws.on('close', () => {
      console.log('Client disconnected')
    })

    // 发送欢迎消息
    ws.send('Welcome to WebSocket server!')

    // 接收客户端消息
    ws.on('message', (message) => {
      console.log(`Received: ${message}`)
      ws.send(message)
      // 广播给所有客户端
      Array.from(wss.clients).forEach((client) => {
        // console.log(client?.send, message)
        if (client.readyState === WebSocket.OPEN) {
          client.send(message)
          // client.send(`Server: ${message}`)
        }
      })
    })
  })
}
