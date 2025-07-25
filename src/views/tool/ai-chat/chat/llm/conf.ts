export const Model: Record<
  string,
  {
    url: string
    model: string
    required: string[]
  }
> = {
  'deepSeek-chat-inline': {
    url: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat',
    required: ['apiKey'],
  },
}
