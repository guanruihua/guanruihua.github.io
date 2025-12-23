declare namespace NodeJS {
  interface ProcessEnv {
    HTTP_PORT: number
    HTTPS_PORT: number

    Mail_Auth_User: string
    Mail_Auth_PASS: string
    Mail_Form: string
    Mail_Default_To: string

    Xiaomi_Ai_API_KEY: string
    Deepseek_ApiKey: string

    RAG_TableName: string
    RAG_ConnectPath: string
    RAG_Limit: number
  }
}
