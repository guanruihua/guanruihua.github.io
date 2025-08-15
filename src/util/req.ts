import axios, { AxiosRequestConfig } from 'axios'
import { isString } from 'asura-eye'

export const req = async (conf: AxiosRequestConfig = {}): Promise<any> => {
  let { url, method = 'get', headers = {}, ...rest } = conf

  if (isString(url) && !url.startsWith('http')) {
    if (url.startsWith('/')) {
      url = 'http://localhost:2400' + url
    } else {
      url = 'http://localhost:2400/' + url
    }
  }

  return axios({
    url,
    method,
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }).catch((error) => {
    console.error(error)
    return {}
  })
}
