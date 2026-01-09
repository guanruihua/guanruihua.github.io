import { Div } from 'aurad'

export const Module = (item: {
  name: string
  show?: boolean
  next: any[]
  onClick: any
}) => {
  const { name, next, show = true, onClick } = item

  return (
    <Div className="guide-module" none={show == false}>
      <div
        className="bg"
        style={{
          background: 'url(/image/bg.png)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          filter: 'opacity(17%) blur(1px)',
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      />
      {name && <div className="title">{name}</div>}
      {next?.map((child: any[], j) => {
        const [name, url, show = true] = child
        return (
          <Div
            key={j}
            none={show === false}
            className="guide-item"
            onClick={() => onClick(url)}
          >
            {name}
          </Div>
        )
      })}
    </Div>
  )
}
