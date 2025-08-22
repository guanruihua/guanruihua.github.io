import axios, { AxiosRequestConfig } from 'axios'
import { isString } from 'asura-eye'
import { getConf } from './conf'

export const req = async (conf: AxiosRequestConfig = {}): Promise<any> => {
  let { url, method = 'get', headers = {}, ...rest } = conf

  if (isString(url) && !url.startsWith('http')) {
    const { serverUrl } = getConf()
    if (url.startsWith('/')) {
      url = serverUrl + url
    } else {
      url = serverUrl + '/' + url
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
