const selfFn = ['onClick', 'onclick', 'change', 'onChange', 'oninput']
const reg = new RegExp(`(${selfFn.join('|')})="(.*?)"`, 'g')

export function needConvertFnToReact(target: string) {
  return reg.test(target)
}

export function convertFnToReact(target: string) {
  return target.replace(reg, (match: string, str: string) => {
    if (str.toLowerCase() === 'onclick') match = match.replace(str, 'onClick')
    if (str.toLowerCase() === 'change') match = match.replace(str, 'onChange')
    if (str.toLowerCase() === 'onchange') match = match.replace(str, 'onChange')
    if (str.toLowerCase() === 'oninput') match = match.replace(str, 'onInput')

    return match.replace(/"(.*?)"/, '{$1}')
  })
}
