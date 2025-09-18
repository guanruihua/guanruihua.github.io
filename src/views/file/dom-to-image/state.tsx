import React from 'react'

export const usePageState = () => {
  const domRef = React.useRef<HTMLDivElement>(null)
  const previewRef = React.useRef<HTMLDivElement>(null)

  const getImageData = async () => {
    const html2canvas = (window as any).html2canvas

    const canvas = await html2canvas(domRef.current, {
      allowTaint: true,
      useCORS: true,
      backgroundColor: '#000',
    })
    const imgData = canvas.toDataURL('image/png')
    return imgData
  }

  return {
    domRef,
    previewRef,
    handle: {
      downloadImage: async () => {
        const imgData = await getImageData()
        const img = new Image()
        img.src = imgData
        const link = document.createElement('a')
        link.download = 'filename.png'
        link.href = imgData
        link.click()

        return
      },
      domToImage: async () => {
        const imgData = await getImageData()
        const img = new Image()
        img.src = imgData
        if (previewRef.current?.childNodes?.[0]) {
          previewRef.current.removeChild(previewRef.current.childNodes[0])
        }
        previewRef.current?.appendChild(img)
      },
    },
  }
}
