import React from 'react'
import './index.less'
import { usePageState } from './state'
import { default as Img_1 } from './image/1.png'
import { default as Img_2 } from './image/2.png'
import { default as Img_3 } from './image/3.png'

export default function () {
  usePageState()
  return (
    <div className="animation__3d-card">
      <div className="slideshow">
        <div className="slide" style={{ '--i': 0 } as React.CSSProperties}>
          <h2>
            Body<span>Wash</span>
          </h2>
          <img src={Img_1} alt="image1" />
        </div>

        <div className="slide" style={{ '--i': 1 } as React.CSSProperties}>
          <h2>
            Hair<span>Shampoo</span>
          </h2>
          <img src={Img_2} alt="image2" />
        </div>

        <div className="slide" style={{ '--i': 2 } as React.CSSProperties}>
          <h2>
            Body<span>Cream</span>
          </h2>
          <img src={Img_3} alt="image3" />
        </div>

        <div className="slide" style={{ '--i': 3 } as React.CSSProperties}>
          <h2>
            Hair<span>Detangler</span>
          </h2>
          <img src={Img_1} alt="image4" />
        </div>

        <div className="slide" style={{ '--i': 4 } as React.CSSProperties}>
          <h2>
            SPF 50<span>Sunscreen</span>
          </h2>
          <img src={Img_2} alt="image5" />
        </div>

        <div className="slide" style={{ '--i': 5 } as React.CSSProperties}>
          <h2>
            Conditioning<span>Treatment</span>
          </h2>
          <img src={Img_3} alt="image6" />
        </div>
      </div>
    </div>
  )
}
