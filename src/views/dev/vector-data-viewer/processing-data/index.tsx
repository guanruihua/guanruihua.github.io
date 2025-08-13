import { Button, Div, Input, message, Tab } from 'aurad'
import React from 'react'
import './index.less'
import { getFileContent } from '../../file-review/helper'
import { useSetState } from '0hook'
import { req } from '@/util'
import { isEffectArray } from 'asura-eye'

export interface VectorDataProps {
  h: any
  [key: string]: any
}

export function ProcessingData(props: VectorDataProps) {
  // const { h } = props
  // const { state, setState } = h

  const uploadBtnRef = React.useRef<HTMLInputElement>(null)

  const [own, setOwn] = useSetState(
    {
      active: '1',
      name: '',
      fileContent: '',
      textChunks: [],
      vectors: [],
    },
    'dev/vector-data-viewer|processing-data|cache',
  )

  const handleSaveVectorDB = async () => {
    const res = await req({
      method: 'post',
      url: '/vector/save2VectorDB',
      params: {
        name: own.name ?? 'tmp',
        textChunks: own.textChunks || [],
      },
    })
    const { code } = res?.data || {}
    console.log(res?.data)
    if (code === 200) message.success('Save data to VectorDB Success')
    else message.error('Save data to VectorDB Error')
  }

  const handleClear = () => {
    setOwn({
      active: '1',
      name: '',
      fileContent: '',
      textChunks: [],
      vectors: [],
    })
  }
  const handleGenTextChunkVector = async () => {
    const res = await req({
      method: 'post',
      url: '/vector/genTextChunkVectors',
      params: {
        name: own.name ?? 'tmp',
        list: own.textChunks,
      },
    })
    const value = res?.data?.data || []
    console.log(value)

    setOwn({
      active: '3',
      vectors:
        value.map((item: any) => {
          const { vector, ...rest } = item
          return { ...rest }
        }) || [],
    })
  }
  const handleGenTextChunk = async () => {
    const res = await req({
      method: 'post',
      url: '/vector/genTextChunks',
      params: {
        value: own.fileContent,
      },
    })
    const value = res?.data?.data || []
    console.log(value)

    setOwn({
      active: '2',
      textChunks: value,
    })
  }

  const handleReadFile = async (file: any) => {
    const content = await getFileContent(file)
    console.log(content)
    setOwn({
      active: '1',
      fileContent: content,
    })
  }

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
                  <div className="item header text">Text</div>
                  {own?.vectors?.map((item: any, i: number) => {
                    const { id, text } = item
                    return (
                      <React.Fragment key={i}>
                        <div className="item id">{id}</div>
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
