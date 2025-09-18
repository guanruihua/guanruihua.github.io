import React from "react"
import { usePageState } from './state'
import './index.less'

export default function (){
  const h = usePageState()

  return (<div className='game__brick'>
    <div ref={h.containerRef}></div>
  </div>)
}
