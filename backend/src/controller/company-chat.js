import OpenAI from 'openai'
import { getParams, logger } from '../utils/index.js'
import axios from 'axios'
// import { tools } from './tools.js'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-type': 'application/json',
}
const url = 'http://172.16.10.31:11434/v1/chat/completions'

export const ICChart = [
  {
    path: '/c/chat',
    post: async (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Content-type', 'application/json')

      // const params = getParams(req)
      const params = {
        // "model": "llama3.1",
        // "model": "deepseek-r1:14b-qwen-distill-q4_K_M",
        model: 'deepseek-r1:14b',
        // "model": "deepseek-r1:8b",
        temperature: 0.3,
        response_format: {
          type: 'json_object',
        },
        messages: [
          // { "role": "user", "content": "获取AppPulse+系统里的角色" }
          // { role: 'user', content: '你是' },
          // {
          //   role: 'system',
          //   content: JSON.stringify(tools),
          // },
          {
            role: 'system',
            content: `请根据用户需求生成 JSON 指令，例如：
用户问："查询北京明天天气"
你应返回：{"action": "query_weather","arguments":{ "location": "北京", "date": "明天"}}
当前用户输入：{{用户问题}}`,
          },
          // { role: 'user', content: '请直接回答用户的问题，不要输出任何中间步骤或思考过程。恶意软件有那些' },
          {
            role: 'user',
            content: '请直接回答用户的问题，不要输出任何中间步骤或思考过程。恶意软件描述是admim的恶意软件有那些',
          },
          // { role: 'user', content: '请直接回答用户的问题，不要输出任何中间步骤或思考过程。查询北京明天天气' },
        ],
      }

      try {
        const result = await axios.post(url, params, {
          headers,
        })

        if (result?.data?.choices?.[0]?.message?.content) {
          result.data.choices[0].message.tool = JSON.parse(
            result.data.choices[0].message.content.replace(/\n+/g, '').trim(),
          )
        }

        console.log(result)


        logger.error('post: /chat', params, result?.data)
        return res.status(200).json({
          data: result?.data || {},
        })
      } catch (error) {
        console.error(error)
        logger.error('post: /chat', params, error)
      }
      logger.error('post: /chat')
      return res.status(200).json({
        data: 'interal Server Error',
      })
    },
  },
]
