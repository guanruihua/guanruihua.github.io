import './index.less'

// CSS 3D 立方体
// [🎲 纯 CSS 搞定 3D 旋转立方体？还附赠一个「天坑」解决方案！🎲 纯 CSS 搞定 3D 旋转立方体？还附赠一 - 掘金](https://juejin.cn/post/7659563288543952902)
export default function Demo_css_3d_cube() {
  return (
    <div className="demo__css-3d-cube">
      <div className="box-wrap">
        <div className="box">
          <div className="face front">前</div>
          <div className="face back">后</div>
          <div className="face left">左</div>
          <div className="face right">右</div>
          <div className="face top">上</div>
          <div className="face bottom">下</div>
        </div>
      </div>
    </div>
  )
}
