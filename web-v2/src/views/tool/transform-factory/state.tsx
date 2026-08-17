import { Logger } from '@/util'
import { Languages } from './conf/languages'
import {
  onlyBody,
  removeCommentsDOM,
  removeEmptyTagsDOM,
  removeTag,
  removeTagAttributesDOM,
} from './helper/html/html-remove-attr'
import { timeString } from './helper/get'
import { ObjectType } from '0type'
import { useTransformFactoryStore } from './store'
import { get_to_value } from './helper/get-to-value'

export default function useFromState() {
  const state = useTransformFactoryStore()
  const setState = state.set

  const conf: ObjectType =
    Languages.find((_) => _.value === state.from_lang)?.conf || {}

  /**
   * 格式化
   */
  const Format = () => state.EventBus?.from?.('Format')

  const markdown = {
    HalfWidth() {
      setState({
        from_value: (state?.from_value || '').normalize('NFKC'),
      })
    },
    FullWidth() {
      setState({
        from_value: (state?.from_value || '').replace(/[!-~]| /g, (c) => {
          if (c === ' ') return '　'
          return String.fromCharCode(c.charCodeAt(0) + 0xfee0)
        }),
      })
    },
    UpperCase() {
      setState({
        from_value: (state?.from_value || '').toUpperCase(),
      })
    },
    LowerCase() {
      setState({
        from_value: (state?.from_value || '').toLowerCase(),
      })
    },
    CharacterDeduplication() {
      setState({
        from_value: [...new Set(state?.from_value || '')].join('') || '',
      })
    },
  }

  const html = {
    OnlyBody() {
      Logger.info('OnlyBody')
      const new_value = onlyBody(state.from_value)
      setState({ from_value: new_value })
      Format()
    },
    RemoveAttribute() {
      Logger.info('RemoveAttribute')
      const new_value = removeTagAttributesDOM(state.from_value)
      setState({ from_value: new_value })
      Format()
    },
    RemoveComment() {
      Logger.info('RemoveComment')
      const new_value = removeCommentsDOM(state.from_value)
      setState({ from_value: new_value })
      Format()
    },
    RemoveEmptyTagsDOM() {
      Logger.info('RemoveEmptyTagsDOM')
      const new_value = removeEmptyTagsDOM(state.from_value)
      setState({ from_value: new_value })
      Format()
    },
    RemoveTag() {
      Logger.info('RemoveTag')
      const new_value = removeTag(
        removeCommentsDOM(removeTagAttributesDOM(state.from_value)),
      )
      setState({ from_value: new_value })
      Format()
    },
  }

  const handle = {
    html,
    markdown,
  }

  async function set_to_lang(lang: string) {
    if (state.to_lang === lang) {
      setState({
        to_enabled: false,
        to_lang: '',
        to_value: '',
      })
      return
    }

    setState({
      to_enabled: true,
      to_lang: lang,
      to_value: await get_to_value(lang, state),
      to_editor_key: lang + timeString(),
      from_editor_key: 'from' +lang + timeString(),
    })
  }

  const handleClick = (action: string) => {
    Logger.info(`HandleClick/${action}`)
    const fn = handle?.[state.from_lang]?.[action]
    if (fn) {
      fn()
      return
    }
    const fn2 = handle?.[action]
    if (fn2) {
      fn2()
      return
    }

    set_to_lang(action)
    return
  }
  console.log(state)
  return {
    state,
    conf,
    handleClick,
  }
}
