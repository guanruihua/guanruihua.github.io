export const load = () => {
  // 前端 3D 视频控制逻辑
  const video: null | HTMLVideoElement =
    document.querySelector('.product-360-video')

  if (!video) return

  // video.play()

  const _ = {
    startX: 0,
    startProgress: 0,
    isDragging: false,

    // 阻止默认的滚屏行为，专心处理左右摩擦
    handleTouchStart(e) {
      this.isDragging = true
      this.startX = e.clientX
      // 记录开始滑动时视频的当前进度比例
      this.startProgress = video.currentTime / video.duration
    },
    handleTouchMove(e) {
      if (!video.duration || !this.isDragging) return

      const w = video.getBoundingClientRect()?.width || window.innerWidth

      const deltaX = -e.clientX + this.startX

      // 视口宽度对应的最大滑动距离，可以根据手感调整阻尼系数
      const swipeRange = w * 1.5
      const progressDelta = deltaX / swipeRange

      // 计算最新的进度，并做好边界处理（首尾循环相连）
      let nextProgress = this.startProgress - progressDelta
      const gap = video.duration / 24
      if (nextProgress < 0) nextProgress += gap
      if (nextProgress > 1) nextProgress -= gap

      // 精确跳转到目标帧时间，由于 -bf 0 和低 GOP 限制，这次跳转将是 0 延迟的
      video.currentTime = nextProgress * video.duration
    },
    onTouchEnd() {
      this.isDragging = false
      this.startX = 0
      this.startProgress = 0
    },
  }
  const abortController = new AbortController()
  const signal = abortController.signal
  const params = {
    passive: true,
    signal,
  }

  video.addEventListener('mousedown', _.handleTouchStart, params)
  video.addEventListener('touchstart', _.handleTouchStart, params)
  video.addEventListener('mousemove', _.handleTouchMove, params)
  video.addEventListener('touchmove', _.handleTouchMove, params)
  video.addEventListener('touchend', _.onTouchEnd, params)
  video.addEventListener('mouseup', _.onTouchEnd, params)
  video.addEventListener('mouseleave', _.onTouchEnd, params)

  return () => {
    abortController.abort()
  }
}
