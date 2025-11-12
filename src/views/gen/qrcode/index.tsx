import React, { useState, useRef } from 'react'
import { Button, Flex, Grid, Input, Select } from 'aurad'
import { QRCodeCanvas } from 'qrcode.react'
import './index.less'

export default function () {
  const [settings, setSettings] = useState({
    text: 'https://example.com',
    size: 200,
    level: 'M',
    bgColor: '#ffffff',
    fgColor: '#000000',
    includeMargin: false,
  })

  const qrRef = useRef<any>(null)

  const handleInputChange = (field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const downloadQRCode = (format = 'png') => {
    const canvas = qrRef.current.querySelector('canvas')

    if (format === 'png') {
      const pngUrl = canvas.toDataURL('image/png')
      downloadImage(pngUrl, 'qrcode.png')
    } else if (format === 'svg') {
      // 对于SVG格式，需要额外的处理
      const svgBlob = new Blob([qrRef.current.innerHTML], {
        type: 'image/svg+xml',
      })
      const svgUrl = URL.createObjectURL(svgBlob)
      downloadImage(svgUrl, 'qrcode.svg')
    }
  }

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
  }
  return (
    <Grid
      className="gen__qrcode"
      style={{
        gridTemplateColumns: 'auto auto',
        alignContent: 'center',
      }}
    >
      <Grid
        style={{
          alignContent: 'flex-start',
        }}
      >
        <div>
          <label>内容: </label>
          <Input
            type="text"
            value={settings.text}
            onChange={(e: any) => handleInputChange('text', e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>大小: </label>
          <Input
            type="number"
            value={settings.size}
            onChange={(e) =>
              handleInputChange('size', parseInt(e.target.value))
            }
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>纠错级别: </label>
          <Select
            value={settings.level}
            onChange={(e) => handleInputChange('level', e.target.value)}
            options={[
              { value: 'L', label: 'L (低)' },
              { value: 'M', label: 'M (中)' },
              { value: 'Q', label: 'Q (高)' },
              { value: 'H', label: 'H (最高)' },
            ]}
          />
        </div>

        <div>
          <label>前景色: </label>
          <Input
            type="color"
            value={settings.fgColor}
            onChange={(e) => handleInputChange('fgColor', e.target.value)}
            style={{ width: '100%', height: 32 }}
          />
        </div>

        <div>
          <label>背景色: </label>
          <Input
            type="color"
            value={settings.bgColor}
            onChange={(e) => handleInputChange('bgColor', e.target.value)}
            style={{ width: '100%', height: 32 }}
          />
        </div>
      </Grid>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        {/* <h2>高级二维码生成器</h2> */}

        <div
          ref={qrRef}
          style={{
            padding: '20px',
            border: '1px solid #ddd',
            display: 'inline-block',
            backgroundColor: 'white',
            marginBottom: '20px',
          }}
        >
          <QRCodeCanvas
            value={settings.text}
            size={settings.size}
            level={settings.level}
            bgColor={settings.bgColor}
            fgColor={settings.fgColor}
            includeMargin={settings.includeMargin}
          />
        </div>

        <Flex>
          <Button
            onClick={() => downloadQRCode('png')}
            // style={{ marginRight: '10px', padding: '10px 20px' }}
          >
            下载PNG
          </Button>
          <Button
            onClick={() => downloadQRCode('svg')}
            // style={{ padding: '10px 20px' }}
          >
            下载SVG
          </Button>
        </Flex>
      </div>
    </Grid>
  )
}
