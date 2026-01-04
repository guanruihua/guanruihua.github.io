import { ObjectType } from '0type'

export function convertAttr(target: string) {
  const mapping: ObjectType<string> = {
    class: 'className',
    for: 'htmlFor',
    tabindex: 'tabIndex',
    maxlength: 'maxLength',
    cellspacing: 'cellSpacing',
    cellpadding: 'cellPadding',
    contenteditable: 'contentEditable',
    autocomplete: 'autoComplete',
    autofocus: 'autoFocus',
  }
  Object.keys(mapping).forEach((key) => {
    if (target.includes(key + '='))
      target = target.replaceAll(key + '=', mapping[key] + '=')
    if (target.includes(key + ' '))
      target = target.replaceAll(key + ' ', mapping[key])
  })
  return target
}
