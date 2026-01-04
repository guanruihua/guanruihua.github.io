export {}

declare global {
  interface Window {
    MathJax: {
      typesetPromise?: (elements?: HTMLElement[]) => Promise<void>
      startup?: {
        pageReady?: () => Promise<void>
        defaultPageReady?: () => Promise<void>
      }
      version?: string
      loader?: Record<string, any>
      tex?: Record<string, any>
    }
  }
}
