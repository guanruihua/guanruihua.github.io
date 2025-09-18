import React from 'react'
import { Grid } from 'aurad'

export const items = [
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
  {
    title: 'sup & sub',
    children: (
      <Grid>
        <p>
          x<sup>2</sup>
        </p>
        <p>
          x<sub>2</sub>
        </p>
      </Grid>
    ),
  },
  {
    title: 'datalist',
    children: (
      <Grid>
        <p>
          <label htmlFor="choice">Choice</label>
          <input type="text" id="choice" list="choice-list" />
          <datalist id="choice-list">
            <option>a</option>
            <option>b</option>
            <option>c</option>
          </datalist>
        </p>
      </Grid>
    ),
  },
  {
    title: 'object',
    children: (
      <Grid>
        <object
          style={{ maxHeight: 100 }}
          data="image/tmp.jpg"
          useMap="tmp-map"
        />
      </Grid>
    ),
  },
  {
    title: 'abbr',
    children: <p>You can use <abbr title='Cascading Style Sheets'>CSS</abbr></p>,
  },
]
