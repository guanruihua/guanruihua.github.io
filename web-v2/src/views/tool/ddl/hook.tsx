import React from 'react'
import './index.less'
import { SOURCEURL } from '@/assets'
import dayjs from 'dayjs'
import { useSetState } from '0hook'
import { isArray, isString } from 'asura-eye'
interface State {
  // 假期
  holiday: string[]
  // 调休
  adjustmentDay: string[]
}
export const usePageState = () => {
  const ft = 'YYYY/MM/DD'
  const now = dayjs()
  const startTime = now.startOf('year')
  const [state, setState] = useSetState<State>({
    // 假期
    holiday: [],
    // 调休
    adjustmentDay: [],
  })

  const analyze = (data: any) => {
    if (!isArray(data)) return
    const newState: State = {
      holiday: [],
      adjustmentDay: [],
    }
    data.forEach((item) => {
      if (!isArray(item)) return
      const [desc, name, ho, ad] = item
      // console.log(item)
      isString(ho) &&
        ho.split(',').forEach((ceil) => {
          if (ceil.includes('-')) {
            const [start, end] = ceil.split('-')
            let currentDate = dayjs(now.year() + '/' + start, 'YYYY/MM/DD')
            const lastDate = dayjs(now.year() + '/' + end, 'YYYY/MM/DD')

            while (
              currentDate.isBefore(lastDate) ||
              currentDate.isSame(lastDate, 'day')
            ) {
              newState.holiday.push(currentDate.format(ft))
              currentDate = currentDate.add(1, 'day')
            }
          } else {
            const val = dayjs(now.year() + '/' + ceil, 'YYYY/MM/DD').format(ft)
            newState.holiday.push(val)
          }
        })

      isString(ad) &&
        ad.split(',').forEach((ceil) => {
          if (ceil.includes('-')) {
            const [start, end] = ceil.split('-')
            let currentDate = dayjs(now.year() + '/' + start, 'YYYY/MM/DD')
            const lastDate = dayjs(now.year() + '/' + end, 'YYYY/MM/DD')

            while (
              currentDate.isBefore(lastDate) ||
              currentDate.isSame(lastDate, 'day')
            ) {
              newState.adjustmentDay.push(currentDate.format(ft))
              currentDate = currentDate.add(1, 'day')
            }
          } else {
            const val: string = dayjs(
              now.year() + '/' + ceil,
              'YYYY/MM/DD',
            ).format(ft)
            newState.adjustmentDay.push(val)
          }
        })
    })

    setState(newState)
  }

  const init = async () => {
    fetch(SOURCEURL + `holiday/2025.json?t=${Date.now()}`)
      .then(async (res) => {
        const data = await res.json()
        analyze(data)
      })
      .catch(console.error)
  }

  React.useEffect(() => {
    init()
  }, [])

  return {
    state,
    setState,
    startTime,
    ft,
    now,
  }
}
