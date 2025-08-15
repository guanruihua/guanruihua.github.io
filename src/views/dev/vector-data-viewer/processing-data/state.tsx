import React from 'react'
import { getFileContent } from '../../file-review/helper'
import { useSetState } from '0hook'
import { message } from 'aurad'
import { req } from '@/util'

export const useSetOwnState = () => {
  const uploadBtnRef = React.useRef<HTMLInputElement>(null)

  const [own, setOwn] = useSetState(
    {
      fileType: '',
      active: '1',
      name: '',
      fileContent: '',
      jsonContent: [],
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
        textChunks:
          own.fileType === 'json' ? own.jsonContent : own.textChunks || [],
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
        list: own.fileType === 'json' ? own.jsonContent : own.textChunks,
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
    const fileType = file.name.split('.').at(-1)
    const content = await getFileContent(file)
    console.log(content)
    if (fileType === 'json') {
      try {
        const jsonContent = JSON.parse(content.trim()) || []
        setOwn({
          fileType,
          active: '2',
          fileContent: content,
          jsonContent: jsonContent,
          textChunks: jsonContent?.map((item: any) => item.text),
        })
      } catch (error) {
        console.error(error)
        setOwn({
          fileType,
          active: '1',
          fileContent: content,
          textChunks: [],
        })
      }
    } else {
      setOwn({
        fileType,
        active: '1',
        fileContent: content,
      })
    }
  }

  return {
    own,
    setOwn,
    uploadBtnRef,
    handleSaveVectorDB,
    handleReadFile,
    handleGenTextChunk,
    handleGenTextChunkVector,
    handleClear,
  }
}
