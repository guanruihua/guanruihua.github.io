import React from 'react'

export const usePhaser = () => {
  const [phaser, setPhaser] = React.useState<any>(null)

  React.useEffect(() => {
    const url = '/js/phaser.min.js'

    const script = document.createElement('script')
    script.src = url
    script.onload = () => {
      // 设置 worker 路径
      console.log('Phaser', url, '已加载')
      const Phaser = (window as any).Phaser
      setPhaser(Phaser)
      // Phaser && Game(Phaser)
    }
    document.body.appendChild(script)

    return () => {
      // 组件卸载时移除 script
      document.body.removeChild(script)
    }
  }, [])

  return {
    Phaser: phaser,
  }
}
