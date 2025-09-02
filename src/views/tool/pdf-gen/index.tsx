import { Button } from 'aurad'
import React from 'react'
import { usePageState } from './state'
import { load } from './load'

export default function () {
  const u = usePageState()

  load()

  return (
    <div className="tool-pdd-gen">
      <div>PDF GEN</div>
      <Button onClick={u.genPDF}>GEN PDF</Button>
    </div>
  )
}
