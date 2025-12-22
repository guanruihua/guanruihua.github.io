import { useSetState } from '0hook'
import { parse } from 'abandonjs'

export const ConfKey = 'conf|cache'

export interface Conf {
  serverUrl?: string
  deepSeekApiKey?: string
  [key: string]: any
}

export const getConf = (): Conf =>
  parse(localStorage.getItem(ConfKey), {}) as Conf

export const useConf = (): {
  conf: Partial<Conf>
  setConf: (conf: Partial<Conf>) => void
} => {
  const [conf, _setConf] = useSetState<Conf>(
    {
      // serverUrl: 'http://172.16.30.53:2400'
      serverUrl: 'http://localhost:2400',
    },
    ConfKey,
  )

  return {
    conf,
    setConf: (newConf: Conf) => {
      // if (newConf.serverUrl && newConf.serverUrl.endsWith('/')) {
      //   newConf.serverUrl = newConf.serverUrl.replace(/\/$/, '')
      // }
      _setConf(newConf)
    },
  }
}
