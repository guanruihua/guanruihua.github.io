import { isString } from 'asura-eye'
import mammoth from 'mammoth'

export const getFileContent = async (file: any) => {
  return new Promise<string>(async (r) => {
    // console.log(file)
    if (!isString(file.name)) return
    const fileType = file.name.split('.').at(-1)

    const reader = new FileReader()
    reader.onerror = function () {
      r('')
    }

    if (['md', 'txt', 'json'].includes(fileType)) {
      reader.onload = function (e) {
        const content = e.target?.result || ''
        if (isString(content)) r(content)
      }
      reader.readAsText(file)
      return
    }

    if (['docx'].includes(fileType)) {
      reader.onload = function (e) {
        const arrayBuffer: any = e.target?.result || ''
        mammoth
          .extractRawText({
            arrayBuffer,
          })
          .then((res) => {
            console.log(res)
            r(res?.value || '')
          })
          .catch(() => {
            r('')
          })
        return
      }
      reader.readAsArrayBuffer(file)
      return
    }
    if (['pdf'].includes(fileType)) {
      // console.log(file, fileType)

      // 读取page
      const readPDFPage = async (doc: any, pageNo: any) => {
        const page = await doc.getPage(pageNo)
        const tokenizedText = await page.getTextContent()
        const pageText: any[] = []

        let temp = ''
        let maxLen = -1
        tokenizedText.items.map((token: any) => {
          // console.log(token)
          const { str, hasEOL } = token
          if (hasEOL) {
            if (temp.length > maxLen) {
              maxLen = temp.length
            }
            pageText.push(temp)
            temp = ''
          } else {
            temp += str
          }
          return str
        })

        let result = ''
        let hl = (maxLen * 3) / 5
        pageText.forEach((row, i) => {
          if (row.length < hl) {
            result = result + row + '\n'
          } else {
            result += row
          }
        })
        return result
      }

      reader.onload = async (e) => {
        try {
          const arrayBuffer: any = e.target?.result || ''
          const doc = await (window as any).pdfjsLib.getDocument(arrayBuffer)
            .promise
          const pageTextPromises = []
          console.log(doc)
          for (let pageNo = 1; pageNo <= doc.numPages; pageNo++) {
            pageTextPromises.push(readPDFPage(doc, pageNo))
          }
          const pageTexts = await Promise.all(pageTextPromises)
          console.log(pageTexts)
          r(pageTexts.join('\n'))
        } catch (err) {
          console.error(err)

          r('')
        }
      }
      reader.readAsArrayBuffer(file)
      return
    }
    r('')
  })
}
