import { Leafer, Rect } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件


// https://www.leaferjs.com/ui/guide/plugin/animate.html
export const demo2 = (leafer: Leafer) => {
  const rect = new Rect({
    y: 100,
    cornerRadius: 50,
    fill: '#32cd79',
    animation: {
      style: { x: 500, cornerRadius: 0, fill: '#ffcd00' }, // style keyframe
      duration: 1,
      swing: true, // 摇摆循环播放
    },
  })

  leafer.add(rect)
}

export const demo2_1 = (leafer: Leafer) => {
  const rect = new Rect({
    x: 50,
    y: 300,
    cornerRadius: 50,
    fill: '#32cd79',
    around: 'center',
    animation: {
      keyframes: [
        { style: { x: 150, scaleX: 2, fill: '#ffcd00' }, duration: 0.5 }, // animate keyframe
        { style: { x: 50, scaleX: 1, fill: '#ffcd00' }, duration: 0.2 },
        {
          style: { x: 550, cornerRadius: 0, fill: '#ffcd00' },
          delay: 0.1,
          easing: 'bounce-out',
        },
        { x: 50, rotation: -720, cornerRadius: 50 }, // style keyframe
      ],
      duration: 3, // 自动分配剩余的时长给未设置 duration 的关键帧： (3 - 0.5 - 0.2 - 0.1) / 2
      loop: true,
      join: true, //  加入动画前的元素状态作为 from 关键帧
    },
  })

  leafer.add(rect)
}

export const demo2_2 = (leafer: Leafer) => {
  const arrow = new Arrow({
    x: 800,
    y: 100,
    stroke: '#32cd79',
    strokeWidth: 5,
    dashPattern: [10, 10], // 绘制虚线
    dashOffset: 0,
    animation: {
      // 虚线动画
      style: { dashOffset: -20 },
      easing: 'linear',
      duration: 0.5,
      loop: true,
    },
  })

  leafer.add(arrow)
}
