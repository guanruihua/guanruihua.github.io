import React from 'react'
import './index.less'
import { Chart, Grid, Flex } from 'aurad'
import { usePageState } from './state'
import { Resistance } from './resistance'
import { Defense } from './defense'
import { MoonCrystal } from './moon-crystal'
import { MoonBlossom } from './moon-blossom'
// https://homdgcat.wiki/gi/formulae
export default function () {
  const {} = usePageState()
  return (
    <div className="game-related__ys-formulae">
      {/* <p>$$1 + 2 = 3$$</p> */}
      <p> 90级系数1446.85 </p>
      <p> 95级系数1561.46 </p>
      <p> 100级系数1674.81 </p>
      <Grid columns={2}>
        <Resistance />
        <div>
          <h2>常规伤害</h2>
          <p>{`最总伤害 =(基础值 + 激化值 + 基础值加成) * (1 + 增伤% + 易伤害% - 减伤% ) * 抗性系数 * 防御系数 * 暴击区 * 蒸发融化系数`}</p>
          <p>
            注:
            若攻击没有出现伤害数字（例如命中护盾），则本次伤害不会计算蒸发融化系数
          </p>
          <p>
            基础值：攻击力 * 倍率
            ，攻击力可以替换为其他属性（生命值、元素精通等）
          </p>
          <p>基础值加成：描述中带有【造成的伤害提高 X】的效果</p>

          <p>增伤：描述中带有【我方造成的伤害提升 X%】的效果</p>
          <p>易伤：描述中带有【目标受到的伤害提升 X%】的效果</p>
          <p>减伤：描述中带有【目标受到的伤害降低 X%】的效果</p>

          <p>激化值：见【激化反应】章节</p>
          <p>蒸发融化系数：见【增幅反应】章节</p>
        </div>
        <Defense />
        <MoonCrystal />
        <MoonBlossom />
      </Grid>
    </div>
  )
}
