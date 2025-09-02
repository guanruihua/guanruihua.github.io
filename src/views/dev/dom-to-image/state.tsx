import React from 'react'

export const usePageState = () => {
  const domRef = React.useRef(null)

  // 将DOM元素转换为图片并下载
  const handleDownloadImage = async () => {
    const html2canvas = (window as any).html2canvas
    console.log(html2canvas)

    html2canvas(domRef.current, {
      allowTaint: true,
      useCORS: true,
      backgroundColor: '#000',
    }).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png') // toDataURL是canvas API的一个方法，将canvas上的内容转为Data URL格式的图像，包含了图像的二进制数据，并以Base64编码形式表现
      const img = new Image() // 创建一个图片元素对象
      img.src = imgData // 将该图片元素对象的src绑定刚刚的二进制数据
      // document.body.appendChild(img) // 展示图片
      // 下载图片
      const link = document.createElement('a')
      link.download = 'filename.png'
      link.href = imgData
      link.click()
    })

    return
  }

  return {
    domRef,
    handleDownloadImage,
    domToImage: () => {
      console.log('domToImage')
    },
  }
}
