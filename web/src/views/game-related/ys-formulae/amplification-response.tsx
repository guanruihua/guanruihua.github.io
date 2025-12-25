import React from 'react'

export interface AmplificationResponseProps {
  [key: string]: any
}

export function AmplificationResponse(props: AmplificationResponseProps) {
  const {} = props
  const items = [
    '增幅反应包括：蒸发、融化',
    '触发增幅反应时，会为本次伤害附加蒸发融化系数（完整公式见【常规伤害】章节）',
    '若攻击没有出现伤害数字（例如命中护盾），则本次伤害不会计算蒸发融化系数',
    '蒸发融化系数 = 基础系数 * ( 1 + 2.78*元素精通 / (元素精通 + 1400)  +反应增伤%)',
    '基础系数',
    '2.0 蒸发 水->火',
    '2.0 融化 火->冰',
    '1.5 蒸发 火->水',
    '1.5 融化 冰->火',
  ]
  return (
    <div>
      <h2>增幅反应</h2>
      {items.map((_) => (
        <p key={_}>{_}</p>
      ))}
    </div>
  )
}
