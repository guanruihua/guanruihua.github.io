import React from 'react'
import './index.less'
import { useIndexedDB } from './cache'
import { classNames } from 'harpe'
import { isString } from 'asura-eye'
import { Div, message } from 'aurad'
import { copyImage, downloadImage, getMineType } from './copy-image'
import { ICON } from './icon'
import { IndexedDBItem } from './cache/type'

export function UploadPreview() {
  const cache = useIndexedDB()
  const uploadRef = React.useRef<HTMLInputElement>(null)
  const ref = React.useRef<HTMLInputElement>(null)
  const [view, setView] = React.useState<string>('')
  const [imgList, setImgList] = React.useState<IndexedDBItem[]>([])

  const handleDownload = async (key: string) => {
    const file: IndexedDBItem = (await cache.get(key)) || ({} as IndexedDBItem)
    const { value, info } = file
    value && downloadImage(value, info.name)
    // console.log(file)
  }
  const getFile = async (file: File): Promise<IndexedDBItem | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        if (reader.result) {
          // console.log(reader.result, file.name)
          const item: IndexedDBItem = cache.add({
            info: {
              name: file.name,
            },
            value: reader.result as string,
          })
          resolve(item)
        } else {
          resolve(null)
        }
      }
    })
  }
  const copyImg = async (key: string) => {
    const base64Image: string = (await cache.get(key))?.value || ''
    if (!base64Image || !isString(base64Image)) return
    // console.log(key, base64Image)
    copyImage(base64Image)
  }
  const handleFile = async (files: File[] = []) => {
    const newImgList: IndexedDBItem[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const record = await getFile(file)
      if (record) newImgList.push(record)
    }
    // console.log(imgList, newImgList)
    setImgList((imgList) => [...imgList, ...newImgList])
    return true
  }

  React.useEffect(() => {
    imgList.length === 0 && cache.getAll().then(setImgList)
  }, [ref.current])

  function handlePaste(e: any) {
    try {
      const files: any = Array.from(e.clipboardData?.items)
        .map((v: any) => {
          // console.log(v)
          if (v.type.includes('image')) {
            return v?.getAsFile()
          }
        })
        .filter(Boolean)
      handleFile(files).then((flag) => {
        if (flag) message.success('Paste Image Success')
        else message.error('Paste Image Error')
      })
      // console.log(e.clipboardData?.items, files)
    } catch (error) {
      console.error(error)
    }
  }
  React.useEffect(() => {
    if (!uploadRef.current) return
    uploadRef.current.removeEventListener('paste', handlePaste)
    uploadRef.current.addEventListener('paste', handlePaste)
    return () => {
      uploadRef.current?.removeEventListener('paste', handlePaste)
    }
  }, [uploadRef.current])

  // console.log(imgList)

  return (
    <div>
      <div className="image-preview">
        {imgList.map((item) => {
          const { key, value } = item
          const mineType = getMineType(value)
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
                <div onClick={() => setView(key)}>{ICON.view}</div>
                <div onClick={async () => handleDownload(key)}>
                  {ICON.download}
                </div>
                <Div
                  none={!['image/png', 'image/jpeg'].includes(mineType)}
                  onClick={() => copyImg(key)}
                >
                  {ICON.copy}
                </Div>
                <div
                  className="del"
                  onClick={() => {
                    setImgList((list) => list.filter((_) => _.key !== key))
                    cache.del(key)
                  }}
                >
                  {ICON.del}
                </div>
              </div>
            </div>
          )
        })}
        <div
          key="upload"
          className="upload"
          onMouseEnter={() => {
            uploadRef.current?.click()
          }}
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
        <div className="paste-upload-box">
          <span className="text">Paste</span>
          <input className="paste-upload" ref={uploadRef} />
        </div>
      </div>
    </div>
  )
}
