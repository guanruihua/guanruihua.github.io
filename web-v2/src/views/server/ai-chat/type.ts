export interface PageState {
  enabledRAG: boolean
  model: string
  customModel: boolean
  apiKey: string
  selectModelType: string
  url: string
  customURL: boolean
  userPrompt: string
  messages: any[]
  history: any[]
}
