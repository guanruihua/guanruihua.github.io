import './index.less'

export default function Responsive_grid_layout() {
  const list = [
    'kkx',
    'lf',
    'wqsy',
    'hsm',
    'lw',
    'you',
    'ban',
    'lf2',
    'zz',
    'mr',
  ]

  return (
    <div className="animation__responsive-grid-layout">
      {list.map((name) => (
        <img key={name} src={`/image/anime/${name}.png`} />
      ))}
    </div>
  )
}
