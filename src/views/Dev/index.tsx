import React from 'react'
import './index.less'
const tmp = `/**
 * @title add
 * @description 两数求和
 * @param {number} addend 加数
 * @param {number} augend 被加数
 * @returns {number}
 * @description 
 1, 1line
 1, 1line
 1, 1line
 1, 1line
 1, 1line
 
 * @version 0.0.2
 */`

/**
  * @description
  1, 1line
  1, 1line
  1, 1line
  1, 1line
  1, 1line
  * @returns 
  */
export function Dev() {
  const values: string[] = []
  
  tmp.split('* @').forEach((item, i) => {
    if(i === 0) return
    values.push(item)
  })

  return (
    <div className="dev">
      <div className="module">
        <div className="title"></div>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </div>
  )
}
