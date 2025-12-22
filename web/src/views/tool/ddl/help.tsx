// 生成一年中的所有天数
export const generateYearDays = () => {
  // 获取当前年份
  const year = new Date().getFullYear()
  const days = []
  const date = new Date(year, 0, 1) // 当年第一天

  while (date.getFullYear() === year) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1) // 增加一天
  }

  return days
}

const allDays = generateYearDays()
