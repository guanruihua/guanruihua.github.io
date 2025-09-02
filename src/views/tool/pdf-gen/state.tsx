import { jsPDF } from 'jspdf'
import tmpPng from './tmp.jpg'

// 默认导出是 A4 纸张，纵向，使用毫米作为单位
export const usePageState = () => {
  // 首先引入jsPDF和autoTable插件

  async function drawImg(doc: any) {
    // const img = new Image()
    // img.src = await import('./tmp.jpg')
    // await new Promise((resolve) => {
    //   img.onload = resolve
    // })
    // const canvas = document.createElement('canvas')
    // const context = canvas.getContext('2d')
  }

  // 创建表格
  // function drawTable(doc: any, tableData: any[]) {}

  function drawBarChart(
    doc: any,
    data: any,
    x: number,
    y: number,
    width: number,
    height: number,
    color = '#4e73df',
  ) {
    const maxValue = Math.max(...data)
    const barWidth = width / data.length

    data.forEach((value: any, i: number) => {
      const barHeight = (value / maxValue) * height
      doc.setFillColor(color)
      doc.rect(
        x + i * barWidth,
        y + height - barHeight,
        barWidth - 2,
        barHeight,
        'F',
      )
    })

    // 添加标签
    doc.setFontSize(8)
    data.forEach((_: any, i: number) => {
      doc.text(
        (i + 1).toString(),
        x + i * barWidth + barWidth / 2 - 1,
        y + height + 5,
        { align: 'center' },
      )
    })
  }

  return {
    genPDF: async () => {
      const doc = new jsPDF()
      doc.text('Hello world!', 10, 10)
      // 添加线条
      doc.line(10, 20, 50, 20)

      // 添加矩形
      doc.rect(10, 30, 40, 20)

      // 设置字体
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(16)
      const salesData = [65, 59, 80, 81, 56, 55, 40]
      drawBarChart(doc, salesData, 20, 100, 160, 60)
      doc.addImage(tmpPng, 'JPEG', 10, 170, 50, 50) // (图片数据, 格式, x, y, 宽度, 高度)
      drawImg(doc)

      doc.save('a4.pdf')
    },
  }
}
