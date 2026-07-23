import axios, { AxiosRequestConfig } from 'axios'
import { isString } from 'asura-eye'
import { getConf } from './conf'

export const req = async (conf: AxiosRequestConfig = {}): Promise<any> => {
  const {
    url = 'http://localhost:2400',
    method = 'get',
    headers = {},
    ...rest
  } = conf

  let req_url: string = url

  if (isString(url) && !url.startsWith('http')) {
    const { serverUrl } = getConf()
    if (url.startsWith('/')) {
      req_url = serverUrl + url
    } else {
      req_url = serverUrl + '/' + url
    }
  }

  return axios({
    url: req_url,
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
