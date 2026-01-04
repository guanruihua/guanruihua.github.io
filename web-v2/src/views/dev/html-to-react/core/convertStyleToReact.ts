import { ObjectType } from '0type'

export function convertStyleToReact(styleStr: string) {
  const styleObj: ObjectType = {}
  styleStr.split(';').forEach((rule) => {
    // console.log(rule)
    const [key, val] = rule.split(/:(.+)/).map((s) => s.trim())
    if (key && val) {
      const reactKey = key.replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      )
      styleObj[reactKey] = val
    }
  })
  // console.log(styleObj)
  return JSON.stringify(styleObj)
}
