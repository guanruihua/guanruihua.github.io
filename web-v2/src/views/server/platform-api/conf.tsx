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
  {
    id: '1753345572425',
    title: 'TMP POST',
    method: 'post',
    url: 'http://172.16.30.53:2400/api/v1/t/post',
    headerTxt:
      '{\n   "Access-Control-Allow-Origin": "*",\n   "Accept": "*/*",\n   // "Accept-Encoding": "gzip,deflate,br",\n   // "Connection": "keep-alive",\n  //  "Content-type": "text/plain",\n   "Content-type": "application/json",\n}',
    bodyTxt: '{}',
    paramsTxt: '{}',
  },
  {
    id: '1753346315972',
    title: 'TMP GET',
    method: 'get',
    url: 'http://172.16.30.53:2400/',
    headerTxt:
      '{\n   "Access-Control-Allow-Origin": "*",\n   "Accept": "*/*",\n//  "Accept-Encoding": "gzip,deflate,br",\n//  "Connection": "keep-alive",\n//  "Content-type": "text/plain",\n   "Content-type": "application/json",\n}',
    bodyTxt: '{}',
    paramsTxt: '{}',
    resultTxt: '{\n  "data": "hello get api",\n  "params": {}\n}',
    results: [
      [Date.now() + 90, '{\n  "data": "hello get api b",\n  "params": {}\n}'],
      [Date.now(), '{\n  "data": "hello get api a",\n  "params": {}\n}'],
    ],
  },
]

export const getList = () => LIST
export const getHeaders = () => HEADERS
