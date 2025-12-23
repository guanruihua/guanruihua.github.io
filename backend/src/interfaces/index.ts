// import { IChart } from '../controller/chart.js'
// import { IDeepseekChart } from '../controller/deepseek-chat.js'
// import { ICChart } from '../controller/company-chat.js'
// import { ILangchainChart } from '../controller/langchain-chat.js'
// import { ISChart } from '../controller/server-chat/index.js'
// import { IDatabase } from '../controller/database.js'
// import { IChart } from './chart.js'

export default [
  import('./proxy'),
  import('./ollama'),
  import('./rag'),
  import('./vector'),
  import ('./base'),
  //
  // ...IChart,
  // ...IDeepseekChart,
  // ...ILangchainChart,
  // ...ISChart,
  // ...IDatabase,
  // ...IChart,
] as any[]
