import { ObjectType } from '0type'

export async function getCpuInfo() {
  const info: ObjectType = {
    cpuCores: '未知',
  }
  try {
    info.cpuCores = navigator.hardwareConcurrency || '未知'
    
    const memory = (window.performance as any).memory
    info.usedJSHeapSize = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2) // 已使用的内存（字节）
    info.totalJSHeapSize = (memory.totalJSHeapSize / 1024 / 1024).toFixed(2) // 当前堆总内存（字节）
    info.jsHeapSizeLimit = (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2) // 堆内存上限（字节）

    info.userAgent = navigator.userAgent

    function getGPUInfo() {
      const canvas = document.createElement('canvas')
      let gl: any = null
      try {
        gl =
          canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      } catch (e) {
        return '无法获取WebGL信息'
      }

      if (!gl) return 'WebGL不支持'

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        info.vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        info.gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      }
    }
    getGPUInfo()
  } catch (error) {
    console.error('获取CPU信息出错：', error)
  }
  return info
}
