import ContainerTo from './container-to/index.tsx'
import './style/index.less'
import './style/container-box__to.less'
import { Button, Select } from 'antd'
import { Languages } from './conf/languages.tsx'
import { timeString } from './helper/get.ts'
import useFromState from './state.tsx'
import ContainerFromTime from './container-from/time/index.tsx'
import { EditorPro } from './components/editor-pro/index.tsx'

export default function Module_transform() {
  const { state, conf = {}, handleClick } = useFromState()

  const MyButton = ({ item }) => {
    const [key, label, conf = {}]: any[] = item
    const { selectHighlight = false, ...buttonProps } = conf
    const keys = Object.keys(buttonProps)
    if (!keys.includes('disabled')) {
      buttonProps.disabled = conf.disabled
    }
    if (selectHighlight && state.to_lang === key) {
      buttonProps.type = 'primary'
    } else {
      buttonProps.type = buttonProps.type || 'default'
    }

    return (
      <Button key={key} onClick={() => handleClick(key)} {...buttonProps}>
        {label}
      </Button>
    )
  }

  const lang = conf.lang || state.from_lang
  const buttons = conf?.buttons || []

  return (
    <div
      className="module__transform-factory"
      data-from-enabled={!!state?.from_enabled}
      data-to-enabled={!!state?.to_enabled}
    >
      <div className="module__transform-factory-header">
        <Select
          className="module__transform-factory-header__from_lang"
          value={state?.from_lang}
          showSearch
          options={Languages}
          onChange={(val) =>
            state.set({
              from_editor_key: timeString(),
              from_lang: val,
              to_enabled: false,
              to_lang: '',
              from_enabled: true,
              to_editor_key: timeString(),
              to_value: '',
            })
          }
        />

        {buttons?.map((item, i) => (
          <MyButton key={i} item={item} />
        ))}
      </div>
      <div
        className="container"
        style={{
          gridTemplateColumns:
            [state.from_enabled, state.to_enabled]
              .filter(Boolean)
              .map(() => '1fr')
              .join(' ') || '1fr',
        }}
      >
        {state?.from_enabled && (
          <div className="left container-box container-box__form">
            {state?.from_lang === 'time' ? (
              <ContainerFromTime />
            ) : (
              <EditorPro
                key={state.from_editor_key}
                dataKey="from"
                value={state.from_value}
                setValue={(value) => state.set({ from_value: value })}
                lang={lang}
              />
            )}
          </div>
        )}
        {state?.to_enabled && <ContainerTo />}
      </div>
    </div>
  )
}
