import { Box, Button, Flex, Grid } from 'aurad'
import React from 'react'
import dayjs from 'dayjs'
import { useSetState } from '0hook'
import './index.less'
import { isString } from 'asura-eye'

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
      now_tz: 8,
      target_tz: 8,
    },
    'tool__time-format__cache',
  )

  const format_tz_timestamp = () => {
    const time = dayjs(
      isString(state.timestamp) ? Number(state.timestamp) : state.timestamp,
      'x',
    ).valueOf()
    const offset =
      (Number(state.target_tz) - new Date().getTimezoneOffset() / -60) *
      3600_000

    // time.add(, 'hour')

    return dayjs(time + offset, 'x').format('YYYY-MM-DD HH:mm:ss')
  }

  const format_tz_time = () => {
    const time = dayjs(state.inputTime, 'YYYY-MM-DD HH:mm:ss').valueOf()
    const offset = (Number(state.target_tz) - Number(state.now_tz)) * 3600_000
    return dayjs(time + offset, 'x').format('YYYY-MM-DD HH:mm:ss')
  }

  return (
    <Flex column className="tool__time-format" style={{ fontSize: 14 }}>
      <h3>现在</h3>
      <Grid
        style={{
          gridTemplateColumns: '150px 250px 100px',
          lineHeight: '24px',
        }}
      >
        <Box>时间戳</Box>
        <Box>{now.valueOf()}</Box>
        <Flex alginCenter center style={{ height: '100%' }}>
          <Button
            type="primary"
            onClick={() => {
              timer.current && clearInterval(timer.current)
            }}
          >
            Stop
          </Button>
        </Flex>
        <Box>时间</Box>
        <Box>{now.format('YYYY-MM-DD HH:mm:ss')}</Box>
        <Flex alginCenter center style={{ height: '100%' }}>
          <Button
            type="primary"
            onClick={() => {
              setState({
                timestamp: Date.now(),
                inputTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                now_tz: 8,
                target_tz: 8,
              })
              timer.current = setInterval(() => {
                setNow(dayjs())
              }, 1000)
            }}
          >
            Reset
          </Button>
        </Flex>
      </Grid>
      <h3>编辑</h3>
      <Grid
        style={{
          gridTemplateColumns: '150px 250px 100px 150px 250px',
          alignContent: 'center',
          lineHeight: '24px',
        }}
      >
        <Box>时间戳 (13位)</Box>
        <Box>
          <input
            type="number"
            value={state.timestamp ?? ''}
            onChange={(e) => {
              setState({
                timestamp: e.target.value as any,
              })
            }}
          />
        </Box>
        <Flex
          alginCenter
          center
          style={{
            height: '100%',
          }}
        >
          <Button type="primary">转换</Button>
        </Flex>
        <Box>时间</Box>
        <Box>
          {dayjs(
            isString(state.timestamp)
              ? Number(state.timestamp)
              : state.timestamp,
            'x',
          ).format('YYYY-MM-DD HH:mm:ss')}
        </Box>
        <Box>时间</Box>
        <Box>
          <input
            type="text"
            value={state.inputTime ?? ''}
            onChange={(e) => {
              setState({
                inputTime: e.target.value,
              })
            }}
          />
        </Box>
        <Flex
          alginCenter
          center
          style={{
            height: '100%',
          }}
        >
          <Button type="primary">转换</Button>
        </Flex>
        <Box>时间戳 (13位)</Box>
        <Box>{dayjs(state.inputTime, 'YYYY-MM-DD HH:mm:ss').valueOf()}</Box>
      </Grid>
      <h3>时间戳 + 时区</h3>
      <Grid
        style={{
          gridTemplateColumns: '150px 250px 100px 150px 250px',
          alignContent: 'center',
          lineHeight: '24px',
        }}
      >
        <Box>时间戳 (13位)</Box>
        <Box>
          <input
            type="number"
            value={state.timestamp ?? ''}
            onChange={(e) => {
              setState({
                timestamp: e.target.value as any,
              })
            }}
          />
        </Box>
        <Box>目标时区 (GMT)</Box>
        <Box>
          <input
            type="number"
            value={state.target_tz ?? 0}
            onChange={(e) => {
              let num = Number(e.target.value as any)
              if (num > 12) num = 12
              if (num < -12) num = -12
              setState({
                target_tz: num,
              })
            }}
          />
        </Box>
        <Grid
          style={{
            gridColumn: '3 / -1',
            gridRow: '1 / 3',
            gridTemplateColumns: '100px 150px 250px',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Flex center>
            <Button type="primary">转换</Button>
          </Flex>
          <Box>时间</Box>
          <Box>{format_tz_timestamp()}</Box>
        </Grid>
      </Grid>
      <h3>时间 + 时区</h3>
      <Grid
        style={{
          gridTemplateColumns: '150px 250px 100px 150px 250px',
          alignContent: 'center',
          lineHeight: '24px',
        }}
      >
        <Box>时间</Box>
        <Box>
          <input
            type="text"
            value={state.inputTime ?? ''}
            onChange={(e) => {
              setState({
                inputTime: e.target.value,
              })
            }}
          />
        </Box>

        <Box>时间</Box>
        <Box>{format_tz_time()}</Box>

        <Flex
          alginCenter
          center
          style={{
            gridColumn: '3',
            gridRow: '1 / 3',
            height: '100%',
          }}
        >
          <Button type="primary">转换</Button>
        </Flex>
        <Box>当期时区 (GMT)</Box>
        <Box>
          <input
            type="number"
            value={state.now_tz ?? 0}
            onChange={(e) => {
              let num = Number(e.target.value as any)
              if (num > 12) num = 12
              if (num < -12) num = -12
              setState({
                now_tz: num,
              })
            }}
          />
        </Box>
        <Box>目标时区 (GMT)</Box>
        <Box>
          <input
            type="number"
            value={state.target_tz ?? 0}
            onChange={(e) => {
              let num = Number(e.target.value as any)
              if (num > 12) num = 12
              if (num < -12) num = -12
              setState({
                target_tz: num,
              })
            }}
          />
        </Box>
      </Grid>
    </Flex>
  )
}
