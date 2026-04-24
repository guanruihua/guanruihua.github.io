import './index.less'

// 0 - 1
// const l = 50
// 0 - 0.4
const c = 30
// 0 - 360
const h = 60
const Row = ({ c = 0.15 }: { c: number }) => {
  return (
    <div className="row">
      {new Array(h).fill('').map((_, hi) => (
        <div
          key={hi}
          className="cell"
          style={{
            background: `oklch(0.7 ${c} ${hi * 6} / 1)`,
          }}
        />
      ))}
    </div>
  )
}
/**
 
角度	颜色	英文	RGB 值
0°	红	Red	(255, 0, 0)
60°	黄	Yellow	(255, 255, 0)
120°	绿	Green	(0, 255, 0)
180°	青	Cyan	(0, 255, 255)
240°	蓝	Blue	(0, 0, 255)
300°	品红	Magenta	(255, 0, 255)
 */

export default function Demo_color() {
  return (
    <div className="demo__color">
      <div>
        <h2>oklch</h2>
        <div className="container">
          {new Array(c).fill('').map((_, ci) => (
            <Row c={(ci + 10) * 0.01} />
          ))}
        </div>
      </div>
      {/* <div>
        <h2>rgb</h2>
        <div className="container-rgb">
          <div className="hexagon"></div>
          {new Array(50).fill('').map((_, r) =>
            new Array(50).fill('').map((_, g) => (
              <div
                key={'rgb-' + r + g}
                className="cell"
                style={{
                  background: `rgb(${r * 5 + 5}, ${g * 5 + 5}, 55)`,
                }}
              />
            )),
          )}
        </div>
      </div> */}
    </div>
  )
}
