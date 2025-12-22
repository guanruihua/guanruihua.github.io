import React from 'react'
import { Tldraw, toRichText } from 'tldraw'
import 'tldraw/tldraw.css'
import './index.less'

export default function () {
  const handleMount = (editor: any) => {
    editor.createShape({
      type: 'text',
      x: 200,
      y: 200,
      props: {
        richText: toRichText('Hello world!'),
      },
    })

    editor.selectAll()

    editor.zoomToSelection({
      animation: { duration: 5000 },
    })
  }

  return (
    <div
      className="dev__tldraw"
      style={{
        position: 'fixed',
        inset: 0
      }}
    >
      <Tldraw onMount={handleMount} />
    </div>
  )
}
