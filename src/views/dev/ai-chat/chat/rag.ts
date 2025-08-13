import axios from 'axios'

export const getRagContent = async (message: string) => {
  try {
    const rag_res = await axios.post(' http://localhost:2400/rag', {
      // message: 'Introducing AppPulse+',
      message,
    })
    console.log('RAG Data: ', rag_res?.data?.data)
    if (rag_res?.data?.code === 200) {
      const data = rag_res?.data?.data
      // let content = '你是一个客服助手，请严格根据以下信息回答：\n'
      // let content = '请根据以下信息回答：\n'
      let content =
        'You are a customer service assistant, please answer strictly based on the following information: \n'
        // 'Please answer based on the following information: \n'
      data.forEach((msg: string) => {
        content += `-  ${msg}\n`
      })
      return content
    }
  } catch (error) {
    console.error(error)
  }
  return ''
}
