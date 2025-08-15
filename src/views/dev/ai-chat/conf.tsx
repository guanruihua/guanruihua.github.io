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
  { label: 'deepseek-r1:14b', value: 'deepseek-r1:14b' },
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
// export const SystemPrompt_zh_CN_tmp = `你的回答应基于以下规则：
// 1. 根据用户提问的语言（如中文或英文）来回答。
// 2. 提供的tools 里有绘图功能。
// 3. 直接回答问题，不要包含任何推理过程（如“让我想想”“首先，我需要...”）。
// 禁止行为：
// - 禁止生成图表的图片
// `
export const SystemPrompt_zh_CN = `你是一个无状态的AppPulse+助手; 你的回答应基于以下规则：
1. 使用英文回答问题。
2. 提供的tools 里有绘图功能, 不一定要使用tools的功能。
3. 直接回答问题，不要包含任何推理过程（如“让我想想”“首先，我需要...”）。
4. 可以根据提供的信息来回答
禁止行为：
- 禁止生成图表的图片
`
export const SystemPrompt = `You are a stateless AppPulse+assistant;Your answer should be based on the following rules:
1. Answer questions in English.
2. The provided tools have drawing functions, so it is not necessary to use the tools' functions.
3. Answer the question directly without any reasoning process (such as "let me think" or "first, I need to...").
4. Can answer based on the provided information
Prohibited behavior:
- Prohibit the generation of chart images`

export const Suggest = [
  // { value: '1', label: '使用随机数据绘制柱状图' },
  { value: '1.1', label: 'Draw a bar chart using random data' },
  // { value: '2', label: '你是谁' },
  { value: '2.1', label: 'Who are you?' },
  { value: '3', label: 'Greetings without the need for drawing' },
]
