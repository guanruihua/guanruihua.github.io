export type I18n = Record<string, Record<string, string>>

export const i18n: I18n = {
  zh_CN: {
    total: '总数',
    drawChart: '图表已绘制成功完成',
    startFindData: '开始获取系统数据...',
    endFindData: '获取系统数据完成, 并开始分析...',
  },
  en_US: {
    total: 'Total',
    drawChart: 'The chart has been successfully drawn',
    startFindData: 'Start retrieving system data ..',
    endFindData: 'Get system data completed and start analysis. ..',
  },
}

export const t = (lang: string, key: string) => {
  return i18n?.[lang]?.[key] || i18n.en_US?.[key] || key
}
