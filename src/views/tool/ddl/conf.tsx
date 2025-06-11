import { isNumber } from 'asura-eye'
import dayjs, { Dayjs } from 'dayjs'

export const getConf = () => {
  const now = dayjs()
  //
  // .add(2, 'd')
  const day = now.day()
  const date = now.date()
  const weekStart = now.startOf('week').add(1, 'day')

  const diff = (a: Dayjs, b: Dayjs) => b.diff(a, 'day')
  const getGap = (time: string) => {
    if (time === 'last') {
      return diff(weekStart, now.endOf('month'))
    }
    const timeNum = Number(time)
    if (isNumber(timeNum)) return diff(weekStart, now.set('date', timeNum))
    return -999
  }
  console.log(now.format('M月D日'), '周', day, '日', date, diff(now, weekStart))
  // const len = 9
  const list = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map(
    (title, i) => {
      const selfTime = now.startOf('week').add(i, 'd')
      return {
        title,
        time: selfTime.format('M月D日'),
        now: selfTime.date() === now.date(),
        weekend: i === 5 || i === 6,
      }
    },
  )

  const tasks: {
    title: string
    className: string[]
    style: React.CSSProperties
  }[] = [
    '深境螺旋最后一天,high,14',
    '深境螺旋刷新,warning,15',
    '幻想真境剧诗最后一天,high,last',
    '幻想真境剧诗刷新,warning,1',
  ].map((item) => {
    const [title, type, time]: string[] = item.split(',')
    const style: React.CSSProperties = {}
    const className: string[] = [type]

    if (type) {
      let left = 0
      let center = 1
      let right = 0

      const gap = getGap(time)
      if (gap > 6 || gap < 1) {
        style.display = 'none'
      } else {
        left = gap
        center = 1
        right = 6 - gap
      }
      style.gridTemplateColumns = `${left}fr ${center}fr ${right}fr`
    }

    return {
      title,
      className,
      style,
    }
  })

  return {
    list,
    tasks,
  }
}
