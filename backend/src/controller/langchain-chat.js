// import OpenAI from 'openai'
import { getParams, logger } from '../utils/index.js'
import axios from 'axios'
import { tool } from '@langchain/core/tools'
import { z } from 'zod'
import { ChatOpenAI } from '@langchain/openai'

const apiKey = 'sk-5a96d0b5276640c0b8fe11ee9b0d3f71'
const model = 'deepseek-r1:14b'
const llm = new ChatOpenAI({
  model,
  apiKey,
  // baseUrl: 'https://api.deepseek.com/v1/chat/completions',
  // model_name: model,
  // openai_api_key: apiKey,
  // base_url: 'https://api.deepseek.com/v1/chat/completions',
  // openai_api_base: 'https://api.deepseek.com',
})
/**
 * Note that the descriptions here are crucial, as they will be passed along
 * to the model along with the class name.
 */
const calculatorSchema = z.object({
  operation: z.enum(['add', 'subtract', 'multiply', 'divide']).describe('The type of operation to execute.'),
  number1: z.number().describe('The first number to operate on.'),
  number2: z.number().describe('The second number to operate on.'),
})

const calculatorTool = tool(
  async ({ operation, number1, number2 }) => {
    // Functions must return strings
    if (operation === 'add') {
      return `${number1 + number2}`
    } else if (operation === 'subtract') {
      return `${number1 - number2}`
    } else if (operation === 'multiply') {
      return `${number1 * number2}`
    } else if (operation === 'divide') {
      return `${number1 / number2}`
    } else {
      throw new Error('Invalid operation.')
    }
  },
  {
    name: 'calculator',
    description: 'Can perform mathematical operations.',
    schema: calculatorSchema,
  },
)

const llmWithTools = llm.bindTools([calculatorTool])

export const ILangchainChart = [
  {
    path: '/c/langchain/chat',
    post: async (req, res) => {
      // res.setHeader('Access-Control-Allow-Origin', '*')
      // res.setHeader('Content-type', 'application/json')
      let params = {}
      try {
        // 4. 运行查询
        const result = await llmWithTools.invoke('What is 3 * 12')

        console.log(result)

        const data = result?.data

        console.log(data)

        logger.error('post: /chat', params, data)
        return res.status(200).json({
          data,
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
  {
    path: '/c/langchain/test',
    post: async (req, res) => {
      console.log('start testConnection')
      // const params = {
      //   baseURL: 'https://api.deepseek.com',
      //   // modelName: 'deepseek-r1:14b',
      //   model: 'deepseek-chat',
      //   // model: 'deepseek-r1:14b',
      //   apiKey,
      //   // configuration: {
      //   //   // basePath: 'https://api.deepseek.com/v1',
      //   //   // basePath: 'https://api.deepseek.com/chat/completions',
      //   //   basePath: 'https://api.deepseek.com',
      //   //   baseOptions: {
      //   //     timeout: 30000,
      //   //     proxy: false, // 明确禁用代理（如需）
      //   //   },
      //   // },
      // }
      const params = {
        modelName: 'deepseek-chat',
        apiKey,
        configuration: {
          basePath: 'https://api.deepseek.com/v1',
          baseOptions: {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              // 如果有其他必要 headers，在这里添加
            },
          },
          //   // basePath: 'https://api.deepseek.com/v1',
          //   // basePath: 'https://api.deepseek.com/chat/completions',
          //   basePath: 'https://api.deepseek.com',
          //   baseOptions: {
          //     timeout: 30000,
          //     proxy: false, // 明确禁用代理（如需）
          //   },
        },
      }

      const model = new ChatOpenAI(params)

      try {
        const response = await model.invoke('你好')
        console.log('连接成功:', response.content)
      } catch (error) {
        console.log(error)
        console.error('连接失败:')
        console.error('- 错误信息:', error.message)
        console.error('- HTTP 状态码:', error.response?.status)
        console.error('- 请求配置:', error.config)
      }

      return res.status(200).json({
        data: 'test',
      })
    },
  },
]
