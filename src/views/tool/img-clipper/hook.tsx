import React from 'react'
import Cropper from 'cropperjs'
import { downloadCanvas, downloadData, toCircle } from './helper'
import { debounce } from 'abandonjs'
import { ObjectType } from '0type'

export const usePageState = () => {
  const [uploadFile, setUploadFile] = React.useState<any>(null)
  const uploadRef = React.useRef<HTMLInputElement>(null)
  const container = React.useRef<HTMLImageElement>(null)
  const cropperRef = React.useRef<any>(null)
  const [previewImg, setPreviewImg] = React.useState<ObjectType>({
    square: '',
    circle: '',
  })

  const handleUpload = () => {
    const dom = uploadRef.current
    if (!dom) return
    dom?.click()
    dom.onchange = (e: any) => {
      const file = e.target?.files[0] || ''
      const imageURL = URL.createObjectURL(file)
      
      cropperRef.current?.destroy?.()
      setUploadFile(imageURL)
      const timer = setTimeout(() => {
        init()
        clearTimeout(timer)
      }, 100)
    }
  }

  const init = async () => {
    if (!container.current) return
    const cropper = new Cropper(container.current as any, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 0.8,
      responsive: true,
      restore: false,
      guides: false,
      center: true,
      highlight: false,
      cropBoxMovable: true,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: false,
    })
    cropperRef.current = cropper
    return
  }

  const handleDownload = async (type?: string) => {
    if (!cropperRef.current) return
    if (type && previewImg[type]) {
      return downloadData(previewImg[type])
    }

    const cropper: Cropper = cropperRef.current
    const select = cropper.getCroppedCanvas({
      fillColor: 'transparent',
    })
    downloadCanvas(select)
  }

  const handleReview = debounce(async () => {
    if (!cropperRef.current) return
    const cropper: Cropper = cropperRef.current
    const select = cropper.getCroppedCanvas({
      fillColor: 'transparent',
    })
    setPreviewImg({
      square: select.toDataURL('image/png'),
      circle: await toCircle(select),
    })
  }, 100)

  React.useEffect(() => {
    if (!container.current) return

    init()
    container.current?.removeEventListener('crop', handleReview)
    container.current.addEventListener('crop', handleReview)

    return () => {
      cropperRef.current?.destroy?.()
      container.current?.removeEventListener('crop', handleReview)
      if (uploadFile) {
        URL.revokeObjectURL(uploadFile)
      }
    }
  }, [container.current])

  return {
    uploadFile,
    uploadRef,
    container,
    previewImg,
    handleDownload,
    handleUpload,
  }
}
