import React from 'react'
import { Left } from './left'
import { usePageState } from './state'
import './index.less'
import { getFileContent } from './helper'

const fileTypes: string[] = ['txt', 'pdf', 'docx', 'csv']

export default function () {
  const { state, setState } = usePageState()

  const handleReadFile = async (file: any) => {
    const content = await getFileContent(file)
    console.log(content)
    setState({
      review: content,
    })
  }

  React.useEffect(() => {
    // 动态加载 PDF.js
    const script = document.createElement('script')
    script.src = '/js/pdf.2.12.313.min.js'
    // 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.min.js'

    script.onload = () => {
      // 设置 worker 路径
      ;(window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
        '/js/pdf.2.12.313.worker.min.js'
      // 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js'

      // 在这里可以初始化 PDF 相关功能
      console.log('PDF.js 已加载')
    }
    document.body.appendChild(script)

    return () => {
      // 组件卸载时移除 script
      document.body.removeChild(script)
    }
  }, [])

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
