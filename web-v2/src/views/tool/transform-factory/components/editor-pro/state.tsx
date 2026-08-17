import React from 'react'
import { useState, useRef } from 'react'
import { copy, Logger } from '@/util'
import { ObjectType } from '0type'
import { Languages } from '../../conf/languages'
import { get_to_value } from '../../helper/get-to-value'
import { timeString } from '../../helper/get'
import { useSetState } from '0hook'
import { useTransformFactoryStore } from '../../store'

export default function useEditorPro(props) {
  const store = useTransformFactoryStore()
  const [state, setState] = useSetState({
    editor_key: timeString(),
    lang: 'json',
    value: '',
    dataKey: '',
  })
  const setValue = (value) => {
    setState({ value })
    props?.setValue?.(value)
  }

  const [hasError, setHasError] = useState(false)

  const editorRef = useRef<any>(null)

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor
    // 修改 JSON 诊断选项以允许注释
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      allowComments: true, // 关键设置
      trailingCommas: 'ignore',
      schemas: [],
      validate: true,
    })

    monaco.editor.onDidChangeMarkers(([uri]) => {
      const markers = monaco.editor.getModelMarkers({ resource: uri })
      // console.log('错误已更新：', markers)
      const errors = markers.filter((marker) => marker.severity === 8)

      if (errors.length > 0) {
        // console.log('发现错误：', errors)
        setHasError(true)
      } else {
        setHasError(false)
      }
    })
  }

  const conf: ObjectType =
    Languages.find((_) => _.value === state.lang)?.conf || {}
  const template = conf?.default || ''

  /**
   * 格式化
   */
  async function Format() {
    const editor = editorRef.current

    if (!editor) return Logger.error('Format')

    // if (['xml', 'html'].includes(state.lang)) {
    //   setState({
    //     value: await get_to_value('prettier_format_xml', state),
    //   })
    // } else {
    editor.getAction('editor.action.formatDocument').run()
    // }

    Logger.success('Format')
  }

  /**
   * 压缩
   */
  async function Compress() {
    const editor = editorRef.current

    if (!editor) return

    setValue(await get_to_value('json_compress', state))
  }

  function Clear() {
    setValue('')
  }
  function Template() {
    setValue(template)
  }
  function Copy() {
    copy(state.value)
  }

  const handle = {
    Format,
    Compress,
    Clear,
    Template,
    Copy,
    Test: () => {
      Logger.info('Test')
    },
  }

  const handleClick = (action: string) => {
    Logger.info(`HandleClick/${action}`)
    const fn2 = handle?.[action]
    if (fn2) {
      fn2()
      return
    }

    return
  }

  React.useEffect(() => {
    const { lang = 'json', value = '', dataKey = '' } = props
    if (lang === state.lang && value === state.value) return
    setState({ lang, value, dataKey })
    if (dataKey) store.setEventBus(dataKey, handleClick)
  }, [props.lang, props.value])

  return {
    state,
    setState,
    setValue,
    conf,
    template,
    hasError,
    handleClick,
    handleEditorDidMount,
  }
}
