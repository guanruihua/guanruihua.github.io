import dayjs from 'dayjs'

export default function DevDate() {
  const now = dayjs()
  const t = now.startOf('M')
  const startWeek = t.day()

  const getDay = (i: number) => t.add(i + 1 - startWeek, 'day')

  const days = new Array(42).fill('').map((_, i) => getDay(i))

  return (
    <div className="dev__date flex justify-center">
      <div className="grid grid-cols-7 max-w-300 gap-4 ">
        {days.map((_, i) => {
          const text = _.format('MM-DD')
          return (
            <div
              key={i}
              className={[
                `text-center flex justify-center items-center rounded-2xl min-w-30 min-h-30`,
                _.month() === now.month()
                  ? 'bg-white/15'
                  : 'bg-white/3',
                _.month() === now.month() && _.date() === now.date() ? 'bg-white/40' : '',
              ].join(' ')}
            >
              {text}
            </div>
          )
        })}
      </div>
    </div>
  )
}
