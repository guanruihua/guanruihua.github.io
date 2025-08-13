import axios, { AxiosRequestConfig } from 'axios'
import { isString } from 'asura-eye'

export const req = async (conf: AxiosRequestConfig): Promise<any> => {

  if (isString(conf.url) && !conf.url.startsWith('http')) {
    if (conf.url.startsWith('/')) {
      conf.url = 'http://localhost:2400' + conf.url
    } else {
      conf.url = 'http://localhost:2400/' + conf.url
    }
  }
  return axios(conf).catch((error) => {
    console.error(error)
    return {}
  })
}
