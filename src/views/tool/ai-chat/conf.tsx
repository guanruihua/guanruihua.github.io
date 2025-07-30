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
  { label: 'Custom', value: 'Custom' },
]

export const URLOptions = [
  {
    label: 'https://api.deepseek.com/v1/chat/completions',
    value: 'https://api.deepseek.com/v1/chat/completions',
  },
  { label: 'Custom', value: 'Custom' },
]
