import { req } from '@/util'
export * from './dev'

export const send = async () => {
  try {
    const res = await req({
      method: 'post',
      url: 'http://localhost:2400/lms/chat',
      params: {
        input:
          'Only return the value of the "violationCount" parameter as 4, give me a JSON response.',
      },
    })
    const { content } = res.data.data.output[0]
    console.log(content)
  } catch (error) {
    console.error(error)
  }
  return ''
}


