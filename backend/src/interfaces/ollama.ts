import { ObjectType } from '0type'
import { getParams } from '../utils'
import axios from 'axios'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-type': 'application/json',
}
const url = 'http://172.16.10.31:11434/v1/chat/completions'

// @ts-ignore (define in dts)
const handleChat = async (req, res, url) => {
  const params = getParams(req) || {}

  try {
    const result = await axios.post(
      url,
      {
        // logit_bias: {
        //   think: -100,
        // },
        // llama_params,
        ...params,
      },
      {
        headers,
      },
    )
    console.log(result?.data)

    return res.status(200).json({
      params,
      data: result?.data || {},
    })
  } catch (error) {
    console.error(error)
  }
  return res.status(200).json({
    params,
    data: 'interal Server Error',
  })
}

const Cache: ObjectType<any> = {}

export default [
  {
    path: '/ollama/chat',
    // @ts-ignore (define in dts)
    post: async (params, req, res) => {
      try {
        return await handleChat(req, res, url)
      } catch (error) {
        return ''
      }
    },
  },
  {
    path: '/ollama/steam/chat/stop',
    // @ts-ignore (define in dts)
    post: async (params) => {
      const { chatId } = params
      if (Cache[chatId]) {
        Cache[chatId]?.abort?.()
        delete Cache[chatId]
        return 1
      }
      return -1
    },
  },
  {
    path: '/ollama/steam/chat',
    type: 'simple',
    // @ts-ignore (define in dts)
    post: async (req, res) => {
      console.log('start: /ollama/steam/chat')

      try {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Content-type', 'application/json')

        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        })
        const { chatId = Date.now(), ...params } = getParams(req) || {}
        console.log('/ollama/steam/chat :', params)
        const controller = new AbortController()
        const signal = controller.signal

        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            model: 'deepseek-r1:14b',
            messages: [
              {
                role: 'user',
                content: 'Who are you?',
              },
            ],
            stream: true,
            ...params,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          signal,
        })
        Cache[chatId] = controller
        if (!response.body) {
          throw new Error('ReadableStream not supported')
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          let buffer = decoder.decode(value, { stream: true })
          res.write(buffer)
          // console.log('buffer: ', buffer)
        }
        req.on('close', () => {
          console.log('Client disconnected')
          if (Cache[chatId]) delete Cache[chatId]

          res.end()
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
  {
    path: '/ollama/own/chat',
    // @ts-ignore (define in dts)
    post: async (params, req, res) => {
      return await handleChat(
        req,
        res,
        'http://localhost:11434/v1/chat/completions',
      )
    },
  },
  {
    path: '/ollama/tags',
    // @ts-ignore (define in dts)
    get: async (params) => {
      const res = await axios({
        method: 'get',
        url: 'http://172.16.10.31:11434/api/tags',
        headers,
      })
      return res?.data
    },
  },
]
