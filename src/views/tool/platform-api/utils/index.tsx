import axios from 'axios'
import { parse } from 'jsonc-parser'

export function jsonc2Json(jsoncString: string = '{}') {
  try {
    return parse(jsoncString)
  } catch (error) {
    return {}
  }
}

export const handleSend = async (record: any) => {
  const { bodyTxt, headerTxt, method = 'post', paramsTxt, url } = record
  const headers = jsonc2Json(headerTxt)
  const params = jsonc2Json(paramsTxt)
  const body = jsonc2Json(bodyTxt)

  try {
    const res = await axios({
      method,
      url,
      params,
      data: body,
      headers,
    })
    console.log(res.data)
    return res?.data || {}
  } catch (error) {
    console.error(error)
  }
  return
}
