import React, { useState } from 'react'
import './index.less'
import { isString } from 'asura-eye'

export default () => {
  const [aStr, _setAStr] = useState<string>('')
  const [bStr, _setBStr] = useState<string>('')

  const aKey = 'tool-text-compare-diff-a-string'
  const bKey = 'tool-text-compare-diff-b-string'

  const addCache = (key: string, val: string) => {
    localStorage.setItem(key, val)
  }
  const setAStr = (val: any) => {
    _setAStr(val)
    addCache(aKey, val)
  }
  const setBStr = (val: any) => {
    _setBStr(val)
    addCache(bKey, val)
  }

  const handleCompare = (aStr: string, bStr: string) => {
    const pat = /[ |\t|\n]/
    const taStr: string = aStr.trim().replace(pat, '')
    const tbStr: string = bStr.trim().replace(pat, '')
    if (taStr === '' && tbStr === '') return 'compare'
    if (taStr === tbStr) return 'equal'
    if (taStr !== tbStr) return 'noEqual'
    return 'compare'
  }
  const initStr = (key: string, cb: any) => {
    const val = localStorage.getItem(key)
    if (isString(val)) {
      cb(val)
    }
  }
  const init = () => {
    initStr(aKey, _setAStr)
    initStr(bKey, _setBStr)
  }
  React.useEffect(() => {
    init()
  }, [])
  
  const reg = /([,;|\s@/.:;'`])/
  const aList = aStr.split(reg)
  const bList = bStr.split(reg)

  return (
    <div className='tool-text-compare'>
      <div className='compare-string'>
        {aList.map((a, i) => {
          const b = bList[i] || ''
          if (a === b) return <span key={i}>{a}</span>
          return (
            <span className={'error'} key={i}>
              {`${a} => ${b} `}
            </span>
          )
        })}
      </div>
      <div className={'input-area ' + handleCompare(aStr, bStr)}>
        <textarea placeholder='' value={aStr || ''} onChange={e => setAStr(e.target.value)} />
        <textarea placeholder='' value={bStr || ''} onChange={e => setBStr(e.target.value)} />
      </div>
    </div>
  )
}
