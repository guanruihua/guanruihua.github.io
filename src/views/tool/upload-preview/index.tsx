import React from 'react'
import './index.less'
import { useIndexedDB } from './cache'
import { classNames } from 'harpe'

/**
 *.3gpp    audio/3gpp, video/3gpp
 *.ac3    audio/ac3
 *.asf       allpication/vnd.ms-asf
 *.au           audio/basic
 *.css           text/css
 *.csv           text/csv
 *.doc    application/msword
 *.dot    application/msword
 *.dtd    application/xml-dtd
 *.dwg    image/vnd.dwg
 *.dxf      image/vnd.dxf
 *.gif            image/gif
 *.htm    text/html
 *.html    text/html
 *.jp2            image/jp2
 *.jpe       image/jpeg
 *.jpeg    image/jpeg
 *.jpg          image/jpeg
 *.js       text/javascript, application/javascript
 *.json    application/json
 *.mp2    audio/mpeg, video/mpeg
 *.mp3    audio/mpeg
 *.mp4    audio/mp4, video/mp4
 *.mpeg    video/mpeg
 *.mpg    video/mpeg
 *.mpp    application/vnd.ms-project
 *.ogg    application/ogg, audio/ogg
 *.pdf    application/pdf
 *.png    image/png
 *.pot    application/vnd.ms-powerpoint
 *.pps    application/vnd.ms-powerpoint
 *.ppt    application/vnd.ms-powerpoint
 *.rtf            application/rtf, text/rtf
 *.svf           image/vnd.svf
 *.tif         image/tiff
 *.tiff       image/tiff
 *.txt           text/plain
 *.wdb    application/vnd.ms-works
 *.wps    application/vnd.ms-works
 *.xhtml    application/xhtml+xml
 *.xlc      application/vnd.ms-excel
 *.xlm    application/vnd.ms-excel
 *.xls           application/vnd.ms-excel
 *.xlt      application/vnd.ms-excel
 *.xlw      application/vnd.ms-excel
 *.xml    text/xml, application/xml
 *.zip            application/zip
 *.xlsx     application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
 */

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
