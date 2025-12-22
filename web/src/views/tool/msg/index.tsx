import React from 'react'
import { createRoot } from 'react-dom/client'
import { ICON } from './icon'
import './index.less'

export const message = {
  dom: null,
  init() {
    const old = document.querySelector('body>.message-box')
    if (old) return
    const dom = document.createElement('div')
    dom.className = 'message-box'
    this.dom = dom
    document.body.appendChild(this.dom)
  },
  open(
    content: React.ReactNode,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    timeout: number = 3000,
  ) {
    this.init()
    const dom = document.createElement('div')

    const JSXdom = (
      <div className={`message ${type}`}>
        <div className="icon">{ICON[type]}</div>
        <div className="content">{content}</div>
      </div>
    )

    createRoot(dom).render(JSXdom)
    this.dom.appendChild(dom)

    let timer: any = null
    timer = setTimeout(() => {
      dom.remove()
      // clearTimeout(timer)
    }, timeout)
  },
  warning(content: React.ReactNode, timeout: number = 3000) {
    this.open(content, 'warning', timeout)
  },
  info(content: React.ReactNode, timeout: number = 3000) {
    this.open(content, 'info', timeout)
  },

  error(content: React.ReactNode, timeout: number = 3000) {
    this.open(content, 'error', timeout)
  },

  success(content: React.ReactNode, timeout: number = 3000) {
    this.open(content, 'success', timeout)
  },
  close() {
    this.dom && this.dom.remove()
  },
}
