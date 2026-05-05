import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './index.less'
import { DiagonalLoading } from '../diagonal-loading'
import { isString } from 'asura-eye'

type Props = {
  value: string
}

export function Md(props: Props) {
  const { value } = props

  return (
    <div className="r-markdown">
      {isString(value) && value?.length ? (
        <Markdown
          remarkPlugins={[remarkGfm]}
          children={value}
          components={{
            code(props) {
              // eslint-disable-next-line
              const { children, className, node,  ...rest } = props
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={dark}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              )
            },
          }}
        />
      ) : (
        <DiagonalLoading />
      )}
    </div>
  )
}
