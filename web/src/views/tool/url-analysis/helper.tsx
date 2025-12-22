import { ObjectType } from 'abandonjs'

export function parseUrlParams(url: string = '') {
  const urlObj = new URL(url)

  if (urlObj.hash.startsWith('#/')) {
    const [hash, search = ''] = urlObj.hash.split('?') || []
    const getParamsString = () => {
      try {
        const urlObj = new URL('http://www.123.com/?' + search)
        const params: ObjectType = {}

        for (const [key, value] of urlObj.searchParams.entries()) {
          params[key] = value
        }
        return JSON.stringify(params, null, 2)
      } catch (error) {
        return ''
      }
    }

    return [urlObj.origin, hash, getParamsString()]
  }

  const getParamsString = () => {
    const params: ObjectType = {}

    for (const [key, value] of urlObj.searchParams.entries()) {
      params[key] = value
    }

    try {
      return JSON.stringify(params, null, 2)
    } catch (error) {
      return ''
    }
  }

  return [urlObj.origin, urlObj.hash, getParamsString()]
}
