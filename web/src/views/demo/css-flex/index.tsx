import React from 'react'
import './index.less'
import { Grid, Ul } from 'aurad'

export default function () {
  return (
    <div className="demo__study-page-css-flex md">
      <div className="card render">
        <h3>flex：1</h3>
        <p>flex：1 是 flex-grow: 1, flex-shrink: 1,flex-basis: 0% 的缩写；</p>
        <hr />
        <Grid columns={2}>
          <div>
            <h4>flex-grow</h4>
            <p>内容的宽度是500px，flex item的flex-basic是60px。</p>
            <p>A,B 为 flex-grow:1 / C和D为 flex-grow:4</p>
            <div className="content">
              <div className="box" style={{ background: 'red' }}>
                A(86)
              </div>
              <div className="box" style={{ background: 'lightblue' }}>
                B(86)
              </div>
              <div className="box1" style={{ background: 'yellow' }}>
                C(164)
              </div>
              <div className="box1" style={{ background: 'brown' }}>
                D(164)
              </div>
            </div>
            <p>已知条件：</p>
            <Ul
              items={[
                '容器宽度：500px',
                '每个项目的 flex-basis: 60px',
                '总项目数：4个',
                'A、B：flex-grow: 1',
                'C、D：flex-grow: 4',
              ]}
            />
            <p>计算步骤：</p>
            <p>计算剩余空间：</p>
            <ul>
              <li>剩余空间 = 容器宽度 - 所有项目的flex-basis总和</li>
              <li>剩余空间 = 500 - (60 × 4) = 500 - 240 = 260px</li>
            </ul>
            <p>计算flex-grow总和：</p>
            <Ul items={['flex-grow总和 = 1 + 1 + 4 + 4 = 10']} />
            <p>计算每个flex-grow单位分配的空间：</p>
            <Ul
              items={[
                '每个单位分配 = 剩余空间 ÷ flex-grow总和 = 260 ÷ 10 = 26px',
              ]}
            />
            <p>计算每个项目的最终宽度：</p>
            <Ul
              items={[
                'A = 60 + 26 × 1 = 86px',
                'B = 60 + 26 × 1 = 86px ',
                'C = 60 + 26 × 4 = 164px',
                'D = 60 + 26 × 4 = 164px',
              ]}
            />
            <p>总:</p>
            <Ul
              items={[
                'A = B = 60 + ((500 - 60 * 4)/ (1+1+4+4)) * 1 = 86',
                'C = D = 60 + ((500 - 60 * 4)/ (1+1+4+4)) * 4 = 164',
              ]}
            />
          </div>
          <div>
            <h4>flex-shrink</h4>
            <div className="content2">
              <div
                className="box"
                style={{ background: 'red', flexBasis: 100 }}
              >
                A(83.88)
              </div>
              <div
                className="box"
                style={{ background: 'lightblue', flexBasis: 200 }}
              >
                B(167.73)
              </div>
              <div
                className="box1"
                style={{ background: 'yellow', flexBasis: 300 }}
              >
                C(106.45)
              </div>
              <div
                className="box1"
                style={{ background: 'brown', flexBasis: 400 }}
              >
                D(141.94)
              </div>
            </div>
            <p>已知条件：</p>
            <Ul
              items={[
                '容器宽度：500px',
                '项目基础尺寸和收缩因子：',
                'A: flex-basis: 100px, flex-shrink: 1',
                'B: flex-basis: 200px, flex-shrink: 1',
                'C: flex-basis: 300px, flex-shrink: 4',
                'D: flex-basis: 400px, flex-shrink: 4',
              ]}
            />
            <p>计算步骤：</p>
            <p>计算超出空间（需要收缩的总量）：</p>
            <Ul
              items={[
                '总基础宽度 = 100 + 200 + 300 + 400 = 1000px',
                '超出空间 = 1000 - 500 = 500px（需要收缩的空间）',
              ]}
            />
            <p>计算收缩权重总和：</p>
            <Ul
              items={[
                '收缩权重总和 = (100 × 1) + (200 × 1) + (300 × 4) + (400 × 4) = 100 + 200 + 1200 + 1600 = 3100',
              ]}
            />
            <p>计算每个项目的收缩比例：</p>
            <Ul
              items={[
                'A的收缩比例 = (100 × 1) ÷ 3100 = 100/3100 ≈ 0.032258',
                'B的收缩比例 = (200 × 1) ÷ 3100 = 200/3100 ≈ 0.064516  ',
                'C的收缩比例 = (300 × 4) ÷ 3100 = 1200/3100 ≈ 0.387097',
                'D的收缩比例 = (400 × 4) ÷ 3100 = 1600/3100 ≈ 0.516129',
                '验证：0.032258 + 0.064516 + 0.387097 + 0.516129 ≈ 1.000000 ✓',
              ]}
            />
            <p>计算每个项目需要收缩的空间：</p>
            <Ul
              items={[
                'A收缩空间 = 500 × (100/3100) ≈ 16.129px',
                'B收缩空间 = 500 × (200/3100) ≈ 32.258px',
                'C收缩空间 = 500 × (1200/3100) ≈ 193.548px  ',
                'D收缩空间 = 500 × (1600/3100) ≈ 258.065px',
                '验证：16.129 + 32.258 + 193.548 + 258.065 ≈ 500px ✓',
                
              ]}
            />
            <p>计算最终宽度：</p>
            <Ul
              items={[
                'A最终宽度 = 100 - 16.129 ≈ 83.871px',
                'B最终宽度 = 200 - 32.258 ≈ 167.742px',
                'C最终宽度 = 300 - 193.548 ≈ 106.452px',
                'D最终宽度 = 400 - 258.065 ≈ 141.935px',
                '验证：83.871 + 167.742 + 106.452 + 141.935 ≈ 500px ✓',
              ]}
            />
            <p>
              A = 100 - 100 * 1 / (100 * 1 + 200 * 1 + 300 * 4 + 400 * 4) * NT =
              83.87096774193549
            </p>
            <p>
              B = 200 - 200 * 1 / (100 * 1 + 200 * 1 + 300 * 4 + 400 * 4) * NT =
              167.74193548387098
            </p>
            <p>
              C = 300 - 300 * 4 / (100 * 1 + 200 * 1 + 300 * 4 + 400 * 4) * NT =
              106.45161290322582
            </p>
            <p>
              D = 400 - 400 * 4 / (100 * 1 + 200 * 1 + 300 * 4 + 400 * 4) * NT =
              141.93548387096774
            </p>
          </div>
        </Grid>
      </div>
    </div>
  )
}
