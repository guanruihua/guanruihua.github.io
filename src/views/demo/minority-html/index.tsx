import React from 'react'
import './index.less'
import { Docs } from 'aurad'
import { items } from './items-docs'

export default function () {
  return (
    <div className="minority-html">
      <Docs items={items} />
    </div>
  )
}
