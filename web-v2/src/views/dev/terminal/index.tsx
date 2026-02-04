import './index.less'
import { usePageState } from './state'

export default function Animation_Terminal() {
  const { items } = usePageState()

  return (
    <div className="dev__terminal">
      <div className="url-items">
        {items.map((item, i) => {
          return (
            <div
              key={i}
              className="item"
              data-url={item.url}
              data-status={'4xx'}
            >
              <span className="code">404</span>
              <span
                className="url"
                onClick={() => {
                  window.open(item.url, '__blank')
                }}
              >
                {item.url}
              </span>
              {item.title && (
                <>
                  <span className="gap">/</span>
                  <span className="title">{item.title}</span>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
