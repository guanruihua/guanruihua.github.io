import React from 'react'
import { Chart, Flex, Grid } from 'aurad'

const getResistance = (x: number) => {
  if (x <= 0) return 1 - x / 100 / 2
  if (x > 0 && x <= 75) return 1 - x / 100
  // if (x > 75)
  return 1 - 1 / ((4 * x) / 100 - 1)
}

export const Resistance = () => {
  const start = -100
  const end = 200
  const gap = 20

  const data: [number, number][] = []

  new Array((end - start) / gap).fill(0).map((_, i) => {
    const x = start + i * gap
    const y = getResistance(x)
    data.push([x, y])
  })

  const options = {
    xAxis: {
      type: 'category',
      name: '抗性(%)',
      data: data.map((_) => _[0]),
    },
    yAxis: {
      type: 'value',
      name: '抗性系数',
    },
    series: [
      {
        data: data.map((_) => _[1]),
        type: 'line',
        smooth: true,
      },
    ],
  }
  return (
    <div>
      <h2>抗性</h2>
      <br />
      <br />

      <Flex alginCenter>
        <p>抗性系数 =</p>
        <Grid
          columns={2}
          style={{
            borderLeft: '1px solid #fff',
            margin: 5,
            paddingLeft: 15,
            borderRadius: 0,
          }}
        >
          <p>{`1- 抗性 / 2`}</p>
          <p>{`抗性 <= 0`}</p>
          <p>{`1-抗性`}</p>
          <p>{`0<=抗性<=75%`}</p>
          <p>{`1-1/ (4 * 抗性 + 1)`}</p>
          <p>{`抗性>75%`}</p>
        </Grid>
      </Flex>
      {/* <Chart
        style={{
          minWidth: 200,
          minHeight: 300,
        }}
        options={options}
      /> */}
    </div>
  )
}
