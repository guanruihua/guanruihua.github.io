import { Md } from '@/components'
import { TextLengthStatistics } from './modules/TextLengthStatistics'
import { useTransformFactoryStore } from '../store'
import { EditorPro } from '../components/editor-pro'

export function Review() {
  const state = useTransformFactoryStore()
  // console.log(state.to_value)
  const value = state.to_value
  switch (state.to_lang) {
    case 'xml2json':
      return (
        <EditorPro
          //
          lang="json"
          dataKey="to"
          value={value}
        />
      )
    case 'json2XML':
    case 'html2react':
      return (
        <EditorPro
          //
          lang="html"
          dataKey="to"
          value={value}
        />
      )
    case 'ReviewHTML': {
      return <div dangerouslySetInnerHTML={{ __html: state.from_value }} />
    }
    case 'TextLengthStatistics': {
      return <TextLengthStatistics state={state} />
    }

    case 'MarkdownReview':
      return (
        <div className="markdown-review review-box">
          <Md value={state?.from_value} />
        </div>
      )
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: 200,
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 15,
      }}
    >
      No Review
    </div>
  )
}
