export const files = {
 'App.js' :`import React from 'react'

 export default function App() {
  console.log('Hello world')

  return <h1>Hello world {new Date().getTime()}</h1>
}
`,
  'styles.css':`body {
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
}`
}