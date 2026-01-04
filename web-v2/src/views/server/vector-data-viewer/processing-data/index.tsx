import { Button, Div, Input, message, Tab } from 'aurad'
import React from 'react'
import './index.less'
import { isEffectArray } from 'asura-eye'
import { useSetOwnState } from './state'

export interface VectorDataProps {
  h: any
  [key: string]: any
}

export function ProcessingData(props: VectorDataProps) {
  // const { h } = props
  // const { state, setState } = h

  const {
    own,
    setOwn,
    uploadBtnRef,
    handleSaveVectorDB,
    handleReadFile,
    handleGenTextChunk,
    handleGenTextChunkVector,
    handleClear,
  } = useSetOwnState()

  return (
    <div className="tool-vector-data-viewer__processing-data">
      <div className="left-aside">
        <input
          ref={uploadBtnRef}
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0]
            handleReadFile(file)
          }}
        />
        <Input
          value={own.name}
          onChange={(e: any) => {
            setOwn({
              name: e.target.value || '',
            })
          }}
        />
        <Button onClick={() => uploadBtnRef.current?.click()}>
          Upload File
        </Button>
        <Button
          disabled={!own.fileContent}
          onClick={() => handleGenTextChunk()}
        >
          Text Chunk
        </Button>
        <Button
          disabled={!isEffectArray(own.textChunks)}
          onClick={() => handleGenTextChunkVector()}
        >
          Vectorization
        </Button>
        <Button onClick={() => handleSaveVectorDB()}>Save Vector DB</Button>
        <Button onClick={() => handleClear()}>Clear</Button>
      </div>
      <div className="right-aside">
        <Tab
          value={own.active}
          onChange={(active) => setOwn({ active })}
          items={[
            {
              key: '1',
              title: 'File Content',
              children: <pre>{own.fileContent}</pre>,
            },
            {
              key: '2',
              title: 'Chunks Data',
              children: (
                <div className="chunks-data">
                  {own?.textChunks?.map((item: string, i: number) => {
                    return (
                      <div key={i} className="row">
                        {item}
                      </div>
                    )
                  })}
                </div>
              ),
            },
            {
              key: '3',
              title: 'Vector Data',
              children: (
                <div className="vectors-data">
                  <div className="item header id">ID</div>
                  <div className="item header key">Key</div>
                  <div className="item header text">Text</div>
                  {own?.vectors?.map((item: any, i: number) => {
                    const { id, key, text } = item
                    return (
                      <React.Fragment key={i}>
                        <div className="item id">{id}</div>
                        <div className="item key">{key}</div>
                        <div className="item text">{text}</div>
                      </React.Fragment>
                    )
                  })}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}
