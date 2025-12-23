export * from './logger'
export * from './register-interfaces'
export * from './get-ip-address'
export * from './start-server'

import { isEffectObject } from 'asura-eye'

export const getParams = (req: any) => {
  if (req) {
    if (isEffectObject(req?.body)) return req.body
    if (isEffectObject(req?.params)) return req.params
    if (isEffectObject(req?.query)) return req.query
  }
  return {}
}
