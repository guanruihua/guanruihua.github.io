const emoji = {
  feat: '✨',
  fix: '🚑',
  docs: '📝',
  style: '💄',
  refactor: '♻️',
  test: '✅',
  chore: '🔧',
}

export const ModelOptions = [
  { label: 'deepseek-chat', value: 'deepseek-chat' },
  { label: 'deepseek-reasoner', value: 'deepseek-reasoner' },
  { label: 'llama3.1', value: 'llama3.1' },
  { label: 'llama3.2', value: 'llama3.2' },
  { label: 'Custom', value: 'Custom' },
]

export const URLOptions = [
  {
    label: 'https://api.deepseek.com/v1/chat/completions',
    value: 'https://api.deepseek.com/v1/chat/completions',
  },
  {
    label: 'http://localhost:2400/ollama/chat',
    value: 'http://localhost:2400/ollama/chat',
  },
  { label: 'Custom', value: 'Custom' },
]
// 2. 提供的tools 里有绘图功能
// 3. 你是一个无状态的助手，每次对话独立处理，不记住任何历史。
export const SystemPrompt = `你的回答应基于以下规则：
1. 根据用户提问的语言（如中文或英文）来回答。
2. 提供的tools 里有绘图功能。
3. 直接回答问题，不要包含任何推理过程（如“让我想想”“首先，我需要...”）。
禁止行为：
- 禁止生成图表的图片
`

export const Suggest = [
  { value: '1', label: '使用随机数据绘制柱状图' },
  { value: '2', label: '你是' },
]
