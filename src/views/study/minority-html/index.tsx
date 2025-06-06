import React from 'react'
import './index.less'
import { Docs, Grid } from 'aurad'

export default function () {
  return (
    <div className="minority-html">
      <Docs
        items={[
          {
            title: 'meter & progress',
            children: (
              <Grid>
                <p>元素是显示进度条的语义正确方式。</p>
                <p>
                  除了在已知范围内显示标量测量值外，它还允许我们指定值的低，高和最佳范围。
                </p>
                <meter
                  min="0"
                  max="100"
                  low={25}
                  high={75}
                  optimum={80}
                  value="10"
                ></meter>
                <meter
                  min="0"
                  max="100"
                  low={25}
                  high={75}
                  optimum={80}
                  value="50"
                ></meter>
                <meter
                  min="0"
                  max="100"
                  low={25}
                  high={75}
                  optimum={80}
                  value="80"
                ></meter>
              </Grid>
            ),
          },
        ]}
      />
    </div>
  )
}
