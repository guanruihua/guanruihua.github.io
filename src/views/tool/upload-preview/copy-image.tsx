import { message } from 'aurad'

export const getMineType = (base64Image: string) => {
  return base64Image.match(/^data:(.*?);base64,/)?.[1] || ''
}

export async function copyImage(base64Image: string) {
  try {
    // 提取 MIME 类型（如 "image/png"）
    const mimeType = 'image/png'
    // const mimeType = base64Image.match(/^data:(.*?);base64,/)?.[1] || ''
    // console.log(mimeType)
    // const blob = base64ToBlob(base64Image, mimeType)
    // 提取纯 Base64 数据（去掉 "data:image/jpeg;base64,"）
    const base64Data = base64Image.split(',')[1]

    // 转换为 Blob
    const byteCharacters = atob(base64Data)
    const byteArrays = []
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512)
      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }
    const blob = new Blob(byteArrays, { type: mimeType })

    // 复制到剪贴板
    const clipboardItem = new ClipboardItem({ [mimeType]: blob })
    await navigator.clipboard.write([clipboardItem])

    message.success('Copy Image Success')
    console.log('图片已复制到剪贴板！')
  } catch (err) {
    message.error('Copy Image Error')
    console.error('复制失败:', err)
  }
}

export function downloadImage(base64Image: string, filename:string = "image.png") {
  const link = document.createElement("a");
  link.href = base64Image;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}