export const sse = async (props: any) => {
  const {
    url = 'http://localhost:2400/ollama/steam/chat',
    callback,
    messages = [],
  } = props
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'text/event-stream',
    },
    body: JSON.stringify({
      model: 'deepseek-r1:14b',
      stream: true,
      messages: messages.filter(Boolean),
    }),
  })

  if (!response.body) {
    throw new Error('ReadableStream not supported')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    let buffer = decoder.decode(value, { stream: true })
    // console.log(done, buffer)
    if (buffer.startsWith('data: ')) {
      const reg =
        /"delta":{"role":"assistant","content":"(.*?)"},"finish_reason":null}]}/

      let mat = buffer.match(reg)?.[1] || ''
      if (mat === '\\u003cthink\\u003e') mat = '<think>'
      if (mat === '\\u003c/think\\u003e') mat = '</think>'
      if (mat.includes('\\n')) mat = mat.replaceAll('\\n', '\n')
      callback?.({
        type: 'chunk',
        role: 'assistant',
        content: mat,
      })
      // console.log(mat)
      if (buffer.includes('data: [DONE]')) {
        break
      }
    } else {
      console.log('stop stream')
      break
    }
  }
}
