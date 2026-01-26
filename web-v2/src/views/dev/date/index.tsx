import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'
import './index.css'

export default function DevDate() {
  const now = dayjs()
  const t = now.startOf('M')
  const startWeek = t.day()

  const getDay = (i: number) => t.add(i + 1 - startWeek, 'day')

  const days = new Array(42).fill('').map((_, i) => getDay(i))

  return (
    <div className="dev__date flex justify-center w-full">
      <div className="grid grid-cols-1 gap-3">
        <div className={`grid gap-3 grid-cols-7`}>
          {new Array(7).fill('').map((_, i) => {
            const label = ['一', '二', '三', '四', '五', '六', '日'][i % 7]
            return (
              <div key={i} className="text-center font-bold">
                {label}
              </div>
            )
          })}
          {days.map((_: Dayjs, i) => {
            const text = _.format('MM DD')

            return (
              <div key={i} className="flex justify-center m-0 p-0 w-30 h-30">
                <div
                  data-month={_.month() === now.month()}
                  data-day={
                    _.month() === now.month() && _.date() === now.date()
                  }
                  data-before={_.startOf('day').isBefore(now.startOf('day'))}
                  data-weekend={[0, 6].includes(_.day())}
                  className="dev__date-day"
                >
                  {text}
                </div>
              </div>
            )
          })}
          <br />
        </div>
      </div>
    </div>
  )
}
