import { Conf, State } from './type'

export const Options = {
  Frequency: [
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
      { value: 'every-month-1', label: '每月第一天' },
      { value: 'every-month-15', label: '每月15号' },
      { value: 'every-month-last', label: '每月最后一天' },
    ],
    // [
    //   { value: 'every-day', label: '每天' },
    //   { value: 'every-year', label: '每年' },
    //   // { value: 'range-date', label: '时间范围' },
    // ],
  ],
  TimeFrequency: [
    { value: 'once', label: '一次性' },
    { value: 'infinite', label: '循环' },
  ],
}

export const getLabel = {
  Frequency: (value: string = '') => {
    for (let i = 0; i < Options.Frequency.length; i++)
      for (let j = 0; j < Options.Frequency[i].length; j++)
        if (value === Options.Frequency[i][j].value)
          return Options.Frequency[i][j].label
    return ''
  },
  TimeFrequency: (value: string = '') => {
    for (let i = 0; i < Options.TimeFrequency.length; i++)
      if (value === Options.TimeFrequency[i].value)
        return Options.TimeFrequency[i].label
    return ''
  },
}

export const Default: {
  state: State
  conf: Conf
} = {
  state: {
    todo: [],
    lastUpdate: -1,
  },
  conf: {
    id: new Date().getTime().toString(),
    desc: '',
    frequency: Options.Frequency[0][0].value,
    type: 'default',
    timeFrequency: 'infinite',
  },
}
