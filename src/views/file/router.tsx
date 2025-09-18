import React from 'react'
import { Lazy } from 'aurad'

export const FileRouter = [
  {
    title: '轻量级图片裁剪',
    path: 'img-clipper',
    element: Lazy(import('./img-clipper')),
  },
  {
    title: 'Dom to Image',
    path: 'dom-to-image',
    element: Lazy(import('./dom-to-image')),
  },
  {
    title: '上传图片文件预览 & IndexedDB 缓存',
    path: 'upload-file-preview',
    element: Lazy(import('./upload-preview')),
  },
  {
    title: 'File Review & 内容预览',
    path: 'file-review',
    element: Lazy(import('./file-review')),
  },
  {
    title: 'PDF 生成',
    path: 'pdf-gen',
    element: Lazy(import('./pdf-gen')),
  },
]
