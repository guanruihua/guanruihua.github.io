import React from 'react'

interface Props {
  [key: string]: any
}

export function DDlImg(props: Props) {
  const { src, ...rest } = props
  const [value, setValue] = React.useState<any>('')
  const init = async () => {
    try {
      if(!src) return
      const val = await fetch(src)
      console.log()
      setValue(val)
      // src && setValue(await import(src))
    } catch (error) {}
  }
  React.useEffect(() => {
    init()
  }, [src])

  return <img src={value} {...rest} />
}
