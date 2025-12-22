import React from 'react'
import './index.less'

export default function () {
  React.useEffect(() => {
    let next = document.querySelector('.next')
    let prev = document.querySelector('.prev')
    if (!next || !prev) return

    next.addEventListener('click', function () {
      let items = document.querySelectorAll('.item')
      document.querySelector('.slide')?.appendChild(items[0])
    })

    prev.addEventListener('click', function () {
      let items = document.querySelectorAll('.item')
      document.querySelector('.slide')?.prepend(items[items.length - 1])
    })
  }, [])
  return (
    <div className="animation__animated-image-slider">
      <div className="container">
        <div className="slide">
          <div
            className="item"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            }}
          >
            <div className="content">
              <div className="name">Scotland</div>
              <div className="des">
                Experience the mystical Highlands under twilight skies and misty
                lochs.
              </div>
              <button>See More</button>
            </div>
          </div>
          <div
            className="item"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            }}
          >
            <div className="content">
              <div className="name">Norway</div>
              <div className="des">
                Chase the Northern Lights under star-lit skies along scenic
                fjord roads.
              </div>
              <button>See More</button>
            </div>
          </div>
          <div
            className="item"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            }}
          >
            <div className="content">
              <div className="name">New Zealand</div>
              <div className="des">
                Wander dramatic, mist-laden mountain paths that feel straight
                out of a dream.
              </div>
              <button>See More</button>
            </div>
          </div>
          <div
            className="item"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            }}
          >
            <div className="content">
              <div className="name">Japan</div>
              <div className="des">
                Discover serene mountain temples shrouded in dusk and ancient
                forest trails.
              </div>
              <button>See More</button>
            </div>
          </div>
        </div>
        <div className="button">
          <button className="prev">◁</button>
          <button className="next">▷</button>
        </div>
      </div>
    </div>
  )
}
