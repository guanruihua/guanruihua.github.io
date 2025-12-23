import axios from 'axios'

// const OLLAMA_API = 'http://localhost:11434/api'
const OLLAMA_API = 'http://172.16.10.31:11434/api'

async function callOllama(endpoint: string, data: any) {
  try {
    const response = await axios.post(`${OLLAMA_API}/${endpoint}`, data)
    return response.data
  } catch (error: any) {
    console.error('Ollama API 错误:', error.response?.data || error.message)
    throw error
  }
}

export async function getEmbedding(
  text: string,
  // model = 'bge-large:335m'
  model = 'bge-m3',
) {
  const data = {
    model,
    prompt: text,
  }

  const result = await callOllama('embeddings', data) // Ollama 部分模型支持
  return result.embedding // 返回向量数组
}
