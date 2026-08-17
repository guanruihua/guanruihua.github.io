import { State } from '../../type'

interface TextLengthStatisticsProps {
  state: State
  [key: string]: any
}

export function TextLengthStatistics(props: TextLengthStatisticsProps) {
  const { state = {} } = props
  const target = state.from_value || ''

  const items = [
    {
      label: '字符总数',
      desc: '含空格、换行等全部字符',
      value: target.length,
    },
    {
      label: '不含空格',
      desc: '去除半角空格',
      value: target.replaceAll(' ', '').length,
    },
    {
      label: '不含空白 ',
      desc: '去除空格、制表符、换行',
      value: target.replace(/\n|\s|\t/gi, '').length,
    },
    {
      label: '行数',
      desc: '按换行符统计',
      value: target.split('\n').length,
    },
    {
      label: '非空行',
      desc: '去掉首尾空白后非空的行',
      value: target.split('\n').filter((_) => Boolean(_)).length,
    },
    // { label: '段落', desc: '以空行分隔的段落数', value: 0 },
    // { label: '单词', desc: '按空白分隔的英文词数', value: 0 },
    {
      label: '中文',
      desc: '常用 CJK 汉字范围',
      value: target.replace(/[^\u4e00-\u9fa5]/gi, '').length,
    },
    {
      label: '英文 ',
      desc: 'A–Z / a–z',
      value: target.replace(/[^a-zA-Z]/gi, '').length,
    },
    {
      label: '数字',
      desc: '0-9',
      value: target.replace(/\D/gi, '').length,
    },
    {
      label: 'UTF-8 字节',
      desc: ' 按 UTF-8 编码估算体积',
      value: new TextEncoder().encode(target).length + 'B',
    },
  ]
  return (
    <div className="text-length-statistics">
      {items.map((item) => (
        <div key={item.label}>
          <div className="title">{item.label}</div>
          <div className="value">{item.value}</div>
          <div className="desc">{item.desc}</div>
        </div>
      ))}
    </div>
  )
}
