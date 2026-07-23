import React from 'react'
import './index.less'
import { load } from './load'
import { TechnicalStack } from '@/components'

// https://juejin.cn/post/7643210854389661730
export default function Demo_video_2_3D() {
  React.useEffect(load, [])

  return (
    <div className="demo__video-2-3d">
      <video
        className="product-360-video"
        preload="auto"
        draggable="false"
        disable-picture-in-picture
        controls-list="nodownload noplaybackrate noremoteplayback"
        aria-label="Interactive 360 degree product video"
        playsInline // 移动端必备
        muted // 很多浏览器策略要求视频静音才能自动播放
        // autoPlay // 可选，加上循环可做背景
        loop
        src="../../video/t1-1.mp4"
      ></video>
      <TechnicalStack>video, ffmpeg</TechnicalStack>
    </div>
  )
}
