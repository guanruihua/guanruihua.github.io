import React from 'react'
import './index.less'
import { useIndexedDB } from './cache'
import { Button } from 'aurad'

export function UploadPreview() {
  const db = useIndexedDB()
  const ref = React.useRef<HTMLDivElement>(null)

  const handleFile = (files: File[] = []) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      // 将图像文件转换为 Data URL
      reader.readAsDataURL(file)
      const img = document.createElement('img')

      // 当读取完成时，显示预览图像
      reader.onload = function () {
        if (reader.result) {
          img.src = reader.result as any
          db.add(reader.result)
          ref.current?.appendChild(img)
        }
      }
    }
  }

  React.useEffect(() => {
    db.getAll().then((list: any[]) => {
      list?.forEach(({ value }) => {
        const img = document.createElement('img')
        img.src = value
        ref.current?.appendChild(img)
      })
    })
  }, [ref.current])

  return (
    <div>
      <div ref={ref} className="image-previews"></div>
      <input
        type="file"
        name="fileToUpload"
        id="fileToUpload"
        multiple
        onChange={(e) => {
          const value = e.target.files || []
          handleFile(value as File[])
        }}
      />
    </div>
  )
}
