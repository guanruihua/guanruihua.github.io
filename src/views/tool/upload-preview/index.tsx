import React from 'react'
import './index.less'
import { useIndexedDB } from './cache'
import { classNames } from 'harpe'

export function UploadPreview() {
  const cache = useIndexedDB()
  const ref = React.useRef<HTMLInputElement>(null)
  const [view, setView] = React.useState<string>('')
  const [imgList, setImgList] = React.useState<
    { key: string; value: string }[]
  >([])

  const getFile = async (
    file: File,
  ): Promise<{ key: string; value: string } | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        if (reader.result) {
          const { key, value } = cache.add(reader.result)
          resolve({ key, value })
        } else {
          resolve(null)
        }
      }
    })
  }

  const handleFile = async (files: File[] = []) => {
    const newImgList: { key: string; value: string }[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const record = await getFile(file)
      if (record) newImgList.push(record)
    }
    setImgList([...imgList, ...newImgList])
  }

  React.useEffect(() => {
    imgList.length === 0 && cache.getAll().then(setImgList)
  }, [ref.current])

  return (
    <div>
      <div className="image-preview">
        {imgList.map((item) => {
          const { key, value } = item
          return (
            <div key={key} className="image-preview-item">
              <div
                className={classNames('image-preview-item-img', {
                  view: key === view,
                })}
                onClick={() => key === view && setView('')}
              >
                <img src={value} />
              </div>
              <div className="control">
                <div onClick={() => setView(key)}>VIEW</div>
                <div
                  className="del"
                  onClick={() => {
                    setImgList((list) => list.filter((_) => _.key !== key))
                    cache.del(key)
                  }}
                >
                  DEL
                </div>
              </div>
            </div>
          )
        })}
        <div
          key="upload"
          className="upload"        
          onClick={() => {
            ref.current?.click()
          }}
        >
          <span>Add</span>
          <input
            ref={ref}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => {
              const value = e.target.files || []
              handleFile(value as File[])
            }}
          />
        </div>
      </div>
    </div>
  )
}
