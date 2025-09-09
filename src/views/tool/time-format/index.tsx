import { Box, Button, Div, Flex, Grid } from 'aurad'
import React from 'react'
import dayjs from 'dayjs'
import { useSetState } from '0hook'
import './index.less'

export default function () {
  const [now, setNow] = React.useState(dayjs())
  const timer = React.useRef<number | null>(null)

  React.useEffect(() => {
    timer.current = setInterval(() => {
      setNow(dayjs())
    }, 1000)

    return () => {
      timer.current && clearInterval(timer.current)
    }
  }, [])

  const [state, setState] = useSetState(
    {
      timestamp: Date.now(),
      inputTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
    'tool__time-format__cache',
  )

  return (
    <Flex column className="tool__time-format" style={{ fontSize: 14 }}>
      <h3>现在</h3>
      <Grid
        style={{
          gridTemplateColumns: '200px 250px',
          lineHeight: '24px',
        }}
      >
        <Box>时间戳</Box>
        <Box>{now.valueOf()}</Box>
        <Box>时间</Box>
        <Box>{now.format('YYYY-MM-DD HH:mm:ss')}</Box>
      </Grid>
      <h3>编辑</h3>
      <Grid
        style={{
          gridTemplateColumns: '200px 250px 200px 200px 250px',
          lineHeight: '24px',
        }}
      >
        <Box>时间戳 (13位)</Box>
        <Box>
          <input
            type="number"
            value={state.timestamp}
            onChange={(e) => {
              setState({
                timestamp: e.target.value as any,
              })
            }}
          />
        </Box>
        <Button type="primary" style={{ height: '100%' }}>
          转换
        </Button>
        <Box>时间</Box>
        <Box>{dayjs(state.timestamp, 'x').format('YYYY-MM-DD HH:mm:ss')}</Box>
        <Box>时间</Box>
        <Box>
          <input
            type="text"
            value={state.inputTime}
            onChange={(e) => {
              setState({
                inputTime: e.target.value,
              })
            }}
          />
        </Box>
        <Button type="primary" style={{ height: '100%' }}>
          转换
        </Button>
        <Box>时间戳 (13位)</Box>
        <Box>{dayjs(state.inputTime, 'YYYY-MM-DD HH:mm:ss').valueOf()}</Box>
      </Grid>
    </Flex>
  )
}
