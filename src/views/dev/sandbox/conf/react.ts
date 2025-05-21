export const files_react = {
  'App.js': `import React from 'react'
import { Button } from 'antd'

export default function App() {
  console.log('Hello world')

  return  (<div>
    <h1>Hello world {new Date().getTime()}</h1>
    <Button>Click</Button>
  </div>)
}
`,
  'styles.css': `body {
  font-family: sans-serif;
  -webkit-font-smoothing: auto;
  -moz-font-smoothing: auto;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: auto;
  text-rendering: optimizeLegibility;
  font-smooth: always;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  color: #fff;
  background: #151515;
}

h1 {
  font-size: 1.5rem;
}`,
}