import React from 'react'
import { Button, Div, Flex } from 'aurad'
import { usePageState } from './hook'
import tmpPng from './tmp.jpg'
import './cropper.less'
import './index.less'
import { GlobalStyle } from './conf'

export default function () {
  const u = usePageState()

  return (
    <Div className="tool-img-clipper" style={GlobalStyle}>
      <div className="tool-img-clipper-container">
        <img ref={u.container} src={u.uploadFile || tmpPng} />
      </div>
      <Flex column className="tool-img-clipper-control">
        <Flex>
          <Button style={{ width: 270 }} onClick={u.handleUpload}>
            Upload Image
          </Button>
        </Flex>
        <Flex row>
          {u.previewImg.square && (
            <Flex column>
              <img className="preview" src={u.previewImg.square} />
              <Button onClick={() => u.handleDownload('square')}>
                Download
              </Button>
            </Flex>
          )}
          {u.previewImg.circle && (
            <Flex column>
              <img className="preview" src={u.previewImg.circle} />
              <Button onClick={() => u.handleDownload('circle')}>
                Download
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>

      <input
        ref={u.uploadRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
      />
    </Div>
  )
}
