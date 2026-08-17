/**
 * 移除 HTML 字符串中所有标签的属性（DOM 解析版本）
 * @param {string} html - 原始 HTML 字符串
 * @returns {string} - 清理后的 HTML 字符串（只含标签和文本）
 */
export function onlyBody(html) {
  // 解析 HTML，创建虚拟文档
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  // 提取 body 内的内容（去除 DOCTYPE、html、head 等包装）
  const bodyContent = doc.body.innerHTML
  return bodyContent
}
/**
 * 移除 HTML 字符串中所有标签的属性（DOM 解析版本）
 * @param {string} html - 原始 HTML 字符串
 * @returns {string} - 清理后的 HTML 字符串（只含标签和文本）
 */
export function removeTagAttributesDOM(html) {
  // 解析 HTML，创建虚拟文档
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  // 遍历所有元素节点
  const allElements = doc.querySelectorAll('*')
  for (const el of allElements) {
    // 移除所有属性（保留标签名）
    // 注意：不能直接设置 el.attributes = []，需遍历移除
    while (el.attributes.length > 0) {
      el.removeAttribute(el.attributes[0].name)
    }
  }

  // 提取 body 内的内容（去除 DOCTYPE、html、head 等包装）
  const bodyContent = doc.body.innerHTML
  return bodyContent
}

export function removeTag(html) {
  // 解析 HTML，创建虚拟文档
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  // 遍历所有元素节点
  const allElements = doc.querySelectorAll('*')
  const allTags: string[] = []
  for (const el of allElements) {
    const { localName } = el
    if (allTags.includes(localName)) continue
    allTags.push(localName)
  }
  const reg = new RegExp(
    allTags.map((tag) => `<${tag}>|</${tag}>\n?`).join('|'),
    'gi',
  )
  return html
    .replace(reg, '')
    .replace(/^[ \t]*\r?\n/gm, '')
}

/**
 * 使用 DOMParser 移除所有注释节点
 * @param {string} html - 原始 HTML 字符串
 * @returns {string} - 去除注释后的 HTML 字符串（仅保留元素和文本）
 */
export function removeCommentsDOM(html) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  // 获取所有注释节点，并移除
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_COMMENT, null)
  const comments = []
  let node
  while ((node = walker.nextNode())) {
    comments.push(node)
  }
  comments.forEach((comment) => comment.remove())

  // 返回 body 内的 HTML 内容
  return doc.body.innerHTML
}

/**
 * 移除 HTML 中所有空标签（无内容或仅空白字符），并递归移除新产生的空标签
 * @param {string} html - 原始 HTML 字符串
 * @param {boolean} removeWhitespaceOnly - 是否将仅含空白字符的标签视为空（默认 true）
 * @returns {string} - 清理后的 HTML 字符串
 */
export function removeEmptyTagsDOM(html, removeWhitespaceOnly = true) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const body = doc.body

  // 由于上述逻辑较复杂，为了简洁，采用 while 循环反复清理直到稳定
  let removed = true
  while (removed) {
    removed = false
    const allElements = body.querySelectorAll('*')
    for (const el of allElements) {
      // 检查是否为空（无子节点或仅有空白文本）
      for (const child of el.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent
          if (removeWhitespaceOnly) {
            if (text.trim().length > 0) {
              break
            }
          } else {
            if (text.length > 0) {
              break
            }
          }
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          // 有元素子节点，不能简单认为空，因为元素可能含内容
          // 但该子元素可能也是空的，但我们还没处理，所以先跳过，等后续轮次
          // isEmpty = false; // 暂定非空，避免误删，等子元素被清理后，下一轮再判断
          break
        }
      }
      // 只有当没有任何子节点（包括元素和文本）时，才真的是空标签
      // 但如果有元素子节点但那些子节点最终会被移除，我们需要多轮清理
      // 所以这里只检查是否完全没有子节点
      if (el.childNodes.length === 0) {
        // 空标签
        el.remove()
        removed = true
      } else {
        // 检查是否所有子节点都是文本且为空
        let allTextEmpty = true
        let hasTextNode = false
        for (const child of el.childNodes) {
          if (child.nodeType === Node.TEXT_NODE) {
            hasTextNode = true
            const text = child.textContent
            if (removeWhitespaceOnly) {
              if (text.trim().length > 0) {
                allTextEmpty = false
                break
              }
            } else {
              if (text.length > 0) {
                allTextEmpty = false
                break
              }
            }
          } else {
            allTextEmpty = false // 有元素子节点，不算全文本
            break
          }
        }
        if (hasTextNode && allTextEmpty) {
          // 只有空白文本，移除
          el.remove()
          removed = true
        }
      }
    }
  }

  return body.innerHTML
}
