export default [
  {
    path: '/',
    get: (params: any) => ({
      data: 'hello get api ' + Date.now(),
      params,
    }),
    post: (params: any) => ({
      data: 'hello post api ' + Date.now(),
      params,
    }),
  },
  {
    path: '/get',
    get: (params: any) => ({
      data: 'hello get api ' + Date.now(),
      params,
    }),
  },
  {
    path: '/post',
    post: (params: any) => ({
      data: 'hello post api ' + Date.now(),
      params,
    }),
  },
]
