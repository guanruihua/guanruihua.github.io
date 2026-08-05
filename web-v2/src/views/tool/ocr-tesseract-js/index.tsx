import { useState } from 'react'
import Tesseract from 'tesseract.js'
import './index.less'
import { Button } from 'antd'
import { Input } from 'antd'
import default_png from './eng_bw.png'

export default function Module__ocr_tesseract_js() {
  const [image, setImage] = useState(default_png) // 当前选中的图片 URL
  const [text, setText] = useState('') // 识别出的文字
  const [progress, setProgress] = useState(0) // 识别进度 0~100
  const [status, setStatus] = useState('idle') // idle | loading | done | error

  // 处理文件选择
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
      setText('')
      setProgress(0)
      setStatus('idle')
    }
    reader.readAsDataURL(file)
  }

  // 执行 OCR 识别
  const handleRecognize = async () => {
    if (!image) return
    setStatus('loading')
    setProgress(0)

    try {
      const result = await Tesseract.recognize(image, 'eng+chi_sim', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100))
          }
        },
      })
      setText(result.data.text)
      setStatus('done')
    } catch (error) {
      console.error(error)
      setStatus('error')
      setText('识别失败，请重试')
    }
  }
  return (
    <div className="module__ocr_tesseract_js">
      <div className="h2">📸 Tesseract.js OCR</div>
      <div className="container">
        <div className="left">
          <div className="btns">
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            <Button
              onClick={handleRecognize}
              loading={status === 'loading'}
              disabled={!image || status === 'loading'}
              style={{ minWidth: 120 }}
            >
              {status === 'loading' ? '识别中...' : '开始识别'}
            </Button>
          </div>

          {image && <img className="review-img" src={image} alt="待识别图片" />}
        </div>

        <div className="right">
          {status === 'loading' && (
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  background: '#eee',
                  height: 8,
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    background: '#4caf50',
                    height: '100%',
                    width: `${progress}%`,
                  }}
                />
              </div>
              <span>{progress}%</span>
            </div>
          )}

          {status === 'done' && (
            <div
              style={{
                padding: 12,
                borderRadius: 4,
                whiteSpace: 'pre-wrap',
              }}
            >
              <h4>识别结果：</h4>
              {text || '（未识别到文字）'}
            </div>
          )}

          {status === 'error' && (
            <div style={{ color: 'red', marginBottom: 16 }}>
              ⚠️ 识别出错，请检查网络或图片质量。
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
