import OpenAI from 'openai'
import { Deepseek_ApiKey } from '../config.js'
import { getParams, logger } from '../utils/index.js'

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: Deepseek_ApiKey,
})

export const IChat = [
  {
    path: '/chat',
    post: async (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Content-type', 'application/json')

      const params = getParams(req)
      try {
        const result = await openai.chat.completions.create({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: '你是谁' },
          ],
        })
        logger.error('post: /chat', params, result)
        res.status(200).json({
          data: result,
        })
      } catch (error) {
        logger.error('post: /chat', params, error)
      }
      return res.status(200).json({
        data: 'interal Server Error',
      })
    },
  },
  {
    path: '/steam/chat',
    post: async (req, res) => {
      // res.setHeader('Content-type', 'application/octet-stream')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Content-type', 'application/json')

      // res.setHeader('Connection', 'keep-alive')

      const params = getParams(req)
      try {
        const result = await openai.chat.completions.create({
          model: 'deepseek-chat',
          stream: true,
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: '你是谁' },
          ],
        })
        console.log(result)

        if (result.iterator()) {
          logger.log('post: /chat', 'start write steam data')
          for await (const val of result.iterator()) {
            const item = val?.choices?.[0] || {}
            const { delta = {}, finish_reason } = item
            // const tmp = delta?.content || ''
            if (finish_reason === 'stop') {
              logger.log('post: /chat', 'stop write steam data')
              res.end()
              return
            } else {
              logger.log('post: /chat', 'write steam data')
              res.write(JSON.stringify(item))
            }
          }
          logger.error('post: /chat', params, 'iterator resolve error')
        }
      } catch (error) {
        logger.error('post: /chat', params, error)
      }
      return res.status(200).json({
        data: 'iterator Server Error',
      })
    },
  },
]
