export const Default = {
  state: {
    todo: [],
  },
  conf: {
    id: new Date().getTime().toString(),
    title: '',
    desc: '',
    frequency: 'every-week',
    type: 'default',
    timeFrequency: 'infinite',
  },
}

export const FrequencyOptions = [
  [
    { value: 'every-week', label: '每周' },
    { value: 'every-week-0', label: '周日' },
    { value: 'every-week-1', label: '周一' },
    { value: 'every-week-2', label: '周二' },
    { value: 'every-week-3', label: '周三' },
    { value: 'every-week-4', label: '周四' },
    { value: 'every-week-5', label: '周五' },
    { value: 'every-week-6', label: '周六' },
  ],
  [
    { value: 'every-month', label: '每月' },
    { value: 'every-month-15', label: '每月15号' },
    { value: 'every-month-last', label: '每月最后一天' },
  ],
  // [
  //   { value: 'every-day', label: '每天' },
  //   { value: 'every-year', label: '每年' },
  //   // { value: 'range-date', label: '时间范围' },
  // ],
]

export const TimeFrequencyOptions = [
  { value: 'once', label: '一次性' },
  { value: 'infinite', label: '循环' },
]

export const getLabel = {
  Frequency: (value: string = '') => {
    for (let i = 0; i < FrequencyOptions.length; i++)
      for (let j = 0; i < FrequencyOptions[i].length; j++)
        if (value === FrequencyOptions[i][j].value)
          return FrequencyOptions[i][j].label
    return ''
  },
  TimeFrequency: (value: string = '') => {
    for (let i = 0; i < TimeFrequencyOptions.length; i++)
      if (value === TimeFrequencyOptions[i].value)
        return TimeFrequencyOptions[i].label
    return ''
  },
}
