import { Input } from 'antd'
import './index.less'
import { useSetState } from '0hook'

export default function CSS_cubic_bezier() {
  const [state, setState] = useSetState({
    value: '0.68, -0.55, 0.27, 1.55',
  })

  const items = [
    ['https://cubic-bezier.com/', 'cubic-bezier'],
    ['https://easings.net/zh-cn', 'easings.net'],
    ['https://cubic-bezier.tupulin.com/', 'cubic-bezier.tupulin.com'],
  ]

  return (
    <div className="animation__cubic-bezier flex flex-row gap-5">
      <div className="flex flex-col justify-between border-2 rounded-xl p-3! gap-y-2 border-white/50">
        <Input
          value={state.value}
          onChange={(e) => {
            setState({ value: e.target.value })
          }}
        />
        <div className="flex flex-col gap-y-2">
          {items.map(([url, label]) => (
            <a
              key={url}
              className="delay-600 transition-colors ease-[cubic-bezier(0.68, -0.55, 0.27, 1.55)] bg-white/30 p-2! rounded-xl hover:text-green-400! hover:bg-white/10"
              target="__blank"
              href={url}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="h-[--height] border-2 border-white/50 flex-1 rounded-xl">
        <div
          className="bounce border-2 w-50 font-bold text-white/80 bg-white/10 text-center text-2xl rounded-3xl leading-25 mx-auto! my-75!"
          style={{
            transition: `transform 1.8s cubic-bezier(${state.value})`,
          }}
        >
          🚀发射！
        </div>
      </div>
    </div>
  )
}
