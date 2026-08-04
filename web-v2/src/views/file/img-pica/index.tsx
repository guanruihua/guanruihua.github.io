import React, { useState, useRef, useCallback } from 'react'
import pica from 'pica'
import './index.less'
import { Button, Input } from 'antd'
import { InputNumber } from 'antd'

export default function Module_img_pica() {
  // 状态管理
  const [originalImage, setOriginalImage] = useState(null) // 原始图片 URL（用于显示）
  const [scaledImageUrl, setScaledImageUrl] = useState(null) // 缩放结果 URL
  const [width, setWidth] = useState(300) // 目标宽度
  const [height, setHeight] = useState(200) // 目标高度
  const [loading, setLoading] = useState(false)

  // 引用 canvas 元素（用于 pica 操作）
  const sourceCanvasRef = useRef(null)
  const destCanvasRef = useRef(null)

  // 处理文件上传
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      const imgUrl = ev.target.result
      setOriginalImage(imgUrl)
      // 清空之前的缩放结果
      setScaledImageUrl(null)
    }
    reader.readAsDataURL(file)
  }

  // 执行缩放
  const handleScale = useCallback(async () => {
    if (!originalImage) return

    const img = new Image()
    img.src = originalImage
    await new Promise((resolve) => {
      img.onload = resolve
    })

    // 设置源 canvas 尺寸为原图尺寸
    const sourceCanvas = sourceCanvasRef.current
    sourceCanvas.width = img.width
    sourceCanvas.height = img.height
    const ctx = sourceCanvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

    // 设置目标 canvas 尺寸为指定的宽高
    const destCanvas = destCanvasRef.current
    destCanvas.width = width
    destCanvas.height = height

    setLoading(true)
    try {
      // 使用 pica 进行高质量缩放
      const result = await pica().resize(sourceCanvas, destCanvas, {
        quality: 3, // 0-3，3为最高质量
        // alpha: true, // 保留 alpha 通道
      })
      // 将结果转为 data URL 用于显示
      const dataUrl = result.toDataURL('image/jpeg', 0.9)
      setScaledImageUrl(dataUrl)
    } catch (error) {
      console.error('缩放失败:', error)
      alert('缩放失败，请检查控制台错误。')
    } finally {
      setLoading(false)
    }
  }, [originalImage, width, height])

  // 如果宽度或高度变化，且已有图片，可自动重新缩放（示例中由用户点击触发）
  return (
    <div className="module__img_pica">
      <div style={{ padding: '20px' }}>
        <h2>图片缩放工具（pica）</h2>

        <div style={{ marginBottom: '20px' }}>
          <label>选择图片：</label>
          <Input
            type="file"
            accept="image/*"
            style={{ marginTop: 10 }}
            onChange={handleFileChange}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>
            目标宽度：
            <InputNumber
              value={width}
              onChange={(v) => setWidth(v)}
              min={1}
              style={{ marginLeft: '10px', width: '80px' }}
            />
          </label>
          <label style={{ marginLeft: '20px' }}>
            目标高度：
            <InputNumber
              value={height}
              onChange={(v) => setHeight(v)}
              min={1}
              style={{ marginLeft: '10px', width: '80px' }}
            />
          </label>
          <Button
            onClick={handleScale}
            disabled={!originalImage || loading}
            style={{ marginLeft: '20px', padding: '6px 12px' }}
          >
            {loading ? '缩放中...' : '执行缩放'}
          </Button>
        </div>

        {/* 隐藏的 canvas，用于 pica 操作（不显示） */}
        <canvas ref={sourceCanvasRef} style={{ display: 'none' }} />
        <canvas ref={destCanvasRef} style={{ display: 'none' }} />

        {/* 显示原始图片和缩放结果 */}
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {originalImage && (
            <div>
              <h3>原始图片</h3>
              <img
                src={originalImage}
                alt="原始"
                style={{
                  maxWidth: '400px',
                  maxHeight: '400px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          )}
          {scaledImageUrl && (
            <div>
              <h3>
                缩放结果（{width}×{height}）
              </h3>
              <img
                src={scaledImageUrl}
                alt="缩放后"
                style={{
                  maxWidth: '400px',
                  maxHeight: '400px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
