import React from 'react'
import { Left } from './left'
import { usePageState } from './state'
import './index.less'
import { getFileContent } from './helper'

const fileTypes: string[] = ['txt', 'pdf', 'docx', 'csv']

export default function () {
  const { state, setState } = usePageState()

  const handleReadFile = async(file: any) => {
    const content = await getFileContent(file)
    console.log(content)
    setState({
      review: content
    })
  }

  return (
    <div className="tool-file-review">
      {/* <Left fileTypes={fileTypes} state={state} setState={setState} /> */}
      <div className="content">
        <div className="controls">
          <h5>md, txt, docx, pdf</h5>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0]
              handleReadFile(file)
            }}
          />
        </div>
        <div className="review">
          <pre>{state.review}</pre>
        </div>
      </div>
    </div>
  )
}
