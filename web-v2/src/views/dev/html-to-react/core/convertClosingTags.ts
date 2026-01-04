export function convertClosingTags(target: string) {
  // 自闭合标签列表
  const selfClosingTags = [
    'img',
    'input',
    'br',
    'hr',
    'meta',
    'link',
    'area',
    'base',
    'col',
    'command',
    'embed',
    'keygen',
    'param',
    'source',
    'track',
    'wbr',
  ]
  const regex = new RegExp(
    `<(${selfClosingTags.join('|')})([^>]*?)(?<!\\/)>`,
    'g',
  )
  return target.replace(regex, '<$1$2 />')
}
