export interface ToolProperties {
  type?: 'string' | 'boolean' | 'number' | string
  emum?: string[]
  description: string
  properties?: { [key: string]: ToolProperties }
}

export interface ToolType {
  type: 'function' | string
  function: {
    name: string
    description: string
    parameters: {
      type: 'object' | string
      properties: {
        [key: string]: ToolProperties
      }
      required?: string[]
      [key: string]: any
    }
    [key: string]: any
  }
}

export interface History {
  type?: string
  role: 'assistant' | 'role' | 'tool' | string
  content: string
  toolType?: string
  chartTitle?: string
  chartData?: string
  chartOptions?: ObjectType
  time?: number
  [key: string]: any
}

export interface MessageType {
  content: string
  role: 'system' | 'user' | 'tool' | string
  [key: string]: any
}

export type ObjectType = Record<string, any>

type ModelType = 'deepSeek-chat-inline' | 'llama' | string
type CustomModelType = {
  model?: string
  url?: string
  required?: string[]
}

export interface AIProps {
  model?: ModelType | undefined
  url?: string | undefined
  // custom?: CustomModelType
  apiKey?: string | undefined
  lang?: 'zh_CN' | 'en_US'
  tools?: ToolType[]
  SystemPrompt?: string
  /**
   * @default true
   * @description 添加图表的Tool 已经 数据整理后的Options
   */
  addChartTool?: boolean
  functionCall?: {
    [key: string]: (args: ObjectType) => string | any
  }
  config?: {
    enabledRAG?: boolean
    [key: string]: any
  }
}

export interface AIChatParams {
  message: string
  messages?: MessageType[]
  callback(history: History): void
  callbackMessage?(messages: MessageType[]): void
  /**
   * @description 指定该对话使用的Tools, tools 优先级最高
   */
  tools?: ToolType[]
  /**
   * @description 指定该对话要拓展的的Tools, 会包含全局的tools
   */
  expandTools?: ToolType[]
}

export interface LLMProps {
  tools?: ToolType[]
  apiKey?: string
  url?: string
  required?: string[]

  model?: ModelType
  custom?: CustomModelType
}

export interface SendMessageProps {
  url?: string
  model?: ModelType
  headers?: ObjectType
  messages: MessageType[]
  tools?: ToolType[]
  params?: ObjectType
}

export interface LLMResult {
  sendMessage(props: SendMessageProps): Promise<ObjectType>
}
