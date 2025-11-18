import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const MD = ({ value = '' }: { value: string }) => {
  return <Markdown remarkPlugins={[remarkGfm]}>{value}</Markdown>
}
