import React from 'react'

export interface DefenseProps {
  [key: string]: any
}

export function Defense(props: DefenseProps) {
  const {} = props
  return (
    <div>
      <h2>防御力</h2>
      <div>
        <h3>角色攻击敌人时的防御系数</h3>
        <p>
          {`防御技术 = (角色等级 + 100) / ((角色等级 + 100) + (敌人等级+100) * (1 - 减防) * (1 - 无视防御力) )`}
        </p>
        <h3>敌人攻击角色时的防御力系数</h3>
        <p>
          {`防御力系数 = (5 * 敌人等级 + 500) / ( 5 * 敌人等级 + 500 + 角色防御 )`}
        </p>
      </div>
      <div></div>
    </div>
  )
}
