import axios from 'axios'
import { ObjectType } from '0type'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-type': 'application/json',
}

export default [
  {
    path: '/proxy',
    get: async (params: ObjectType) => {
      if (!params.url) {
        return {
          params,
          data: 'url is required',
        }
      }

      const res = await axios({
        method: 'get',
        headers,
        ...params,
      })
      return res?.data
    },
    post: async (params: ObjectType) => {
      if (!params.url) {
        return {
          params,
          data: 'url is required',
        }
      }
      const res = await axios({
        method: 'post',
        headers,
        ...params,
      })
      return res.data
    },
  },
  {
    path: '/proxy-temp',
    post: async (params: ObjectType) => {
      console.log('🚀 ~ params:', params)
      const result = await axios
        .post(
          'https://api.xiaomimimo.com/v1/chat/completions',
          // props?.url ?? url,
          {
            model: 'mimo-v2-flash',
            messages: [{ role: 'user', content: '你是' }],
            stream: false,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer sk-cxn1mf4g58pw10vnaya1dswnvwnw5a8xowf03osiqd3op6ht',
            },
          },
        )
        // .then(async res=>await res.json())
        .catch((error) => {
          console.error(error)
          return {
            data: {},
          }
        })
      // console.log(result.data)
      return result.data || {}
    },
  },
]
