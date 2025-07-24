

export const HEADERS = `{
   "Access-Control-Allow-Origin": "*",
   "Accept": "*/*",
//  "Accept-Encoding": "gzip,deflate,br",
//  "Connection": "keep-alive",
//  "Content-type": "text/plain",
   "Content-type": "application/json",
}`

export const LIST = [
  {
    id: '1',
    title: '标题1',
    method: 'post',
    url: 'http://localhost:2400/api/v1/server/ai',
    headerTxt: HEADERS,
    bodyTxt: '{}',
    paramsTxt: '{}',
    resultTxt: '{}',
  },
  {
    id: '2',
    title: '标题2',
    method: 'get',
    url: 'http://localhost:2400/api/v1/server/ai',
    headerTxt: HEADERS,
    bodyTxt: '{}',
    paramsTxt: '{}',
    resultTxt: '{}',
  },
]

export const getList = () => LIST
export const getHeaders = () => HEADERS
